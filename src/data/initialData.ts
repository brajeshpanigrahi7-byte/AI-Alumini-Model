import { 
  UserProfile, 
  Assessment, 
  Opportunity, 
  LearningProgram, 
  DocumentItem, 
  MentorshipSession, 
  Application,
  NotificationItem,
  HelpCategory,
  HelpArticle,
  FAQItem,
  SupportTicket,
  SessionInfo
} from '../types';

export const initialUserProfile: UserProfile = {
  id: 'usr_brajesh_01',
  name: 'Brajesh',
  email: 'brajeshpanigrahi7@gmail.com',
  title: 'Senior Data Analyst | Enterprise Operations',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvIFryGeZhW2_6QT4ZOGkLkLicIBavQaCCv83Z27nG_Mmb8s0iadNzAn8mecc3yUeARbDtlRVA4bknRtfnz-ULcXWbR5XXvfA0iSwCfHyCoC1SvMkEcVuf_hkYnwU1kP8S-OXuvXYkUtAob5Kk-rJ2dICHUKFWI5AG4EZghK-Ir54yHMtdIHqhRRZOUTnD_D2QwOX1ctOJJ9RKeD02anBiNGgbtHSV75YP8ViqE47Ljh7xxR8GZFmYyA',
  role: 'student',
  location: 'New York, NY',
  verified: true,
  completionPercentage: 85,
  institution: 'Columbia University School of Engineering',
  department: 'Data Science & Applied Statistics',
  gpa: '3.92 / 4.00',
  graduationYear: '2024',
  bio: 'Passionate Data Analyst & Machine Learning Practitioner with solid grounding in Python, SQL data pipelines, predictive modeling, and enterprise business intelligence. Seeking high-impact analytics and engineering internships & full-time roles.',
  resumeUrl: '#',
  linkedin: 'https://linkedin.com/in/brajesh-demo',
  github: 'https://github.com/brajesh-nexus',
  milestones: [
    {
      id: 'm1',
      title: 'Degree Completed',
      date: 'June 2022',
      category: 'education',
      description: "Successfully graduated with a Bachelor's degree in Data Science, specializing in statistical analysis and machine learning.",
      issuer: 'Columbia University',
      verified: true,
      verificationHash: '0x8f2d...b14e'
    },
    {
      id: 'm2',
      title: 'Verified Python Certification',
      date: 'August 2023',
      category: 'certification',
      description: 'Earned professional certification in Python for Data Science, covering advanced libraries like Pandas, NumPy, and Scikit-Learn.',
      issuer: 'Google Cloud & Python Institute',
      verified: true,
      verificationHash: '0x3c99...e72a'
    },
    {
      id: 'm3',
      title: 'First Industry Internship',
      date: 'January 2024',
      category: 'internship',
      description: 'Completed a high-impact internship at a leading tech firm, contributing to real-world enterprise data pipelines.',
      issuer: 'Nexus Enterprise Analytics Lab',
      verified: true,
      verificationHash: '0x71a2...9d10'
    },
    {
      id: 'm4',
      title: 'Advanced UI/UX Certification',
      date: 'March 2024',
      category: 'certification',
      description: 'Mastered user-centric design principles and prototyping to bridge the gap between data insights and user experience.',
      issuer: 'Interaction Design Foundation',
      verified: true,
      verificationHash: '0xaa40...12cf'
    }
  ],
  skills: [
    { id: 's1', name: 'Python & Pandas', category: 'Technical', proficiency: 92, verified: true, verifiedBy: 'Python Institute Assessment', endorsementsCount: 28, industryBenchmark: 85 },
    { id: 's2', name: 'SQL & Data Warehousing', category: 'Technical', proficiency: 88, verified: true, verifiedBy: 'Snowflake / BigQuery Exam', endorsementsCount: 24, industryBenchmark: 80 },
    { id: 's3', name: 'Machine Learning (Scikit-Learn)', category: 'Technical', proficiency: 84, verified: true, verifiedBy: 'University Lab Head', endorsementsCount: 19, industryBenchmark: 75 },
    { id: 's4', name: 'Cloud Pipelines (GCP / BigQuery)', category: 'Technical', proficiency: 76, verified: true, verifiedBy: 'Google Cloud Certification', endorsementsCount: 15, industryBenchmark: 78 },
    { id: 's5', name: 'Tableau & PowerBI', category: 'Analytical', proficiency: 90, verified: true, verifiedBy: 'Enterprise Projects', endorsementsCount: 31, industryBenchmark: 70 },
    { id: 's6', name: 'Statistical Modeling & A/B Testing', category: 'Analytical', proficiency: 82, verified: true, verifiedBy: 'Academic Department', endorsementsCount: 16, industryBenchmark: 80 },
    { id: 's7', name: 'Stakeholder Communication', category: 'Soft Skills', proficiency: 89, verified: true, verifiedBy: 'Industry Mentor Feedback', endorsementsCount: 22, industryBenchmark: 85 },
    { id: 's8', name: 'Agile & Scrum Delivery', category: 'Soft Skills', proficiency: 85, verified: true, verifiedBy: 'Nexus Internship Lead', endorsementsCount: 18, industryBenchmark: 80 },
    { id: 's9', name: 'Docker & Kubernetes (MLOps)', category: 'Technical', proficiency: 58, verified: false, endorsementsCount: 6, industryBenchmark: 75 },
    { id: 's10', name: 'Distributed Spark / PySpark', category: 'Technical', proficiency: 62, verified: false, endorsementsCount: 8, industryBenchmark: 78 }
  ],
  certifications: [
    {
      id: 'c1',
      name: 'Google Professional Data Engineer',
      issuer: 'Google Cloud Platform',
      issueDate: 'Oct 2023',
      expiryDate: 'Oct 2025',
      credentialId: 'GCP-DE-99412',
      credentialUrl: 'https://cloud.google.com/certification',
      verified: true,
      badgeIcon: 'cloud',
      skills: ['BigQuery', 'Dataflow', 'Cloud Storage', 'Vertex AI']
    },
    {
      id: 'c2',
      name: 'Python for Data Science & ML Masterclass',
      issuer: 'DataCamp & IBM Industry Badge',
      issueDate: 'Aug 2023',
      credentialId: 'IBM-PY-88301',
      credentialUrl: 'https://ibm.com/credentials',
      verified: true,
      badgeIcon: 'code',
      skills: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-Learn']
    },
    {
      id: 'c3',
      name: 'Enterprise Tableau Desktop Certified Associate',
      issuer: 'Salesforce Tableau',
      issueDate: 'Jan 2024',
      credentialId: 'TAB-DA-2024-771',
      credentialUrl: 'https://tableau.com/verify',
      verified: true,
      badgeIcon: 'bar_chart',
      skills: ['Dashboard Design', 'LOD Expressions', 'Data Prep']
    }
  ],
  projects: [
    {
      id: 'p1',
      title: 'Predictive Churn Intelligence Engine',
      role: 'Lead ML Engineer',
      duration: '4 Months (2024)',
      description: 'Engineered an end-to-end customer churn prediction pipeline processing 1.2M transactions using XGBoost and SHAP explainability, reducing customer attrition risk by 18%.',
      techStack: ['Python', 'XGBoost', 'PostgreSQL', 'FastAPI', 'Streamlit'],
      githubUrl: 'https://github.com/brajesh/churn-engine',
      liveUrl: 'https://churn-demo.nexus.org',
      verifiedByFaculty: 'Prof. Marcus Vance (Columbia Univ)',
      industryPartner: 'FinTech Dynamics Corp'
    },
    {
      id: 'p2',
      title: 'Real-time Supply Chain Telemetry Dashboard',
      role: 'Data Architect',
      duration: '3 Months (2023)',
      description: 'Architected automated ETL workflows streaming IoT sensor data into BigQuery with sub-minute latency alerts and interactive Tableau executive dashboards.',
      techStack: ['Google Cloud Pub/Sub', 'BigQuery', 'Tableau', 'Python'],
      githubUrl: 'https://github.com/brajesh/iot-supply-etl',
      verifiedByFaculty: 'Dr. Elena Rostova',
      industryPartner: 'Global Logistics Alliance'
    }
  ]
};

