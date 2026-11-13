import os
import json
import re
from typing import List, Dict, Any, Optional

# ==============================================================================
# OFFICIAL COMPLETE SYLLABUS PLAYLISTS (EXHAUSTIVE FULL-SEMESTER COURSES)
# ==============================================================================
SUBJECT_FULL_PLAYLISTS: Dict[str, List[Dict[str, Any]]] = {
    "DC": [
        {
            "id": "dc_pl_edu4u",
            "title": "Distributed Systems — Complete University Course (68 Lectures)",
            "channel": "Education 4u",
            "instructor": "Bhanu Priya",
            "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
            "total_videos": 68,
            "embed_url": "https://www.youtube.com/embed/videoseries?list=PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
            "playlist_url": "https://www.youtube.com/playlist?list=PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
            "description": "Comprehensive semester syllabus covering Distributed System Models, RPC/RMI, Message Passing, Clock Synchronization (Lamport & Vector), Election Algorithms (Bully & Ring), Mutual Exclusion, Consistency, GFS & HDFS.",
            "is_primary": True
        },
        {
            "id": "dc_pl_5min",
            "title": "Distributed Systems in Hindi — Full Playlist (42 Lectures)",
            "channel": "5 Minutes Engineering",
            "instructor": "Shridhar Pawar",
            "playlist_id": "PLYwpaL_SFmcCyQH0n9GHfwviu6KeJ46BV",
            "total_videos": 42,
            "embed_url": "https://www.youtube.com/embed/videoseries?list=PLYwpaL_SFmcCyQH0n9GHfwviu6KeJ46BV",
            "playlist_url": "https://www.youtube.com/playlist?list=PLYwpaL_SFmcCyQH0n9GHfwviu6KeJ46BV",
            "description": "Rapid conceptual review covering every core distributed computing topic in 5-10 minute digestible lectures.",
            "is_primary": False
        },
        {
            "id": "dc_pl_gs",
            "title": "System Design & Distributed Architectures Series",
            "channel": "Gate Smashers",
            "instructor": "Varun Singla",
            "playlist_id": "PLxCzCOWd7aiHanm1nA5_fMwbx5dCNFkDX",
            "total_videos": 35,
            "embed_url": "https://www.youtube.com/embed/videoseries?list=PLxCzCOWd7aiHanm1nA5_fMwbx5dCNFkDX",
            "playlist_url": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHanm1nA5_fMwbx5dCNFkDX",
            "description": "Distributed scaling, CAP theorem, replication, sharding, consensus protocols, and fault-tolerant storage.",
            "is_primary": False
        }
    ],
    "SE": [
        {
            "id": "se_pl_gs",
            "title": "Software Engineering — Complete Course Playlist (55 Lectures)",
            "channel": "Gate Smashers",
            "instructor": "Varun Singla",
            "playlist_id": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
            "total_videos": 55,
            "embed_url": "https://www.youtube.com/embed/videoseries?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
            "playlist_url": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
            "description": "Exhaustive coverage of SDLC Models (Waterfall, Spiral, V-Model, Agile SCRUM), Requirements SRS, COCOMO estimation, Coupling & Cohesion, Black-box/White-box Testing, Cyclomatic Complexity, and CMMI.",
            "is_primary": True
        }
    ],
    "TOC": [
        {
            "id": "toc_pl_gs",
            "title": "Theory of Computation (TOC) — Complete Course (90 Lectures)",
            "channel": "Gate Smashers",
            "instructor": "Varun Singla",
            "playlist_id": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
            "total_videos": 90,
            "embed_url": "https://www.youtube.com/embed/videoseries?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
            "playlist_url": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
            "description": "Full syllabus from DFA and NFA construction, Regular Expressions, Arden's Theorem, Pumping Lemma, CFG and Normal Forms (CNF/GNF), Pushdown Automata (PDA), Turing Machines, Halting Problem, to NP-Completeness.",
            "is_primary": True
        },
        {
            "id": "toc_pl_neso",
            "title": "Theory of Computation — Neso Academy Complete Playlist (85 Lectures)",
            "channel": "Neso Academy",
            "instructor": "Neso Academy Faculty",
            "playlist_id": "PLBlnK6fEyqRgp46KUv4ZY64ZXmpKBgqEv",
            "total_videos": 85,
            "embed_url": "https://www.youtube.com/embed/videoseries?list=PLBlnK6fEyqRgp46KUv4ZY64ZXmpKBgqEv",
            "playlist_url": "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgp46KUv4ZY64ZXmpKBgqEv",
            "description": "Crystal-clear whiteboard step-by-step explanations for automata state machines and formal languages.",
            "is_primary": False
        }
    ],
    "AISC": [
        {
            "id": "aisc_pl_gs",
            "title": "Artificial Intelligence — Complete Course Playlist (70 Lectures)",
            "channel": "Gate Smashers",
            "instructor": "Varun Singla",
            "playlist_id": "PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI",
            "total_videos": 70,
            "embed_url": "https://www.youtube.com/embed/videoseries?list=PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI",
            "playlist_url": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI",
            "description": "Covers State Space Search, BFS/DFS, Heuristic Search (A*, Greedy Best First), Propositional & Predicate Logic, Resolution, Fuzzy Logic, and Knowledge Representation.",
            "is_primary": True
        },
        {
            "id": "aisc_pl_dl",
            "title": "Deep Learning & Neural Networks Complete Course (45 Lectures)",
            "channel": "Gate Smashers",
            "instructor": "Varun Singla",
            "playlist_id": "PLxCzCOWd7aiHQ9Qyo70JCTkTxczPnVC6s",
            "total_videos": 45,
            "embed_url": "https://www.youtube.com/embed/videoseries?list=PLxCzCOWd7aiHQ9Qyo70JCTkTxczPnVC6s",
            "playlist_url": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiHQ9Qyo70JCTkTxczPnVC6s",
            "description": "Single & Multi-layer Perceptron, Backpropagation derivations, activation functions, CNN, and Optimization Algorithms.",
            "is_primary": False
        }
    ],
    "CNS": [
        {
            "id": "cns_pl_neso",
            "title": "Cryptography & Network Security — Full Course (80 Lectures)",
            "channel": "Neso Academy",
            "instructor": "Neso Academy Faculty",
            "playlist_id": "PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII",
            "total_videos": 80,
            "embed_url": "https://www.youtube.com/embed/videoseries?list=PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII",
            "playlist_url": "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII",
            "description": "Complete syllabus covering Classical Ciphers, Number Theory, DES, AES, RSA, Diffie-Hellman Key Exchange, SHA-512, Digital Signatures, SSL/TLS Handshake, IPsec, and Firewalls.",
            "is_primary": True
        },
        {
            "id": "cns_pl_gs",
            "title": "Computer Networks & Security Complete Course (75 Lectures)",
            "channel": "Gate Smashers",
            "instructor": "Varun Singla",
            "playlist_id": "PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_",
            "total_videos": 75,
            "embed_url": "https://www.youtube.com/embed/videoseries?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_",
            "playlist_url": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiGFBD2-2joCpWOLUrDLvVV_",
            "description": "Network Layer Security, Transport Layer Security, Cryptographic Protocols, and Network Attacks.",
            "is_primary": False
        }
    ],
    "MDM": [
        {
            "id": "mdm_pl_ml",
            "title": "Machine Learning Complete Course Playlist (65 Lectures)",
            "channel": "Gate Smashers",
            "instructor": "Varun Singla",
            "playlist_id": "PLxCzCOWd7aiEXg5BV10k9THtjnS48yI-T",
            "total_videos": 65,
            "embed_url": "https://www.youtube.com/embed/videoseries?list=PLxCzCOWd7aiEXg5BV10k9THtjnS48yI-T",
            "playlist_url": "https://www.youtube.com/playlist?list=PLxCzCOWd7aiEXg5BV10k9THtjnS48yI-T",
            "description": "Supervised, Unsupervised learning, Linear/Logistic Regression, Decision Trees, SVM, Neural Networks, Clustering, and Evaluation Metrics.",
            "is_primary": True
        }
    ]
}


