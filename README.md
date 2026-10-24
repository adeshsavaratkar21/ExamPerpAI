# ExamPrepAI 🚀
### Production-Grade AI Exam Preparation, Syllabus Mastery & Placement Platform

**ExamPrepAI** is a comprehensive, full-stack educational ecosystem engineered for university semester exams and competitive technical placement interviews. It synthesizes static course syllabi, past examination papers (PYQs), and prescribed textbooks with generative AI while providing a complete 466-problem DSA roadmap, live LeetCode profile synchronization, and interactive architectural diagrams for core computer science subjects.

---

## 🌟 Core Architecture & Key Pillars

```text
+-------------------------------------------------------------------------------------------------------------+
|                                              ExamPrepAI PLATFORM                                            |
+-------------------------------------------------------------------------------------------------------------+
| 1. University Exam Engine            | 2. DSA & Placement Mode           | 3. Core CS Technical Hub         |
| - PYQ Extraction (pypdf/pdfplumber)  | - Full Striver A2Z Sheet (466 Qs) | - Interactive Architecture Visual|
| - Textbook & Slide RAG (PDF/PPTX)    | - Direct LeetCode Problem Links   | - CCN, OS, DBMS, OOPs, SQL       |
| - Adaptive 10-Question Practice Quiz | - Live LeetCode Profile Live-Sync | - TCP 3-Way Handshake Simulator  |
| - Dual-AI Revision Notes (Gemini+GPT)| - Dedicated DSA Practice Tracker  | - OSI vs TCP/IP Protocol Stack   |
| - Strategic 4-Quadrant Readiness     | - Easy / Medium / Hard Breakdown  | - Virtual Memory & ACID Pillars  |
+-------------------------------------------------------------------------------------------------------------+
                                       |                                  |
                                       v                                  v
                 FastAPI Backend (Python 3.11+, SQLAlchemy)      Vite React UI (Tailwind CSS, Light Theme)
```

---

## 🎯 Key Feature Modules

### 1. 🎓 University Exam Preparation & RAG Engine
- **PYQ Paper Ingestion & Categorization**:
  - Uploads past university examination PDFs.
  - Automatically parses and categorizes questions by chapter, difficulty (`Easy`, `Medium`, `Hard`), question format (`MCQ`, `Short`, `Long`, `Numerical`), and marks weightage.
- **RAG-Powered Textbook & Slide Retrieval**:
  - Scans uploaded prescribed textbooks (`.pdf`) and lecture slides (`.pptx`).
  - Utilizes keyword-scored document retrieval (`extract_book_context_for_chapter`) to ground AI note generation strictly within the university syllabus.
- **Dual-AI 1-Page Revision Summaries**:
  - **Google Gemini (GenAI SDK)**: Rigorous conceptual foundations, mathematical derivations, professor traps, and exam-grade answers.
  - **OpenAI (GPT-4o / GPT-4o-mini)**: High-retention visual mnemonics, fast formula sheets, side-by-side comparison tables, and 60-second cram sheets.
  - One-click clean printable PDF and Markdown export.
- **Adaptive Diagnostic Quizzes**:
  - 10-question chapter quizzes with instant scoring, timer, and detailed answer explanations.
- **Strategic Readiness Radar**:
  - Real-time calculation of overall exam readiness based on quiz accuracy, chapter completion, and practice frequency.
  - 4-Quadrant focus matrix identifying high-weightage GPA hazards.

---

### 2. ⚡ DSA & Placement Engine (Striver's A2Z Roadmap)
- **Complete 466-Problem DSA Sheet**:
  - Full official 18-step curriculum (466 hand-curated questions: 158 Easy, 247 Medium, 61 Hard).
  - Every single question links directly to its official problem page on LeetCode (`https://leetcode.com/problems/<slug>/`).
  - Categorized with difficulty badges, problem hints, and top hiring company tags (Google, Amazon, Microsoft, Meta).
- **LeetCode Profile Live Sync**:
  - Enter your LeetCode handle to sync real-time problem-solving metrics:
    - Global Ranking
    - Total Problems Solved
    - Difficulty Breakdown (Easy, Medium, Hard)
  - Seamlessly persists locally with offline fallback.
- **Dedicated DSA Practice Tracker Rail**:
  - Replaces academic schedules when focusing on placement prep:
    - Questions Covered Till Date (`/466`)
    - Questions Remainder (Remaining problems to clear the sheet)
    - Real-time progress bars for Easy, Medium, and Hard tiers
    - Topic-by-topic mini checklist across all 18 DSA steps.