export const initialAssessments: Assessment[] = [
  {
    id: 'as_python_data',
    title: 'Industry Python & Data Engineering Benchmark',
    domain: 'Data Science & Analytics',
    description: 'Evaluate practical Python programming, vectorization, Pandas optimization, and SQL data transformations curated by top tech employers.',
    durationMinutes: 15,
    questionCount: 5,
    targetRole: 'Data Analyst / ML Engineer',
    industryPartner: 'Nexus Tech Advisory Council',
    badgeName: 'Python Data Pro 2026',
    completed: true,
    lastScore: 92,
    lastTakenDate: '2026-08-15',
    questions: [
      {
        id: 'q1',
        question: 'Which Pandas method provides the fastest computation when applying element-wise operations on large DataFrames (10M+ rows)?',
        options: [
          'df.apply(custom_func, axis=1)',
          'Vectorized NumPy/Pandas operations or df.eval()',
          'Iterating with for index, row in df.iterrows()',
          'Standard Python list comprehension with zip()'
        ],
        correctAnswer: 1,
        explanation: 'Vectorized operations execute in optimized C-level contiguous memory blocks without Python interpreter overhead.',
        skillTag: 'Pandas Vectorization',
        difficulty: 'Intermediate'
      },
      {
        id: 'q2',
        question: 'In SQL, what is the key difference between a window function (e.g. ROW_NUMBER() OVER()) and a GROUP BY clause?',
        options: [
          'Window functions retain individual row identities while computing aggregates; GROUP BY collapses rows.',
          'GROUP BY runs on the client; window functions run on the database server.',
          'Window functions can only calculate sums, not averages or ranks.',
          'There is no functional difference; they are syntactic aliases.'
        ],
        correctAnswer: 0,
        explanation: 'Window functions perform calculations across a set of table rows related to the current row without grouping into single output rows.',
        skillTag: 'SQL Window Functions',
        difficulty: 'Intermediate'
      },
      {
        id: 'q3',
        question: 'When handling high multicollinearity in a Linear Regression model, what diagnostic metric and remedial step is standard?',
        options: [
          'Check Kurtosis; perform one-hot encoding on target variable',
          'Compute Variance Inflation Factor (VIF > 5); apply Ridge/L2 Regularization or drop redundant features',
          'Evaluate ROC-AUC; convert continuous variables to booleans',
          'Calculate Confusion Matrix; increase learning rate'
        ],
        correctAnswer: 1,
        explanation: 'VIF measures how much variance of an estimated regression coefficient increases if predictors are correlated. Regularization penalizes large coefficients.',
        skillTag: 'Statistical Modeling',
        difficulty: 'Advanced'
      },
      {
        id: 'q4',
        question: 'In modern ETL architectures, what is the primary benefit of ELT (Extract-Load-Transform) over legacy ETL?',
        options: [
          'ELT eliminates the need for data storage altogether.',
          'ELT leverages the massive MPP compute power of cloud warehouses (BigQuery, Snowflake) after loading raw data.',
          'ELT only works on small spreadsheets.',
          'ELT requires manual CSV uploading.'
        ],
        correctAnswer: 1,
        explanation: 'Cloud data warehouses have separate, elastic compute and storage, allowing fast raw ingestion and on-demand transformation scaling.',
        skillTag: 'Data Engineering',
        difficulty: 'Intermediate'
      },
      {
        id: 'q5',
        question: 'Which metric is best suited for evaluating a fraud detection model with 99.8% negative (non-fraud) class imbalance?',
        options: [
          'Overall Accuracy Score',
          'PR-AUC (Precision-Recall Area Under Curve) and F1-Score at optimal threshold',
          'Mean Squared Error (MSE)',
          'R-Squared Score'
        ],
        correctAnswer: 1,
        explanation: 'Accuracy is heavily skewed by the majority class in extreme imbalance. PR-AUC focuses on true positive recovery without inflating false negatives.',
        skillTag: 'Machine Learning Evaluation',
        difficulty: 'Advanced'
      }
    ]
  },
  {
    id: 'as_cloud_mlops',
    title: 'Cloud Architecture & MLOps Readiness Assessment',
    domain: 'Cloud & Infrastructure',
    description: 'Validate your understanding of Docker containerization, Kubernetes pods, CI/CD pipelines, and cloud model registry workflows.',
    durationMinutes: 12,
    questionCount: 4,
    targetRole: 'MLOps / Cloud Data Specialist',
    industryPartner: 'Cloud Alliance & Open Source Foundation',
    badgeName: 'MLOps Practitioner',
    completed: false,
    questions: [
      {
        id: 'cm1',
        question: 'What is the primary role of a container registry (e.g. Google Artifact Registry, Docker Hub) in an automated CI/CD pipeline?',
        options: [
          'To format source code style automatically.',
          'To securely store, version, and distribute immutable container images for deployment.',
          'To host relational database tables directly.',
          'To run unit tests in browser windows.'
        ],
        correctAnswer: 1,
        explanation: 'Container registries store container artifacts tagged with build hashes so staging and production clusters pull verified images.',
        skillTag: 'Docker & CI/CD',
        difficulty: 'Intermediate'
      },
      {
        id: 'cm2',
        question: 'What does "Data Drift" mean in production machine learning systems?',
        options: [
          'When database connection cables physically degrade.',
          'When statistical distributions of input features change over time relative to training data, degrading model accuracy.',
          'When hard drives run out of storage space.',
          'When users change their passwords.'
        ],
        correctAnswer: 1,
        explanation: 'Data drift (covariate shift) occurs when real-world distributions evolve, triggering model retraining requirements.',
        skillTag: 'MLOps Monitoring',
        difficulty: 'Advanced'
      },
      {
        id: 'cm3',
        question: 'Which Kubernetes object is responsible for ensuring a specified number of identical pod replicas are running at all times?',
        options: [
          'Deployment / ReplicaSet',
          'ConfigMap',
          'Ingress Controller',
          'PersistentVolumeClaim'
        ],
        correctAnswer: 0,
        explanation: 'A ReplicaSet ensures pod count and health maintenance, managed declaratively via Kubernetes Deployments.',
        skillTag: 'Kubernetes Orchestration',
        difficulty: 'Intermediate'
      },
      {
        id: 'cm4',
        question: 'Why are canary deployments favored over big-bang releases for high-traffic enterprise applications?',
        options: [
          'Canary deployments eliminate the need for QA testing.',
          'They route a small percentage of live traffic to the new version to monitor latency and error rates before full rollout.',
          'They only deploy code during weekends.',
          'They run slower to conserve electricity.'
        ],
        correctAnswer: 1,
        explanation: 'Canary releases minimize blast radius of undetected regressions by testing live performance on a controlled user subset.',
        skillTag: 'DevOps Strategy',
        difficulty: 'Intermediate'
      }
    ]
  },
  {
    id: 'as_soft_skills',
    title: 'Industry Soft Skills & Agile Problem Solving',
    domain: 'Professional Competencies',
    description: 'Assess communication with non-technical stakeholders, conflict resolution in sprints, ethical AI decision making, and agile teamwork.',
    durationMinutes: 10,
    questionCount: 3,
    targetRole: 'All Engineering & Analyst Tracks',
    industryPartner: 'Global HR & Tech Leadership Institute',
    badgeName: 'Agile Team Leader',
    completed: true,
    lastScore: 94,
    lastTakenDate: '2026-08-10',
    questions: [
      {
        id: 'ss1',
        question: 'A senior executive asks why an analytics dashboard insight contradicts their intuition. What is the most effective approach?',
        options: [
          'Dismiss their intuition and tell them the algorithm is never wrong.',
          'Walk them transparently through the underlying data sources, methodology, assumptions, and confidence intervals with clear business context.',
          'Change the dashboard query to match what the executive expected.',
          'Avoid the conversation and forward the email to your manager.'
        ],
        correctAnswer: 1,
        explanation: 'Constructive data storytelling bridges the gap between mathematical outputs and executive decision context.',
        skillTag: 'Stakeholder Management',
        difficulty: 'Intermediate'
      },
      {
        id: 'ss2',
        question: 'During a sprint retrospective, a team member consistently misses deadlines due to scope creep. What should the team do?',
        options: [
          'Blame the developer publicly during daily standup.',
          'Collaboratively refine user story acceptance criteria, enforce Definition of Ready, and protect sprint backlog commitments.',
          'Cancel all future sprints.',
          'Assign double the workload to other developers secretly.'
        ],
        correctAnswer: 1,
        explanation: 'Agile retrospectives focus on process improvement, clear boundaries, and collective ownership.',
        skillTag: 'Agile Process',
        difficulty: 'Intermediate'
      },
      {
        id: 'ss3',
        question: 'When discovering potential demographic bias in a historical dataset used for resume screening algorithms, what is the ethically sound action?',
        options: [
          'Deploy the model anyway since it matches historical patterns.',
          'Flag the ethical risk immediately, audit disparate impact metrics, debias training cohorts, and implement human-in-the-loop oversight.',
          'Delete the dataset and hide the audit trail.',
          'Exclude female candidate names manually.'
        ],
        correctAnswer: 1,
        explanation: 'Responsible AI practices mandate rigorous fairness audits, transparency, and mitigation of historical bias.',
        skillTag: 'AI Ethics & Governance',
        difficulty: 'Advanced'
      }
    ]
  }
];