# ==============================================================================
# DETAILED TOPIC-BY-TOPIC LECTURES MAPPED PER UNIT
# ==============================================================================
UNIT_TOPIC_LECTURES: Dict[str, Dict[int, List[Dict[str, Any]]]] = {
    "DC": {
        1: [
            {
                "id": "dc_u1_1",
                "title": "Lec 1: Introduction to Distributed Systems & Characteristics",
                "channel": "Education 4u",
                "duration": "14:20",
                "matched_topics": ["Definition of Distributed Systems", "Goals & Challenges", "Transparency Models"],
                "summary": "Explains resource sharing, openness, concurrency, scalability, and fault tolerance principles in distributed computing.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Education 4u Distributed Systems introduction characteristics"
            },
            {
                "id": "dc_u1_2",
                "title": "Lec 2: Hardware & Software Concepts in Distributed Systems",
                "channel": "Education 4u",
                "duration": "12:45",
                "matched_topics": ["Hardware Concepts (Multiprocessors vs Multicomputers)", "Software Concepts (DOS, NOS, Middleware)", "Client-Server Model"],
                "summary": "Detailed comparison of Distributed Operating Systems (DOS), Network Operating Systems (NOS), and Middleware architectures.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Education 4u Distributed Systems hardware software concepts"
            },
            {
                "id": "dc_u1_3",
                "title": "Lec 3: Remote Procedure Call (RPC) & Remote Method Invocation (RMI)",
                "channel": "Gate Smashers",
                "duration": "15:30",
                "matched_topics": ["RPC Architecture", "Client Stubs & Server Stubs", "Marshalling & Unmarshalling", "RMI Lifecycle"],
                "summary": "Step-by-step walkthrough of RPC and RMI execution steps, parameter passing, and exception handling for university exams.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Gate Smashers RPC vs RMI in Distributed Systems"
            }
        ],
        2: [
            {
                "id": "dc_u2_1",
                "title": "Lec 4: Message-Oriented Communication & Primitives",
                "channel": "Education 4u",
                "duration": "16:10",
                "matched_topics": ["Message-Passing Systems", "Transient vs Persistent Communication", "Synchronous vs Asynchronous Primitives"],
                "summary": "Desirable features of a good message-passing system, buffer management, and non-blocking IPC primitives.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Education 4u Message oriented communication distributed systems"
            },
            {
                "id": "dc_u2_2",
                "title": "Lec 5: Socket Programming Primitives & IPC Architecture",
                "channel": "Jenny's Lectures CS IT",
                "duration": "15:40",
                "matched_topics": ["Socket IPC Primitives (socket, bind, listen, accept)", "Client-Server Handshake", "Group Communication"],
                "summary": "Practical examination breakdown of TCP and UDP socket operations and multicasting.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Jennys Lectures Socket Programming client server"
            },
            {
                "id": "dc_u2_3",
                "title": "Lec 6: Group Communication & Reliable Multicast Protocols",
                "channel": "Gate Smashers",
                "duration": "13:20",
                "matched_topics": ["Group Communication Semantics", "Atomic Multicast", "Ordered Delivery (FIFO, Causal, Total)"],
                "summary": "Covers one-to-many communication, group addressing, and message delivery guarantees in distributed clusters.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Gate Smashers Group Communication Distributed Systems"
            }
        ],
        3: [
            {
                "id": "dc_u3_1",
                "title": "Lec 7: Lamport's Logical Clocks & Conditions with Solved Numerical",
                "channel": "Gate Smashers",
                "duration": "18:25",
                "matched_topics": ["Happens-Before Relation (->)", "Lamport's Logical Clock Rules", "Event Timestamping Numerical"],
                "summary": "Master the Lamport clock tick conditions and message-event tracing for guaranteed full marks on university numericals.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Gate Smashers Lamports Logical Clock numerical"
            },
            {
                "id": "dc_u3_2",
                "title": "Lec 8: Vector Clocks & Vector Timestamps Solved Example",
                "channel": "Gate Smashers",
                "duration": "14:12",
                "matched_topics": ["Vector Clocks", "Causal Event Ordering", "Concurrency Detection"],
                "summary": "Shows step-by-step vector timestamp updates across 3 communicating processes and how to identify concurrent events.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Gate Smashers Vector Clocks Distributed Systems"
            },
            {
                "id": "dc_u3_3",
                "title": "Lec 9: Bully Election Algorithm & Ring Algorithm",
                "channel": "Abdul Bari",
                "duration": "17:50",
                "matched_topics": ["Bully Election Algorithm", "Ring Algorithm", "Message Complexity Best/Worst Case"],
                "summary": "Definitive breakdown of election algorithms with message complexity derivations in best-case and worst-case scenarios.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Abdul Bari Bully Algorithm and Ring Algorithm"
            },
            {
                "id": "dc_u3_4",
                "title": "Lec 10: Distributed Mutual Exclusion Algorithms",
                "channel": "Education 4u",
                "duration": "16:30",
                "matched_topics": ["Centralized Mutual Exclusion", "Ricart-Agrawala Algorithm", "Maekawa's Voting Protocol"],
                "summary": "Compares permission-based vs token-based distributed mutual exclusion protocols and their message overhead.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Education 4u Distributed Mutual Exclusion Ricart Agrawala"
            }
        ],
        4: [
            {
                "id": "dc_u4_1",
                "title": "Lec 11: Data-Centric Consistency Models (Strict, Sequential, Causal)",
                "channel": "Gate Smashers",
                "duration": "15:30",
                "matched_topics": ["Strict Consistency", "Sequential Consistency", "Causal Consistency", "FIFO Consistency"],
                "summary": "In-depth comparison of data-centric models and memory ordering contracts expected in university exams.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Gate Smashers Data Centric Consistency Models"
            },
            {
                "id": "dc_u4_2",
                "title": "Lec 12: Client-Centric Consistency Models & Quorum Protocols",
                "channel": "Education 4u",
                "duration": "14:15",
                "matched_topics": ["Monotonic Reads", "Monotonic Writes", "Read-Your-Writes", "Gifford's Quorum Consensus (Nr + Nw > N)"],
                "summary": "Formulates quorum voting equations for replication and read/write guarantees in decentralized storage.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Education 4u Quorum based protocols consistency"
            }
        ],
        5: [
            {
                "id": "dc_u5_1",
                "title": "Lec 13: Google File System (GFS) & HDFS Distributed Architecture",
                "channel": "Gate Smashers",
                "duration": "19:10",
                "matched_topics": ["Google File System (GFS)", "Hadoop HDFS Architecture", "Master-Chunkserver Fault Tolerance"],
                "summary": "Deep dive into GFS chunking, heartbeats, secondary masters, and 3-way replication fault tolerance.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Gate Smashers Google File System GFS HDFS"
            },
            {
                "id": "dc_u5_2",
                "title": "Lec 14: Network File System (NFS) & Paxos Consensus",
                "channel": "Computerphile",
                "duration": "13:20",
                "matched_topics": ["NFS Architecture & VFS", "Distributed Consensus", "Paxos Algorithm"],
                "summary": "Clear, intuitive breakdown of distributed consensus in asynchronous networks with fail-stop processors.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Computerphile Paxos Consensus Algorithm"
            }
        ],
        6: [
            {
                "id": "dc_u6_1",
                "title": "Lec 15: Cloud Computing vs Edge Computing vs Fog Computing",
                "channel": "Gate Smashers",
                "duration": "13:45",
                "matched_topics": ["Edge & Fog Computing", "IoT Workloads", "Open MPI & HPC"],
                "summary": "Contrasts latency, bandwidth, and decentralized compute topologies across Cloud, Edge, and Fog architectures.",
                "playlist_id": "PLrjkTql3jnm9FEOXHA_qjR-TMODlaIk-W",
                "search_query": "Gate Smashers Cloud vs Edge vs Fog Computing"
            }
        ]
    },
    "SE": {
        1: [
            {
                "id": "se_u1_1",
                "title": "Lec 1: Software Development Life Cycle (SDLC) & Waterfall Model",
                "channel": "Gate Smashers",
                "duration": "16:20",
                "matched_topics": ["Nature of Software", "SDLC Phases", "Classical Waterfall vs Iterative Waterfall"],
                "summary": "Comprehensive overview of SDLC phases, documentation deliverables, and Waterfall advantages/disadvantages.",
                "playlist_id": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
                "search_query": "Gate Smashers SDLC Waterfall Model"
            },
            {
                "id": "se_u1_2",
                "title": "Lec 2: Evolutionary Process Models: Spiral Model, Prototyping & V-Model",
                "channel": "Gate Smashers",
                "duration": "15:40",
                "matched_topics": ["Spiral Model Risk Analysis", "Prototyping Model", "V-Model Verification & Validation"],
                "summary": "Master the 4 quadrants of the Boehm Spiral model and dual verification/validation hierarchy of V-Model.",
                "playlist_id": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
                "search_query": "Gate Smashers Spiral Model V Model"
            },
            {
                "id": "se_u1_3",
                "title": "Lec 3: Agile Software Engineering & Scrum Framework",
                "channel": "Jenny's Lectures CS IT",
                "duration": "16:15",
                "matched_topics": ["Agile Manifesto & Principles", "Scrum Roles (Product Owner, Scrum Master)", "Sprints & Ceremonies", "Extreme Programming (XP)"],
                "summary": "Key exam concepts contrasting traditional heavyweight plan-driven SDLC with modern iterative Agile frameworks.",
                "playlist_id": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
                "search_query": "Jennys Lectures Agile Model Scrum framework"
            }
        ],
        2: [
            {
                "id": "se_u2_1",
                "title": "Lec 4: Software Requirements Specification (SRS) & Engineering",
                "channel": "Gate Smashers",
                "duration": "14:50",
                "matched_topics": ["Requirement Elicitation", "Functional vs Non-Functional Requirements", "IEEE Standard SRS Document"],
                "summary": "Covers requirement elicitation techniques, traceability matrix, and IEEE 830 standard format.",
                "playlist_id": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
                "search_query": "Gate Smashers SRS Software Requirement Specification"
            },
            {
                "id": "se_u2_2",
                "title": "Lec 5: COCOMO Model with Solved Numerical Problems",
                "channel": "Gate Smashers",
                "duration": "17:15",
                "matched_topics": ["Basic COCOMO", "Intermediate COCOMO", "Organic, Semi-Detached, Embedded", "Effort & Duration Formulas"],
                "summary": "Detailed numerical derivation calculating Person-Months effort, development time, and staffing requirements.",
                "playlist_id": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
                "search_query": "Gate Smashers COCOMO Model numerical problems"
            }
        ],
        3: [
            {
                "id": "se_u3_1",
                "title": "Lec 6: Software Design Principles: Coupling and Cohesion",
                "channel": "Gate Smashers",
                "duration": "14:10",
                "matched_topics": ["7 Types of Cohesion", "5 Types of Coupling", "High Cohesion Low Coupling Principle"],
                "summary": "Crucial unit for 10-mark theory questions detailing Functional/Sequential/Communicational cohesion and Data/Control coupling.",
                "playlist_id": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
                "search_query": "Gate Smashers Coupling and Cohesion in Software Engineering"
            },
            {
                "id": "se_u3_2",
                "title": "Lec 7: Architectural Design Styles & SOLID Principles",
                "channel": "freeCodeCamp.org",
                "duration": "21:30",
                "matched_topics": ["SOLID Principles", "Layered Architecture", "MVC Architecture", "Microservices Design"],
                "summary": "Industry-standard architectural design principles with practical object-oriented illustrations.",
                "playlist_id": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
                "search_query": "freeCodeCamp SOLID principles software architecture"
            }
        ],
        4: [
            {
                "id": "se_u4_1",
                "title": "Lec 8: Black-Box vs White-Box Testing Strategies",
                "channel": "Gate Smashers",
                "duration": "16:05",
                "matched_topics": ["Equivalence Class Partitioning (ECP)", "Boundary Value Analysis (BVA)", "Basis Path Testing"],
                "summary": "Master test case design using Boundary Value Analysis and Equivalence Class Partitioning for exam scenarios.",
                "playlist_id": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
                "search_query": "Gate Smashers Black Box White Box Testing BVA"
            },
            {
                "id": "se_u4_2",
                "title": "Lec 9: Cyclomatic Complexity Calculation with Flow Graphs",
                "channel": "Gate Smashers",
                "duration": "13:40",
                "matched_topics": ["Control Flow Graph (CFG)", "McCabe's Cyclomatic Complexity Formula V(G) = E - N + 2P", "Independent Paths"],
                "summary": "Numerical problem-solving using edges, nodes, predicate regions, and independent test paths.",
                "playlist_id": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
                "search_query": "Gate Smashers Cyclomatic Complexity Flow Graph numerical"
            }
        ],
        5: [
            {
                "id": "se_u5_1",
                "title": "Lec 10: Software Quality Assurance & CMMI 5 Levels",
                "channel": "Jenny's Lectures CS IT",
                "duration": "15:20",
                "matched_topics": ["CMMI 5 Maturity Levels", "ISO 9001 Standards", "Six Sigma Quality Metrics"],
                "summary": "Explains Initial, Managed, Defined, Quantitatively Managed, and Optimizing maturity levels of CMMI.",
                "playlist_id": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
                "search_query": "Jennys Lectures CMMI Levels Software Quality"
            }
        ],
        6: [
            {
                "id": "se_u6_1",
                "title": "Lec 11: DevOps Lifecycle & Automated CI/CD Pipelines",
                "channel": "TechWorld with Nana",
                "duration": "19:40",
                "matched_topics": ["DevOps Culture", "Continuous Integration / Continuous Delivery", "Docker & Kubernetes Deployment"],
                "summary": "Modern software delivery lifecycle, pipeline stages, automated testing, and GitOps workflows.",
                "playlist_id": "PLxCzCOWd7aiEed7SKZBnC6ypFDWYLRvB2",
                "search_query": "TechWorld with Nana DevOps CI CD pipeline explained"
            }
        ]
    },
    "TOC": {
        1: [
            {
                "id": "toc_u1_1",
                "title": "Lec 1: Theory of Computation & Automata Fundamentals",
                "channel": "Gate Smashers",
                "duration": "19:15",
                "matched_topics": ["Alphabets, Strings & Languages", "Deterministic Finite Automata (DFA)", "Formal 5-tuple Definition"],
                "summary": "Foundational lecture defining states, inputs, transition functions delta, initial and final states.",
                "playlist_id": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
                "search_query": "Gate Smashers Theory of Computation introduction DFA"
            },
            {
                "id": "toc_u1_2",
                "title": "Lec 2: DFA Construction Problems & Minimal DFA",
                "channel": "Gate Smashers",
                "duration": "16:45",
                "matched_topics": ["DFA for Substrings", "DFA for Divisibility (mod)", "Trap States & Minimization"],
                "summary": "Crucial practice constructing DFAs for strings starting/ending with specific characters and modulo divisibility.",
                "playlist_id": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
                "search_query": "Gate Smashers DFA construction problems"
            },
            {
                "id": "toc_u1_3",
                "title": "Lec 3: NFA to DFA Conversion (Subset Construction Method)",
                "channel": "Gate Smashers",
                "duration": "17:30",
                "matched_topics": ["NFA 5-tuple Definition", "Subset Construction Algorithm", "Epsilon-NFA to DFA"],
                "summary": "Detailed trace of power set state transitions and dead state handling during subset construction.",
                "playlist_id": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
                "search_query": "Gate Smashers NFA to DFA conversion subset construction"
            }
        ],
        2: [
            {
                "id": "toc_u2_1",
                "title": "Lec 4: Regular Expressions and Arden's Theorem",
                "channel": "Gate Smashers",
                "duration": "15:10",
                "matched_topics": ["Regular Expressions Identities", "Arden's Theorem Proof", "DFA to Regular Expression"],
                "summary": "How to convert finite state machines to regular expressions using Arden's theorem R = Q + RP.",
                "playlist_id": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
                "search_query": "Gate Smashers Ardens Theorem Regular Expressions"
            },
            {
                "id": "toc_u2_2",
                "title": "Lec 5: Pumping Lemma for Regular Languages with Solved Proofs",
                "channel": "Gate Smashers",
                "duration": "18:00",
                "matched_topics": ["Pumping Lemma Principle", "Proof by Contradiction", "Non-Regular Proofs (0^n 1^n)"],
                "summary": "Foolproof 4-step technique to prove that languages like a^n b^n or ww are not regular using the Pumping Lemma.",
                "playlist_id": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
                "search_query": "Gate Smashers Pumping Lemma for Regular Languages"
            }
        ],
        3: [
            {
                "id": "toc_u3_1",
                "title": "Lec 6: Context-Free Grammars (CFG) & Derivation Trees",
                "channel": "Gate Smashers",
                "duration": "18:40",
                "matched_topics": ["CFG 4-tuple Definition", "Leftmost & Rightmost Derivations", "Ambiguity in Grammars"],
                "summary": "Generating parse trees, identifying grammar ambiguity, and designing grammars for palindromes.",
                "playlist_id": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
                "search_query": "Gate Smashers Context Free Grammar CFG Ambiguity"
            },
            {
                "id": "toc_u3_2",
                "title": "Lec 7: Chomsky Normal Form (CNF) & GNF Conversion Algorithm",
                "channel": "Gate Smashers",
                "duration": "20:10",
                "matched_topics": ["Elimination of Epsilon & Unit Productions", "Chomsky Normal Form (CNF)", "Greibach Normal Form (GNF)"],
                "summary": "Complete algorithmic steps for grammar simplification and normal form transformation.",
                "playlist_id": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
                "search_query": "Gate Smashers Chomsky Normal Form CNF conversion"
            }
        ],
        4: [
            {
                "id": "toc_u4_1",
                "title": "Lec 8: Pushdown Automata (PDA) Introduction & Transition Functions",
                "channel": "Gate Smashers",
                "duration": "17:25",
                "matched_topics": ["7-tuple PDA Definition", "Stack Operations (Push/Pop)", "Acceptance by Final State vs Empty Stack"],
                "summary": "Formal mathematical definition of PDAs and transition notation delta(q, a, Z0).",
                "playlist_id": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
                "search_query": "Gate Smashers Pushdown Automata PDA introduction"
            },
            {
                "id": "toc_u4_2",
                "title": "Lec 9: Design of PDA for L = {w w^R} & a^n b^n",
                "channel": "Gate Smashers",
                "duration": "16:50",
                "matched_topics": ["Deterministic vs Non-Deterministic PDA", "Palindrome Recognition", "CFG to PDA Equivalence"],
                "summary": "Step-by-step stack transition tracing for even/odd palindromes and balancing symbols.",
                "playlist_id": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
                "search_query": "Gate Smashers PDA design for equal a and b"
            }
        ],
        5: [
            {
                "id": "toc_u5_1",
                "title": "Lec 10: Turing Machines: Formal 7-Tuple Definition & Design",
                "channel": "Gate Smashers",
                "duration": "22:15",
                "matched_topics": ["7-tuple Turing Machine", "Infinite Tape & Head Movements", "Transition Diagrams for a^n b^n c^n"],
                "summary": "Comprehensive guide to Turing machine tape read/write heads and constructing machines for context-sensitive languages.",
                "playlist_id": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
                "search_query": "Gate Smashers Turing Machine introduction design"
            },
            {
                "id": "toc_u5_2",
                "title": "Lec 11: Halting Problem of Turing Machine & Church-Turing Thesis",
                "channel": "Gate Smashers",
                "duration": "14:40",
                "matched_topics": ["Halting Problem Proof", "Church-Turing Thesis", "Recursive vs Recursively Enumerable"],
                "summary": "Diagonalization argument proving the undecidability of the Halting Problem.",
                "playlist_id": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
                "search_query": "Gate Smashers Halting Problem Turing Machine"
            }
        ],
        6: [
            {
                "id": "toc_u6_1",
                "title": "Lec 12: P, NP, NP-Complete, and NP-Hard Complexity Classes",
                "channel": "Abdul Bari",
                "duration": "24:30",
                "matched_topics": ["Tractable vs Intractable Problems", "P vs NP Definition", "Polynomial Time Reductions", "Cook's Theorem & SAT"],
                "summary": "Crystal clear breakdown of deterministic vs non-deterministic polynomial time and NP-completeness proofs.",
                "playlist_id": "PLxCzCOWd7aiFM9Lj5G9G_76adtyb4ef7i",
                "search_query": "Abdul Bari P NP NP Complete NP Hard"
            }
        ]
    },
    "AISC": {
        1: [
            {
                "id": "aisc_u1_1",
                "title": "Lec 1: Introduction to AI & State Space Search",
                "channel": "Gate Smashers",
                "duration": "16:20",
                "matched_topics": ["Definition of AI", "State Space Search", "BFS & DFS Complexity", "Uniform Cost Search"],
                "summary": "Comparison of uninformed search strategies, tree search vs graph search, and completeness/optimality.",
                "playlist_id": "PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI",
                "search_query": "Gate Smashers Artificial Intelligence State Space Search"
            },
            {
                "id": "aisc_u1_2",
                "title": "Lec 2: A* Search Algorithm with Admissible Heuristics",
                "channel": "Abdul Bari",
                "duration": "21:10",
                "matched_topics": ["Informed Search", "A* Evaluation Function f(n)=g(n)+h(n)", "Admissibility & Consistency"],
                "summary": "Complete step-by-step numerical trace of A* search on state space graphs with open/closed lists.",
                "playlist_id": "PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI",
                "search_query": "Abdul Bari A star search algorithm numerical"
            }
        ],
        2: [
            {
                "id": "aisc_u2_1",
                "title": "Lec 3: Perceptron Learning Rule & Activation Functions",
                "channel": "Gate Smashers",
                "duration": "15:20",
                "matched_topics": ["Single Layer Perceptron", "Threshold Logic", "Linearly Separable Problems (XOR Limit)", "Sigmoid, ReLU, Tanh"],
                "summary": "Perceptron weight convergence theorem, threshold activation, and Minsky-Papert XOR limitation proof.",
                "playlist_id": "PLxCzCOWd7aiHQ9Qyo70JCTkTxczPnVC6s",
                "search_query": "Gate Smashers Perceptron learning rule activation functions"
            },
            {
                "id": "aisc_u2_2",
                "title": "Lec 4: Multi-Layer Perceptron (MLP) & Backpropagation Algorithm",
                "channel": "3Blue1Brown",
                "duration": "13:50",
                "matched_topics": ["Multi-Layer Perceptron", "Gradient Descent", "Chain Rule Error Propagation", "Weight Update Equations"],
                "summary": "Visual derivation of partial derivatives for weights and biases across hidden layers.",
                "playlist_id": "PLxCzCOWd7aiHQ9Qyo70JCTkTxczPnVC6s",
                "search_query": "3Blue1Brown Backpropagation calculus neural networks"
            }
        ],
        3: [
            {
                "id": "aisc_u3_1",
                "title": "Lec 5: Propositional & First-Order Predicate Logic (FOL)",
                "channel": "Gate Smashers",
                "duration": "17:40",
                "matched_topics": ["Predicate Logic Syntax", "Quantifiers", "Skolemization & CNF Conversion", "Resolution Refutation"],
                "summary": "Converting English sentences to FOL statements, Skolemization, and Resolution proofs.",
                "playlist_id": "PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI",
                "search_query": "Gate Smashers Resolution Refutation Predicate Logic"
            }
        ],
        4: [
            {
                "id": "aisc_u4_1",
                "title": "Lec 6: Classical (Crisp) Sets vs Fuzzy Sets & Membership Functions",
                "channel": "Gate Smashers",
                "duration": "14:30",
                "matched_topics": ["Crisp vs Fuzzy Boundaries", "Membership Function Types (Triangular, Trapezoidal)", "Alpha-Cuts"],
                "summary": "Formal distinction between crisp boundary 0/1 logic and continuous fuzzy degrees of truth.",
                "playlist_id": "PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI",
                "search_query": "Gate Smashers Classical Sets vs Fuzzy Sets"
            },
            {
                "id": "aisc_u4_2",
                "title": "Lec 7: Fuzzy Relations: Max-Min & Max-Product Composition",
                "channel": "Gate Smashers",
                "duration": "16:50",
                "matched_topics": ["Fuzzy Relation Matrix", "Max-Min Composition (R o S)", "Max-Product Composition"],
                "summary": "Detailed matrix numerical calculation standard in university question papers.",
                "playlist_id": "PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI",
                "search_query": "Gate Smashers Fuzzy Relations Max Min Composition numerical"
            }
        ],
        5: [
            {
                "id": "aisc_u5_1",
                "title": "Lec 8: Fuzzy Inference Systems (FIS): Mamdani vs Sugeno Model",
                "channel": "Gate Smashers",
                "duration": "18:15",
                "matched_topics": ["Fuzzification", "Rule Base Evaluation", "Defuzzification (Centroid, COG, Mean of Maxima)"],
                "summary": "Complete architecture of fuzzy controllers and defuzzification calculation methods.",
                "playlist_id": "PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI",
                "search_query": "Gate Smashers Fuzzy Inference System Mamdani Sugeno"
            }
        ],
        6: [
            {
                "id": "aisc_u6_1",
                "title": "Lec 9: Genetic Algorithms: Selection, Crossover & Mutation",
                "channel": "Gate Smashers",
                "duration": "16:00",
                "matched_topics": ["Chromosome Representation", "Fitness Function", "Roulette Wheel Selection", "Crossover & Mutation"],
                "summary": "Evolutionary optimization cycles, convergence criteria, and mutation exploration benefits.",
                "playlist_id": "PLxCzCOWd7aiHGhOHV-nwb0HR5US5GFKFI",
                "search_query": "Gate Smashers Genetic Algorithms selection crossover"
            }
        ]
    },
    "CNS": {
        1: [
            {
                "id": "cns_u1_1",
                "title": "Lec 1: Classical Encryption Techniques (Playfair, Caesar, Hill Cipher)",
                "channel": "Neso Academy",
                "duration": "18:30",
                "matched_topics": ["Substitution & Transposition Ciphers", "Playfair 5x5 Matrix Rules", "Hill Cipher Matrix Multiplication"],
                "summary": "Master matrix key generation, encryption rules, and cryptanalysis against classical ciphers.",
                "playlist_id": "PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII",
                "search_query": "Neso Academy Classical Encryption Playfair Hill Cipher"
            },
            {
                "id": "cns_u1_2",
                "title": "Lec 2: Block Ciphers: Data Encryption Standard (DES) & AES",
                "channel": "Computerphile",
                "duration": "14:50",
                "matched_topics": ["Feistel Cipher Structure", "DES 16 Rounds & S-Boxes", "AES Round Transformations"],
                "summary": "In-depth visual walkthrough of confusion, diffusion, and round transformations in modern symmetric cryptography.",
                "playlist_id": "PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII",
                "search_query": "Computerphile DES and AES block ciphers"
            }
        ],
        2: [
            {
                "id": "cns_u2_1",
                "title": "Lec 3: RSA Public-Key Cryptosystem with Solved Numerical",
                "channel": "Abdul Bari",
                "duration": "19:40",
                "matched_topics": ["Asymmetric Cryptography", "Euler's Totient phi(n)", "Key Generation (e, d, n)", "Encryption & Decryption"],
                "summary": "Definitive step-by-step numerical calculation selecting prime p, q, computing d via Extended Euclidean Algorithm.",
                "playlist_id": "PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII",
                "search_query": "Abdul Bari RSA algorithm numerical solved"
            },
            {
                "id": "cns_u2_2",
                "title": "Lec 4: Diffie-Hellman Key Exchange & MITM Attack",
                "channel": "Gate Smashers",
                "duration": "15:10",
                "matched_topics": ["Discrete Logarithm Problem", "Primitive Roots Modulo q", "Shared Secret Key Calculation", "Man-in-the-Middle Vulnerability"],
                "summary": "How two parties establish a shared cryptographic secret over an untrusted medium without transmitting the key.",
                "playlist_id": "PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII",
                "search_query": "Gate Smashers Diffie Hellman Key Exchange"
            }
        ],
        3: [
            {
                "id": "cns_u3_1",
                "title": "Lec 5: Cryptographic Hash Functions & SHA-512 Architecture",
                "channel": "Computerphile",
                "duration": "14:15",
                "matched_topics": ["One-Way Hash Properties", "Collision Resistance", "SHA-512 Round Architecture", "HMAC"],
                "summary": "Explains pre-image resistance, second pre-image resistance, and birthday attacks on message digests.",
                "playlist_id": "PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII",
                "search_query": "Computerphile Cryptographic Hash Functions SHA"
            },
            {
                "id": "cns_u3_2",
                "title": "Lec 6: Digital Signatures & Digital Signature Standard (DSS)",
                "channel": "Gate Smashers",
                "duration": "13:30",
                "matched_topics": ["Digital Signature Verification", "Non-Repudiation", "RSA & DSA Signing Algorithms"],
                "summary": "Differentiates encryption from digital signatures and shows authentication verification workflows.",
                "playlist_id": "PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII",
                "search_query": "Gate Smashers Digital Signature Standard DSS"
            }
        ],
        4: [
            {
                "id": "cns_u4_1",
                "title": "Lec 7: Transport Layer Security (TLS/SSL) Handshake Protocol",
                "channel": "Computerphile",
                "duration": "16:40",
                "matched_topics": ["TLS Handshake Protocol", "Cipher Suites Negotiation", "X.509 Certificates & CA Authorities"],
                "summary": "Step-by-step network packet flow during browser TLS handshake and asymmetric-to-symmetric session establishment.",
                "playlist_id": "PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII",
                "search_query": "Computerphile SSL TLS Handshake explained"
            },
            {
                "id": "cns_u4_2",
                "title": "Lec 8: IPsec Security Architecture: AH vs ESP Protocols",
                "channel": "Gate Smashers",
                "duration": "15:10",
                "matched_topics": ["Authentication Header (AH)", "Encapsulating Security Payload (ESP)", "Transport vs Tunnel Mode"],
                "summary": "Network layer security mechanisms, security associations (SA), and VPN tunneling modes.",
                "playlist_id": "PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII",
                "search_query": "Gate Smashers IPSec AH ESP Tunnel Mode"
            }
        ],
        5: [
            {
                "id": "cns_u5_1",
                "title": "Lec 9: SQL Injection, Cross-Site Scripting (XSS) & Web Attacks",
                "channel": "Computerphile",
                "duration": "15:50",
                "matched_topics": ["SQL Injection Prevention", "Stored vs Reflected XSS", "Cross-Site Request Forgery (CSRF)"],
                "summary": "Real-world demonstrations of input sanitization, parameterized queries, and OWASP Top 10 vulnerabilities.",
                "playlist_id": "PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII",
                "search_query": "Computerphile SQL Injection and XSS web attacks"
            }
        ],
        6: [
            {
                "id": "cns_u6_1",
                "title": "Lec 10: Firewalls Architecture & Intrusion Detection Systems (IDS)",
                "channel": "Gate Smashers",
                "duration": "16:20",
                "matched_topics": ["Packet Filtering Firewalls", "Stateful Inspection Firewalls", "Signature vs Anomaly IDS", "Honeypots"],
                "summary": "Perimeter defense strategies, access control lists (ACLs), and host vs network intrusion detection.",
                "playlist_id": "PLBlnK6fEyqRgJU3EsOYDTW7m6SUmW6kII",
                "search_query": "Gate Smashers Firewalls IDS IPS Honeypots"
            }
        ]
    },
    "MDM": {
        1: [
            {
                "id": "mdm_u1_1",
                "title": "Lec 1: Supervised vs Unsupervised Machine Learning Fundamentals",
                "channel": "Gate Smashers",
                "duration": "18:20",
                "matched_topics": ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Classification vs Regression"],
                "summary": "Core taxonomic breakdown of machine learning algorithms, labeled vs unlabeled datasets, and evaluation metrics.",
                "playlist_id": "PLxCzCOWd7aiEXg5BV10k9THtjnS48yI-T",
                "search_query": "Gate Smashers Machine Learning supervised unsupervised"
            }
        ],
        2: [
            {
                "id": "mdm_u2_1",
                "title": "Lec 2: Linear Regression, Cost Function & Gradient Descent",
                "channel": "Gate Smashers",
                "duration": "19:10",
                "matched_topics": ["Linear Regression", "Mean Squared Error (MSE)", "Gradient Descent Optimization"],
                "summary": "Derivation of cost minimization equations and learning rate tuning for regression models.",
                "playlist_id": "PLxCzCOWd7aiEXg5BV10k9THtjnS48yI-T",
                "search_query": "Gate Smashers Linear Regression Cost Function Gradient Descent"
            }
        ]
    }
}


