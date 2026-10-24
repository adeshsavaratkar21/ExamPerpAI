// Comprehensive Placement & Semester Knowledge Base for Core CS Subjects:
// CCN (Computer Networks), OS (Operating Systems), DBMS, OOPs, SQL

export const CORE_SUBJECTS_DATA = {
  ccn: {
    id: "ccn",
    code: "CCN",
    name: "Computer Networks & Cloud Networking",
    tagline: "OSI / TCP Models, Protocols, Socket Programming & Cloud Topology",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    iconBg: "bg-blue-100 text-blue-800",
    overview: "Computer Networks governs reliable communication across host machines, routing, congestion control, and application-level delivery (HTTP/HTTPS, DNS, WebSockets). Essential for Backend & SDE interviews.",
    keyTopics: [
      {
        title: "OSI vs TCP/IP Protocol Suites",
        summary: "Layered architecture enabling interoperability across heterogeneous hardware.",
        points: [
          "OSI Model (7 Layers): Application (7), Presentation (6), Session (5), Transport (4), Network (3), Data Link (2), Physical (1).",
          "TCP/IP Model (4 Layers): Application, Transport (TCP/UDP), Internet (IP/ICMP), Link / Network Access.",
          "Encapsulation: Data -> Segment (L4) -> Packet (L3) -> Frame (L2) -> Bits (L1)."
        ],
        codeSnippet: `Layer 4 (Transport): End-to-End communication (Port numbers: 80, 443, 22)
Layer 3 (Network): Host-to-Host routing (IP addresses: IPv4 32-bit, IPv6 128-bit)
Layer 2 (Data Link): Node-to-Node framing (MAC addresses: 48-bit hex)`
      },
      {
        title: "TCP 3-Way Handshake & Connection Teardown",
        summary: "Reliable connection establishment and graceful closure protocol.",
        points: [
          "Handshake Step 1: Client sends SYN (seq = x) -> State: SYN_SENT.",
          "Handshake Step 2: Server responds with SYN-ACK (seq = y, ack = x + 1) -> State: SYN_RCVD.",
          "Handshake Step 3: Client replies ACK (ack = y + 1) -> Both in ESTABLISHED state.",
          "Teardown (4-Way FIN): Client sends FIN, Server ACKs, Server sends FIN, Client ACKs with TIME_WAIT (2*MSL) to avoid delayed segment collisions."
        ],
        codeSnippet: `Client                          Server
  | ----- SYN (seq=100) ------>    |
  | <--- SYN-ACK (seq=300,ack=101) |
  | ----- ACK (ack=301) ------>    |  (Connection ESTABLISHED)`
      },
      {
        title: "TCP vs UDP Comparison",
        summary: "Connection-oriented reliable stream vs lightweight low-latency datagrams.",
        points: [
          "TCP: Connection-oriented, Byte-stream, Guarantees ordered delivery, Error recovery (Retransmissions), Flow & Congestion control. Used in: HTTP/REST, WebSockets, SSH, SMTP.",
          "UDP: Connectionless, Message-oriented, No guarantees, Minimal 8-byte header overhead. Used in: Video Streaming (RTP/WebRTC), Online Gaming, DNS, VoIP.",
          "Flow Control: Sliding Window protocol prevents receiver buffer overflow.",
          "Congestion Control: Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery."
        ]
      },
      {
        title: "DNS Resolution & HTTP/1.1 vs HTTP/2 vs HTTP/3",
        summary: "Domain name resolution and modern web application delivery protocols.",
        points: [
          "DNS Lookup: Browser cache -> OS hosts file -> Local DNS Resolver -> Root Server (.) -> TLD Server (.in, .com) -> Authoritative Nameserver.",
          "HTTP/1.1: Persistent connections (Keep-Alive), but suffers from Head-of-Line (HoL) blocking.",
          "HTTP/2: Multiplexing over a single TCP connection, binary framing, HPACK header compression, Server Push.",
          "HTTP/3: Built on top of QUIC protocol running over UDP; eliminates transport-level HoL blocking and provides zero-RTT handshakes."
        ]
      }
    ],
    interviewQA: [
      {
        q: "What happens when you type 'https://google.com' in a browser and hit Enter?",
        a: "1) URL Parsing: Browser extracts protocol (HTTPS), domain (google.com), port (443).\n2) DNS Resolution: Checks browser cache, OS resolver, querying Root, TLD, and Authoritative servers to resolve IP.\n3) TCP Handshake: 3-way handshake (SYN, SYN-ACK, ACK) establishes L4 connection.\n4) TLS Handshake: Client Hello, Server Hello + Certificate validation, Diffie-Hellman Key Exchange, symmetric session key negotiation.\n5) HTTP Request: Browser sends GET / with Host header.\n6) Server Processing: Reverse proxy (Nginx) forwards to backend, response HTML generated.\n7) HTTP Response: Server returns 200 OK + payload.\n8) DOM Rendering: Browser parses HTML, constructs DOM/CSSOM trees, executes JavaScript."
      },
      {
        q: "Why does TCP use a 3-way handshake instead of a 2-way handshake?",
        a: "A 2-way handshake is insufficient because both parties must synchronize their initial sequence numbers (ISNs) and confirm bidirectional communication. With only 2 ways, an old delayed SYN duplicate could arrive at the server, causing it to allocate resources for a dead connection that the client never requested."
      },
      {
        q: "What is TIME_WAIT state in TCP and why is it necessary?",
        a: "The sender of the active close stays in TIME_WAIT for 2*MSL (Maximum Segment Lifetime, typically 1 to 2 minutes) to ensure that the final ACK was received by the other side (retransmitting if the final ACK was lost) and to allow old duplicate packets from previous connections to drain from the network."
      }
    ]
  },

  os: {
    id: "os",
    code: "OS",
    name: "Operating Systems & Concurrency",
    tagline: "Processes, Threads, CPU Scheduling, Deadlocks & Memory Management",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    iconBg: "bg-purple-100 text-purple-800",
    overview: "Operating Systems arbitrate computer hardware, manage concurrent processes/threads, memory address virtualization, and I/O file systems. One of the highest-weightage technical interview pillars.",
    keyTopics: [
      {
        title: "Process vs Thread & Context Switching",
        summary: "Execution units, memory spaces, and operating system scheduling.",
        points: [
          "Process: An executing program with its own dedicated virtual address space (Text, Data, Heap, Stack). Heavyweight creation and isolation.",
          "Thread: The smallest unit of execution within a process. Threads in the same process share Code, Data, and Heap, but each has its own Stack and Program Counter (PC).",
          "Context Switch: Saving CPU state (registers, PC) of running process into its PCB (Process Control Block) and loading state of the next scheduled process. Incurs cache invalidation overhead."
        ],
        codeSnippet: `Process Address Space:
+-------------------+ High Address
|       Stack       | (Local variables, function frames - grows down)
|         |         |
|         v         |
|         ^         |
|         |         |
|       Heap        | (Dynamic memory: malloc/new - grows up)
+-------------------+
|    BSS / Data     | (Global & static variables)
+-------------------+
|    Code / Text    | (Compiled binary instructions)
+-------------------+ Low Address`
      },
      {
        title: "Deadlocks & The 4 Coffman Conditions",
        summary: "A condition where a set of processes are permanently blocked waiting for resources held by each other.",
        points: [
          "1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.",
          "2. Hold and Wait: A process holding at least one resource is waiting to acquire additional resources held by other processes.",
          "3. No Preemption: Resources cannot be forcibly taken; they can only be released voluntarily by the holding process.",
          "4. Circular Wait: A closed chain of processes P0, P1, ..., Pn exists such that P0 waits for P1, and Pn waits for P0.",
          "Handling: Deadlock Prevention (invalidate 1 condition), Deadlock Avoidance (Banker's Algorithm), Detection & Recovery (kill process / preempt resource)."
        ]
      },
      {
        title: "Process Synchronization: Mutex vs Semaphore",
        summary: "Preventing race conditions in critical sections when multiple threads access shared state.",
        points: [
          "Race Condition: Output depends on the non-deterministic interleaving of concurrent execution.",
          "Critical Section Requirements: Mutual Exclusion, Progress, Bounded Waiting.",
          "Mutex: Mutual Exclusion lock. Owned by a single thread at a time. Only the locking thread can unlock it.",
          "Binary Semaphore: Integer value 0 or 1. Can be signaled by any thread (signaling mechanism).",
          "Counting Semaphore: Initialized with value N; allows up to N threads concurrent access to a pool of resources."
        ]
      },
      {
        title: "Memory Management, Paging & Virtual Memory",
        summary: "Address translation, page tables, TLB cache, and page fault replacement algorithms.",
        points: [
          "Virtual Memory: Gives applications the illusion of a large, contiguous memory space regardless of physical RAM size.",
          "Paging: Virtual address split into Page Number (p) and Offset (d). MMU translates page number to frame number via Page Table.",
          "TLB (Translation Lookaside Buffer): High-speed hardware associative cache for page table lookups. TLB hit avoids secondary RAM memory access.",
          "Page Fault: CPU accesses a virtual page whose valid bit is 0 (not in physical RAM); OS traps, loads frame from disk/swap space.",
          "Page Replacement Algorithms: FIFO, Optimal (Belady's), LRU (Least Recently Used), Clock algorithm."
        ]
      }
    ],
    interviewQA: [
      {
        q: "What is Thrashing in an operating system and how is it resolved?",
        a: "Thrashing occurs when the system spends more time servicing page faults and swapping pages in and out of disk than executing user instructions. It happens when the sum of working sets of all running processes exceeds available physical RAM. Resolution: Suspend or terminate low-priority processes, increase physical RAM, or tune the Working Set Model page allocation."
      },
      {
        q: "What is the difference between a Mutex and a Binary Semaphore?",
        a: "A Mutex is a locking mechanism with strict ownership: only the thread that acquired the mutex can release it. A Semaphore is a signaling mechanism with no ownership concept: one thread can wait (sem_wait) while a completely different thread or interrupt service routine can signal (sem_post) it."
      },
      {
        q: "Explain Belady's Anomaly.",
        a: "Belady's Anomaly is the counter-intuitive phenomenon where increasing the number of physical page frames results in an increased number of page faults. It occurs in FIFO page replacement, but never occurs in stack-based algorithms like LRU or Optimal."
      }
    ]
  },

  dbms: {
    id: "dbms",
    code: "DBMS",
    name: "Database Management Systems",
    tagline: "Relational Algebra, ACID, Normalization, Concurrency & Indexing",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-800",
    overview: "DBMS manages structured persistent storage, guarantees data integrity through ACID properties, and optimizes SQL query plans with index trees (B-Trees / B+ Trees).",
    keyTopics: [
      {
        title: "ACID Properties in Relational Databases",
        summary: "The bedrock guarantee of transactional database reliability.",
        points: [
          "Atomicity: 'All or nothing'. Either all operations of a transaction commit successfully, or the entire transaction is rolled back. Maintained via Write-Ahead Logging (WAL) and undo logs.",
          "Consistency: Database transitions from one valid state to another, satisfying all schema constraints, foreign keys, and triggers.",
          "Isolation: Concurrent transactions execute without interfering with each other. Controlled via Isolation Levels.",
          "Durability: Once a transaction commits, its updates survive system crashes and power failures. Guaranteed through disk flush and redo logs."
        ]
      },
      {
        title: "Transaction Isolation Levels & Read Phenomena",
        summary: "Trade-off between concurrent throughput and data isolation guarantees.",
        points: [
          "Dirty Read: Reading uncommitted data written by another transaction that later rolls back.",
          "Non-Repeatable Read: Reading the same row twice within a transaction yields different values because another transaction modified and committed it.",
          "Phantom Read: Re-running a query with a WHERE range clause returns newly inserted or deleted rows committed by another transaction.",
          "Isolation Levels:\n• Read Uncommitted (Suffers: Dirty, Non-repeatable, Phantom)\n• Read Committed (Default in Postgres/Oracle, Suffers: Non-repeatable, Phantom)\n• Repeatable Read (Default in MySQL InnoDB, Suffers: Phantom Read)\n• Serializable (Highest isolation, zero anomalies, strict locking / SSI)"
        ]
      },
      {
        title: "Database Normalization (1NF to BCNF)",
        summary: "Systematic schema design technique to minimize data redundancy and prevent insertion, update, and deletion anomalies.",
        points: [
          "1NF (First Normal Form): Every column contains atomic (indivisible) values; no repeating groups or arrays.",
          "2NF (Second Normal Form): Must be in 1NF + No Partial Dependency (every non-prime attribute must depend on the whole candidate key, not a proper subset).",
          "3NF (Third Normal Form): Must be in 2NF + No Transitive Dependency (X -> Y, Y -> Z where non-prime attribute depends on another non-prime attribute). Condition: In X -> A, either X is a Super Key or A is a Prime Attribute.",
          "BCNF (Boyce-Codd Normal Form): Strict 3NF. For every non-trivial functional dependency X -> Y, X MUST be a Super Key."
        ]
      },
      {
        title: "Indexing: B-Tree vs B+ Tree & Clustered vs Secondary Index",
        summary: "Physical storage organization for sub-millisecond query execution.",
        points: [
          "B-Tree: Stores both keys and record pointers in internal nodes and leaf nodes.",
          "B+ Tree: All records / row pointers are stored ONLY in the leaf nodes. Internal nodes contain only routing keys. Leaf nodes are linked as a doubly linked list, providing lightning-fast range scans (BETWEEN, <, >). Standard index structure in MySQL InnoDB and PostgreSQL.",
          "Clustered Index: Determines the physical sorted order of rows on disk. Only ONE clustered index can exist per table (usually the Primary Key).",
          "Non-Clustered (Secondary) Index: Separate structure containing index keys and pointers (or Primary Key values) pointing to the actual data row."
        ]
      }
    ],
    interviewQA: [
      {
        q: "Why do relational databases use B+ Trees instead of Binary Search Trees (BST) or Hash Maps for indexing?",
        a: "1) Disk I/O Efficiency: B+ Trees have a high branching factor (fan-out of 100 to 1000), making the tree very shallow (height 3-4). Accessing a row requires only 3-4 disk I/O operations compared to 20-30 in a BST.\n2) Range Queries: B+ Tree leaf nodes form a contiguous linked list. A range query (e.g. WHERE salary BETWEEN 50000 AND 80000) simply navigates to the first match and scans sequentially. Hash maps cannot perform range scans (O(N)).\n3) Predictable Performance: B+ Trees remain balanced (self-balancing) under frequent insertions and deletions."
      },
      {
        q: "What is the difference between TRUNCATE, DROP, and DELETE?",
        a: "• DELETE (DML): Deletes specific rows based on WHERE clause. Rows are logged individually in transaction log, triggers fire, and operation can be rolled back. Slower for full tables.\n• TRUNCATE (DDL): Resets and deallocates entire table data pages at once. Triggers do not fire, cannot filter by WHERE, resets auto-increment counter. Faster than DELETE.\n• DROP (DDL): Completely removes the entire table schema, structure, constraints, indexes, and data from database catalog."
      }
    ]
  },

  oops: {
    id: "oops",
    code: "OOPS",
    name: "Object-Oriented Programming & System Design",
    tagline: "The 4 Pillars, Virtual Functions, SOLID Principles & Design Patterns",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    iconBg: "bg-amber-100 text-amber-800",
    overview: "OOP is the primary paradigm tested in Technical Rounds 1 & 2 for C++, Java, and Python. Covers modularity, polymorphism, memory lifecycle, and clean scalable architecture.",
    keyTopics: [
      {
        title: "The 4 Core Pillars of OOP",
        summary: "The foundational architectural concepts governing object-oriented software design.",
        points: [
          "1. Encapsulation: Bundling data (attributes) and methods that operate on that data into a single unit (class), while restricting direct access using access modifiers (private, protected, public). Ensures data hiding.",
          "2. Abstraction: Hiding internal implementation complexities and exposing only essential interfaces to the outside world (using Abstract Classes and Interfaces).",
          "3. Inheritance: Mechanism where a child class inherits properties and behaviors from a parent class, promoting code reusability (Single, Multilevel, Multiple, Hierarchical, Hybrid).",
          "4. Polymorphism: Ability of a message, function, or object to take multiple forms. Divided into Compile-Time (Overloading) and Runtime (Overriding)."
        ],
        codeSnippet: `// Polymorphism in action:
class Animal {
public:
    virtual void speak() { cout << "Animal sound" << endl; } // Runtime polymorphism
};
class Dog : public Animal {
public:
    void speak() override { cout << "Woof!" << endl; }
};`
      },
      {
        title: "Compile-Time vs Runtime Polymorphism & VTable",
        summary: "Early binding versus late dynamic dispatch.",
        points: [
          "Compile-Time Polymorphism (Static Binding): Method Overloading (same method name, different parameter signature in same class) and Operator Overloading. Resolved by compiler at compile time.",
          "Runtime Polymorphism (Dynamic Binding): Method Overriding (child class provides specific implementation of parent's virtual method). Resolved at runtime using VPtr and VTable.",
          "VTable (Virtual Table): Compiler creates a table of function pointers for each class containing virtual functions.",
          "VPtr (Virtual Pointer): A hidden pointer injected into each object instance pointing to its class's VTable."
        ]
      },
      {
        title: "Constructors, Destructors, Shallow vs Deep Copy",
        summary: "Object lifecycle and resource management.",
        points: [
          "Default Constructor, Parameterized Constructor, Copy Constructor.",
          "Shallow Copy: Copies all member field values as-is. If a member is a pointer to heap memory, both copies point to the exact same memory address! Causes double-free errors.",
          "Deep Copy: Allocates brand new heap memory and copies the actual values into the new location. Independent lifecycle.",
          "Virtual Destructor: Crucial in C++! If deleting a derived class object through a base class pointer (Base* ptr = new Derived()), base destructor MUST be virtual to ensure derived destructor executes, preventing memory leaks."
        ]
      },
      {
        title: "The SOLID Principles for Clean Code",
        summary: "Five core design principles for maintainable, enterprise-grade architecture.",
        points: [
          "S - Single Responsibility Principle (SRP): A class should have one, and only one, reason to change.",
          "O - Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification.",
          "L - Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types without altering program correctness.",
          "I - Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use (prefer small, role-specific interfaces).",
          "D - Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions."
        ]
      }
    ],
    interviewQA: [
      {
        q: "What is the Diamond Problem in Multiple Inheritance and how is it solved?",
        a: "The Diamond Problem occurs in multiple inheritance when a class D inherits from both B and C, which both inherit from a common base class A. When D accesses a member of A, ambiguity arises as to which path (via B or via C) to follow, leading to duplicate copies of A.\nSolution: In C++, use Virtual Base Classes (class B : virtual public A). This ensures only a single shared instance of A is created in D."
      },
      {
        q: "What is the difference between an Abstract Class and an Interface?",
        a: "• Abstract Class: Can contain both abstract methods (without body) and concrete methods (with implementation), instance member variables, constructors, and any access modifiers. A class can inherit only ONE abstract class.\n• Interface: A pure contract containing only abstract method declarations (until default methods in Java 8), static final constants, and public access. A class can implement MULTIPLE interfaces."
      }
    ]
  },

  sql: {
    id: "sql",
    code: "SQL",
    name: "SQL & Relational Query Mastery",
    tagline: "Joins, Window Functions, Group By / Having, Subqueries & Query Optimization",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    iconBg: "bg-cyan-100 text-cyan-800",
    overview: "SQL is universally asked in Online Coding Assessments and Technical Interviews across all tech firms (Google, Amazon, Morgan Stanley, Barclays). Covers real query design and performance tuning.",
    keyTopics: [
      {
        title: "SQL Command Types (DDL, DML, DCL, TCL)",
        summary: "Categorization of SQL statements.",
        points: [
          "DDL (Data Definition Language): CREATE, ALTER, DROP, TRUNCATE, RENAME. Auto-committed.",
          "DML (Data Manipulation Language): SELECT, INSERT, UPDATE, DELETE. Modifies data rows.",
          "DCL (Data Control Language): GRANT, REVOKE. Controls user permissions.",
          "TCL (Transaction Control Language): COMMIT, ROLLBACK, SAVEPOINT. Controls transaction boundary."
        ]
      },
      {
        title: "SQL Joins (Visual Representation)",
        summary: "Combining rows from two or more tables based on related columns.",
        points: [
          "INNER JOIN: Returns records that have matching values in both tables.",
          "LEFT (OUTER) JOIN: Returns all records from left table, and matched records from right table (NULL if no match).",
          "RIGHT (OUTER) JOIN: Returns all records from right table, and matched records from left table.",
          "FULL (OUTER) JOIN: Returns all records when there is a match in either left or right table.",
          "CROSS JOIN: Cartesian product of all rows (M * N records).",
          "SELF JOIN: Joining a table to itself (e.g. Employee table finding Manager name)."
        ],
        codeSnippet: `-- Self Join example: Find employee and their manager
SELECT e.name AS Employee, m.name AS Manager
FROM Employees e
LEFT JOIN Employees m ON e.manager_id = m.id;`
      },
      {
        title: "GROUP BY, HAVING vs WHERE & Aggregates",
        summary: "Aggregating data sets and filtering grouped partitions.",
        points: [
          "WHERE Clause: Filters individual rows BEFORE aggregation takes place. Cannot use aggregate functions (SUM, AVG, COUNT, MIN, MAX) in WHERE.",
          "GROUP BY: Groups rows that have the same values into summary rows.",
          "HAVING Clause: Filters aggregated groups AFTER GROUP BY aggregation is performed.",
          "Order of Execution: FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT."
        ],
        codeSnippet: `-- Departments with average salary > 75,000
SELECT department_id, COUNT(*) AS emp_count, AVG(salary) AS avg_sal
FROM Employees
WHERE status = 'Active'         -- 1. Filter rows
GROUP BY department_id          -- 2. Group by department
HAVING AVG(salary) > 75000       -- 3. Filter groups
ORDER BY avg_sal DESC;          -- 4. Sort`
      },
      {
        title: "Advanced SQL: Window Functions (ROW_NUMBER, DENSE_RANK)",
        summary: "Perform calculations across a set of table rows related to current row without collapsing them.",
        points: [
          "ROW_NUMBER(): Assigns unique sequential integer starting from 1 to each row within partition.",
          "RANK(): Assigns rank with gaps for ties (e.g. 1, 2, 2, 4).",
          "DENSE_RANK(): Assigns rank WITHOUT gaps for ties (e.g. 1, 2, 2, 3). Top question: Nth highest salary!",
          "LEAD() & LAG(): Accesses value of subsequent or preceding row without a self-join."
        ],
        codeSnippet: `-- Find the 2nd Highest Salary in each department
WITH RankedSalaries AS (
    SELECT 
        department_id, 
        salary, 
        employee_name,
        DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS sal_rank
    FROM Employees
)
SELECT department_id, employee_name, salary
FROM RankedSalaries
WHERE sal_rank = 2;`
      }
    ],
    interviewQA: [
      {
        q: "How to find the Nth highest salary in SQL without window functions?",
        a: "Using Correlated Subquery:\nSELECT DISTINCT salary \nFROM Employees e1 \nWHERE N - 1 = (\n    SELECT COUNT(DISTINCT salary) \n    FROM Employees e2 \n    WHERE e2.salary > e1.salary\n);\nOr using LIMIT/OFFSET (MySQL):\nSELECT DISTINCT salary FROM Employees ORDER BY salary DESC LIMIT 1 OFFSET N-1;"
      },
      {
        q: "What is the difference between UNION and UNION ALL?",
        a: "• UNION: Combines the result sets of two SELECT queries and removes all duplicate rows (performs an internal sort/hash to deduplicate). Slower.\n• UNION ALL: Combines result sets as-is, preserving all duplicates. Much faster because no sorting or deduplication overhead is required."
      }
    ]
  }
};