export const initialOpportunities: Opportunity[] = [
  {
    id: 'opp_1',
    title: 'Enterprise Data Analytics & BI Intern',
    company: 'Apex Cloud Systems',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=100&auto=format&fit=crop&q=60',
    location: 'New York, NY (Hybrid)',
    type: 'Student Internship',
    workplaceType: 'Hybrid',
    stipendOrSalary: '$48 - $55 / hr ($8,500/mo)',
    duration: '12 Weeks (Summer 2026)',
    postedDate: '2 days ago',
    deadline: '2026-09-30',
    requiredSkills: ['Python & Pandas', 'SQL & Data Warehousing', 'Tableau & PowerBI', 'Stakeholder Communication'],
    minGpa: 3.5,
    description: 'Join Apex Cloud Systems enterprise intelligence unit. You will collaborate directly with VP of Operations to architect high-throughput automated metric reporting and predictive demand forecasting.',
    responsibilities: [
      'Build scalable ETL pipelines aggregating BigQuery and Salesforce data.',
      'Design executive KPI dashboards with real-time anomaly alerts.',
      'Present weekly findings to product managers and operations directors.'
    ],
    qualifications: [
      'Pursuing Bachelor or Master in Data Science, Computer Science, or Quantitative Analytics.',
      'Strong hands-on experience in Python (Pandas/NumPy) and modern SQL.',
      'Demonstrated portfolio projects or prior internship experience.'
    ],
    openingsCount: 4,
    applicantsCount: 38,
    roleTarget: 'student',
    matchScore: 96,
    featured: true
  },
  {
    id: 'opp_2',
    title: 'Junior Machine Learning / AI Solutions Engineer',
    company: 'NeuralMatrix Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA (Remote Option)',
    type: 'Entry-Level Job',
    workplaceType: 'Remote',
    stipendOrSalary: '$115,000 - $135,000 / yr + Equity',
    duration: 'Full-time Permanent',
    postedDate: '3 days ago',
    deadline: '2026-10-15',
    requiredSkills: ['Machine Learning (Scikit-Learn)', 'Python & Pandas', 'Cloud Pipelines (GCP / BigQuery)', 'Docker & Kubernetes (MLOps)'],
    minGpa: 3.4,
    description: 'NeuralMatrix builds generative AI and predictive intelligence for Fortune 500 logistics. As a Junior ML Engineer, you will deploy real-time inference APIs and optimize model retraining pipelines.',
    responsibilities: [
      'Train and fine-tune tabular and NLP predictive architectures.',
      'Package microservices into Docker containers deployed on Kubernetes.',
      'Track model metrics, drift, and latency SLAs in production.'
    ],
    qualifications: [
      'Degree in Computer Science, Data Science, or related engineering discipline.',
      'Proficiency with Scikit-Learn, PyTorch or TensorFlow, and FastAPI/Flask.',
      'Understanding of Git workflows and containerization fundamentals.'
    ],
    openingsCount: 2,
    applicantsCount: 64,
    roleTarget: 'student',
    matchScore: 88,
    featured: true
  },
  {
    id: 'opp_3',
    title: 'Faculty Industry Immersion & Research Fellowship',
    company: 'Siemens Industrial AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=60',
    location: 'Boston, MA / Hybrid',
    type: 'Faculty Internship',
    workplaceType: 'Hybrid',
    stipendOrSalary: '$18,000 Honorarium + Research Grant ($40,000)',
    duration: '6 Weeks (Summer / Sabbatical)',
    postedDate: '1 week ago',
    deadline: '2026-11-01',
    requiredSkills: ['Statistical Modeling & A/B Testing', 'Distributed Spark / PySpark', 'AI Ethics & Governance', 'Research Paper Publishing'],
    description: 'Designed exclusively for academic faculty, professors, and department heads. Spend 6 weeks embedded with Siemens principal AI scientists to co-design industrial IoT digital twin models and update university curricula with industry standards.',
    responsibilities: [
      'Collaborate on joint IEEE/ACM research paper publication.',
      'Lead a 2-day Faculty Development Program (FDP) for partner universities.',
      'Advise industrial R&D teams on theoretical algorithm breakthroughs.'
    ],
    qualifications: [
      'PhD or Senior Faculty appointment in Engineering / Computer Science / Applied Math.',
      'Track record of peer-reviewed publications.',
      'Interest in bridging curriculum with modern cyber-physical industry challenges.'
    ],
    openingsCount: 3,
    applicantsCount: 14,
    roleTarget: 'academician',
    matchScore: 92,
    featured: false
  },
  {
    id: 'opp_4',
    title: 'Faculty Development Program: Cloud-Native Curriculum Alignment',
    company: 'Google Cloud Academic Alliances',
    companyLogo: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&auto=format&fit=crop&q=60',
    location: 'Virtual / Online',
    type: 'FDP / Training',
    workplaceType: 'Remote',
    stipendOrSalary: 'Fully Sponsored + $2,500 Lab Cloud Credits',
    duration: '4 Weeks (Part-time, 4 hrs/wk)',
    postedDate: '5 days ago',
    deadline: '2026-09-20',
    requiredSkills: ['Cloud Pipelines (GCP / BigQuery)', 'Docker & Kubernetes (MLOps)', 'Curriculum Design'],
    description: 'Empowers professors and instructors to incorporate hands-on Cloud Architecture, BigQuery Labs, and Vertex AI exercises into collegiate syllabi with pre-built sandbox environments.',
    responsibilities: [
      'Complete 4 guided hands-on architecture labs on Google Cloud.',
      'Design a 14-week semester course syllabus module.',
      'Receive official Google Cloud Faculty Mentor Credential.'
    ],
    qualifications: [
      'Active university lecturer, assistant professor, or department chair.',
      'Basic familiarity with Linux and cloud computing concepts.'
    ],
    openingsCount: 50,
    applicantsCount: 110,
    roleTarget: 'academician',
    matchScore: 85,
    featured: true
  },
  {
    id: 'opp_5',
    title: 'Live Industry Capstone: Smart Supply Chain Anomaly Detector',
    company: 'Tesla Enterprise Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=100&auto=format&fit=crop&q=60',
    location: 'Austin, TX / Remote',
    type: 'Live Project',
    workplaceType: 'Remote',
    stipendOrSalary: '$5,000 Project Award + Fast-track Interview',
    duration: '8 Weeks Project Sprint',
    postedDate: '4 days ago',
    deadline: '2026-10-01',
    requiredSkills: ['Python & Pandas', 'Machine Learning (Scikit-Learn)', 'SQL & Data Warehousing'],
    description: 'Student & Faculty combined team challenge to build real-time time-series anomaly detection for assembly line robotics telemetry. Verified top teams receive direct interview offers.',
    responsibilities: [
      'Analyze 500GB synthetic sensor data stream.',
      'Build anomaly detection model with precision > 92%.',
      'Submit containerized model and code repo to Tesla engineers.'
    ],
    qualifications: [
      'Student teams of 2-4 with at least 1 faculty advisor.',
      'Demonstrated experience in Python time-series modeling.'
    ],
    openingsCount: 10,
    applicantsCount: 42,
    roleTarget: 'both',
    matchScore: 91,
    featured: false
  }
];