---

### 3. 🖥️ Core Computer Science Technical Hub
Designed specifically for technical SDE interviews and core academic mastery, featuring clean light-themed interactive visual simulators:

- **CCN (Computer Networks)**:
  - **TCP 3-Way Handshake & 4-Way FIN Teardown Simulator**: Interactive Client/Server nodes with bidirectional packet tracks, sequence math (`ISN`, `ACK = seq + 1`), and state machines (`LISTEN`, `SYN_SENT`, `SYN_RCVD`, `ESTABLISHED`, `TIME_WAIT`).
  - **OSI 7-Layer vs TCP/IP 4-Layer Architecture**: Clickable ladder inspector revealing Protocol Data Units (PDUs), addressing schemes, hardware layers, and data encapsulation flow.
- **OS (Operating Systems)**:
  - **Process Virtual Memory Architecture**: Interactive 32-bit / 64-bit memory tower showing Stack (grows down ⬇), unmapped virtual gap, Heap (grows up ⬆), BSS, Data, and Text segments.
  - **Deadlock Resource Allocation Graph (RAG)**: Visual circular wait cycle between processes and resources with the 4 mandatory Coffman conditions.
- **DBMS & SQL**:
  - **ACID Transactional Integrity Pillars**: Interactive cards detailing Atomicity (Undo Logs/WAL), Consistency, Isolation (MVCC/Locking), and Durability (Redo Logs).
  - **SQL Joins Interactive Set Theory Engine**: Live SVG Venn diagrams for `INNER`, `LEFT`, `RIGHT`, and `FULL OUTER` joins with dynamic query syntax.
- **OOPs (Object-Oriented Programming)**:
  - Interactive cards for the 4 Foundations: Encapsulation, Abstraction, Inheritance, and Polymorphism.

---

### 4. 🔐 Authentication & Student Profiles
- Secure student login and registration system with username, email, and password.
- Profile settings to track Semester, Target GPA, Exam Dates, and study preferences.
- Clean guest / offline fallback for instant local exploration.

---

## 🛠️ Project Directory Structure

```text
ExamPrep/
├── backend/
│   ├── app/
│   │   ├── core/
│   │   │   └── config.py               # Pydantic Settings, CORS, API keys
│   │   ├── db/
│   │   │   ├── database.py             # SQLAlchemy session factory & SQLite/PostgreSQL engine
│   │   │   └── models.py               # User, Subject, Chapter, PYQ, Question, Quiz, ChapterSummary
│   │   ├── schemas/
│   │   │   └── schemas.py              # Pydantic schemas for request/response validation
│   │   ├── services/
│   │   │   ├── analytics_service.py    # Readiness Index & 4-Quadrant focus matrix
│   │   │   ├── curriculum_knowledge.py # Pre-seeded curricula & interview banks
│   │   │   ├── gemini_service.py       # Google GenAI SDK (PYQ Extraction & Conceptual Notes)
│   │   │   ├── openai_service.py       # OpenAI SDK (Mnemonics, Formulas, Tables)
│   │   │   └── pdf_service.py          # PDF text extraction
│   │   ├── routers/
│   │   │   ├── auth.py                 # User authentication (Login, Register, Profile)
│   │   │   ├── analytics.py            # Readiness radar & weightage metrics
│   │   │   ├── books.py                # Prescribed textbook & slide management
│   │   │   ├── notes.py                # Dual-AI note generation & PDF/MD exports
│   │   │   ├── placement.py            # LeetCode profile sync & DSA tracker
│   │   │   ├── pyq.py                  # PYQ upload and structured question bank
│   │   │   └── quiz.py                 # Practice quiz generation and evaluation
│   │   └── main.py                     # FastAPI entrypoint, router inclusions, CORS
│   ├── uploads/                        # Uploaded textbooks, slides, and exam papers
│   ├── requirements.txt                # Python dependencies
│   └── .env.example                    # Environment configuration template
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── placement/
│   │   │   │   ├── AdvancedTopicVisual.jsx # Light-themed interactive CS architectural diagrams
│   │   │   │   ├── CoreSubjectsTab.jsx     # CCN, OS, DBMS, OOPs, SQL master hub
│   │   │   │   ├── DsaProgressRail.jsx     # Real-time DSA sheet practice tracker sidebar
│   │   │   │   └── StriverSheetTab.jsx     # 466-Problem DSA Sheet with direct LeetCode links
│   │   │   ├── FileUploader.jsx        # Exam paper drag-and-drop uploader
│   │   │   ├── Navbar.jsx              # Brand header & top navigation
│   │   │   ├── QuizCard.jsx            # 10-Question test engine with timer & confetti
│   │   │   ├── ReadinessChart.jsx      # Strategic readiness radar
│   │   │   ├── RightRail.jsx           # Semester exam countdown & daily schedule
│   │   │   ├── Sidebar.jsx             # Left navigation with active pill styling
│   │   │   ├── SidebarTodoList.jsx     # Daily study task checklist
│   │   │   └── TopHeader.jsx           # Profile modal trigger and status indicators
│   │   ├── data/
│   │   │   ├── coreSubjectsData.js     # Comprehensive CS interview topics & Q&As
│   │   │   └── striverSheetData.js     # Complete 466-question Striver A2Z dataset
│   │   ├── pages/
│   │   │   ├── CoursesPage.jsx         # Subject syllabus explorer & module view
│   │   │   ├── Dashboard.jsx           # Overview, urgent GPA alerts & quick actions
│   │   │   ├── LoginPage.jsx           # Student login and registration
│   │   │   ├── NotesPage.jsx           # Dual-AI summary & revision notes hub
│   │   │   ├── PlacementPage.jsx       # DSA Sheet & Core Subjects hub
│   │   │   ├── QuizPage.jsx            # Chapter quiz launcher
│   │   │   ├── ReadinessTrackerPage.jsx# Full readiness analytics
│   │   │   └── SyllabusPage.jsx        # Syllabus weightage editor
│   │   ├── services/
│   │   │   └── api.js                  # Axios client for all backend endpoints
│   │   ├── App.jsx                     # Root application container & conditional rails
│   │   ├── main.jsx                    # Vite React entrypoint
│   │   └── index.css                   # Custom styling, fonts, and print directives
│   ├── package.json                    # Frontend dependencies
│   └── vite.config.js                  # Vite configuration
├── .gitignore                          # Clean repository hygiene (.env, node_modules, venv, db)
└── README.md                           # Project documentation
```

