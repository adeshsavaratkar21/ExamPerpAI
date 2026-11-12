# ExamPrepAi 🚀

[![Live Website](https://img.shields.io/badge/Live%20Website-examperpai.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://examperpai.vercel.app)
[![Developer](https://img.shields.io/badge/Author-Adesh%20Savaratkar-FCE34D?style=for-the-badge&logo=github&logoColor=black)](https://github.com/adeshsavaratkar21)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React 19](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> **ExamPrepAi** is a full-stack, production-grade educational platform engineered for university semester exam mastery and technical campus placement preparation. It combines static course syllabi, past examination papers (PYQs), and prescribed textbooks with generative AI, while providing a complete 466-problem DSA roadmap, live LeetCode profile synchronization, and interactive architectural diagrams for core computer science subjects.

🌐 **Live Production App:** [https://examperpai.vercel.app](https://examperpai.vercel.app)  
👤 **Developer:** [Adesh Savaratkar (@adeshsavaratkar21)](https://github.com/adeshsavaratkar21)

---

## 🌟 Architecture & System Blueprint

```text
+-------------------------------------------------------------------------------------------------------------+
|                                              ExamPrepAi ECOSYSTEM                                           |
+-------------------------------------------------------------------------------------------------------------+
| 1. University Exam Engine            | 2. DSA & Placement Mode           | 3. Core CS Technical Hub         |
| - Custom PYQ PDF Ingestion & Storage | - Complete 4,095 LeetCode Library | - Interactive Architecture Visual|
| - Gemini-Powered Question Extractor  | - Striver A2Z DSA Sheet (466 Qs)  | - CCN, OS, DBMS, OOPs, SQL       |
| - Adaptive 10-Question Chapter Quiz  | - Direct LeetCode Problem Links   | - TCP 3-Way Handshake Simulator  |
| - Handwritten Revision Notes (KaTeX) | - Live LeetCode Profile Live-Sync | - OSI vs TCP/IP Protocol Stack   |
| - Cross-Session Progress Persistence | - Easy / Medium / Hard Breakdown  | - Virtual Memory & ACID Pillars  |
| - Audit & Login Activity Tracking    | - Dedicated DSA Progress Sidebar  | - Live SQL Joins Venn Diagram    |
+-------------------------------------------------------------------------------------------------------------+
                                       |                                  |
                                       v                                  v
                 FastAPI Backend (Python 3.12, SQLAlchemy)      Vite React 19 UI (Tailwind CSS, KaTeX)
```

---

## 🎯 Key Feature Modules

### 1. 🎓 University Exam Preparation & Revision Sheets
- **Durable PYQ Repository & Upload Engine**:
  - Starts 100% clean and null by default so students upload their authentic university exam papers.
  - Automatically parses and categorizes questions with AI by Subject, Unit, Difficulty (`Easy`, `Medium`, `Hard`), and Marks.
  - Features in-app **PDF Preview Modal**, **Open in New Tab**, and **Direct Download** with base64 backup for serverless cold-start resilience.
- **Handwritten Revision Sheets with KaTeX Math Rendering**:
  - Generates authentic ruled notebook paper revision sheets with handwritten typography (`Kalam`, `Caveat`).
  - Equations and mathematical formulas (e.g. Lamport clocks, RSA modular arithmetic, state transitions) render in typography rather than raw LaTeX strings.
  - Instant print to PDF or export to Markdown.
- **Diagnostic Chapter Quizzes**:
  - 10-question chapter quizzes with instant scoring, timer, and detailed explanations.
- **Strategic Readiness Radar**:
  - Real-time calculation of overall exam readiness based on quiz accuracy, chapter completion, and practice frequency.

---

### 2. ⚡ DSA & Campus Placement Mode (Striver's A2Z Roadmap)
- **Complete 466-Problem DSA Sheet**:
  - Full official 18-step curriculum (158 Easy, 247 Medium, 61 Hard).
  - Every single question links directly to its official problem page on LeetCode (`https://leetcode.com/problems/<slug>/`).
  - Categorized with difficulty badges, hints, and top hiring company tags (Google, Amazon, Microsoft, Meta).
- **LeetCode Profile Live Sync**:
  - Enter your LeetCode handle to sync real-time problem-solving metrics:
    - Global Ranking
    - Total Problems Solved
    - Difficulty Breakdown (Easy, Medium, Hard)
- **Dedicated Placement Progress Rail**:
  - Replaces academic schedule with a dedicated DSA tracker:
    - Problems Covered Till Date (`/466`)
    - Problems Remainder
    - Real-time tier progress bars and topic mini-checklists.

---

### 3. 🖥️ Core Computer Science Technical Hub
Designed specifically for technical SDE interviews and core academic mastery, featuring clean interactive visual simulators:

- **CCN (Computer Networks)**:
  - **TCP 3-Way Handshake & 4-Way FIN Teardown Simulator**: Interactive Client/Server nodes with bidirectional packet tracks, sequence math (`ISN`, `ACK = seq + 1`), and state machines (`LISTEN`, `SYN_SENT`, `SYN_RCVD`, `ESTABLISHED`, `TIME_WAIT`).
  - **OSI 7-Layer vs TCP/IP 4-Layer Architecture**: Clickable ladder inspector revealing Protocol Data Units (PDUs), addressing schemes, hardware layers, and data encapsulation flow.
- **OS (Operating Systems)**:
  - **Process Virtual Memory Architecture**: Interactive memory tower showing Stack (grows down ⬇), unmapped virtual gap, Heap (grows up ⬆), BSS, Data, and Text segments.
  - **Deadlock Resource Allocation Graph (RAG)**: Visual circular wait cycle between processes and resources with the 4 mandatory Coffman conditions.
- **DBMS & SQL**:
  - **ACID Transactional Integrity Pillars**: Interactive cards detailing Atomicity (Undo Logs/WAL), Consistency, Isolation (MVCC/Locking), and Durability (Redo Logs).
  - **SQL Joins Interactive Set Theory Engine**: Live SVG Venn diagrams for `INNER`, `LEFT`, `RIGHT`, and `FULL OUTER` joins with dynamic query syntax.
- **OOPs (Object-Oriented Programming)**:
  - Interactive cards for the 4 Foundations: Encapsulation, Abstraction, Inheritance, and Polymorphism.

---

### 4. 🔐 Security, Audit Trail & Cross-Session Persistence
- **User Authentication**:
  - Student login and registration with bcrypt password hashing and token generation.
- **Real-Time Login History & Audit Trail**:
  - Tracks authenticated sessions, client IP addresses (IPv4/IPv6), devices, browsers, and exact UTC timestamps.
  - Accessible via profile modal tab or JSON endpoint: `/api/auth/login-history`.
- **Zero Data Loss Persistence**:
  - Study To-Dos, Academic Exam Schedules, Completed Units, and Student Profiles are synced with both the database (`User.progress_data`) and local storage.
  - When a user logs out and logs back in on any device, their entire state is automatically restored.

---

## 🛠️ Tech Stack & Libraries

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Lucide React, KaTeX, Rehype-KaTeX, Remark-Math, Canvas-Confetti |
| **Backend** | FastAPI (Python 3.12), Uvicorn, SQLAlchemy 2.0, Pydantic v2 |
| **Database** | SQLite (with auto-schema migrations) & PostgreSQL support |
| **AI / LLMs** | Google Gemini 2.5/1.5 Flash (`google-genai`), OpenAI GPT-4o |
| **Hosting & CI/CD** | Vercel Multi-Service Deployment (`vercel.json`) |

---

## ⚡ Quick Start Guide

### Prerequisites
- **Python**: 3.11 or 3.12
- **Node.js**: v18+ or v22+
- **Git**

---

### Step 1: Run Backend (FastAPI)

```bash
cd backend
python -m venv venv

# Windows
.\venv\Scripts\Activate.ps1
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- Health Check: [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)
- Swagger Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### Step 2: Run Frontend (React + Vite)

```bash
cd client
npm install
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 👨‍💻 Author & Developer Profile

**Adesh Savaratkar**  
*Computer Engineering Student • Sardar Patel Institute of Technology (SPIT), Mumbai*

- **GitHub:** [@adeshsavaratkar21](https://github.com/adeshsavaratkar21)
- **Repository:** [https://github.com/adeshsavaratkar21/ExamPerpAI](https://github.com/adeshsavaratkar21/ExamPerpAI)
- **Live Website:** [https://examperpai.vercel.app](https://examperpai.vercel.app)
- **Email:** `adesh.savaratkar24@spit.ac.in`

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