export const initialLearningPrograms: LearningProgram[] = [
  {
    id: 'lp_1',
    title: 'Enterprise MLOps & Production Model Pipelines',
    provider: 'Nexus Industry Academy & Google Cloud',
    providerLogo: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=100&auto=format&fit=crop&q=60',
    category: 'Certification Course',
    duration: '6 Weeks (Self-paced + Live Labs)',
    level: 'Intermediate',
    enrolledCount: 1420,
    rating: 4.9,
    skillsTaught: ['Docker & Kubernetes (MLOps)', 'CI/CD Pipelines', 'Model Registry', 'Vertex AI', 'Prometheus Monitoring'],
    description: 'Bridge the critical industry gap between experimental Jupyter Notebooks and rock-solid enterprise microservice deployments with live sandbox clusters.',
    modules: [
      'Module 1: Containerizing Scikit-Learn & PyTorch Inference Servers',
      'Module 2: Automated Testing, Linting & GitHub Actions Workflows',
      'Module 3: Kubernetes Deployments, Ingress, and Autoscaling',
      'Module 4: Real-time Drift Detection, Logging, and Retraining Triggers',
      'Module 5: Capstone: Deploying a Multi-Tenant Recommendation API'
    ],
    certificateProvided: true,
    freeOrPaid: 'Sponsored',
    status: 'Available',
    instructor: 'Alex Mercer (Principal MLOps Lead, Nexus Corp)'
  },
  {
    id: 'lp_2',
    title: 'Distributed Big Data with PySpark & Cloud Warehouses',
    provider: 'Databricks Academic Alliance',
    providerLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=100&auto=format&fit=crop&q=60',
    category: 'Training Program',
    duration: '4 Weeks',
    level: 'Advanced',
    enrolledCount: 890,
    rating: 4.8,
    skillsTaught: ['Distributed Spark / PySpark', 'SQL & Data Warehousing', 'Data Lakehouse', 'Parquet Optimization'],
    description: 'Master big data transformations across terabyte-scale datasets. Learn resilient distributed datasets (RDDs), Spark DataFrames, partitioning, and delta tables.',
    modules: [
      'Module 1: Spark Architecture & Memory Management',
      'Module 2: PySpark Transformations, Shuffles, and Joins',
      'Module 3: Delta Lake ACID Transactions and Time Travel',
      'Module 4: Production Spark Streaming & Kafka Integration'
    ],
    certificateProvided: true,
    freeOrPaid: 'Free',
    status: 'Available',
    instructor: 'Dr. Priya Sharma (Data Systems Architect)'
  },
  {
    id: 'lp_3',
    title: 'Executive Data Storytelling & Stakeholder Influence',
    provider: 'Harvard & McKinsey Industry Network',
    providerLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=60',
    category: 'Industry Workshop',
    duration: '2 Weeks (Interactive Seminars)',
    level: 'Intermediate',
    enrolledCount: 2150,
    rating: 4.95,
    skillsTaught: ['Stakeholder Communication', 'Tableau & PowerBI', 'Executive Pitching', 'A/B Testing Decision Frameworks'],
    description: 'Learn how top management consultants turn raw statistical models into persuasive executive narratives that drive million-dollar decisions.',
    modules: [
      'Session 1: The Pyramid Principle in Technical Presentations',
      'Session 2: Visual Cognitive Load and Dashboard Architecture',
      'Session 3: Live Executive Defense Simulation & Feedback'
    ],
    certificateProvided: true,
    freeOrPaid: 'Certified',
    status: 'Enrolled',
    instructor: 'Jonathan Hayes (Ex-Partner, McKinsey & Co)'
  }
];

