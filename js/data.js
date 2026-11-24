/**
 * KTU Resource Portal - Complete Academic Taxonomy & Repository Data
 * Schemes: 2024 Scheme, 2019 Scheme, 2015 Scheme
 * Covers All Major Branches, Semesters S1-S8, Subjects, Notes, PYQs, and Syllabus
 */

const KTU_DATA = {
  schemes: [
    {
      id: "2024",
      name: "2024 Scheme",
      tag: "New",
      badgeClass: "bg-primary/10 text-primary border border-primary/20",
      active: true
    },
    {
      id: "2019",
      name: "2019 Scheme",
      tag: "Previous",
      badgeClass: "bg-surface-container-highest text-on-surface-variant border border-outline-variant/30",
      active: false
    }
  ],

  branches: [
    {
      id: "CS",
      name: "Computer Science",
      shortName: "Computer Science",
      code: "CSE",
      icon: "terminal",
      coursesCount: "42 Subjects",
      schemes: ["2024", "2019"]
    },
    {
      id: "AD",
      name: "AI & Data Science",
      shortName: "AI & Data Science",
      code: "AI & DS",
      icon: "psychology",
      coursesCount: "38 Subjects",
      schemes: ["2024"]
    },
    {
      id: "EC",
      name: "Electronics",
      shortName: "Electronics",
      code: "ECE",
      icon: "memory",
      coursesCount: "40 Subjects",
      schemes: ["2024", "2019"]
    },
    {
      id: "EE",
      name: "Electrical",
      shortName: "Electrical",
      code: "EEE",
      icon: "bolt",
      coursesCount: "39 Subjects",
      schemes: ["2024", "2019"]
    },
    {
      id: "ME",
      name: "Mechanical",
      shortName: "Mechanical",
      code: "ME",
      icon: "settings",
      coursesCount: "44 Subjects",
      schemes: ["2024", "2019"]
    },
    {
      id: "CE",
      name: "Civil",
      shortName: "Civil",
      code: "CE",
      icon: "apartment",
      coursesCount: "41 Subjects",
      schemes: ["2024", "2019"]
    }
  ],

  years: [
    { id: 1, name: "1st Year", semGroup: "S1 & S2", sems: ["S1", "S2"] },
    { id: 2, name: "2nd Year", semGroup: "S3 & S4", sems: ["S3", "S4"] },
    { id: 3, name: "3rd Year", semGroup: "S5 & S6", sems: ["S5", "S6"] },
    { id: 4, name: "4th Year", semGroup: "S7 & S8", sems: ["S7", "S8"] }
  ],

  semesters: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"],

  // Official Google Drive Folder Archives per Scheme & Branch
  driveLinks: {
    "2024": {
      "AD": "1dvWyFSLbeWmR01ANQuH02ewlGmRQTxDG",
      "CS": "1PJ0FoaX8jVNxi4ajbZ0Q6R8Ju4RwGg6-",
      "EC": "1q2t8_Y_bYsbY0ll_adrgsynt7yWnP_e3",
      "ME": "1JinSE08ARrwEdAbor4_K6Ta7yelB5WU0"
    },
    "2019": {
      "CS": "18kBRI1Ino-gVCSrsQmB5dJQGfwhIxAsv",
      "EC": "16-6dN_9YbjfSHJXICwYKfXHkz05_nmNm",
      "ME": "18aB0440S7A6gUTk4eixAQes7wJJHt0FS"
    }
  },

  // Comprehensive KTU Subjects catalog across branches and schemes
  subjects: [
    // S1 / S2 Common & Departmental Foundation
    {
      id: "mat101",
      code: "MAT 101",
      name: "Linear Algebra and Calculus",
      branch: ["CS", "EC", "EE", "ME", "CE", "AD"],
      sem: "S1",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Basic Science",
      verified: true,
      modules: [
        { num: 1, title: "Single Variable Calculus & Mean Value Theorems", topics: "Rolle's theorem, Cauchy's mean value theorem, Taylor's and Maclaurin's series, Indeterminate forms." },
        { num: 2, title: "Multivariable Differential Calculus", topics: "Partial derivatives, Total derivative, Chain rule, Euler's theorem on homogeneous functions, Maxima and minima of functions of two variables." },
        { num: 3, title: "Multivariable Integral Calculus", topics: "Double integrals, Change of order of integration, Double integrals in polar coordinates, Triple integrals in Cartesian and cylindrical coordinates." },
        { num: 4, title: "Vector Calculus & Differentiation", topics: "Vector fields, Gradient, Directional derivative, Divergence and Curl of a vector field, Physical interpretations, Solenoidal and Irrotational fields." },
        { num: 5, title: "Vector Integration & Integral Theorems", topics: "Line integrals, Surface integrals, Green's theorem, Gauss Divergence theorem, Stokes' theorem and verification." }
      ],
      pyqs: [
        { year: "2024", session: "June Regular", solved: true, solutionKey: "Official Solved Key", type: "Regular", size: "2.4 MB", downloads: 1420 },
        { year: "2023", session: "December Regular", solved: true, solutionKey: "Faculty Verified", type: "Regular", size: "1.9 MB", downloads: 3840 },
        { year: "2023", session: "July Supplementary", solved: false, type: "Supply", size: "1.7 MB", downloads: 2110 },
        { year: "2022", session: "December Regular", solved: true, solutionKey: "Topper Solution", type: "Regular", size: "2.1 MB", downloads: 4900 },
        { year: "2022", session: "June Supplementary", solved: false, type: "Supply", size: "1.8 MB", downloads: 1840 },
        { year: "2021", session: "KTU Model Question Paper", solved: true, solutionKey: "KTU Model Key", type: "Model", size: "1.5 MB", downloads: 6200 }
      ],
      notes: [
        { title: "Complete Module 1 to 5 Comprehensive Notes", author: "Dr. K. V. Sharma (CET)", mod: "All Modules", pages: 124, size: "8.4 MB", verified: true },
        { title: "Formula Cheat Sheet & Quick Revision Handbook", author: "Academic Cell", mod: "Revision", pages: 16, size: "1.2 MB", verified: true },
        { title: "Vector Calculus Solved Problem Bank (50+ Problems)", author: "Prof. S. Nair", mod: "Mod 4 & 5", pages: 42, size: "3.1 MB", verified: true }
      ],
      syllabusUrl: "#"
    },
    {
      id: "pht100",
      code: "PHT 100",
      name: "Engineering Physics A",
      branch: ["CS", "EC", "EE", "ME", "CE", "AD"],
      sem: "S1",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Basic Science",
      verified: true,
      modules: [
        { num: 1, title: "Oscillations and Waves", topics: "Harmonic oscillations, Damped harmonic oscillator, Forced harmonic vibrations, Resonance, Wave motion, One-dimensional wave equation." },
        { num: 2, title: "Wave Optics", topics: "Interference of light, Air wedge, Newton's rings, Diffraction, Fraunhofer diffraction at single slit, Diffraction grating, Resolving power." },
        { num: 3, title: "Quantum Mechanics & Statistical Physics", topics: "de Broglie hypothesis, Heisenberg uncertainty principle, Time-dependent and independent Schrodinger wave equations, Particle in a 1D box." },
        { num: 4, title: "Acoustics and Ultrasonics", topics: "Acoustics of buildings, Reverberation, Sabine's formula, Production of ultrasonics, Piezoelectric oscillator, Non-destructive testing (NDT)." },
        { num: 5, title: "Laser and Fiber Optics", topics: "Einstein's coefficients, Population inversion, Ruby laser, He-Ne laser, Optical fiber, Numerical aperture, Acceptance angle, Applications." }
      ],
      pyqs: [
        { year: "2024", session: "June Regular", solved: true, solutionKey: "Solved with Diagrams", type: "Regular", size: "2.8 MB", downloads: 1190 },
        { year: "2023", session: "December Regular", solved: true, solutionKey: "Official Scheme Key", type: "Regular", size: "2.1 MB", downloads: 3100 },
        { year: "2023", session: "June Supplementary", solved: false, type: "Supply", size: "1.9 MB", downloads: 1540 },
        { year: "2022", session: "December Regular", solved: true, type: "Regular", size: "2.2 MB", downloads: 3950 }
      ],
      notes: [
        { title: "Engineering Physics Module-wise Comprehensive Text", author: "Physics Dept. TKM", mod: "All Modules", pages: 148, size: "12.1 MB", verified: true },
        { title: "Wave Optics & Laser Numericals Solved", author: "Prof. Jacob V.", mod: "Mod 2 & 5", pages: 35, size: "2.8 MB", verified: true }
      ],
      syllabusUrl: "#"
    },
    {
      id: "est102",
      code: "EST 102",
      name: "Programming in C",
      branch: ["CS", "EC", "EE", "ME", "CE", "AD"],
      sem: "S2",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Engineering Science",
      verified: true,
      modules: [
        { num: 1, title: "Basics of Computer & C Programming Fundamentals", topics: "Data types, operators, expressions, operator precedence, I/O operations, control statements, branching, looping." },
        { num: 2, title: "Arrays and String Manipulation", topics: "1D and 2D arrays, multidimensional arrays, string operations, string library functions, character arrays." },
        { num: 3, title: "Functions and Modular Programming", topics: "Function declarations, definitions, parameter passing mechanisms (call by value/reference), recursion, storage classes." },
        { num: 4, title: "Pointers and Dynamic Memory Allocation", topics: "Pointer arithmetic, pointers and arrays, pointers to functions, malloc, calloc, realloc, free." },
        { num: 5, title: "Structures, Unions and File Handling", topics: "Structures, nested structures, array of structures, unions, file I/O operations, sequential and random access files." }
      ],
      pyqs: [
        { year: "2024", session: "June Regular", solved: true, solutionKey: "Solved with Clean C Code", type: "Regular", size: "2.6 MB", downloads: 2840 },
        { year: "2023", session: "July Regular", solved: true, solutionKey: "Verified Key", type: "Regular", size: "2.0 MB", downloads: 4120 },
        { year: "2023", session: "Jan Supplementary", solved: false, type: "Supply", size: "1.8 MB", downloads: 1980 },
        { year: "2022", session: "July Regular", solved: true, type: "Regular", size: "2.3 MB", downloads: 5400 }
      ],
      notes: [
        { title: "Complete C Programming Lecture Notes with Flowcharts", author: "CSE Dept. RIT", mod: "All Modules", pages: 110, size: "6.8 MB", verified: true },
        { title: "Top 50 Most Repeated KTU C Programming Questions with Solutions", author: "Dr. Mathew P.", mod: "Solved Bank", pages: 58, size: "4.2 MB", verified: true }
      ],
      syllabusUrl: "#"
    },

    // S3 CSE / AI & DS
    {
      id: "cst201",
      code: "CST 201",
      name: "Data Structures",
      branch: ["CS", "AD"],
      sem: "S3",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Program Core",
      verified: true,
      modules: [
        { num: 1, title: "Introduction & Linear Data Structures", topics: "Time & Space complexity, Asymptotic notations (Big-O, Omega, Theta), Arrays, Sparse matrices, Polynomial representation." },
        { num: 2, title: "Stacks and Queues", topics: "Stack ADT, Infix to Postfix conversion, Evaluation of postfix expression, Queue ADT, Circular Queue, Double-ended Queue (Deque), Priority Queue." },
        { num: 3, title: "Linked Lists", topics: "Singly Linked List, Doubly Linked List, Circular Linked List, Polynomial addition using linked lists, Linked stack and queue implementations." },
        { num: 4, title: "Trees and Binary Search Trees", topics: "Tree terminology, Binary tree traversals (Inorder, Preorder, Postorder), Expression trees, BST operations (Insert, Delete, Search), AVL trees, Heaps." },
        { num: 5, title: "Graphs, Hashing & Sorting Techniques", topics: "Graph representations (Adjacency matrix/list), BFS & DFS traversals, Hash tables, Collision resolution, Quick sort, Merge sort, Radix sort." }
      ],
      pyqs: [
        { year: "2024", session: "Jan Regular", solved: true, solutionKey: "Complete Step-by-Step Solved", type: "Regular", size: "3.1 MB", downloads: 5420 },
        { year: "2023", session: "December Regular", solved: true, solutionKey: "Official Answer Key", type: "Regular", size: "2.4 MB", downloads: 7890 },
        { year: "2023", session: "June Supplementary", solved: true, solutionKey: "Faculty Solved", type: "Supply", size: "2.1 MB", downloads: 3650 },
        { year: "2022", session: "December Regular", solved: true, solutionKey: "Topper Key", type: "Regular", size: "2.5 MB", downloads: 6980 },
        { year: "2022", session: "July Supplementary", solved: false, type: "Supply", size: "1.9 MB", downloads: 2400 },
        { year: "2021", session: "KTU Model Paper", solved: true, solutionKey: "Official Model Key", type: "Model", size: "1.6 MB", downloads: 8200 }
      ],
      notes: [
        { title: "Data Structures Complete Hand-Written Illustrated Notes", author: "Prof. Arun Kumar (MEC)", mod: "Mod 1-5", pages: 165, size: "14.2 MB", verified: true },
        { title: "Tree & Graph Algorithms Quick Revision Sheet", author: "CSE Peer Team", mod: "Mod 4 & 5", pages: 28, size: "2.4 MB", verified: true },
        { title: "C Implementation Code Snippets for All Data Structures", author: "Lab Repository", mod: "Practical / Code", pages: 45, size: "3.0 MB", verified: true }
      ],
      syllabusUrl: "#"
    },
    {
      id: "cst203",
      code: "CST 203",
      name: "Logic System Design",
      branch: ["CS", "AD"],
      sem: "S3",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Program Core",
      verified: true,
      modules: [
        { num: 1, title: "Number Systems & Boolean Algebra", topics: "Binary arithmetic, 1's and 2's complements, BCD codes, Gray code, Boolean theorems, DeMorgan's laws, SOP & POS forms." },
        { num: 2, title: "Gate-Level Minimization", topics: "Karnaugh Map (K-Map) minimization up to 5 variables, Quine-McCluskey tabulation method, NAND/NOR implementations, Hazards." },
        { num: 3, title: "Combinational Logic Circuits", topics: "Adders, Subtractors, Fast carry look-ahead adder, Magnitude comparators, Encoders, Decoders, Multiplexers, De-multiplexers, Parity generators." },
        { num: 4, title: "Sequential Logic Design & Flip Flops", topics: "Latches, Flip-flops (SR, JK, D, T), Master-slave JK flip flop, Conversion between flip-flops, State table, State diagram, State reduction." },
        { num: 5, title: "Registers, Counters & Memory", topics: "Shift registers, Ripple counters, Synchronous counters, Up/Down counters, Ring counter, Johnson counter, ROM, PLA, PAL." }
      ],
      pyqs: [
        { year: "2024", session: "Jan Regular", solved: true, solutionKey: "Complete Step-by-Step Solved", type: "Regular", size: "2.7 MB", downloads: 4100 },
        { year: "2023", session: "Dec Regular", solved: true, solutionKey: "Official Key", type: "Regular", size: "2.2 MB", downloads: 5800 },
        { year: "2023", session: "July Supplementary", solved: false, type: "Supply", size: "1.8 MB", downloads: 2700 }
      ],
      notes: [
        { title: "LSD Complete Module 1-5 Illustrated Lecture Notes", author: "Prof. Geetha R. (GEC Thrissur)", mod: "All Modules", pages: 132, size: "9.8 MB", verified: true },
        { title: "K-Map & Counter Design Solved Problems Booklet", author: "ECE/CSE Combined Faculty", mod: "Mod 2, 4, 5", pages: 52, size: "4.5 MB", verified: true }
      ],
      syllabusUrl: "#"
    },
    {
      id: "mat203",
      code: "MAT 203",
      name: "Discrete Mathematical Structures",
      branch: ["CS", "AD"],
      sem: "S3",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Basic Science",
      verified: true,
      modules: [
        { num: 1, title: "Propositional Logic and Set Theory", topics: "Propositions, Logical connectives, Truth tables, Tautologies, Predicate calculus, Quantifiers, Rules of inference." },
        { num: 2, title: "Relations, Functions and Recurrence Relations", topics: "Equivalence relations, Partial orderings, Hasse diagrams, Lattices, Generating functions, Linear recurrence relations." },
        { num: 3, title: "Algebraic Structures", topics: "Semigroups, Monoids, Groups, Subgroups, Cosets, Lagrange's theorem, Homomorphism, Rings and Fields." },
        { num: 4, title: "Graph Theory Fundamentals", topics: "Graphs, Subgraphs, Paths, Cycles, Euler trails and circuits, Hamiltonian paths, Planar graphs, Euler's formula, Graph coloring." },
        { num: 5, title: "Trees and Spanning Forests", topics: "Trees, Properties of trees, Rooted trees, Spanning trees, Minimal spanning trees (Prim's & Kruskal's algorithms)." }
      ],
      pyqs: [
        { year: "2024", session: "Jan Regular", solved: true, solutionKey: "Detailed Proofs & Key", type: "Regular", size: "2.9 MB", downloads: 4900 },
        { year: "2023", session: "Dec Regular", solved: true, solutionKey: "Verified Key", type: "Regular", size: "2.3 MB", downloads: 6400 },
        { year: "2022", session: "Dec Regular", solved: true, type: "Regular", size: "2.4 MB", downloads: 5200 }
      ],
      notes: [
        { title: "Discrete Math Complete Handwritten Notes with Proofs", author: "Dr. Vinod P. (CET)", mod: "Mod 1-5", pages: 140, size: "11.5 MB", verified: true },
        { title: "Recurrence Relations & Graph Theory Solved Problems", author: "Prof. Latha M.", mod: "Mod 2, 4, 5", pages: 38, size: "3.2 MB", verified: true }
      ],
      syllabusUrl: "#"
    },

    // S4 CSE / AI & DS
    {
      id: "cst202",
      code: "CST 202",
      name: "Computer Organization and Architecture",
      branch: ["CS", "AD"],
      sem: "S4",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Program Core",
      verified: true,
      modules: [
        { num: 1, title: "Basic Structure & Machine Instructions", topics: "Functional units, Bus structures, Memory operations, Instructions and instruction sequencing, Addressing modes, CISC vs RISC." },
        { num: 2, title: "Computer Arithmetic Operations", topics: "Addition and subtraction of signed numbers, Fast adders, Booth's multiplication algorithm, Restoring & Non-restoring division, IEEE 754 floating point standard." },
        { num: 3, title: "Processing Unit & Control Design", topics: "Fundamental concepts, Execution of a complete instruction, Multiple bus organization, Hardwired control, Microprogrammed control unit." },
        { num: 4, title: "Memory System Architecture", topics: "Memory hierarchy, Cache memory mapping techniques (Direct, Associative, Set-associative), Replacement algorithms, Virtual memory, TLB, Page replacement." },
        { num: 5, title: "Pipelining and Input/Output Organization", topics: "Pipelining concepts, Pipeline hazards (Structural, Data, Control), Interrupts, DMA controllers, Bus arbitration." }
      ],
      pyqs: [
        { year: "2024", session: "June Regular", solved: true, solutionKey: "Official Solved Key", type: "Regular", size: "2.8 MB", downloads: 3980 },
        { year: "2023", session: "June Regular", solved: true, solutionKey: "Verified Faculty Key", type: "Regular", size: "2.4 MB", downloads: 5700 },
        { year: "2023", session: "Jan Supplementary", solved: false, type: "Supply", size: "1.9 MB", downloads: 2200 },
        { year: "2022", session: "June Regular", solved: true, type: "Regular", size: "2.2 MB", downloads: 4800 }
      ],
      notes: [
        { title: "COA Complete Module 1-5 Lecture Notes with Diagrams", author: "Prof. Thomas K. (GECB)", mod: "All Modules", pages: 155, size: "11.2 MB", verified: true },
        { title: "Booth's Algorithm & Cache Mapping Solved Problems", author: "Academic Resource Team", mod: "Mod 2 & 4", pages: 30, size: "2.6 MB", verified: true }
      ],
      syllabusUrl: "#"
    },
    {
      id: "cst204",
      code: "CST 204",
      name: "Database Management Systems",
      branch: ["CS", "AD"],
      sem: "S4",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Program Core",
      verified: true,
      modules: [
        { num: 1, title: "Introduction & Database Architecture", topics: "DBMS concepts, Data models, 3-Schema architecture, Entity-Relationship (ER) model, Extended ER features, ER to Relational schema mapping." },
        { num: 2, title: "Relational Model & Relational Algebra", topics: "Relational integrity constraints, Relational algebra operations, Tuple relational calculus, Domain relational calculus." },
        { num: 3, title: "SQL & Relational Database Design", topics: "DDL, DML, DCL, Aggregate functions, Subqueries, Joins, Views, Functional dependencies, Normalization (1NF, 2NF, 3NF, BCNF, 4NF)." },
        { num: 4, title: "Transaction Management and Concurrency", topics: "ACID properties, Serializability, Conflict & View serializability, Lock-based protocols, 2-Phase Locking (2PL), Deadlock handling, Timestamp-based ordering." },
        { num: 5, title: "Indexing, Hashing and Query Optimization", topics: "File organization, Primary, Secondary, Clustering indexes, B-trees, B+ trees, Query processing steps, Heuristic query optimization." }
      ],
      pyqs: [
        { year: "2024", session: "June Regular", solved: true, solutionKey: "Complete SQL & Normalization Solved", type: "Regular", size: "3.2 MB", downloads: 5900 },
        { year: "2023", session: "June Regular", solved: true, solutionKey: "Official Scheme Key", type: "Regular", size: "2.5 MB", downloads: 7200 },
        { year: "2022", session: "June Regular", solved: true, type: "Regular", size: "2.6 MB", downloads: 6100 }
      ],
      notes: [
        { title: "DBMS Comprehensive Notes with ER Diagrams & SQL Queries", author: "Dr. Anjali R. (TKMCE)", mod: "All Modules", pages: 142, size: "9.4 MB", verified: true },
        { title: "Normalization & Serializability Step-by-Step Solved Guide", author: "Prof. Manoj V.", mod: "Mod 3 & 4", pages: 36, size: "3.1 MB", verified: true }
      ],
      syllabusUrl: "#"
    },
    {
      id: "cst206",
      code: "CST 206",
      name: "Operating Systems",
      branch: ["CS", "AD"],
      sem: "S4",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Program Core",
      verified: true,
      modules: [
        { num: 1, title: "OS Overview and Process Management", topics: "Operating system operations, Dual mode, System calls, Process concept, PCB, Process scheduling, Context switch, IPC, Threads." },
        { num: 2, title: "CPU Scheduling and Process Synchronization", topics: "Scheduling criteria, FCFS, SJF, SRTF, Priority, Round Robin, Critical section problem, Peterson's solution, Semaphores, Monitors, Classical sync problems." },
        { num: 3, title: "Deadlocks and Prevention", topics: "Deadlock characterization, Resource allocation graph, Deadlock prevention, Deadlock avoidance, Banker's algorithm, Detection and Recovery." },
        { num: 4, title: "Memory Management Strategies", topics: "Contiguous allocation, Paging, Segmentation, Virtual memory, Demand paging, Page replacement algorithms (FIFO, LRU, Optimal), Thrashing." },
        { num: 5, title: "Storage and File Systems", topics: "File concept, Access methods, Directory structure, Disk scheduling algorithms (FCFS, SSTF, SCAN, C-SCAN, LOOK), RAID structure." }
      ],
      pyqs: [
        { year: "2024", session: "June Regular", solved: true, solutionKey: "Full Numericals & Proofs", type: "Regular", size: "2.9 MB", downloads: 6100 },
        { year: "2023", session: "June Regular", solved: true, solutionKey: "Verified Key", type: "Regular", size: "2.3 MB", downloads: 8300 },
        { year: "2022", session: "June Regular", solved: true, type: "Regular", size: "2.5 MB", downloads: 6700 }
      ],
      notes: [
        { title: "Operating Systems Complete Hand-Annotated Lecture Series", author: "Prof. Suresh Kumar (CET)", mod: "All Modules", pages: 150, size: "10.8 MB", verified: true },
        { title: "CPU Scheduling, Banker's Algorithm & Page Replacement Solved Bank", author: "OS Peer Cell", mod: "Mod 2, 3, 4", pages: 44, size: "3.7 MB", verified: true }
      ],
      syllabusUrl: "#"
    },

    // S5 CSE / AI & DS
    {
      id: "cst301",
      code: "CST 301",
      name: "Formal Languages and Automata Theory",
      branch: ["CS", "AD"],
      sem: "S5",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Program Core",
      verified: true,
      modules: [
        { num: 1, title: "Finite Automata and Regular Languages", topics: "Deterministic Finite Automata (DFA), NFA, NFA to DFA conversion, NFA with epsilon transitions, Equivalence of DFA and NFA, Minimization of DFA." },
        { num: 2, title: "Regular Expressions and Properties", topics: "Regular expressions, Conversion between FA and Regular Expressions, Arden's theorem, Pumping Lemma for regular languages, Closure properties." },
        { num: 3, title: "Context-Free Grammars and Languages", topics: "Chomsky hierarchy, Context-Free Grammars (CFG), Parse trees, Ambiguity in CFG, Simplification of CFG, Chomsky Normal Form (CNF), Greibach Normal Form (GNF)." },
        { num: 4, title: "Pushdown Automata (PDA)", topics: "Pushdown automata definition, Acceptance by empty stack and final state, Equivalence of PDA and CFG, Deterministic PDA, Pumping Lemma for CFL." },
        { num: 5, title: "Turing Machines and Undecidability", topics: "Turing Machine (TM) definition and design, Modifications of TM, Church-Turing thesis, Universal TM, Halting problem, Post Correspondence Problem (PCP)." }
      ],
      pyqs: [
        { year: "2024", session: "Dec Regular", solved: true, solutionKey: "Complete Step-by-Step DFA/PDA Proofs", type: "Regular", size: "3.4 MB", downloads: 4800 },
        { year: "2023", session: "Dec Regular", solved: true, solutionKey: "Official Scheme Key", type: "Regular", size: "2.7 MB", downloads: 6300 },
        { year: "2023", session: "June Supply", solved: false, type: "Supply", size: "2.1 MB", downloads: 2900 }
      ],
      notes: [
        { title: "FLAT Complete Module 1-5 Lecture Notes with 100+ Automata Diagrams", author: "Dr. Binu Joy (RIT)", mod: "All Modules", pages: 172, size: "13.6 MB", verified: true },
        { title: "Turing Machine & PDA Construction Masterclass Booklet", author: "Prof. Priya Nair", mod: "Mod 4 & 5", pages: 48, size: "4.1 MB", verified: true }
      ],
      syllabusUrl: "#"
    },
    {
      id: "cst303",
      code: "CST 303",
      name: "Computer Networks",
      branch: ["CS", "AD"],
      sem: "S5",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Program Core",
      verified: true,
      modules: [
        { num: 1, title: "Layered Architecture and Physical Layer", topics: "OSI reference model, TCP/IP protocol suite, Physical transmission media, Data encoding, Circuit switching, Packet switching." },
        { num: 2, title: "Data Link Layer & MAC Sublayer", topics: "Framing, Error detection and correction (CRC, Hamming code), Sliding window protocols (Stop-and-Wait, Go-Back-N, Selective Repeat), CSMA/CD, Ethernet." },
        { num: 3, title: "Network Layer and Routing", topics: "IPv4 & IPv6 addressing, Subnetting, CIDR, ARP, RARP, DHCP, Routing algorithms: Distance Vector (Bellman-Ford), Link State (Dijkstra), OSPF, BGP." },
        { num: 4, title: "Transport Layer Protocols", topics: "TCP vs UDP, TCP connection establishment (3-way handshake) and termination, Flow control, TCP congestion control algorithms (Slow start, Congestion avoidance)." },
        { num: 5, title: "Application Layer & Network Security", topics: "DNS, HTTP, HTTPS, SMTP, FTP, Basics of cryptography: Symmetric (DES, AES), Asymmetric (RSA), Digital signatures, Firewalls." }
      ],
      pyqs: [
        { year: "2024", session: "Dec Regular", solved: true, solutionKey: "Subnetting & Routing Solved", type: "Regular", size: "3.0 MB", downloads: 5100 },
        { year: "2023", session: "Dec Regular", solved: true, solutionKey: "Official Scheme Key", type: "Regular", size: "2.5 MB", downloads: 6800 }
      ],
      notes: [
        { title: "Computer Networks Complete Illustrated Study Guide", author: "Prof. Harikrishnan (MEC)", mod: "All Modules", pages: 156, size: "11.0 MB", verified: true },
        { title: "Subnetting, CRC & Dijkstra Solved Numerical Handbook", author: "Academic Network Lab", mod: "Mod 2 & 3", pages: 34, size: "2.9 MB", verified: true }
      ],
      syllabusUrl: "#"
    },

    // S6 CSE
    {
      id: "cst302",
      code: "CST 302",
      name: "Compiler Design",
      branch: ["CS"],
      sem: "S6",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Program Core",
      verified: true,
      modules: [
        { num: 1, title: "Introduction and Lexical Analysis", topics: "Phases of a compiler, Compiler construction tools, Lexical analysis, Role of lexical analyzer, Regular expressions to DFA, LEX tool." },
        { num: 2, title: "Syntax Analysis & Top-Down Parsing", topics: "Role of parser, Context-free grammars, Top-down parsing, Recursive descent parser, LL(1) parsers, First and Follow sets calculation." },
        { num: 3, title: "Bottom-Up Parsing", topics: "Shift-reduce parsing, Operator precedence parsing, LR parsing (LR(0), SLR(1), CLR(1), LALR(1)), YACC tool." },
        { num: 4, title: "Syntax-Directed Translation & Intermediate Code", topics: "Syntax-directed definitions (SDD), Synthesized and Inherited attributes, Intermediate code forms: 3-Address code, Quadruples, Triples." },
        { num: 5, title: "Code Optimization & Target Code Generation", topics: "Principal sources of optimization, Loop optimization, Basic blocks and Flow graphs, DAG representation of basic blocks, Code generation algorithms." }
      ],
      pyqs: [
        { year: "2024", session: "June Regular", solved: true, solutionKey: "LR Parsing Tables Fully Worked Out", type: "Regular", size: "3.3 MB", downloads: 4200 },
        { year: "2023", session: "June Regular", solved: true, solutionKey: "Official Solution Key", type: "Regular", size: "2.6 MB", downloads: 5900 }
      ],
      notes: [
        { title: "Compiler Design Master Handbook with Parsing Tables", author: "Dr. Lakshmi V. (CET)", mod: "All Modules", pages: 168, size: "12.8 MB", verified: true },
        { title: "LL(1) and LR(1) Parser Table Construction Solved Bank", author: "Prof. Rajesh P.", mod: "Mod 2 & 3", pages: 40, size: "3.5 MB", verified: true }
      ],
      syllabusUrl: "#"
    },

    // S7 CSE
    {
      id: "cst401",
      code: "CST 401",
      name: "Artificial Intelligence",
      branch: ["CS", "AD"],
      sem: "S7",
      schemes: ["2024", "2019"],
      credits: 3,
      category: "Program Core",
      verified: true,
      modules: [
        { num: 1, title: "Introduction & Search Strategies", topics: "AI definitions, Intelligent agents, Uninformed search (BFS, DFS, Uniform cost search), Heuristic search (A*, AO*, Hill climbing, Greedy best-first)." },
        { num: 2, title: "Game Playing and Constraint Satisfaction", topics: "Adversarial search, Minimax algorithm, Alpha-Beta pruning, Constraint Satisfaction Problems (CSP), Backtracking search for CSP." },
        { num: 3, title: "Knowledge Representation & Logic", topics: "Propositional logic, First-order predicate logic (FOPL), Unification, Resolution theorem proving, Ontological engineering." },
        { num: 4, title: "Planning and Reasoning under Uncertainty", topics: "Classical planning, STRIPS, Plan space planning, Probabilistic reasoning, Bayesian networks, Conditional probability." },
        { num: 5, title: "Machine Learning & Natural Language Processing", topics: "Supervised & unsupervised learning concepts, Decision trees, Neural networks basics, NLP phases, Expert systems." }
      ],
      pyqs: [
        { year: "2024", session: "Dec Regular", solved: true, solutionKey: "A* & Alpha-Beta Pruning Solved", type: "Regular", size: "2.9 MB", downloads: 3700 },
        { year: "2023", session: "Dec Regular", solved: true, solutionKey: "Verified Key", type: "Regular", size: "2.4 MB", downloads: 4900 }
      ],
      notes: [
        { title: "Artificial Intelligence Complete Exam Companion", author: "Dr. Sreeja K. (GECT)", mod: "All Modules", pages: 135, size: "9.2 MB", verified: true }
      ],
      syllabusUrl: "#"
    },

    // ECE Specific Subjects
    {
      id: "ect201",
      code: "ECT 201",
      name: "Solid State Devices",
      branch: ["EC"],
      sem: "S3",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Program Core",
      verified: true,
      modules: [
        { num: 1, title: "Semiconductor Physics", topics: "Energy bands in solids, Intrinsic & extrinsic semiconductors, Carrier transport, Drift & Diffusion, Hall effect." },
        { num: 2, title: "PN Junction Diode", topics: "PN junction under equilibrium and bias, Current components, Diode switching characteristics, Varactor, Zener, Tunnel diode." },
        { num: 3, title: "Bipolar Junction Transistors (BJT)", topics: "BJT fundamentals, Minority carrier profiles, Ebers-Moll model, Breakdown mechanisms." },
        { num: 4, title: "Junction Field Effect Transistors (JFET) and MESFET", topics: "JFET characteristics, Pinch-off voltage, High frequency operation, MESFET." },
        { num: 5, title: "MOSFET Physics and Operation", topics: "MOS capacitor, Accumulation, Depletion, Inversion, Threshold voltage, MOSFET I-V characteristics, Short channel effects." }
      ],
      pyqs: [
        { year: "2024", session: "Jan Regular", solved: true, solutionKey: "Derivations & Numericals Solved", type: "Regular", size: "3.2 MB", downloads: 3100 },
        { year: "2023", session: "Dec Regular", solved: true, solutionKey: "Verified Scheme Key", type: "Regular", size: "2.6 MB", downloads: 4300 }
      ],
      notes: [
        { title: "Solid State Devices Complete Derivation Handbook", author: "Prof. Murali K. (CET)", mod: "All Modules", pages: 146, size: "11.4 MB", verified: true }
      ],
      syllabusUrl: "#"
    },

    // Mechanical Engineering Specific Subjects
    {
      id: "met201",
      code: "MET 201",
      name: "Mechanics of Solids",
      branch: ["ME", "CE"],
      sem: "S3",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Program Core",
      verified: true,
      modules: [
        { num: 1, title: "Stress, Strain and Deformation of Solids", topics: "Stress-strain curves, Hooke's law, Elastic constants, Thermal stresses, Compound bars." },
        { num: 2, title: "Principal Stresses and Mohr's Circle", topics: "2D stress state, Principal planes, Principal stresses, Mohr's circle of stress, Theories of failure." },
        { num: 3, title: "Shear Force and Bending Moment", topics: "Beams, Types of loading, SFD and BMD for simply supported, cantilever and overhanging beams." },
        { num: 4, title: "Stresses in Beams & Deflection", topics: "Pure bending equation, Section modulus, Shear stress distribution in beams, Double integration and Macaulay's methods." },
        { num: 5, title: "Torsion of Shafts and Thin/Thick Cylinders", topics: "Torsion equation, Polar modulus, Power transmitted by shafts, Stresses in thin and thick cylindrical shells." }
      ],
      pyqs: [
        { year: "2024", session: "Jan Regular", solved: true, solutionKey: "SFD & BMD Diagrams Solved", type: "Regular", size: "3.5 MB", downloads: 4600 },
        { year: "2023", session: "Dec Regular", solved: true, solutionKey: "Official Key", type: "Regular", size: "2.8 MB", downloads: 5800 }
      ],
      notes: [
        { title: "Mechanics of Solids Hand-drawn SFD/BMD Problem Book", author: "Dr. Radhakrishnan (NSSCE)", mod: "All Modules", pages: 160, size: "13.2 MB", verified: true }
      ],
      syllabusUrl: "#"
    },

    // Electrical Engineering Specific Subjects
    {
      id: "eet201",
      code: "EET 201",
      name: "Circuits and Networks",
      branch: ["EE"],
      sem: "S3",
      schemes: ["2024", "2019"],
      credits: 4,
      category: "Program Core",
      verified: true,
      modules: [
        { num: 1, title: "Network Theorems and DC Analysis", topics: "Thevenin's, Norton's, Superposition, Maximum Power Transfer, Tellegen's theorems applied to DC/AC circuits." },
        { num: 2, title: "Transient Response in DC & AC Circuits", topics: "First and second order RL, RC, and RLC transient response using Laplace transform methods." },
        { num: 3, title: "Resonance and Coupled Circuits", topics: "Series and Parallel resonance, Q-factor, Selectivity, Dot convention in magnetically coupled circuits." },
        { num: 4, title: "Two-Port Network Parameters", topics: "Z, Y, ABCD, and h parameters, Inter-relationships, Symmetrical two-port networks." },
        { num: 5, title: "Network Synthesis & Filter Design", topics: "Hurwitz polynomials, Positive real functions, Foster and Cauer forms of LC, RC, RL synthesis." }
      ],
      pyqs: [
        { year: "2024", session: "Jan Regular", solved: true, solutionKey: "Circuit Theorems & Laplace Solved", type: "Regular", size: "3.1 MB", downloads: 3400 },
        { year: "2023", session: "Dec Regular", solved: true, solutionKey: "Faculty Solved", type: "Regular", size: "2.4 MB", downloads: 4200 }
      ],
      notes: [
        { title: "Circuits & Networks Complete Master Series", author: "Prof. Sivadas (GEC Thrissur)", mod: "All Modules", pages: 152, size: "10.9 MB", verified: true }
      ],
      syllabusUrl: "#"
    }
  ],

  // Sample KTU Question Paper Previews for the interactive PDF viewer
  samplePapers: {
    "cst201-2024-reg": {
      title: "APJ ABDUL KALAM TECHNOLOGICAL UNIVERSITY",
      examTitle: "THIRD SEMESTER B.TECH DEGREE EXAMINATION, JANUARY 2024",
      courseCode: "CST 201",
      courseName: "DATA STRUCTURES",
      scheme: "2024 / 2019 Scheme",
      maxMarks: 100,
      duration: "3 Hours",
      parts: [
        {
          name: "PART A",
          instruction: "Answer all questions, each carries 3 marks.",
          questions: [
            { qNo: "1", text: "Differentiate between linear and non-linear data structures with an example for each.", marks: 3 },
            { qNo: "2", text: "Find the Big-O time complexity of the following code snippet and justify your answer.", marks: 3 },
            { qNo: "3", text: "Write the algorithm to evaluate a postfix expression using a stack.", marks: 3 },
            { qNo: "4", text: "Explain the disadvantage of a simple linear queue and how circular queue overcomes it.", marks: 3 },
            { qNo: "5", text: "Compare array representation of a list with linked list representation.", marks: 3 },
            { qNo: "6", text: "Define complete binary tree and strictly binary tree with suitable diagrams.", marks: 3 },
            { qNo: "7", text: "Construct a Binary Search Tree (BST) for the keys: 45, 12, 67, 34, 89, 23, 56.", marks: 3 },
            { qNo: "8", text: "What is an AVL Tree? Explain the need for balance factor in AVL trees.", marks: 3 },
            { qNo: "9", text: "Define collision in hashing. What are the common collision resolution techniques?", marks: 3 },
            { qNo: "10", text: "Trace the Quick Sort algorithm for the array: [28, 14, 65, 33, 72, 10].", marks: 3 }
          ]
        },
        {
          name: "PART B",
          instruction: "Answer any one full question from each module, each carries 14 marks.",
          modules: [
            {
              module: "MODULE 1",
              questions: [
                { qNo: "11. (a)", text: "Represent the sparse matrix using 3-tuple form and write an algorithm for fast transpose of a sparse matrix.", marks: 8 },
                { qNo: "11. (b)", text: "Explain Asymptotic notations Big-O, Omega, and Theta with mathematical definitions and graphical illustrations.", marks: 6 },
                { qNo: "12. (a)", text: "Write a C program to multiply two polynomials represented using arrays.", marks: 8 },
                { qNo: "12. (b)", text: "Explain Space-Time Tradeoff in algorithm design with a suitable example.", marks: 6 }
              ]
            },
            {
              module: "MODULE 2",
              questions: [
                { qNo: "13. (a)", text: "Convert the infix expression ((A + B) * C - (D - E)) ^ (F + G) into postfix expression using tabular stack trace method.", marks: 8 },
                { qNo: "13. (b)", text: "Write C functions for enqueue and dequeue operations in a Circular Queue.", marks: 6 },
                { qNo: "14. (a)", text: "Explain the implementation of Double Ended Queue (Deque) and write algorithms for insertion at both ends.", marks: 8 },
                { qNo: "14. (b)", text: "How can multiple stacks be efficiently implemented within a single one-dimensional array?", marks: 6 }
              ]
            },
            {
              module: "MODULE 3",
              questions: [
                { qNo: "15. (a)", text: "Write complete algorithms to insert and delete a node at any specified position in a Doubly Linked List.", marks: 9 },
                { qNo: "15. (b)", text: "Write an algorithm to reverse a singly linked list without using auxiliary storage.", marks: 5 },
                { qNo: "16. (a)", text: "Write an algorithm to add two polynomials represented using Singly Linked Lists.", marks: 8 },
                { qNo: "16. (b)", text: "Explain Circular Linked List and write an algorithm to delete the last node in a circular list.", marks: 6 }
              ]
            },
            {
              module: "MODULE 4",
              questions: [
                { qNo: "17. (a)", text: "Given the Inorder traversal: D B E A F C G and Preorder traversal: A B D E C F G, construct the unique binary tree.", marks: 8 },
                { qNo: "17. (b)", text: "Write iterative algorithms for Preorder and Inorder traversals of a binary tree.", marks: 6 },
                { qNo: "18. (a)", text: "Explain AVL Tree rotations (LL, RR, LR, RL) with clear diagrams for each case.", marks: 8 },
                { qNo: "18. (b)", text: "Write algorithms to insert and delete a key from a Binary Search Tree (BST).", marks: 6 }
              ]
            },
            {
              module: "MODULE 5",
              questions: [
                { qNo: "19. (a)", text: "Explain Depth First Search (DFS) and Breadth First Search (BFS) graph traversal algorithms with tracing on a sample graph.", marks: 8 },
                { qNo: "19. (b)", text: "Explain Hash function methods (Division, Mid-square, Folding) and Quadratic Probing collision handling.", marks: 6 },
                { qNo: "20. (a)", text: "Explain Merge Sort algorithm with a worked example and derive its time complexity recurrence relation.", marks: 8 },
                { qNo: "20. (b)", text: "Construct a Max Heap for the elements: 15, 20, 7, 9, 30, 25, 40 and show the delete-max operation step.", marks: 6 }
              ]
            }
          ]
        }
      ]
    }
  }
};
