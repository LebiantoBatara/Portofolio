import {
  Project,
  DesignApproachStep,
  SkillBadge,
  Education,
  Experience,
  OrganizationalExperience,
  VolunteerExperience,
  Certification,
  Achievement,
  LanguageStatus
} from './types';

export const EDUCATION_DATA: Education = {
  institution: 'Paulus Indonesia Christian University',
  degree: 'Bachelor of Informatic Engineering',
  gpa: '3.33',
  location: 'Kota Makassar, Daya, Indonesia',
  duration: 'September 2023 – September 2025',
  thesisTitle: 'Research Field Identification System And Supervisor Lecturer Recommendation In The Informatics Engineering Department of Paulus Christian University Of Indonesia Using Tf-Idf And Keyword Matching',
  softwareSkills: [
    'Microsoft Office (Word, Excel, PowerPoint)',
    'Inkscape',
    'Adobe Illustrator',
    'Photopea',
    'Adobe Photoshop',
    'CapCut',
    'Figma',
    'Database Management (MySQL)',
    'Basic Web Development (PHP, HTML, CSS, JavaScript)',
    'Digital Productivity Tools'
  ]
};

export const EXPERIENCES: Experience[] = [
  {
    role: 'IT Staff Trainee',
    organization: 'Grand Maleo Hotel',
    duration: '6 Months',
    description: 'Handled technical IT support alongside graphic design tasks for digital and print marketing materials.',
    details: [
      'Managed general IT troubleshooting and set up infrastructure for hotel guests and staff.',
      'Created polished visual media (digital and print) delivering clearer brand communications to hotel clients.',
      'Designed visual assets utilizing Inkscape, Adobe Illustrator, and Photopea matching hotel standards.'
    ]
  },
  {
    role: 'Administrator and Finance Officer',
    organization: 'RGarage Modification',
    duration: '2 Years',
    description: 'Managed executive business operations, data management, and financial documentation structures to optimize workplace efficiency.',
    details: [
      'Supervised complete operational administration pipelines and generated daily transaction reports.',
      'Constructed modular transaction letter systems and audited historical accounting logs with extreme precision.',
      'Coordinated stakeholder engagement with clients and auto-part suppliers, securing strong relationships.'
    ]
  },
  {
    role: 'Waiter',
    organization: 'Bakul Sunda Restaurant',
    duration: '1 Year',
    description: 'Delivered customer-centered services, optimized physical table layouts, and kept restaurant logistics in sync.',
    details: [
      'Cultivated efficient workspace coordination under fast-paced dinner workloads.',
      'Maintained precise orders records resulting in high customer retention and seamless service.'
    ]
  }
];

export const ORGANIZATIONAL_EXPERIENCE: OrganizationalExperience = {
  role: 'Chairman of the Committee',
  organization: 'Toraja Church Youth Fellowship Easter',
  duration: 'January 2018 – July 2018',
  description: 'Served as Chairman of the Committee. Led complete team coordination, managed event execution budget, supervised creative elements, and successfully reached all organizational objectives.'
};

export const VOLUNTEER_EXPERIENCE: VolunteerExperience = {
  role: 'Volunteer Mentor / Teacher',
  organization: 'Gerakan Mengajar Desa (GMD), Palu City',
  duration: '2018',
  description: 'Volunteered to teach basic computer literacy to children. Responsible for introducing fundamental technology concepts, guiding kids in computer operations, and boosting public speaking skills while building regional tech awareness.'
};

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Developer & Design: Building a Strong UI/UX Foundation',
    program: 'CODEPOLITAN Online Class Program'
  },
  {
    title: 'Introduction to Computer Programming',
    program: 'CODEPOLITAN Online Class Program'
  },
  {
    title: 'The Complete Full Stack Web Development Bootcamp',
    program: 'Udemy Course'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Selected Participant in the Field of ICTECH',
    desc: 'Selected participant for the tech presentation organized by Dr. Dwi Anita Ahmad Kasim, S.Kom, M.Cs (2019).'
  },
  {
    title: 'First Honorable Mention',
    desc: 'Celebrated finalist achievement in the prestigious Celebes Robot Contest in Makassar.'
  }
];