export const initialDocuments: DocumentItem[] = [
  {
    id: 'doc_1',
    title: 'Brajesh_Resume_Data_Analytics_2026.pdf',
    type: 'Resume',
    uploadDate: '2026-08-20',
    fileSize: '420 KB',
    status: 'Verified by Institution',
    hash: 'SHA256: 9f8a3c2e1b4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f',
    url: '#'
  },
  {
    id: 'doc_2',
    title: 'Official_Academic_Transcript_Columbia.pdf',
    type: 'Academic Transcript',
    uploadDate: '2026-08-18',
    fileSize: '1.2 MB',
    status: 'Verified by Institution',
    hash: 'SHA256: 4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b',
    url: '#'
  },
  {
    id: 'doc_3',
    title: 'Nexus_Enterprise_Internship_Completion_Letter.pdf',
    type: 'Internship Report',
    uploadDate: '2024-02-10',
    fileSize: '680 KB',
    status: 'Industry Endorsed',
    hash: 'SHA256: 7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e',
    url: '#'
  },
  {
    id: 'doc_4',
    title: 'Google_Cloud_Professional_Certificate.pdf',
    type: 'Degree Certificate',
    uploadDate: '2023-10-25',
    fileSize: '890 KB',
    status: 'Industry Endorsed',
    hash: 'SHA256: 1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    url: '#'
  }
];

export const initialMentorships: MentorshipSession[] = [
  {
    id: 'ment_1',
    mentorName: 'Sarah Lin',
    mentorTitle: 'Director of Machine Learning Operations',
    company: 'Stripe Enterprise',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=60',
    topic: 'Transitioning from Academic Projects to High-Scale Production AI',
    date: 'Tomorrow',
    time: '4:00 PM - 4:45 PM EST',
    status: 'Available',
    targetAudience: 'Student',
    rating: 4.98
  },
  {
    id: 'ment_2',
    mentorName: 'Dr. Arvind Mahajan',
    mentorTitle: 'VP of Engineering & University Liaison',
    company: 'Intel Industrial Labs',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=60',
    topic: 'Faculty Sabbaticals & Commercializing Deep Tech Research',
    date: 'Friday',
    time: '2:00 PM - 3:00 PM EST',
    status: 'Available',
    targetAudience: 'Faculty',
    rating: 4.95
  },
  {
    id: 'ment_3',
    mentorName: 'Carlos Hernandez',
    mentorTitle: 'Lead Talent Partner & Placement Director',
    company: 'Meta Recruiting',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=60',
    topic: 'Cracking Technical System Design & Live Coding Interviews',
    date: 'Next Tuesday',
    time: '5:30 PM - 6:30 PM EST',
    status: 'Booked',
    targetAudience: 'Student',
    rating: 5.0
  }
];

export const initialApplications: Application[] = [
  {
    id: 'app_1',
    opportunityId: 'opp_1',
    opportunityTitle: 'Enterprise Data Analytics & BI Intern',
    company: 'Apex Cloud Systems',
    type: 'Student Internship',
    applicantId: 'usr_brajesh_01',
    applicantName: 'Brajesh',
    applicantRole: 'student',
    appliedDate: '2026-08-25',
    status: 'Interview Scheduled',
    matchScore: 96,
    mentorFeedback: 'Outstanding profile! High Python benchmark score (92%) and verified Tableau certification makes candidate a top contender.',
    notes: 'Technical round scheduled with Lead Analytics Architect.'
  },
  {
    id: 'app_2',
    opportunityId: 'opp_2',
    opportunityTitle: 'Junior Machine Learning / AI Solutions Engineer',
    company: 'NeuralMatrix Technologies',
    type: 'Entry-Level Job',
    applicantId: 'usr_brajesh_01',
    applicantName: 'Brajesh',
    applicantRole: 'student',
    appliedDate: '2026-08-26',
    status: 'Shortlisted',
    matchScore: 88,
    mentorFeedback: 'Impressive churn prediction project and GPA. Suggested completing MLOps assessment to boost placement match to 95%+.',
    notes: 'Resume forwarded to ML hiring committee.'
  },
  {
    id: 'app_3',
    opportunityId: 'opp_5',
    opportunityTitle: 'Live Industry Capstone: Smart Supply Chain Anomaly Detector',
    company: 'Tesla Enterprise Analytics',
    type: 'Live Project',
    applicantId: 'usr_brajesh_01',
    applicantName: 'Brajesh',
    applicantRole: 'student',
    appliedDate: '2026-08-24',
    status: 'Accepted',
    matchScore: 91,
    mentorFeedback: 'Team proposal approved. Sprint begins Sept 1st with Tesla mentor check-ins.',
    notes: 'Repository access granted.'
  }
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Interview Invitation Confirmed!',
    message: 'Apex Cloud Systems has scheduled your Round 2 Interview for Enterprise Data Analytics Intern.',
    timestamp: '10 minutes ago',
    read: false,
    type: 'application',
    linkTab: 'opportunities'
  },
  {
    id: 'notif_2',
    title: 'New High-Match Internship Posted',
    message: 'Tesla Enterprise Analytics posted a new 8-week Capstone matching 91% of your verified skills.',
    timestamp: '2 hours ago',
    read: false,
    type: 'opportunity',
    linkTab: 'opportunities'
  },
  {
    id: 'notif_3',
    title: 'Skill Assessment Recommended',
    message: 'Take the Cloud Architecture & MLOps assessment to bridge the remaining 15% gap for Junior ML Engineer roles.',
    timestamp: 'Yesterday',
    read: true,
    type: 'assessment',
    linkTab: 'assessments'
  },
  {
    id: 'notif_4',
    title: 'Digital Credential Verified on Chain',
    message: 'Columbia University has cryptographically endorsed your Bachelor degree milestone.',
    timestamp: '3 days ago',
    read: true,
    type: 'system',
    linkTab: 'profile'
  }
];