SUBJECT_ALIASES: Dict[str, str] = {
    "CS301": "DC",
    "CE301": "DC",
    "DISTRIBUTED COMPUTING": "DC",
    "DISTRIBUTED SYSTEMS": "DC",
    "CS302": "SE",
    "CE302": "SE",
    "SOFTWARE ENGINEERING": "SE",
    "CS303": "TOC",
    "CE303": "TOC",
    "THEORY OF COMPUTATION": "TOC",
    "AUTOMATA": "TOC",
    "CS304": "AISC",
    "CE304": "AISC",
    "ARTIFICIAL INTELLIGENCE": "AISC",
    "SOFT COMPUTING": "AISC",
    "AI": "AISC",
    "CS305": "CNS",
    "CE305": "CNS",
    "CRYPTOGRAPHY": "CNS",
    "NETWORK SECURITY": "CNS",
    "CS306": "MDM",
    "CE306": "MDM",
    "MACHINE LEARNING": "MDM",
    "MULTIDISCIPLINARY MINOR": "MDM",
}


class YouTubeRecommendationService:
    """
    Delivers complete syllabus playlists and topic-by-topic lectures with robust
    playback options (Embed, Playlist Browser, Direct YouTube launch) and completion tracking.
    """

    def _normalize_code(self, subject_code: str) -> str:
        if not subject_code:
            return "DC"
        raw = subject_code.upper().strip()
        if raw in SUBJECT_FULL_PLAYLISTS:
            return raw
        for alias, target in SUBJECT_ALIASES.items():
            if alias in raw:
                return target
        return raw

    def get_subject_playlists(self, subject_code: str) -> List[Dict[str, Any]]:
        code = self._normalize_code(subject_code)
        return SUBJECT_FULL_PLAYLISTS.get(code, [])

    def get_lectures_for_chapter(
        self,
        subject_code: str,
        unit_number: Optional[int],
        chapter_name: str,
        topics: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        code = self._normalize_code(subject_code)
        unit = unit_number or 1

        # 1. Fetch Subject Playlists
        playlists = self.get_subject_playlists(code)
        primary_playlist = next((p for p in playlists if p.get("is_primary")), playlists[0] if playlists else None)

        # 2. Fetch Unit Topic Lectures
        unit_lectures: List[Dict[str, Any]] = []
        if code in UNIT_TOPIC_LECTURES and unit in UNIT_TOPIC_LECTURES[code]:
            unit_lectures = list(UNIT_TOPIC_LECTURES[code][unit])
        else:
            # Fallback based on clean chapter name
            clean_name = re.sub(r"^Unit\s*\d+:\s*", "", chapter_name).strip()
            unit_lectures = [
                {
                    "id": f"{code.lower()}_u{unit}_lec1",
                    "title": f"{clean_name} — Comprehensive Concepts & Theory",
                    "channel": "Gate Smashers",
                    "duration": "18:15",
                    "matched_topics": [clean_name, "Core Foundations", "Exam Weightage Points"],
                    "summary": f"Full concept walkthrough covering {clean_name} and syllabus question patterns.",
                    "playlist_id": primary_playlist.get("playlist_id") if primary_playlist else "",
                    "search_query": f"Gate Smashers {clean_name}"
                },
                {
                    "id": f"{code.lower()}_u{unit}_lec2",
                    "title": f"{clean_name} — Solved Problems & Numericals",
                    "channel": "Education 4u",
                    "duration": "16:40",
                    "matched_topics": [clean_name, "Solved Examples", "Step-by-Step Derivation"],
                    "summary": f"Numerical problem-solving and university previous year question patterns for {clean_name}.",
                    "playlist_id": primary_playlist.get("playlist_id") if primary_playlist else "",
                    "search_query": f"Education 4u {clean_name}"
                }
            ]

        # 3. Enrich lecture metadata with direct playable and external launch URLs
        enriched_lectures = []
        for idx, lec in enumerate(unit_lectures):
            item = dict(lec)
            pl_id = item.get("playlist_id") or (primary_playlist.get("playlist_id") if primary_playlist else "")
            sq = item.get("search_query", f"{item.get('channel', '')} {item.get('title', '')}")
            encoded_sq = sq.replace(" ", "+")

            # Embed URL: using playlist series embed or search query embed
            if pl_id:
                item["embed_url"] = f"https://www.youtube.com/embed/videoseries?list={pl_id}"
                item["playlist_url"] = f"https://www.youtube.com/playlist?list={pl_id}"
            else:
                item["embed_url"] = f"https://www.youtube.com/embed?listType=search&list={encoded_sq}"
                item["playlist_url"] = f"https://www.youtube.com/results?search_query={encoded_sq}"

            item["youtube_watch_url"] = f"https://www.youtube.com/results?search_query={encoded_sq}"
            item["thumbnail"] = f"https://img.youtube.com/vi/{item.get('youtube_id', '1U4bE_G-354')}/hqdefault.jpg" if item.get("youtube_id") else "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
            enriched_lectures.append(item)

        return {
            "subject_code": code,
            "unit_number": unit,
            "chapter_name": chapter_name,
            "subject_playlists": playlists,
            "active_playlist": primary_playlist,
            "unit_lectures": enriched_lectures
        }


youtube_service = YouTubeRecommendationService()