---

## ⚡ Quick Start Guide

### Prerequisites
- **Python**: 3.11+
- **Node.js**: v18+ or v22+
- **Package Managers**: `pip` and `npm`

---

### Step 1: Run the Backend (FastAPI)

1. Open a terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Activate your Python virtual environment:
   - **Windows (PowerShell)**:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - **macOS / Linux**:
     ```bash
     source venv/bin/activate
     ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. *(Optional)* Set API keys in `backend/.env` (or configure via the frontend UI):
   ```env
   GEMINI_API_KEY="your-google-ai-studio-key"
   OPENAI_API_KEY="your-openai-api-key"
   ```
   > **Note:** The platform includes comprehensive academic fallback generators, ensuring that all 466 DSA questions, quizzes, and diagrams work out-of-the-box even without external API keys.
5. Start the FastAPI server:
   ```bash
   uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
   ```
6. Backend Health Check: [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)  
   Interactive Swagger API Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### Step 2: Run the Frontend (Vite + React)

1. Open a second terminal and navigate to `client/`:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to:
   ```text
   http://localhost:5173/
   ```

---

## 💡 Technologies & Computer Science Principles Used

- **Artificial Intelligence**:
  - **LLMs**: Google Gemini 2.5/1.5 Flash (`google-genai`) & OpenAI GPT-4o (`openai`).
  - **RAG (Retrieval-Augmented Generation)**: In-memory keyword relevance scoring over university textbook PDFs and PPT lecture slides.
- **Frontend Architecture**:
  - React 19, Vite, Tailwind CSS, Lucide Icons, Recharts, KaTeX LaTeX formula rendering.
  - Custom Event-Driven Architecture (`examprep_dsa_solved_changed`) and `localStorage` synchronization.
- **Backend Architecture**:
  - FastAPI (ASGI non-blocking async architecture), Uvicorn.
  - SQLAlchemy 2.0 ORM with SQLite / PostgreSQL support.
  - Pydantic v2 data validation and schemas.
  - JWT Stateless Authentication & bcrypt password hashing.
- **Algorithms & Systems**:
  - Full Striver A2Z 18-step DSA curriculum (Binary Search, Graphs, Trees, DP, Backtracking).
  - Complete core CS curriculum (Operating Systems, Networking, DBMS, OOPs, SQL).

---

## 🔗 Repository
- **GitHub**: [https://github.com/adeshsavaratkar21/ExamPerpAI](https://github.com/adeshsavaratkar21/ExamPerpAI)

---

## 📄 License
MIT License. Built for university students and engineers preparing for exams and technical placements.