export const translations: Record<string, Record<string, string>> = {
  en: {
    portalName: 'SkillBridge Nexus',
    enterprisePortal: 'Enterprise Portal',
    postOpportunity: 'Post Opportunity',
    dashboard: 'Dashboard',
    skillPassport: 'Skill Passport',
    assessments: 'Assessments',
    opportunities: 'Opportunities',
    learningPrograms: 'Learning Programs',
    academicianHub: 'Academician Hub',
    analytics: 'Analytics',
    documents: 'Document Vault',
    collaboration: 'Collaboration Hub',
    helpCenter: 'Help Center',
    logout: 'Logout',
    publicView: 'Public View',
    verifiedProfile: 'Verified Profile',
    profileCompletion: 'Profile Completion',
    quickActions: 'Quick Actions',
    downloadResume: 'Download Resume',
    shareProfile: 'Share Profile',
    searchPlaceholder: 'Search skills, internships, jobs, faculty programs...',
    personalInfo: 'Personal Info',
    academicPortfolio: 'Academic Portfolio',
    accountSecurity: 'Account Security',
    professionalMilestones: 'Professional Milestones',
    verifiedSkills: 'Verified Competency Radar',
    skillGapTitle: 'AI Skill Gap & Career Readiness Matrix',
    roleStudent: 'Student',
    roleRecruiter: 'Industry Recruiter',
    roleAcademician: 'Faculty / Academician',
    roleAdmin: 'Institution Admin',
    switchRole: 'Switch Role View',
    offlineStatus: 'Offline Cache Active',
    onlineStatus: 'Live Cloud Sync'
  },
  es: {
    portalName: 'SkillBridge Nexus',
    enterprisePortal: 'Portal Empresarial',
    postOpportunity: 'Publicar Oportunidad',
    dashboard: 'Panel de Control',
    skillPassport: 'Pasaporte de Habilidades',
    assessments: 'Evaluaciones',
    opportunities: 'Oportunidades',
    learningPrograms: 'Programas de Aprendizaje',
    academicianHub: 'Portal Académico',
    analytics: 'Analítica',
    documents: 'Bóveda de Documentos',
    collaboration: 'Centro de Colaboración',
    helpCenter: 'Centro de Ayuda',
    logout: 'Cerrar Sesión',
    publicView: 'Vista Pública',
    verifiedProfile: 'Perfil Verificado',
    profileCompletion: 'Completitud del Perfil',
    quickActions: 'Acciones Rápidas',
    downloadResume: 'Descargar Currículum',
    shareProfile: 'Compartir Perfil',
    searchPlaceholder: 'Buscar habilidades, pasantías, empleos...',
    personalInfo: 'Información Personal',
    academicPortfolio: 'Portafolio Académico',
    accountSecurity: 'Seguridad de la Cuenta',
    professionalMilestones: 'Hitos Profesionales',
    verifiedSkills: 'Radar de Competencias Verificadas',
    skillGapTitle: 'Matriz de Brecha de Habilidades IA',
    roleStudent: 'Estudiante',
    roleRecruiter: 'Reclutador de la Industria',
    roleAcademician: 'Docente / Académico',
    roleAdmin: 'Administrador Institucional',
    switchRole: 'Cambiar Rol',
    offlineStatus: 'Caché Desconectado',
    onlineStatus: 'Sincronización en la Nube'
  },
  hi: {
    portalName: 'स्किलब्रिज नेक्सस',
    enterprisePortal: 'एंटरप्राइज पोर्टल',
    postOpportunity: 'अवसर पोस्ट करें',
    dashboard: 'डैशबोर्ड',
    skillPassport: 'कौशल पासपोर्ट',
    assessments: 'मूल्यांकन और परीक्षण',
    opportunities: 'इंटर्नशिप और नौकरियां',
    learningPrograms: 'शिक्षण कार्यक्रम',
    academicianHub: 'शिक्षाविद हब',
    analytics: 'एनालिटिक्स',
    documents: 'दस्तावेज़ वॉल्ट',
    collaboration: 'सहयोग हब',
    helpCenter: 'सहायता केंद्र',
    logout: 'लॉगआउट',
    publicView: 'सार्वजनिक दृश्य',
    verifiedProfile: 'सत्यापित प्रोफ़ाइल',
    profileCompletion: 'प्रोफ़ाइल पूर्णता',
    quickActions: 'त्वरित कार्रवाई',
    downloadResume: 'बायोडाटा डाउनलोड करें',
    shareProfile: 'प्रोफ़ाइल साझा करें',
    searchPlaceholder: 'कौशल, इंटर्नशिप, नौकरियां खोजें...',
    personalInfo: 'व्यक्तिगत जानकारी',
    academicPortfolio: 'शैक्षणिक पोर्टफोलियो',
    accountSecurity: 'खाता सुरक्षा',
    professionalMilestones: 'व्यावसायिक मील के पत्थर',
    verifiedSkills: 'सत्यापित क्षमताएं',
    skillGapTitle: 'एआई कौशल अंतर विश्लेषण',
    roleStudent: 'छात्र',
    roleRecruiter: 'उद्योग भर्तीकर्ता',
    roleAcademician: 'संकाय / शिक्षाविद',
    roleAdmin: 'संस्थान व्यवस्थापक',
    switchRole: 'भूमिका बदलें',
    offlineStatus: 'ऑफ़लाइन कैश सक्रिय',
    onlineStatus: 'क्लाउड सिंक सक्रिय'
  },
  fr: {
    portalName: 'SkillBridge Nexus',
    enterprisePortal: 'Portail Entreprise',
    postOpportunity: 'Publier une Opportunité',
    dashboard: 'Tableau de Bord',
    skillPassport: 'Passeport de Compétences',
    assessments: 'Évaluations',
    opportunities: 'Opportunités & Stages',
    learningPrograms: 'Programmes de Formation',
    academicianHub: 'Portail Académique',
    analytics: 'Analytique & Tendances',
    documents: 'Coffre-fort Documents',
    collaboration: 'Hub de Collaboration',
    helpCenter: "Centre d'Aide",
    logout: 'Déconnexion',
    publicView: 'Vue Publique',
    verifiedProfile: 'Profil Vérifié',
    profileCompletion: 'Progression du Profil',
    quickActions: 'Actions Rapides',
    downloadResume: 'Télécharger CV',
    shareProfile: 'Partager le Profil',
    searchPlaceholder: 'Rechercher compétences, stages, emplois...',
    personalInfo: 'Infos Personnelles',
    academicPortfolio: 'Portefeuille Académique',
    accountSecurity: 'Sécurité du Compte',
    professionalMilestones: 'Jalons Professionnels',
    verifiedSkills: 'Radar de Compétences',
    skillGapTitle: 'Analyse IA des Écarts de Compétences',
    roleStudent: 'Étudiant',
    roleRecruiter: 'Recruteur Industrie',
    roleAcademician: 'Enseignant / Chercheur',
    roleAdmin: 'Admin Institutionnel',
    switchRole: 'Changer de Rôle',
    offlineStatus: 'Cache Hors Ligne',
    onlineStatus: 'Synchro Cloud Active'
  },
  de: {
    portalName: 'SkillBridge Nexus',
    enterprisePortal: 'Unternehmensportal',
    postOpportunity: 'Gelegenheit veröffentlichen',
    dashboard: 'Übersicht',
    skillPassport: 'Kompetenzpass',
    assessments: 'Bewertungen & Tests',
    opportunities: 'Praktika & Jobs',
    learningPrograms: 'Lernprogramme',
    academicianHub: 'Akademiker-Portal',
    analytics: 'Analytik',
    documents: 'Dokumententresor',
    collaboration: 'Kooperations-Hub',
    helpCenter: 'Hilfezentrum',
    logout: 'Abmelden',
    publicView: 'Öffentliche Ansicht',
    verifiedProfile: 'Verifiziertes Profil',
    profileCompletion: 'Profilvollständigkeit',
    quickActions: 'Schnellaktionen',
    downloadResume: 'Lebenslauf herunterladen',
    shareProfile: 'Profil teilen',
    searchPlaceholder: 'Fähigkeiten, Praktika, Jobs suchen...',
    personalInfo: 'Persönliche Daten',
    academicPortfolio: 'Akademisches Portfolio',
    accountSecurity: 'Kontosicherheit',
    professionalMilestones: 'Berufliche Meilensteine',
    verifiedSkills: 'Verifizierte Kompetenzen',
    skillGapTitle: 'KI-Kompetenzlückenanalyse',
    roleStudent: 'Student',
    roleRecruiter: 'Industrie-Recruiter',
    roleAcademician: 'Dozent / Wissenschaftler',
    roleAdmin: 'Institutions-Admin',
    switchRole: 'Rolle wechseln',
    offlineStatus: 'Offline-Cache aktiv',
    onlineStatus: 'Cloud-Synchronisierung aktiv'
  },
  ja: {
    portalName: 'SkillBridge Nexus',
    enterprisePortal: 'エンタープライズポータル',
    postOpportunity: '案件を投稿する',
    dashboard: 'ダッシュボード',
    skillPassport: 'スキルパスポート',
    assessments: 'スキルアセスメント',
    opportunities: 'インターン・求人',
    learningPrograms: '学習プログラム',
    academicianHub: '教員・研究者ハブ',
    analytics: '分析・インサイト',
    documents: '証明書・ドキュメント',
    collaboration: '産学連携ハブ',
    helpCenter: 'ヘルプセンター',
    logout: 'ログアウト',
    publicView: '公開プロフィール',
    verifiedProfile: '認証済みプロフィール',
    profileCompletion: 'プロフィール完成度',
    quickActions: 'クイックアクション',
    downloadResume: '履歴書をダウンロード',
    shareProfile: 'プロフィールを共有',
    searchPlaceholder: 'スキル、インターン、求人を検索...',
    personalInfo: '基本情報',
    academicPortfolio: '学術ポートフォリオ',
    accountSecurity: 'アカウントセキュリティ',
    professionalMilestones: 'キャリアマイルストーン',
    verifiedSkills: '検証済みスキルレーダー',
    skillGapTitle: 'AIスキルギャップ分析',
    roleStudent: '学生',
    roleRecruiter: '企業採用担当',
    roleAcademician: '教員・研究者',
    roleAdmin: '教育機関管理者',
    switchRole: '役割を切り替え',
    offlineStatus: 'オフラインキャッシュ',
    onlineStatus: 'クラウド同期中'
  }
};