export const LANGUAGES: LanguageStatus[] = [
  { language: 'Bahasa Indonesia', proficiency: 'Native / Fluent' },
  { language: 'English', proficiency: 'Intermediate' },
  { language: 'Mandarin', proficiency: 'Currently learning' }
];

export const PROJECTS: Project[] = [
  {
    id: 'thesis-system',
    title: 'Research Field Identification & Supervisor Lecturer Recommendation System',
    category: 'IT & Development',
    focus: 'TF-IDF Text Processing, Recommendation Algorithms, Database Architecture',
    summary: 'A systemized text identification platform built for Paulus Indonesia Christian University using custom math indexes.',
    description: 'This is Lebianto\'s landmark final university project. It analyzes raw thematic text submissions from students and matches them mathematically with relevant professors based on keyword indexing. Developed to optimize departmental workflows and increase recommendation accuracy.',
    duration: 'Final Project (2025)',
    toolsUsed: ['PHP', 'MySQL', 'JavaScript', 'HTML5/CSS3', 'TF-IDF Algorithm', 'Text Mining'],
    deliverables: [
      'Interactive Student Dashboard',
      'TF-IDF Similarity Weight Calculator',
      'Administrator Matcher Panel',
      'Performance Benchmark Reports'
    ],
    mockStats: [
      { label: 'Algorithm Accuracy', value: '92%' },
      { label: 'Match Time Reduced', value: '75%' },
      { label: 'Database Queries', value: 'Optimized' }
    ],
    steps: [
      { title: 'Information Extraction', desc: 'Pre-processed documents using text-tokenization and stopword removal dictionaries.' },
      { title: 'Weight Calculation', desc: 'Formulated Term Frequency & Inverse Document Frequency algorithms to index master research fields.' },
      { title: 'Matching Test', desc: 'Calibrated recommendation thresholds through a comparative analysis against manual reviews.' }
    ]
  },
  {
    id: 'tindog-concept',
    title: 'UI Design Concept — TinDog Application',
    category: 'UI/UX',
    focus: 'Interface design, responsive layout, CSS bootstrap frames, prototyping',
    summary: 'A beautiful, clean, and highly playful UI concept designed with tailored layout strategies.',
    description: 'An interactive web-based design system modeled for connecting pet lovers. Leverages modern grid components, customizable branding palettes, and pixel-precise layout compositions to showcase high-fidelity responsiveness.',
    duration: '2 Weeks (2024)',
    toolsUsed: ['HTML5/CSS3', 'Figma', 'Bootsrap', 'Adobe Illustrator'],
    deliverables: ['Custom Theme Templates', 'Hero Section Mockups', 'Interactive Call-to-Act', 'Brand Color Palettes'],
    mockStats: [
      { label: 'Layout Efficiency', value: '100% Fluid' },
      { label: 'Page Load Speed', value: '0.4s' },
      { label: 'Dribbble Upvotes', value: 'Warm Support' }
    ],
    steps: [
      { title: 'Visual Research', desc: 'Aligned custom illustration assets featuring modern high-contrast cards.' },
      { title: 'Interactive Prototype', desc: 'Crafted structured components targeting mobile, tablet, and desktop viewports seamlessly.' }
    ]
  },
  {
    id: 'maleo-graphics',
    title: 'Graphic Design & Brand Assets — Grand Maleo Hotel',
    category: 'Branding',
    focus: 'Digital & Print media, brand guidelines, typography systems',
    summary: 'Constructed cohesive digital designs and print marketing collateral representing high hotel service standards.',
    description: 'During a 6-month IT and design placement, created a range of customer-interaction graphics, print folders, menus, and promotional banners for Grand Maleo Hotel, boosting community engagement and standardizing marketing materials.',
    duration: '6 Months Trainee',
    toolsUsed: ['Inkscape', 'Adobe Illustrator', 'Photopea', 'Adobe Photoshop'],
    deliverables: ['Hotel Print Brochure', 'Social Media Templates', 'Digital Key Card Layouts', 'Event Banner Designs'],
    mockStats: [
      { label: 'Assisted Assets', value: '30+ Designs' },
      { label: 'Customer Clarity', value: '+35%' },
      { label: 'Software Workflow', value: 'Open-Source integrated' }
    ],
    steps: [
      { title: 'Sizing Calibration', desc: 'Ensured print resolution profiles matched requirements with offset printers.' },
      { title: 'Palette Integration', desc: 'Adhered strictly to local corporate guidelines with premium gold/indigo combinations.' }
    ]
  },
  {
    id: 'rgarage-operations',
    title: 'Operational Administration System — RGarage Modification',
    category: 'IT & Development',
    focus: 'Data systems, transaction letters, spreadsheet modeling',
    summary: 'Structured operational bookkeeping protocols and transaction audit guidelines.',
    description: 'Created custom client service forms, billing sheets, and parts management databases to assist mechanical workshops in organizing client information, vehicle repair metrics, and parts supplier invoicing timelines.',
    duration: '2 Years Placement',
    toolsUsed: ['Microsoft Excel', 'Custom Document Templates', 'System Management Tools', 'MySQL Databases'],
    deliverables: ['Parts Inventory Sheets', 'Supplier Invoicing Tracker', 'Client Booking Forms', 'Operational Performance Reports'],
    mockStats: [
      { label: 'Records Handled', value: '1,500+' },
      { label: 'Billing Overlaps', value: '0%' },
      { label: 'Operational Speed', value: '+25%' }
    ],
    steps: [
      { title: 'Pain-point Diagnosis', desc: 'Audited historic paper-based transactions to pin down record gaps and duplication errors.' },
      { title: 'Digital Upgrade', desc: 'Implemented structured databases and dynamic financial calculators.' }
    ]
  }
];

