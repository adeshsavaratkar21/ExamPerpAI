from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.db import models


class AnalyticsService:
    @staticmethod
    def calculate_chapter_metrics(db: Session, chapter_id: int) -> Dict[str, Any]:
        """
        Calculates accuracy, readiness index, focus quadrant, and strict 4-step completion for a given chapter:
        1. Video Lecture (video_done)
        2. Revision Notes (notes_done)
        3. PYQ Practice (pyq_done)
        4. Module Quiz (quiz_done)
        Only when all 4 are true is the chapter considered completed (is_completed = True).
        """
        chapter = db.query(models.Chapter).filter(models.Chapter.id == chapter_id).first()
        if not chapter:
            return {
                "accuracy": 0.0,
                "readiness_index": 0.0,
                "quiz_count": 0,
                "video_done": False,
                "notes_done": False,
                "pyq_done": False,
                "quiz_done": False,
                "steps_done": 0,
                "total_steps": 4,
                "is_completed": False,
                "priority_quadrant": "URGENT FOCUS",
                "reason": "Chapter not found."
            }

        # Fetch completed quizzes for this chapter
        quizzes = db.query(models.Quiz).filter(
            models.Quiz.chapter_id == chapter_id,
            models.Quiz.is_completed == True
        ).all()

        quiz_count = len(quizzes)
        if quiz_count > 0:
            total_score = sum(q.score for q in quizzes)
            total_possible = sum(q.total_marks for q in quizzes)
            accuracy = round((total_score / total_possible) * 100, 1) if total_possible > 0 else 0.0
            # A completed quiz automatically marks quiz_done = True
            chapter.quiz_done = True
        else:
            accuracy = 0.0

        video_done = bool(getattr(chapter, "video_done", False))
        notes_done = bool(getattr(chapter, "notes_done", False))
        pyq_done = bool(getattr(chapter, "pyq_done", False))
        quiz_done = bool(getattr(chapter, "quiz_done", False))

        steps_done = sum([1 for s in [video_done, notes_done, pyq_done, quiz_done] if s])

        # Strict 4-step completion: A chapter is ONLY complete when all 4 parts are finished!
        is_fully_completed = bool(video_done and notes_done and pyq_done and quiz_done)
        chapter.is_completed = is_fully_completed

        # Readiness Index Calculation:
        # Accuracy contributes 65%, 4-step completion bonus contributes 25%, quiz repetition contributes 10%
        completion_bonus = (steps_done / 4.0) * 25.0
        repetition_bonus = min(quiz_count * 5.0, 10.0)
        readiness_index = min(100.0, round((accuracy * 0.65) + completion_bonus + repetition_bonus, 1))

        # Quadrant Categorization
        is_high_weightage = (chapter.weightage_percent >= 15.0) or (chapter.weightage_marks >= 15.0)
        is_high_accuracy = accuracy >= 70.0

        if is_high_weightage and not is_high_accuracy:
            priority_quadrant = "URGENT FOCUS"
            reason = f"High exam weightage ({chapter.weightage_percent}%), currently at {steps_done}/4 steps. Complete video, notes, PYQs and quiz!"
        elif is_high_weightage and is_high_accuracy:
            priority_quadrant = "STRENGTH"
            reason = f"Excellent mastery ({accuracy}% accuracy) in a high-yield topic ({chapter.weightage_percent}% weightage)."
        elif not is_high_weightage and not is_high_accuracy:
            priority_quadrant = "REVIEW LATER"
            reason = f"Lower weightage ({chapter.weightage_percent}%). Focus on high-yield chapters first before revising."
        else:
            priority_quadrant = "MAINTAIN"
            reason = f"Good grasp ({accuracy}% accuracy) on a low-weightage chapter ({chapter.weightage_percent}%)."

        # Save/update cache in ReadinessMetric model
        metric = db.query(models.ReadinessMetric).filter(models.ReadinessMetric.chapter_id == chapter_id).first()
        if not metric:
            metric = models.ReadinessMetric(
                chapter_id=chapter_id,
                accuracy_score=accuracy,
                quiz_count=quiz_count,
                readiness_index=readiness_index,
                priority_level=priority_quadrant
            )
            db.add(metric)
        else:
            metric.accuracy_score = accuracy
            metric.quiz_count = quiz_count
            metric.readiness_index = readiness_index
            metric.priority_level = priority_quadrant
        
        db.commit()

        return {
            "accuracy": accuracy,
            "readiness_index": readiness_index,
            "quiz_count": quiz_count,
            "video_done": video_done,
            "notes_done": notes_done,
            "pyq_done": pyq_done,
            "quiz_done": quiz_done,
            "steps_done": steps_done,
            "total_steps": 4,
            "is_completed": is_fully_completed,
            "priority_quadrant": priority_quadrant,
            "reason": reason
        }

    @staticmethod
    def get_subject_readiness_report(db: Session, subject_id: int) -> Dict[str, Any]:
        """
        Generates the full Strategic Exam Readiness Report across all chapters.
        """
        subject = db.query(models.Subject).filter(models.Subject.id == subject_id).first()
        if not subject:
            return None

        chapters = db.query(models.Chapter).filter(models.Chapter.subject_id == subject_id).order_by(models.Chapter.order).all()
        
        all_topics = []
        urgent_topics = []
        weighted_readiness_sum = 0.0
        total_weightage = sum(ch.weightage_percent for ch in chapters) or 100.0

        for ch in chapters:
            metrics = AnalyticsService.calculate_chapter_metrics(db, ch.id)
            
            topic_data = {
                "chapter_id": ch.id,
                "chapter_name": ch.name,
                "weightage_percent": round(ch.weightage_percent, 1),
                "weightage_marks": round(ch.weightage_marks, 1),
                "accuracy_score": metrics["accuracy"],
                "readiness_index": metrics["readiness_index"],
                "quiz_attempts": metrics["quiz_count"],
                "video_done": metrics.get("video_done", False),
                "notes_done": metrics.get("notes_done", False),
                "pyq_done": metrics.get("pyq_done", False),
                "quiz_done": metrics.get("quiz_done", False),
                "steps_done": metrics.get("steps_done", 0),
                "total_steps": 4,
                "is_completed": ch.is_completed,
                "priority_quadrant": metrics["priority_quadrant"],
                "reason": metrics["reason"]
            }
            all_topics.append(topic_data)

            if metrics["priority_quadrant"] == "URGENT FOCUS":
                urgent_topics.append(topic_data)

            # Weight contribution to total readiness
            fraction = (ch.weightage_percent / total_weightage)
            weighted_readiness_sum += fraction * metrics["readiness_index"]

        overall_readiness_index = round(weighted_readiness_sum, 1)

        # Tactical recommendation
        if len(urgent_topics) > 0:
            top_urgent = urgent_topics[0]["chapter_name"]
            recommendation = f"Immediate action required on '{top_urgent}' ({urgent_topics[0]['weightage_percent']}% weightage). Take a targeted 10-question practice quiz and review the Dual-AI Revision Sheet today."
        elif overall_readiness_index >= 80.0:
            recommendation = "Outstanding exam preparation! All high-yield topics are well secured. Take full-syllabus mock papers to lock in top grades."
        else:
            recommendation = "Steady progress. Continue completing chapters and maintaining quiz scores above 75%."

        completed_count = sum(1 for ch in chapters if ch.is_completed)
        course_completion_pct = round((completed_count / len(chapters)) * 100, 1) if chapters else 0.0

        return {
            "subject_id": subject.id,
            "subject_name": subject.name,
            "total_marks": subject.total_marks,
            "overall_readiness_index": overall_readiness_index,
            "completed_chapters_count": completed_count,
            "course_completion_pct": course_completion_pct,
            "total_chapters_count": len(chapters),
            "urgent_topics": urgent_topics,
            "all_topics": all_topics,
            "recommendation": recommendation
        }


analytics_service = AnalyticsService()