export const initialHelpCategories: HelpCategory[] = [
  {
    id: 'cat_passport',
    name: 'Skill Passport & Verification',
    description: 'Learn how micro-credentials, cryptographic hashes, and faculty endorsements work.',
    icon: 'BadgeCheck',
    articleCount: 4
  },
  {
    id: 'cat_assessments',
    name: 'Assessments & Benchmarking',
    description: 'Proctoring rules, rubric scoring, timed coding challenges, and retake policies.',
    icon: 'HelpCircle',
    articleCount: 3
  },
  {
    id: 'cat_opportunities',
    name: 'Opportunities & Hiring',
    description: 'Direct applications, enterprise MoUs, stipend verification, and interview matching.',
    icon: 'Briefcase',
    articleCount: 4
  },
  {
    id: 'cat_academician',
    name: 'Academician Hub & FDPs',
    description: 'Curriculum modernization, faculty industry sabbaticals, research grants, and guest lectures.',
    icon: 'Landmark',
    articleCount: 3
  },
  {
    id: 'cat_security',
    name: 'Document Vault & Security',
    description: 'SHA-256 digital seals, zero-knowledge verification, two-factor auth, and session security.',
    icon: 'FolderLock',
    articleCount: 3
  },
  {
    id: 'cat_account',
    name: 'Account & Multi-Role Switching',
    description: 'Switching between Student, Recruiter, Faculty, and Admin roles without data loss.',
    icon: 'Shield',
    articleCount: 2
  }
];