export const DESIGN_APPROACH: DesignApproachStep[] = [
  {
    title: 'Requirement Diagnoses',
    description: 'Deep diving into hardware, operational workflows, and stakeholder needs.',
    details: 'Whether implementing recommenders, diagnosing hardware glitches, or compiling visual briefs, the process always starts with listening. I map operational bottlenecks and identify technology dependencies before drafting solutions.'
  },
  {
    title: 'Systemized Blueprinting',
    description: 'Documenting clear structural patterns, tables, and wireframe outlines.',
    details: 'Coherence demands structure. I design database entities with solid normalizing keys, build UI templates with standard components, and document administrative guidelines so teams can scale without friction.'
  },
  {
    title: 'Iterative Implementation',
    description: 'Testing, debugging code, and refining design configurations.',
    details: 'Polished results come from feedback loops. I test query performances, verify responsive breakpoints, configure printer profiles, and calibrate interfaces to provide users with a delightful layout.'
  }
];

export const SKILL_BADGES: SkillBadge[] = [
  {
    label: 'IT Support & Hardware',
    relatedTools: ['Troubleshooting', 'System Maintenance', 'Setup & Assembly', 'Asset Management'],
    description: 'Configuring network nodes, mounting hardware devices, recovering operating systems, and resolving workstation downtime efficiently.'
  },
  {
    label: 'Software Engineering',
    relatedTools: ['PHP', 'MySQL', 'HTML/CSS/JavaScript', 'Debugging', 'Algorithms'],
    description: 'Drafting responsive, grid-aligned web pages, analyzing databases, and implementing algorithms (such as TF-IDF text parsing).'
  },
  {
    label: 'Graphic & UI Design',
    relatedTools: ['Adobe Illustrator', 'Inkscape', 'Figma', 'Photopea', 'Photoshop'],
    description: 'Constructing high-fidelity mockups, drawing organic vector elements, and structuring printed folders or hotel marketing collateral.'
  },
  {
    label: 'Business Operations',
    relatedTools: ['Transaction Records', 'Audit Documentation', 'Suppliers Coord', 'Stakeholder Comms'],
    description: 'Drafting business reports, optimizing data schemas, coordinating teams, and keeping documentation in chronological order.'
  }
];