export const initialHelpArticles: HelpArticle[] = [
  {
    id: 'art_1',
    categoryId: 'cat_passport',
    title: 'How Cryptographic Skill Passport Verification Works',
    excerpt: 'Each skill milestone is signed by an accredited institution and anchored with a tamper-proof SHA-256 hash.',
    content: 'When an assessment is passed or a faculty member endorses a milestone, SkillBridge Nexus computes a unique digital signature `0x8f2d...b14e`. This cryptographic hash is verifiable by external employers via the public portfolio link without revealing sensitive private student data.',
    tags: ['Verification', 'Security', 'Skill Passport', 'Employers'],
    readTime: '3 min read',
    helpfulCount: 342,
    lastUpdated: 'August 2026'
  },
  {
    id: 'art_2',
    categoryId: 'cat_passport',
    title: 'Exporting Your Verified Resume & Digital Credential Badge',
    excerpt: 'Download ATS-optimized PDF resumes equipped with machine-readable verification QR codes.',
    content: 'Click "View Verified Resume" on your profile or skill passport. You can print or download the PDF. Recruiters scanning the verification token will be redirected to your live verified portal snapshot.',
    tags: ['Resume', 'PDF Export', 'Recruiters'],
    readTime: '2 min read',
    helpfulCount: 218,
    lastUpdated: 'August 2026'
  },
  {
    id: 'art_3',
    categoryId: 'cat_assessments',
    title: 'Assessment Proctoring, Scoring Weights, and Retake Window',
    excerpt: 'Understand how dynamic time constraints and anti-plagiarism heuristics score your competency.',
    content: 'Assessments use weighted multi-domain rubrics (Code Execution 40%, Architectural Thinking 30%, Speed 30%). If a score below 70% is achieved, a 14-day mastery study cooldown is initiated with recommended learning modules.',
    tags: ['Assessments', 'Scoring', 'Rubrics', 'Cooldown'],
    readTime: '4 min read',
    helpfulCount: 189,
    lastUpdated: 'July 2026'
  },
  {
    id: 'art_4',
    categoryId: 'cat_opportunities',
    title: 'Direct Industry Fast-Track: How Priority Match Scores Work',
    excerpt: 'Our AI alignment engine calculates your match percentage based on verified skills and project repositories.',
    content: 'Job postings showcase a Match Score (e.g. 96%). Candidates with verified skills matching 80%+ of the core requirements skip automated resume parsing and are delivered directly to the engineering hiring manager’s desk.',
    tags: ['Jobs', 'Internships', 'Match Score', 'AI Matching'],
    readTime: '3 min read',
    helpfulCount: 412,
    lastUpdated: 'August 2026'
  },
  {
    id: 'art_5',
    categoryId: 'cat_academician',
    title: 'Faculty Industry Sabbaticals and Sponsored Research Funding',
    excerpt: 'Step-by-step guidance for professors applying to 6-month corporate research residency programs.',
    content: 'Accredited academicians can submit proposals to enterprise partners like Siemens, Nexus Labs, and AWS Cloud. Once Dean approval is registered in the Academician Hub, travel grants and laboratory computing clusters are provisioned.',
    tags: ['Faculty', 'Sabbaticals', 'Research Grants', 'MoUs'],
    readTime: '5 min read',
    helpfulCount: 124,
    lastUpdated: 'June 2026'
  },
  {
    id: 'art_6',
    categoryId: 'cat_security',
    title: 'Zero-Knowledge Proofs in the Document Vault',
    excerpt: 'Why your transcript and confidential degree certs remain unalterable and securely encrypted.',
    content: 'The Document Vault utilizes client-side hashing where documents are cryptographically fingerprinted before transmission. Third-party auditors only verify the fingerprint authenticity against the university ledger.',
    tags: ['Security', 'Encryption', 'Documents', 'Vault'],
    readTime: '3 min read',
    helpfulCount: 275,
    lastUpdated: 'August 2026'
  }
];

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq_1',
    category: 'Skill Passport',
    question: 'How do I request an endorsement from my university faculty advisor?',
    answer: 'Navigate to your Skill Passport view, select the desired skill item (e.g., Python & Pandas), and click "Request Faculty Endorsement". Enter your professor’s university email or select from accredited faculty in your department.',
    views: 1420
  },
  {
    id: 'faq_2',
    category: 'Opportunities',
    question: 'Can recruiters contact me directly through SkillBridge Nexus?',
    answer: 'Yes! When you publish your verified public portfolio or apply to an opportunity, hiring managers can schedule live technical interviews or dispatch offers directly into your notification feed and linked email.',
    views: 2150
  },
  {
    id: 'faq_3',
    category: 'Assessments',
    question: 'What happens if my internet connection drops during an assessment?',
    answer: 'SkillBridge Nexus features automatic offline caching and local state recovery. Your answers are saved locally every 3 seconds. Once reconnected, your session resumes seamlessly without score penalty.',
    views: 980
  },
  {
    id: 'faq_4',
    category: 'Account & Security',
    question: 'How do I switch my role between Student, Recruiter, and Faculty?',
    answer: 'Use the quick Role Switcher dropdown in the top navigation bar. Switching roles adjusts permissions and interface features instantly while preserving your central user data.',
    views: 3100
  },
  {
    id: 'faq_5',
    category: 'Document Vault',
    question: 'What document formats are supported in the Verified Vault?',
    answer: 'We support PDF, DOCX, PNG, and JPEG files up to 25MB each. All uploaded documents undergo automated SHA-256 fingerprint generation upon upload.',
    views: 870
  }
];

export const initialSupportTickets: SupportTicket[] = [
  {
    id: 'TCK-8921',
    subject: 'Verification status pending for Columbia Degree Certificate',
    category: 'Document Vault',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2026-08-26 14:30',
    lastReply: 'Academic Registrar is currently validating credential batch #419.'
  },
  {
    id: 'TCK-8410',
    subject: 'Requesting API key for automated GitHub repository sync',
    category: 'Skill Passport',
    priority: 'low',
    status: 'resolved',
    createdAt: '2026-08-20 09:15',
    lastReply: 'GitHub Webhook integration enabled for user repository @brajesh-nexus.'
  }
];

export const initialSessionData: SessionInfo = {
  userId: 'usr_brajesh_01',
  name: 'Brajesh',
  email: 'brajeshpanigrahi7@gmail.com',
  role: 'student',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvIFryGeZhW2_6QT4ZOGkLkLicIBavQaCCv83Z27nG_Mmb8s0iadNzAn8mecc3yUeARbDtlRVA4bknRtfnz-ULcXWbR5XXvfA0iSwCfHyCoC1SvMkEcVuf_hkYnwU1kP8S-OXuvXYkUtAob5Kk-rJ2dICHUKFWI5AG4EZghK-Ir54yHMtdIHqhRRZOUTnD_D2QwOX1ctOJJ9RKeD02anBiNGgbtHSV75YP8ViqE47Ljh7xxR8GZFmYyA',
  ipAddress: '198.51.100.42 (Secure VPN)',
  location: 'New York, NY, United States',
  device: 'MacBook Pro 16" (Apple M3 Max)',
  browser: 'Google Chrome v128.0 (Enterprise Sandbox)',
  loginTime: 'Today at 08:30 AM EST',
  sessionToken: 'nexus_jwt_8f2db14e99a120fc64bca883109e22aa_auth',
  status: 'active'
};

export const mockAvailableAccounts = [
  {
    userId: 'usr_brajesh_01',
    name: 'Brajesh',
    email: 'brajeshpanigrahi7@gmail.com',
    role: 'student' as const,
    title: 'Senior Data Analyst | Enterprise Operations',
    institution: 'Columbia University School of Engineering',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvIFryGeZhW2_6QT4ZOGkLkLicIBavQaCCv83Z27nG_Mmb8s0iadNzAn8mecc3yUeARbDtlRVA4bknRtfnz-ULcXWbR5XXvfA0iSwCfHyCoC1SvMkEcVuf_hkYnwU1kP8S-OXuvXYkUtAob5Kk-rJ2dICHUKFWI5AG4EZghK-Ir54yHMtdIHqhRRZOUTnD_D2QwOX1ctOJJ9RKeD02anBiNGgbtHSV75YP8ViqE47Ljh7xxR8GZFmYyA'
  },
  {
    userId: 'usr_sarah_recruiter',
    name: 'Sarah Lin',
    email: 'sarah.lin@siemens-talent.com',
    role: 'recruiter' as const,
    title: 'Lead Technical Talent Partner',
    institution: 'Siemens Enterprise Digital Solutions',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    userId: 'usr_marcus_prof',
    name: 'Dr. Marcus Vance',
    email: 'm.vance@columbia.edu',
    role: 'academician' as const,
    title: 'Professor & Director of Distributed Systems',
    institution: 'Columbia University Department of Computer Science',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    userId: 'usr_admin_dean',
    name: 'Dean Elena Rostova',
    email: 'admin.dean@nexus-edu.org',
    role: 'institution_admin' as const,
    title: 'Dean of Academic Innovation & Partnerships',
    institution: 'Nexus Higher Education Consortium',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  }
];

