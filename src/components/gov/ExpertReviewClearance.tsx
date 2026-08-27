import React, { useState, useMemo } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  ClipboardCheck, Award, CheckCircle2, AlertTriangle, ShieldCheck, 
  Search, Filter, ArrowLeft, ArrowRight, ChevronRight, Download, FileText, 
  Sparkles, Check, X, Lock, Unlock, Edit3, ArrowUpRight, Activity, 
  Building2, Users, FileSpreadsheet, Send, Layers, ExternalLink, 
  FileCheck, Shield, BookOpen, Star, Clock, HelpCircle, Eye 
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import confetti from 'canvas-confetti';

interface EvaluatorNoteData {
  recommendation: 'Approved for Pilot' | 'Not Approved for Pilot' | 'Pending';
  summary: string;
  techReadiness: string;
  pastProjects: string;
  marketReputation: string;
  teamCapability: string;
  complianceRisk: string;
  conditions: string;
  evaluatorName: string;
  date: string;
}

interface ShortlistedStartup {
  id: string;
  name: string;
  legalName: string;
  logo: string;
  aiRank: number;
  aiScore: number;
  aiBreakdown: {
    relevance: number;
    technical: number;
    pastPerformance: number;
    complianceRisk: number;
  };
  eligibilityStatus: 'Eligible' | 'Conditionally Eligible' | 'Ineligible';
  evidenceStatus: 'Verified' | 'Partially Verified' | 'Pending';
  keyStrengths: string;
  approvalStatus: 'Approved' | 'Not Approved' | 'Pending';
  evaluatorNote: EvaluatorNoteData | null;
  dossier: {
    overview: {
      foundingYear: string;
      location: string;
      entityType: string;
      teamSize: string;
      founders: string;
      mission: string;
      fundingStage: string;
    };
    tech: {
      description: string;
      architecture: string;
      integration: string;
      security: string;
      whitepaperName: string;
    };
    pastDeployments: {
      client: string;
      scope: string;
      duration: string;
      outcome: string;
    }[];
    marketStanding: {
      awards: string[];
      media: string[];
      references: string[];
    };
    documents: {
      name: string;
      type: string;
      size: string;
      date: string;
    }[];
  };
}

interface ProblemStatementItem {
  id: string;
  psCode: string;
  title: string;
  description: string;
  department: string;
  stage: 'Expert Evaluation' | 'Completed' | 'Pending Expert Review';
  shortlistCount: number;
  isLocked: boolean;
  startups: ShortlistedStartup[];
}

export const ExpertReviewClearance: React.FC = () => {
  const { setActiveTab, addNotification } = usePlatform();

  // Navigation State
  const [selectedPSId, setSelectedPSId] = useState<string | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState<string>('All');
  const [selectedRoundFilter, setSelectedRoundFilter] = useState<string>('Round 1');

  // Interactive Modals State
  const [editingNoteStartup, setEditingNoteStartup] = useState<ShortlistedStartup | null>(null);
  const [viewingDossierStartup, setViewingDossierStartup] = useState<ShortlistedStartup | null>(null);
  const [dossierActiveTab, setDossierActiveTab] = useState<'overview' | 'tech' | 'past' | 'market' | 'docs' | 'ai' | 'notes'>('overview');

  // Form State for Evaluator Note Modal
  const [noteRecommendation, setNoteRecommendation] = useState<'Approved for Pilot' | 'Not Approved for Pilot' | 'Pending'>('Approved for Pilot');
  const [noteSummary, setNoteSummary] = useState('');
  const [noteTechReadiness, setNoteTechReadiness] = useState('');
  const [notePastProjects, setNotePastProjects] = useState('');
  const [noteMarketReputation, setNoteMarketReputation] = useState('');
  const [noteTeamCapability, setNoteTeamCapability] = useState('');
  const [noteComplianceRisk, setNoteComplianceRisk] = useState('');
  const [noteConditions, setNoteConditions] = useState('');

  // Primary Data State
  const [psList, setPsList] = useState<ProblemStatementItem[]>([
    {
      id: 'PS1',
      psCode: 'PS1',
      title: 'Smart Water Loss Reduction in Urban Distribution Networks',
      description: 'AI-based acoustic leak detection and pressure optimization for municipal water distribution mains.',
      department: 'Maharashtra Water Supply & Sanitation Department',
      stage: 'Expert Evaluation',
      shortlistCount: 5,
      isLocked: false,
      startups: [
        {
          id: 'ST-001',
          name: 'AquaSense Technologies',
          legalName: 'AQUASENSE TECHNOLOGIES PRIVATE LIMITED',
          logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
          aiRank: 1,
          aiScore: 94,
          aiBreakdown: { relevance: 96, technical: 95, pastPerformance: 94, complianceRisk: 92 },
          eligibilityStatus: 'Eligible',
          evidenceStatus: 'Verified',
          keyStrengths: '3 city deployments; strong CERT-In Level 3 cybersecurity & SCADA telemetry integration.',
          approvalStatus: 'Approved',
          evaluatorNote: {
            recommendation: 'Approved for Pilot',
            summary: 'High detection accuracy in simulation and verified 22% NRW loss reduction in Pune trial. Strong integration plan with municipal SCADA.',
            techReadiness: 'TRL 8 (Commercial field deployed)',
            pastProjects: 'Pune Municipal Corp (Zone A, 120km), PCMC Ward 4',
            marketReputation: 'Winner of Maharashtra State Innovation Award 2025',
            teamCapability: 'Founders have 15+ years in municipal hydraulic engineering & AI',
            complianceRisk: 'CERT-In Level 3 certified, MeitY AWS Cloud Mumbai data residency',
            conditions: 'Approve subject to baseline sensor calibration period of 14 days and mid-term review at 3 months.',
            evaluatorName: 'Dr. Meera Deshmukh (COEP Tech Univ & MeitY Advisor)',
            date: '12-Aug-2026'
          },
          dossier: {
            overview: {
              foundingYear: '2021',
              location: 'Pune, Maharashtra',
              entityType: 'Private Limited Company (DPIIT Recognised: DIPP98214)',
              teamSize: '28 Full-time Engineers & Researchers',
              founders: 'Dr. Vikram Joshi (Ex-IITB), Priya Shinde (Hydraulic Systems Lead)',
              mission: 'Eliminating non-revenue municipal water losses using acoustic AI sensors and transient pressure modeling.',
              fundingStage: 'Series A (INR 12 Cr from Maharashtra Innovation Catalyst Fund & Peak Ventures)'
            },
            tech: {
              description: 'Non-invasive clamp-on hydrophone sensors sampling at 10 kHz paired with edge microcontrollers running Fourier wavelet transforms to pinpoint microscopic pipe wall acoustic anomalies.',
              architecture: 'Edge IoT Hydrophones → 4G/LoRaWAN Gateway → State SCADA Open REST API → Real-time Leak GIS Map.',
              integration: 'Pre-built connectors for Wonderware, Schneider Electric SCADA, and ESRI ArcGIS.',
              security: 'End-to-end TLS 1.3 encryption, AES-256 telemetry hashing, CERT-In Level 3 compliance, data hosted exclusively in AWS Mumbai region.',
              whitepaperName: 'AquaSense-Acoustic-Telemetry-Whitepaper-v3.pdf'
            },
            pastDeployments: [
              { client: 'Pune Municipal Corporation', scope: 'Zone A (120 km pressurized distribution pipeline)', duration: '8 Months', outcome: 'Detected 42 hidden underground leaks; 18.4% NRW loss reduction.' },
              { client: 'Pimpri Chinchwad Municipal Corp', scope: 'Industrial Sector 10 Water Network', duration: '5 Months', outcome: 'Sub-15 minute alert latency achieved with 94.8% localization precision.' }
            ],
            marketStanding: {
              awards: ['National Water Mission Innovation Award 2025', 'Maharashtra State Innovation Society Top 10 GovTech'],
              media: ['Featured in Times of India: "How Pune Startup is plugging city pipe leaks"', 'GovTech India Review 2026'],
              references: ['Chief Engineer – Water Supply, Pune Municipal Corporation', 'Advisor – Smart City Mission']
            },
            documents: [
              { name: 'Incorporation-Certificate-MCA.pdf', type: 'Registration', size: '1.2 MB', date: '14-Feb-2021' },
              { name: 'DPIIT-Recognition-Certificate.pdf', type: 'DPIIT', size: '450 KB', date: '10-Mar-2021' },
              { name: 'CERT-In-Level3-CyberAudit-2026.pdf', type: 'Security', size: '2.8 MB', date: '05-Jan-2026' },
              { name: 'Patent-Acoustic-Transient-Modeling.pdf', type: 'IP/Patent', size: '3.4 MB', date: '20-Oct-2023' },
              { name: 'Audited-Financials-FY24-25.pdf', type: 'Financials', size: '2.1 MB', date: '30-Jun-2025' }
            ]
          }
        },
        {
          id: 'ST-004',
          name: 'HydroMind Labs',
          legalName: 'HYDROMIND LABS LLP',
          logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&auto=format&fit=crop&q=80',
          aiRank: 2,
          aiScore: 81,
          aiBreakdown: { relevance: 85, technical: 82, pastPerformance: 80, complianceRisk: 88 },
          eligibilityStatus: 'Eligible',
          evidenceStatus: 'Verified',
          keyStrengths: 'Good detection accuracy; low unit sensor cost, fast deployment time.',
          approvalStatus: 'Approved',
          evaluatorNote: {
            recommendation: 'Approved for Pilot',
            summary: 'Cost-effective transient pressure monitoring solution. Excellent hydraulic simulation capabilities.',
            techReadiness: 'TRL 7 (Prototype demonstrated in operational environment)',
            pastProjects: 'Nagpur Rural Water Supply Scheme (25 km)',
            marketReputation: 'Incubated at VNIT Nagpur TBI',
            teamCapability: 'Experienced IoT hardware embedded engineers',
            complianceRisk: 'MeitY Cloud hosting verified, ISO 27001 in progress',
            conditions: 'Conditional on completing GeM seller cataloging within 30 days of pilot kickoff.',
            evaluatorName: 'Prof. Anand Kulkarni (VJTI Mumbai)',
            date: '14-Aug-2026'
          },
          dossier: {
            overview: {
              foundingYear: '2022',
              location: 'Nagpur, Maharashtra',
              entityType: 'Limited Liability Partnership (LLP)',
              teamSize: '14 Engineers',
              founders: 'Rahul Deshmukh, Sneha Patil',
              mission: 'Providing affordable IoT water pressure sensors for smart rural and peri-urban grids.',
              fundingStage: 'Seed Stage (INR 1.5 Cr Grant from MSInS)'
            },
            tech: {
              description: 'Transient pressure wave damping sensors with battery life exceeding 3 years on cellular NB-IoT.',
              architecture: 'Piezoelectric pressure transducers → NB-IoT SIM → HydroMind Analytics Cloud.',
              integration: 'REST APIs for municipal SCADA systems.',
              security: 'AES-128 payload encryption, ISO 9001 quality certified.',
              whitepaperName: 'HydroMind-Transient-Sensor-Tech.pdf'
            },
            pastDeployments: [
              { client: 'Nagpur Zilla Parishad', scope: 'Rural Water Feeder Pipeline (25 km)', duration: '4 Months', outcome: 'Identified 12 major burst events before surface flooding.' }
            ],
            marketStanding: {
              awards: ['VNIT Best DeepTech Startup 2024'],
              media: ['Nagpur Today Coverage on Rural Smart Water'],
              references: ['Executive Engineer – Rural Water Supply Division Nagpur']
            },
            documents: [
              { name: 'LLP-Incorporation-Certificate.pdf', type: 'Registration', size: '980 KB', date: '12-May-2022' },
              { name: 'DPIIT-Certificate-HydroMind.pdf', type: 'DPIIT', size: '420 KB', date: '18-Jun-2022' },
              { name: 'Pressure-Sensor-Calibration-NABL.pdf', type: 'Compliance', size: '1.6 MB', date: '11-Nov-2024' }
            ]
          }
        },
        {
          id: 'ST-999',
          name: 'FlowGuard Innovations',
          legalName: 'FLOWGUARD INNOVATIONS PRIVATE LIMITED',
          logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=150&auto=format&fit=crop&q=80',
          aiRank: 3,
          aiScore: 62,
          aiBreakdown: { relevance: 70, technical: 65, pastPerformance: 58, complianceRisk: 60 },
          eligibilityStatus: 'Eligible',
          evidenceStatus: 'Partially Verified',
          keyStrengths: 'Innovative edge transducer concept; however limited real-world municipal field evidence.',
          approvalStatus: 'Not Approved',
          evaluatorNote: {
            recommendation: 'Not Approved for Pilot',
            summary: 'Hardware is still at TRL 5. High sensor failure rate observed in pilot bench tests. Cloud infrastructure currently hosted on overseas servers without CERT-In audit.',
            techReadiness: 'TRL 5 (Technology validated in lab/limited simulated grid)',
            pastProjects: 'Small scale university campus demonstration only',
            marketReputation: 'Early stage incubator graduate',
            teamCapability: 'Good algorithmic team, but lacking civil pipeline integration experience',
            complianceRisk: 'Non-compliant with Maharashtra Data Residency & Cyber Policy v2.0',
            conditions: 'Advised to re-apply after completing CERT-In audit and 6 months of field stress testing.',
            evaluatorName: 'Dr. Meera Deshmukh (COEP Tech Univ & MeitY Advisor)',
            date: '15-Aug-2026'
          },
          dossier: {
            overview: {
              foundingYear: '2023',
              location: 'Navi Mumbai, Maharashtra',
              entityType: 'Private Limited Company',
              teamSize: '6 Members',
              founders: 'Arjun Nair, Kevin Dsouza',
              mission: 'Acoustic AI pipeline monitoring for commercial campuses.',
              fundingStage: 'Pre-Seed (Bootstrapped)'
            },
            tech: {
              description: 'Ultrasonic flow clamp sensors with micro-battery backup.',
              architecture: 'Bluetooth Low Energy → Local Gateway → Public Cloud.',
              integration: 'Basic CSV / Webhook export.',
              security: 'Basic SSL/TLS encryption.',
              whitepaperName: 'FlowGuard-Design-Overview.pdf'
            },
            pastDeployments: [
              { client: 'Engineering College Campus', scope: 'Internal campus distribution (4 km)', duration: '2 Months', outcome: 'Tested acoustic resonance in plastic PVC pipes.' }
            ],
            marketStanding: {
              awards: ['College Hackathon 1st Prize 2024'],
              media: [],
              references: ['Dean R&D – Engineering Institute']
            },
            documents: [
              { name: 'Incorporation-Doc-FlowGuard.pdf', type: 'Registration', size: '1.1 MB', date: '04-Jan-2023' }
            ]
          }
        },
        {
          id: 'ST-007',
          name: 'SmartFlow Systems',
          legalName: 'SMARTFLOW SYSTEMS PRIVATE LIMITED',
          logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80',
          aiRank: 4,
          aiScore: 74,
          aiBreakdown: { relevance: 78, technical: 75, pastPerformance: 70, complianceRisk: 74 },
          eligibilityStatus: 'Eligible',
          evidenceStatus: 'Pending',
          keyStrengths: 'Promising pilot in one district; scalable cloud dashboard and mobile alerts.',
          approvalStatus: 'Pending',
          evaluatorNote: null,
          dossier: {
            overview: {
              foundingYear: '2022',
              location: 'Thane, Maharashtra',
              entityType: 'Private Limited Company',
              teamSize: '12 Members',
              founders: 'Tanvi Shah, Amit Koli',
              mission: 'Real-time smart water distribution metering and leak interception.',
              fundingStage: 'Seed Stage'
            },
            tech: {
              description: 'Digital ultrasonic clamp meters with solar power harvesting.',
              architecture: 'Solar IoT Nodes → State Cloud Platform.',
              integration: 'RESTful API.',
              security: 'MeitY Cloud empanelled infrastructure.',
              whitepaperName: 'SmartFlow-Architecture.pdf'
            },
            pastDeployments: [
              { client: 'Thane Municipal Corporation', scope: 'Ward 2 pilot (18 km)', duration: '3 Months', outcome: 'Monitored daily water delivery variance.' }
            ],
            marketStanding: {
              awards: ['Thane Smart Innovation Cohort 2025'],
              media: ['Thane City Local Media'],
              references: ['Assistant Municipal Commissioner, Thane']
            },
            documents: [
              { name: 'SmartFlow-Registration.pdf', type: 'Registration', size: '1.4 MB', date: '10-Oct-2022' }
            ]
          }
        },
        {
          id: 'ST-008',
          name: 'PipeAI Labs',
          legalName: 'PIPEAI LABS LLP',
          logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=80',
          aiRank: 5,
          aiScore: 54,
          aiBreakdown: { relevance: 60, technical: 52, pastPerformance: 48, complianceRisk: 58 },
          eligibilityStatus: 'Ineligible',
          evidenceStatus: 'Pending',
          keyStrengths: 'Early-stage; insufficient track record and lack of required NABL sensor calibration certificates.',
          approvalStatus: 'Not Approved',
          evaluatorNote: {
            recommendation: 'Not Approved for Pilot',
            summary: 'Does not meet minimum mandatory eligibility criteria for pressurized municipal distribution pilot. Lacks NABL calibration documentation and DPIIT certification is expired.',
            techReadiness: 'TRL 4 (Component validation in laboratory environment)',
            pastProjects: 'No municipal field deployments on record',
            marketReputation: 'New entity registered under 6 months ago',
            teamCapability: 'Single founder without technical co-founder',
            complianceRisk: 'Missing NABL sensor certificates, no cybersecurity audit',
            conditions: 'Entity ineligible under Clause 4.2 of State Procurement Norms.',
            evaluatorName: 'Dr. Meera Deshmukh (COEP Tech Univ & MeitY Advisor)',
            date: '16-Aug-2026'
          },
          dossier: {
            overview: {
              foundingYear: '2024',
              location: 'Nashik, Maharashtra',
              entityType: 'LLP',
              teamSize: '3 Members',
              founders: 'Rohan Shinde',
              mission: 'AI software algorithms for flow anomaly recognition.',
              fundingStage: 'Unfunded'
            },
            tech: {
              description: 'Software-only analytics platform for existing municipal meters.',
              architecture: 'Web dashboard.',
              integration: 'Manual Excel upload.',
              security: 'Basic server.',
              whitepaperName: 'PipeAI-Summary.pdf'
            },
            pastDeployments: [],
            marketStanding: {
              awards: [],
              media: [],
              references: []
            },
            documents: [
              { name: 'PipeAI-LLP-Doc.pdf', type: 'Registration', size: '750 KB', date: '12-Mar-2024' }
            ]
          }
        }
      ]
    },
    {
      id: 'PS2',
      psCode: 'PS2',
      title: 'Autonomous Solid Waste Segregation & Robotic Sorting',
      description: 'High-speed robotic delta arm with computer vision to classify and divert dry recyclables at municipal transfer stations.',
      department: 'Environment & Climate Change Department',
      stage: 'Expert Evaluation',
      shortlistCount: 3,
      isLocked: false,
      startups: [
        {
          id: 'ST-002',
          name: 'CleanBot Innovations',
          legalName: 'CLEANBOT INNOVATIONS LLP',
          logo: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=150&auto=format&fit=crop&q=80',
          aiRank: 1,
          aiScore: 91,
          aiBreakdown: { relevance: 94, technical: 92, pastPerformance: 90, complianceRisk: 90 },
          eligibilityStatus: 'Eligible',
          evidenceStatus: 'Verified',
          keyStrengths: '94.2% verified sorting precision; robust delta arm mechanics with 1.2 tons/day throughput.',
          approvalStatus: 'Approved',
          evaluatorNote: {
            recommendation: 'Approved for Pilot',
            summary: 'Exemplary computer vision optical sorting inference. Cleared industrial safety standards ISO 10218.',
            techReadiness: 'TRL 8 (Commercial field operational)',
            pastProjects: 'Navi Mumbai APMC Yard (60-day continuous run)',
            marketReputation: 'Swachh Maharashtra Innovator 2025',
            teamCapability: 'Robotics PhDs from IIT Bombay',
            complianceRisk: 'Fully compliant with State Cyber Policy v2.0',
            conditions: 'Approved for transfer station pilot deployment with automated safety emergency cutoff.',
            evaluatorName: 'Dr. Sandeep Patil (Robotics & AI Lead, VJTI)',
            date: '10-Aug-2026'
          },
          dossier: {
            overview: {
              foundingYear: '2021',
              location: 'Navi Mumbai, Maharashtra',
              entityType: 'Limited Liability Partnership',
              teamSize: '22 Robotics Engineers',
              founders: 'Omkar Gokhale, Tanvi Mane',
              mission: 'Automating municipal landfill waste diversion through high-speed edge computer vision robotics.',
              fundingStage: 'Pre-Series A (INR 6 Cr)'
            },
            tech: {
              description: 'Custom delta robot arms with 90 picks/min pneumatic gripper and RGB-D multi-spectral cameras running lightweight YOLOv8 models at 60 FPS.',
              architecture: 'Edge GPU Inference Box → Delta Robotic Arm Controller → SCADA Telemetry Bridge.',
              integration: 'OPC-UA and Modbus protocols for municipal conveyor belts.',
              security: 'Enclosed IP65 rated dustproof casing, encrypted telemetry.',
              whitepaperName: 'CleanBot-Robotic-Waste-Sorting.pdf'
            },
            pastDeployments: [
              { client: 'Navi Mumbai Municipal Corporation', scope: 'APMC Market Yard Transfer Station', duration: '6 Months', outcome: 'Diverted 84 tons of recyclable plastics with 94.2% purity.' }
            ],
            marketStanding: {
              awards: ['Swachh Bharat Innovation Challenge 1st Prize'],
              media: ['NDTV Clean India Feature', 'Maharashtra Times Innovation Spotlight'],
              references: ['Deputy Municipal Commissioner (Solid Waste), NMMC']
            },
            documents: [
              { name: 'CleanBot-LLP-Reg.pdf', type: 'Registration', size: '1.2 MB', date: '08-Jan-2021' },
              { name: 'ISO-10218-Safety-Cert.pdf', type: 'Safety', size: '1.9 MB', date: '14-Mar-2024' },
              { name: 'DPIIT-Cert-CleanBot.pdf', type: 'DPIIT', size: '480 KB', date: '22-Apr-2021' }
            ]
          }
        },
        {
          id: 'ST-888',
          name: 'EcoSort Robotics',
          legalName: 'ECOSORT ROBOTICS PRIVATE LIMITED',
          logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&auto=format&fit=crop&q=80',
          aiRank: 2,
          aiScore: 78,
          aiBreakdown: { relevance: 80, technical: 78, pastPerformance: 76, complianceRisk: 82 },
          eligibilityStatus: 'Eligible',
          evidenceStatus: 'Verified',
          keyStrengths: 'High-speed air-jet sorter for lightweight plastic films; lower mechanical throughput on rigid PET.',
          approvalStatus: 'Pending',
          evaluatorNote: null,
          dossier: {
            overview: {
              foundingYear: '2023',
              location: 'Pune, Maharashtra',
              entityType: 'Private Limited Company',
              teamSize: '10 Engineers',
              founders: 'Kedar Vaidya',
              mission: 'Pneumatic sorting solutions for packaging waste.',
              fundingStage: 'Seed Funded'
            },
            tech: {
              description: 'Optical pneumatic air-jet ejection system.',
              architecture: 'High-speed line-scan camera with air valves.',
              integration: 'Standard conveyor integration.',
              security: 'Local industrial control system.',
              whitepaperName: 'EcoSort-Tech.pdf'
            },
            pastDeployments: [
              { client: 'Pune Industrial Park', scope: 'Secondary packaging recycling line', duration: '3 Months', outcome: 'Sorted LDPE film at 82% purity.' }
            ],
            marketStanding: {
              awards: ['Pune StartUp Fest Winner 2024'],
              media: [],
              references: ['Director – Industrial Packaging Hub']
            },
            documents: [
              { name: 'EcoSort-Incorporation.pdf', type: 'Registration', size: '920 KB', date: '05-Feb-2023' }
            ]
          }
        }
      ]
    },
    {
      id: 'PS3',
      psCode: 'PS3',
      title: 'Drone-Based Multispectral Crop Health & Pest Risk Monitoring',
      description: 'Aerial remote sensing and AI spectral index models to pinpoint early-stage crop stress across horticulture districts.',
      department: 'Agriculture & Farmers Welfare Department',
      stage: 'Expert Evaluation',
      shortlistCount: 2,
      isLocked: false,
      startups: [
        {
          id: 'ST-003',
          name: 'CropCare AI Labs',
          legalName: 'CROPCARE AI LABS PRIVATE LIMITED',
          logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&auto=format&fit=crop&q=80',
          aiRank: 1,
          aiScore: 93,
          aiBreakdown: { relevance: 96, technical: 94, pastPerformance: 92, complianceRisk: 92 },
          eligibilityStatus: 'Eligible',
          evidenceStatus: 'Verified',
          keyStrengths: 'DGCA type-certified drones, tested across 12,000+ acres for Maharashtra Grape Growers.',
          approvalStatus: 'Approved',
          evaluatorNote: {
            recommendation: 'Approved for Pilot',
            summary: 'Exceptional spectral index modeling for early pest pre-symptom detection. Marathi WhatsApp advisory bot has 92% farmer retention.',
            techReadiness: 'TRL 8 (Commercial field operational)',
            pastProjects: 'Nashik & Sangli Grape Growers Cooperatives',
            marketReputation: 'AgriTech Startup of the Year 2025',
            teamCapability: 'Agronomists and drone pilots certified by DGCA',
            complianceRisk: 'DGCA type-certified, Survey of India compliant',
            conditions: 'Cleared for multi-district horticulture pilot deployment.',
            evaluatorName: 'Dr. Shashank Bhide (Agriculture Innovation Board)',
            date: '11-Aug-2026'
          },
          dossier: {
            overview: {
              foundingYear: '2021',
              location: 'Nashik, Maharashtra',
              entityType: 'Private Limited Company',
              teamSize: '30 Agronomists, Pilots & ML Engineers',
              founders: 'Sameer Mahajan, Radhika Kulkarni',
              mission: 'Democratizing precision agriculture and early pest detection for Indian farmers via aerial remote sensing.',
              fundingStage: 'Series A (INR 14 Cr)'
            },
            tech: {
              description: 'Hexacopter multispectral UAVs capturing RedEdge, NIR and thermal bands processed through proprietary deep convolutional neural networks to output farmer-friendly localized prescription maps.',
              architecture: 'Autonomous Flight Controller → Edge GPU Stitched Orthomosaic → AgriStack Cloud API → Marathi WhatsApp Bot.',
              integration: 'MahaDBT and State AgriStack API compatible.',
              security: 'DGCA NPNT DigitalSky compliance, Indian geospatial data residency on AWS Mumbai.',
              whitepaperName: 'CropCare-Spectral-Agronomy.pdf'
            },
            pastDeployments: [
              { client: 'Maharashtra Rajya Draksha Bagaitdar Sangh', scope: '12,000 Acres across Nashik, Dindori & Niphad', duration: '12 Months', outcome: 'Detected Downy Mildew 4 days prior to visual symptoms; saved estimated INR 3.4 Cr.' }
            ],
            marketStanding: {
              awards: ['National AgriTech Innovation Award 2025', 'NABARD Rural Impact Champion'],
              media: ['AgroWon Headline: "Drones saving grape vineyards"', 'Doordarshan Sahyadri Feature'],
              references: ['President – Maharashtra Grape Growers Association', 'Commissioner of Agriculture, Pune']
            },
            documents: [
              { name: 'CropCare-Incorporation-MCA.pdf', type: 'Registration', size: '1.3 MB', date: '11-Feb-2021' },
              { name: 'DGCA-Type-Certificate-UAV.pdf', type: 'DGCA', size: '2.4 MB', date: '18-Aug-2023' },
              { name: 'DPIIT-Recognition.pdf', type: 'DPIIT', size: '410 KB', date: '04-Mar-2021' }
            ]
          }
        }
      ]
    }
  ]);

  // Active Problem Statement
  const currentPS = useMemo(() => {
    return psList.find(p => p.id === selectedPSId) || psList[0];
  }, [selectedPSId, psList]);

  // Filtered List for Landing Page
  const filteredPSList = useMemo(() => {
    return psList.filter(ps => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = ps.title.toLowerCase().includes(q) ||
                            ps.psCode.toLowerCase().includes(q) ||
                            ps.department.toLowerCase().includes(q) ||
                            ps.startups.some(s => s.name.toLowerCase().includes(q));

      const matchesStatus = selectedStatusFilter === 'All' || 
        (selectedStatusFilter === 'Approved' && ps.startups.some(s => s.approvalStatus === 'Approved')) ||
        (selectedStatusFilter === 'Not Approved' && ps.startups.some(s => s.approvalStatus === 'Not Approved')) ||
        (selectedStatusFilter === 'Pending Review' && ps.startups.some(s => s.approvalStatus === 'Pending'));

      const matchesDept = selectedDepartmentFilter === 'All' || ps.department === selectedDepartmentFilter;

      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [psList, searchQuery, selectedStatusFilter, selectedDepartmentFilter]);

  // Summary Metrics for Active PS
  const psMetrics = useMemo(() => {
    if (!currentPS) return { total: 0, evaluated: 0, approved: 0, notApproved: 0, pending: 0 };
    const total = currentPS.startups.length;
    const evaluated = currentPS.startups.filter(s => s.evaluatorNote !== null).length;
    const approved = currentPS.startups.filter(s => s.approvalStatus === 'Approved').length;
    const notApproved = currentPS.startups.filter(s => s.approvalStatus === 'Not Approved').length;
    const pending = currentPS.startups.filter(s => s.approvalStatus === 'Pending').length;
    return { total, evaluated, approved, notApproved, pending };
  }, [currentPS]);

  // Open Evaluator Note Modal
  const handleOpenNoteModal = (startup: ShortlistedStartup) => {
    setEditingNoteStartup(startup);
    if (startup.evaluatorNote) {
      setNoteRecommendation(startup.evaluatorNote.recommendation);
      setNoteSummary(startup.evaluatorNote.summary);
      setNoteTechReadiness(startup.evaluatorNote.techReadiness);
      setNotePastProjects(startup.evaluatorNote.pastProjects);
      setNoteMarketReputation(startup.evaluatorNote.marketReputation);
      setNoteTeamCapability(startup.evaluatorNote.teamCapability);
      setNoteComplianceRisk(startup.evaluatorNote.complianceRisk);
      setNoteConditions(startup.evaluatorNote.conditions);
    } else {
      setNoteRecommendation(startup.approvalStatus === 'Approved' ? 'Approved for Pilot' : startup.approvalStatus === 'Not Approved' ? 'Not Approved for Pilot' : 'Pending');
      setNoteSummary(`Comprehensive review of ${startup.name}. Evaluated on technology readiness, past projects, cybersecurity compliance, and team capability.`);
      setNoteTechReadiness('TRL 8 (Commercial field deployed)');
      setNotePastProjects('Verified past municipal / commercial deployments');
      setNoteMarketReputation('Empanelled with recognized state accelerator / incubator');
      setNoteTeamCapability('Strong domain engineering and leadership credentials');
      setNoteComplianceRisk('Compliant with Maharashtra State Cyber Policy v2.0 and DPDP Act');
      setNoteConditions('');
    }
  };

  // Save Evaluator Note
  const handleSaveNote = () => {
    if (!editingNoteStartup || !selectedPSId) return;

    const newNote: EvaluatorNoteData = {
      recommendation: noteRecommendation,
      summary: noteSummary,
      techReadiness: noteTechReadiness,
      pastProjects: notePastProjects,
      marketReputation: noteMarketReputation,
      teamCapability: noteTeamCapability,
      complianceRisk: noteComplianceRisk,
      conditions: noteConditions,
      evaluatorName: 'Dr. Meera Deshmukh (Chief Technical Evaluator, COEP Tech Univ)',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    const newApprovalStatus: 'Approved' | 'Not Approved' | 'Pending' = 
      noteRecommendation === 'Approved for Pilot' ? 'Approved' :
      noteRecommendation === 'Not Approved for Pilot' ? 'Not Approved' : 'Pending';

    setPsList(prev => prev.map(p => {
      if (p.id === selectedPSId) {
        return {
          ...p,
          startups: p.startups.map(s => {
            if (s.id === editingNoteStartup.id) {
              return {
                ...s,
                evaluatorNote: newNote,
                approvalStatus: newApprovalStatus
              };
            }
            return s;
          })
        };
      }
      return p;
    }));

    addNotification({
      title: `Evaluator Note Recorded: ${editingNoteStartup.name}`,
      message: `Status updated to "${noteRecommendation}". Note archived with digital timestamp.`,
      portal: 'both',
      type: noteRecommendation === 'Approved for Pilot' ? 'success' : 'info'
    });

    if (noteRecommendation === 'Approved for Pilot') {
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    }

    setEditingNoteStartup(null);
  };

  // Quick Approval Dropdown Handler
  const handleQuickApprovalChange = (startupId: string, status: 'Approved' | 'Not Approved' | 'Pending') => {
    if (!selectedPSId) return;

    setPsList(prev => prev.map(p => {
      if (p.id === selectedPSId) {
        return {
          ...p,
          startups: p.startups.map(s => {
            if (s.id === startupId) {
              return {
                ...s,
                approvalStatus: status,
                evaluatorNote: s.evaluatorNote ? {
                  ...s.evaluatorNote,
                  recommendation: status === 'Approved' ? 'Approved for Pilot' : status === 'Not Approved' ? 'Not Approved for Pilot' : 'Pending'
                } : s.evaluatorNote
              };
            }
            return s;
          })
        };
      }
      return p;
    }));

    addNotification({
      title: `Approval Status Updated`,
      message: `Startup pilot clearance status set to "${status}".`,
      portal: 'gov',
      type: status === 'Approved' ? 'success' : 'info'
    });
  };

  // Lock Evaluation
  const handleLockEvaluation = (psId: string) => {
    setPsList(prev => prev.map(p => {
      if (p.id === psId) {
        const newLock = !p.isLocked;
        addNotification({
          title: newLock ? 'Expert Evaluation Locked' : 'Expert Evaluation Re-opened',
          message: newLock 
            ? `Evaluation for ${p.psCode} locked. Approved startups are now cleared for KPI Contract & Pilot Setup.`
            : `Evaluation for ${p.psCode} has been unlocked for modifications.`,
          portal: 'both',
          type: 'info'
        });
        return { ...p, isLocked: newLock };
      }
      return p;
    }));
  };

  // Proceed to KPI Contract & Pilot Setup (Coming Soon)
  const [isComingSoonModalOpen, setIsComingSoonModalOpen] = useState(false);

  const handleProceedToSetup = () => {
    setIsComingSoonModalOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="micro-label text-slate-400">Pre-Pilot Evaluation & Shortlist Gate</span>
            <span className="w-2 h-2 rounded-full bg-[#1D64EC]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-display">
            Expert Evaluation – Startup Shortlist for Pilot
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl">
            Review AI-shortlisted startups for each Problem Statement (PS), examine their eligibility, evidence, and market standing, then record expert evaluations and approve startups for the controlled pilot.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-navy-900 shadow-xs">
            <span className="text-[#1D64EC] text-base">{psList.reduce((acc, p) => acc + p.startups.filter(s => s.approvalStatus === 'Approved').length, 0)}</span> Startups Approved for Pilot
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: PROBLEM STATEMENT SELECTOR (Main Landing View) */}
      {/* ========================================================================= */}
      {!selectedPSId && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Top Search & Filter Bar */}
          <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row items-center gap-3">
            <div className="flex-1 w-full relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search problem statements, startups, or department calls..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-navy-900 outline-none focus:border-[#1D64EC] focus:bg-white placeholder:text-slate-400 transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none focus:border-[#1D64EC] cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Approved">Has Approved Startups</option>
                <option value="Pending Review">Pending Reviews</option>
                <option value="Not Approved">Has Not Approved</option>
              </select>

              <select
                value={selectedDepartmentFilter}
                onChange={(e) => setSelectedDepartmentFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none focus:border-[#1D64EC] cursor-pointer"
              >
                <option value="All">All Departments</option>
                <option value="Maharashtra Water Supply & Sanitation Department">Water Supply</option>
                <option value="Environment & Climate Change Department">Environment</option>
                <option value="Agriculture & Farmers Welfare Department">Agriculture</option>
              </select>

              <select
                value={selectedRoundFilter}
                onChange={(e) => setSelectedRoundFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-navy-900 outline-none focus:border-[#1D64EC] cursor-pointer"
              >
                <option value="Round 1">Round 1 (Initial Screening)</option>
                <option value="Round 2">Round 2 (Final Deliberation)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-navy-900 font-display">
                Problem Statements Under Expert Evaluation
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Examine shortlisted dossiers, review AI rankings, record evaluator notes, and grant pilot approvals.
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400">
              Showing {filteredPSList.length} Problem Statements
            </span>
          </div>

          {/* Problem Statement Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPSList.map((ps) => {
              const approvedCount = ps.startups.filter(s => s.approvalStatus === 'Approved').length;
              const notApprovedCount = ps.startups.filter(s => s.approvalStatus === 'Not Approved').length;
              const pendingCount = ps.startups.filter(s => s.approvalStatus === 'Pending').length;
              const evaluatedCount = ps.startups.filter(s => s.evaluatorNote !== null).length;

              return (
                <div
                  key={ps.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#1D64EC]/50 transition-all flex flex-col justify-between group space-y-4"
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#1D64EC] uppercase tracking-wider block mb-1">
                          {ps.psCode} • {ps.department}
                        </span>
                        <h3 className="text-base font-bold text-navy-900 leading-snug group-hover:text-[#1D64EC] transition-colors">
                          {ps.title}
                        </h3>
                      </div>

                      <StatusBadge
                        label={ps.stage}
                        variant={ps.stage === 'Completed' ? 'emerald' : 'violet'}
                        size="sm"
                      />
                    </div>

                    {/* 1-Line Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4 font-medium">
                      {ps.description}
                    </p>

                    {/* Shortlist & Evaluation Progress Block */}
                    <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">AI Shortlist:</span>
                        <strong className="text-navy-900 font-bold">{ps.startups.length} startups shortlisted by AI</strong>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-slate-400">Expert Review Progress</span>
                          <span className="text-xs font-bold text-navy-900">{evaluatedCount}/{ps.startups.length} Evaluated</span>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                            {approvedCount} Approved
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold">
                            {notApprovedCount} Not Approved
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                            {pendingCount} Pending
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom CTA Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <FileCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>{ps.startups.length} Verified Dossiers Ready</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedPSId(ps.id)}
                      className="px-5 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all group-hover:scale-[1.02]"
                    >
                      <span>Open Evaluation</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: EXPERT EVALUATION VIEW FOR A SINGLE PS */}
      {/* ========================================================================= */}
      {selectedPSId && currentPS && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Breadcrumb & Navigation Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <button 
                onClick={() => setSelectedPSId(null)}
                className="hover:text-[#1D64EC] transition-colors"
              >
                Expert Evaluation
              </button>
              <span>→</span>
              <span className="text-navy-900 font-bold">{currentPS.psCode}: {currentPS.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLockEvaluation(currentPS.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-colors shadow-2xs ${
                  currentPS.isLocked
                    ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {currentPS.isLocked ? <Lock className="w-3.5 h-3.5 text-amber-600" /> : <Unlock className="w-3.5 h-3.5 text-slate-400" />}
                <span>{currentPS.isLocked ? 'Unlock Evaluation' : 'Lock Expert Evaluation'}</span>
              </button>

              <button
                onClick={() => setSelectedPSId(null)}
                className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to All PS</span>
              </button>
            </div>
          </div>

          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#1D64EC] font-mono text-[10px] font-bold border border-blue-100">
                  {currentPS.psCode} • {currentPS.department}
                </span>
                {currentPS.isLocked && (
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Evaluation Finalized</span>
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-extrabold text-navy-900 font-display">
                {currentPS.psCode}: {currentPS.title} – Expert Evaluation
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl font-medium">
                {currentPS.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge
                label={currentPS.isLocked ? 'Evaluation Locked' : 'Evaluation In Progress'}
                variant={currentPS.isLocked ? 'emerald' : 'amber'}
                size="md"
                icon={currentPS.isLocked ? 'check' : 'clock'}
              />
            </div>
          </div>

          {/* Subsection A: AI-Assisted Shortlist Overview */}
          <div className="p-5 rounded-3xl bg-white border border-blue-200/80 shadow-xs space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-2xl bg-blue-50 text-[#1D64EC] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy-900 font-display">
                  AI-Assisted Shortlist for {currentPS.psCode}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium mt-1">
                  Based on eligibility verification, evidence verification, and AI-assisted ranking, <strong>{currentPS.startups.length} startups</strong> have been shortlisted for expert evaluation. Experts review each startup’s documentation, market standing, technology, and past performance, then decide which startups are <strong>Approved for Pilot</strong> or <strong>Not Approved for Pilot</strong> for the controlled pilot.
                </p>
              </div>
            </div>

            {/* Summary Metrics Chips Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 border-t border-slate-100 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Shortlisted by AI</span>
                <strong className="text-sm font-extrabold text-navy-900">{psMetrics.total}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">Evaluated by Experts</span>
                <strong className="text-sm font-extrabold text-navy-900">{psMetrics.evaluated} / {psMetrics.total}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[10px] text-emerald-800 font-bold uppercase block mb-0.5">Approved for Pilot</span>
                <strong className="text-sm font-extrabold text-emerald-900">{psMetrics.approved}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
                <span className="text-[10px] text-rose-800 font-bold uppercase block mb-0.5">Not Approved for Pilot</span>
                <strong className="text-sm font-extrabold text-rose-900">{psMetrics.notApproved}</strong>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
                <span className="text-[10px] text-amber-800 font-bold uppercase block mb-0.5">Pending Expert Review</span>
                <strong className="text-sm font-extrabold text-amber-900">{psMetrics.pending}</strong>
              </div>
            </div>
          </div>

          {/* Subsection B: Startups Table – Expert Evaluation (Core Table) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Startups Under Expert Evaluation – {currentPS.psCode}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Record domain evaluations, add structured notes, and determine pilot approval for each shortlisted startup.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-navy-900 border-b border-slate-200">
                    <th className="py-3.5 px-4 font-bold">Startup</th>
                    <th className="py-3.5 px-3 font-bold text-center">AI Rank</th>
                    <th className="py-3.5 px-3 font-bold">Eligibility</th>
                    <th className="py-3.5 px-3 font-bold">Evidence</th>
                    <th className="py-3.5 px-4 font-bold min-w-[180px]">Key Strengths</th>
                    <th className="py-3.5 px-3 font-bold text-center">Evaluator Note</th>
                    <th className="py-3.5 px-3 font-bold">Approval for Pilot</th>
                    <th className="py-3.5 px-4 font-bold text-right">Documentation & Dossier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {currentPS.startups.map((st) => (
                    <tr key={st.id} className="hover:bg-blue-50/40 transition-colors">
                      
                      {/* 1. Startup Name */}
                      <td className="py-4 px-4 font-bold text-navy-900 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <img src={st.logo} alt={st.name} className="w-8 h-8 rounded-xl object-cover border border-slate-200 shrink-0" />
                          <div>
                            <span className="block leading-snug">{st.name}</span>
                            <span className="text-[10px] text-slate-400 font-normal block">{st.legalName.split(' ')[0]}</span>
                          </div>
                        </div>
                      </td>

                      {/* 2. AI Rank */}
                      <td className="py-4 px-3 text-center whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-extrabold text-[11px] border border-purple-200">
                          #{st.aiRank} ({st.aiScore}/100)
                        </span>
                      </td>

                      {/* 3. Eligibility Status */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          st.eligibilityStatus === 'Eligible' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                          st.eligibilityStatus === 'Conditionally Eligible' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                          'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}>
                          {st.eligibilityStatus}
                        </span>
                      </td>

                      {/* 4. Evidence Verification Status */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          st.evidenceStatus === 'Verified' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                          st.evidenceStatus === 'Partially Verified' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {st.evidenceStatus}
                        </span>
                      </td>

                      {/* 5. Key Strengths */}
                      <td className="py-4 px-4 text-slate-700 font-medium">
                        {st.keyStrengths}
                      </td>

                      {/* 6. Evaluator Note / Review */}
                      <td className="py-4 px-3 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleOpenNoteModal(st)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1 mx-auto transition-colors ${
                            st.evaluatorNote 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-700 hover:bg-[#1D64EC] hover:text-white'
                          }`}
                        >
                          {st.evaluatorNote ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Edit3 className="w-3.5 h-3.5" />}
                          <span>{st.evaluatorNote ? 'View Note' : 'Add Note'}</span>
                        </button>
                      </td>

                      {/* 7. Approval for Pilot (Replaces Pilot Cleared) */}
                      <td className="py-4 px-3 whitespace-nowrap">
                        <select
                          value={st.approvalStatus}
                          onChange={(e) => handleQuickApprovalChange(st.id, e.target.value as any)}
                          disabled={currentPS.isLocked}
                          className={`px-2.5 py-1.5 rounded-xl font-bold text-xs outline-none border transition-colors cursor-pointer ${
                            st.approvalStatus === 'Approved' ? 'bg-emerald-50 text-emerald-900 border-emerald-300' :
                            st.approvalStatus === 'Not Approved' ? 'bg-rose-50 text-rose-900 border-rose-300' :
                            'bg-amber-50 text-amber-900 border-amber-300'
                          }`}
                        >
                          <option value="Approved">Approved for Pilot</option>
                          <option value="Not Approved">Not Approved for Pilot</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </td>

                      {/* 8. Documentation & Dossier */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => {
                            setViewingDossierStartup(st);
                            setDossierActiveTab('overview');
                          }}
                          className="px-3.5 py-1.5 rounded-full bg-blue-50 hover:bg-[#1D64EC] hover:text-white text-[#1D64EC] font-bold text-[11px] border border-blue-200 transition-colors flex items-center gap-1 ml-auto"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Dossier</span>
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Subsection C: Finalizing Expert Evaluation & Pilot Approval Summary */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-navy-900 font-display">
                  Pilot Approval Summary – {currentPS.psCode}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Startups marked as Approved will proceed directly into the KPI contract definition and controlled pilot deployment.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleProceedToSetup}
                  className="px-6 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <span>Proceed to KPI Contract & Pilot Setup</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              
              {/* Approved List */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between text-emerald-900 font-bold">
                  <span>Startups Approved for Pilot:</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px]">{psMetrics.approved}</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  {currentPS.startups.filter(s => s.approvalStatus === 'Approved').map(s => (
                    <div key={s.id} className="p-2.5 rounded-xl bg-white border border-emerald-100 font-bold text-navy-900 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={s.logo} alt={s.name} className="w-5 h-5 rounded-md object-cover" />
                        <span>{s.name}</span>
                      </div>
                      <span className="text-[10px] text-purple-700 font-mono">Rank #{s.aiRank}</span>
                    </div>
                  ))}
                  {psMetrics.approved === 0 && (
                    <p className="text-slate-500 italic py-2">No startups approved yet.</p>
                  )}
                </div>
              </div>

              {/* Not Approved List */}
              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
                <div className="flex items-center justify-between text-rose-900 font-bold">
                  <span>Startups Not Approved:</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 text-[10px]">{psMetrics.notApproved}</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  {currentPS.startups.filter(s => s.approvalStatus === 'Not Approved').map(s => (
                    <div key={s.id} className="p-2.5 rounded-xl bg-white border border-rose-100 font-medium text-slate-700 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={s.logo} alt={s.name} className="w-5 h-5 rounded-md object-cover" />
                        <span>{s.name}</span>
                      </div>
                      <span className="text-[10px] text-rose-600 font-bold">Ineligible / Lab TRL</span>
                    </div>
                  ))}
                  {psMetrics.notApproved === 0 && (
                    <p className="text-slate-500 italic py-2">No startups rejected.</p>
                  )}
                </div>
              </div>

              {/* Pending Review List */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between text-amber-900 font-bold">
                  <span>Pending Expert Review:</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px]">{psMetrics.pending}</span>
                </div>
                <div className="space-y-1.5 pt-1">
                  {currentPS.startups.filter(s => s.approvalStatus === 'Pending').map(s => (
                    <div key={s.id} className="p-2.5 rounded-xl bg-white border border-amber-100 font-medium text-slate-700 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={s.logo} alt={s.name} className="w-5 h-5 rounded-md object-cover" />
                        <span>{s.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleOpenNoteModal(s)}
                        className="text-[10px] font-bold text-[#1D64EC] underline"
                      >
                        Evaluate
                      </button>
                    </div>
                  ))}
                  {psMetrics.pending === 0 && (
                    <p className="text-slate-500 italic py-2">All shortlisted startups evaluated.</p>
                  )}
                </div>
              </div>

            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <span className="font-semibold text-navy-900">Governance Notice:</span> Once locked, the approved startups will move to the KPI contract and controlled pilot stage in the Work Area Monitor. Further changes to approval status will require admin override.
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: EVALUATOR NOTE / REVIEW MODAL */}
      {/* ========================================================================= */}
      {editingNoteStartup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img src={editingNoteStartup.logo} alt={editingNoteStartup.name} className="w-11 h-11 rounded-2xl object-cover border border-slate-200" />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D64EC]">Evaluator Note & Decision</span>
                  <h3 className="text-base font-bold text-navy-900 font-display mt-0.5">
                    Evaluator Note – {editingNoteStartup.name}
                  </h3>
                  <p className="text-xs text-slate-500">{editingNoteStartup.legalName} • AI Rank #{editingNoteStartup.aiRank}</p>
                </div>
              </div>

              <button
                onClick={() => setEditingNoteStartup(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Field 1: Overall Recommendation */}
              <div>
                <label className="font-bold text-navy-900 block mb-1.5">1. Overall Pilot Recommendation</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Approved for Pilot', 'Not Approved for Pilot', 'Pending'] as const).map(rec => (
                    <button
                      key={rec}
                      type="button"
                      onClick={() => setNoteRecommendation(rec)}
                      className={`p-2.5 rounded-xl font-bold border transition-all text-center ${
                        noteRecommendation === rec
                          ? rec === 'Approved for Pilot' ? 'bg-emerald-600 text-white border-emerald-600' :
                            rec === 'Not Approved for Pilot' ? 'bg-rose-600 text-white border-rose-600' :
                            'bg-amber-500 text-white border-amber-500'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white'
                      }`}
                    >
                      {rec}
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 2: Evaluation Summary */}
              <div>
                <label className="font-bold text-navy-900 block mb-1">2. Evaluation Summary & Rationale</label>
                <p className="text-[11px] text-slate-500 mb-1.5">Summarize your evaluation. Include strengths, concerns, and your rationale for approving or not approving them for the pilot.</p>
                <textarea
                  rows={3}
                  value={noteSummary}
                  onChange={(e) => setNoteSummary(e.target.value)}
                  placeholder="Enter detailed evaluation summary..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none focus:border-[#1D64EC] focus:bg-white leading-relaxed"
                />
              </div>

              {/* Field 3: Structured Observations */}
              <div className="space-y-2.5 pt-1">
                <label className="font-bold text-navy-900 block">3. Key Structured Observations</label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">Technology Readiness (TRL)</span>
                    <input
                      type="text"
                      value={noteTechReadiness}
                      onChange={(e) => setNoteTechReadiness(e.target.value)}
                      placeholder="e.g. TRL 8 (Commercial field deployed)"
                      className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none focus:border-[#1D64EC]"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">Past Projects & References</span>
                    <input
                      type="text"
                      value={notePastProjects}
                      onChange={(e) => setNotePastProjects(e.target.value)}
                      placeholder="e.g. Municipal deployments, track record"
                      className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none focus:border-[#1D64EC]"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">Market Reputation & Standing</span>
                    <input
                      type="text"
                      value={noteMarketReputation}
                      onChange={(e) => setNoteMarketReputation(e.target.value)}
                      placeholder="e.g. State awards, accelerator empanelment"
                      className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none focus:border-[#1D64EC]"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-500 block mb-1">Team Capability</span>
                    <input
                      type="text"
                      value={noteTeamCapability}
                      onChange={(e) => setNoteTeamCapability(e.target.value)}
                      placeholder="e.g. Domain engineering credentials"
                      className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none focus:border-[#1D64EC]"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-500 block mb-1">Compliance & Risk Factors</span>
                  <input
                    type="text"
                    value={noteComplianceRisk}
                    onChange={(e) => setNoteComplianceRisk(e.target.value)}
                    placeholder="e.g. CERT-In Level 3, DPDP Act, MeitY AWS Cloud"
                    className="w-full p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none focus:border-[#1D64EC]"
                  />
                </div>
              </div>

              {/* Field 4: Conditions / Recommendations */}
              <div>
                <label className="font-bold text-navy-900 block mb-1">4. Conditions / Specific Directives (Optional)</label>
                <input
                  type="text"
                  value={noteConditions}
                  onChange={(e) => setNoteConditions(e.target.value)}
                  placeholder="e.g. Approve subject to additional CERT-In audit before M2 milestone..."
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-900 outline-none focus:border-[#1D64EC]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingNoteStartup(null)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveNote}
                className="px-6 py-2 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Evaluator Note & Status</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: FULL STARTUP DOSSIER (Documentation & Dossier View) */}
      {/* ========================================================================= */}
      {viewingDossierStartup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Dossier Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <img src={viewingDossierStartup.logo} alt={viewingDossierStartup.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-xs" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[10px] font-extrabold border border-purple-200">
                      AI Rank #{viewingDossierStartup.aiRank} ({viewingDossierStartup.aiScore}/100)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      Eligibility: {viewingDossierStartup.eligibilityStatus}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-bold border border-blue-200">
                      Evidence: {viewingDossierStartup.evidenceStatus}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-navy-900 font-display mt-1">
                    {viewingDossierStartup.name} — Full Startup Dossier
                  </h2>
                  <p className="text-xs text-slate-500">{viewingDossierStartup.legalName} • {currentPS.psCode}: {currentPS.title}</p>
                </div>
              </div>

              <button
                onClick={() => setViewingDossierStartup(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm"
              >
                ×
              </button>
            </div>

            {/* Dossier Sub-tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100 text-xs font-bold">
              {[
                { id: 'overview', label: '1. Company Overview' },
                { id: 'tech', label: '2. Technology & Architecture' },
                { id: 'past', label: '3. Past Projects & Track Record' },
                { id: 'market', label: '4. Market Standing & Reviews' },
                { id: 'docs', label: '5. Evidence Documents' },
                { id: 'ai', label: '6. AI Ranking Breakdown' },
                { id: 'notes', label: '7. Evaluator Notes' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDossierActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                    dossierActiveTab === tab.id
                      ? 'bg-[#1D64EC] text-white shadow-xs'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sub-tab 1: Company Overview */}
            {dossierActiveTab === 'overview' && (
              <div className="space-y-4 text-xs animate-in fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Founding Year</span>
                    <strong className="text-navy-900">{viewingDossierStartup.dossier.overview.foundingYear}</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Location</span>
                    <strong className="text-navy-900">{viewingDossierStartup.dossier.overview.location}</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Team Size</span>
                    <strong className="text-navy-900">{viewingDossierStartup.dossier.overview.teamSize}</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Funding Stage</span>
                    <strong className="text-navy-900">{viewingDossierStartup.dossier.overview.fundingStage}</strong>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="micro-label text-[#1D64EC] block">Founders & Leadership</span>
                  <p className="text-slate-900 font-bold">{viewingDossierStartup.dossier.overview.founders}</p>
                  <span className="micro-label text-slate-400 block pt-2">Company Mission & Focus</span>
                  <p className="text-slate-700 leading-relaxed font-medium">{viewingDossierStartup.dossier.overview.mission}</p>
                </div>
              </div>
            )}

            {/* Sub-tab 2: Technology & Solutions */}
            {dossierActiveTab === 'tech' && (
              <div className="space-y-4 text-xs animate-in fade-in">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="micro-label text-[#1D64EC] block">Core Technology & Models</span>
                  <p className="text-slate-700 leading-relaxed font-medium">{viewingDossierStartup.dossier.tech.description}</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="micro-label text-navy-900 block">System Architecture Overview</span>
                  <p className="text-slate-700 font-mono text-[11px] bg-white p-3 rounded-xl border border-slate-200">{viewingDossierStartup.dossier.tech.architecture}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="micro-label text-emerald-700 block">Government Integration</span>
                    <p className="text-slate-700 font-medium">{viewingDossierStartup.dossier.tech.integration}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="micro-label text-purple-700 block">Cybersecurity & Data Residency</span>
                    <p className="text-slate-700 font-medium">{viewingDossierStartup.dossier.tech.security}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 3: Past Projects & Track Record */}
            {dossierActiveTab === 'past' && (
              <div className="space-y-3 text-xs animate-in fade-in">
                {viewingDossierStartup.dossier.pastDeployments.length > 0 ? (
                  viewingDossierStartup.dossier.pastDeployments.map((dp, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-navy-900">
                        <span className="text-sm">{dp.client}</span>
                        <span className="text-[11px] text-slate-500 font-medium">{dp.duration}</span>
                      </div>
                      <p className="text-slate-600"><strong>Scope:</strong> {dp.scope}</p>
                      <div className="p-2.5 rounded-xl bg-emerald-50/80 text-emerald-900 font-medium border border-emerald-100">
                        <strong>Verified Outcome:</strong> {dp.outcome}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-6 text-center text-slate-500 bg-slate-50 rounded-2xl">No past municipal projects on record.</p>
                )}
              </div>
            )}

            {/* Sub-tab 4: Market Standing & Reviews */}
            {dossierActiveTab === 'market' && (
              <div className="space-y-4 text-xs animate-in fade-in">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="micro-label text-amber-700 block">Industry Recognitions & Awards</span>
                  <div className="space-y-1">
                    {viewingDossierStartup.dossier.marketStanding.awards.map((aw, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-800 font-medium">
                        <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{aw}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <span className="micro-label text-[#1D64EC] block">Government & Client References</span>
                  <div className="space-y-1">
                    {viewingDossierStartup.dossier.marketStanding.references.map((rf, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#1D64EC] shrink-0" />
                        <span>{rf}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 5: Evidence Documents */}
            {dossierActiveTab === 'docs' && (
              <div className="space-y-2.5 text-xs animate-in fade-in">
                {viewingDossierStartup.dossier.documents.map((doc, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:bg-slate-100/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[#1D64EC]" />
                      <div>
                        <span className="font-bold text-navy-900 block">{doc.name}</span>
                        <span className="text-[10px] text-slate-400">{doc.type} • {doc.size} • {doc.date}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => addNotification({ title: 'Download Started', message: `Downloading ${doc.name}`, portal: 'gov', type: 'info' })}
                      className="px-3 py-1 rounded-full bg-white hover:bg-blue-50 text-[#1D64EC] border border-blue-200 font-bold text-[11px] transition-colors"
                    >
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-tab 6: AI Ranking Breakdown */}
            {dossierActiveTab === 'ai' && (
              <div className="space-y-4 text-xs animate-in fade-in">
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-purple-700">Consolidated AI Ranking</span>
                    <h3 className="text-base font-extrabold text-navy-900 mt-0.5">Rank #{viewingDossierStartup.aiRank} of {currentPS.startups.length}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-purple-700">Overall AI Score</span>
                    <span className="text-xl font-extrabold text-[#1D64EC] font-display block">{viewingDossierStartup.aiScore} / 100</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">PS Relevance (35%)</span>
                    <strong className="text-navy-900 text-sm">{viewingDossierStartup.aiBreakdown.relevance}/100</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">Technical Fit (30%)</span>
                    <strong className="text-navy-900 text-sm">{viewingDossierStartup.aiBreakdown.technical}/100</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">Past Work (20%)</span>
                    <strong className="text-navy-900 text-sm">{viewingDossierStartup.aiBreakdown.pastPerformance}/100</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">Compliance (15%)</span>
                    <strong className="text-navy-900 text-sm">{viewingDossierStartup.aiBreakdown.complianceRisk}/100</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 7: Evaluator Notes */}
            {dossierActiveTab === 'notes' && (
              <div className="space-y-4 text-xs animate-in fade-in">
                {viewingDossierStartup.evaluatorNote ? (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div>
                        <strong className="text-navy-900 block">{viewingDossierStartup.evaluatorNote.evaluatorName}</strong>
                        <span className="text-[10px] text-slate-400">{viewingDossierStartup.evaluatorNote.date}</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                        viewingDossierStartup.evaluatorNote.recommendation === 'Approved for Pilot' ? 'bg-emerald-100 text-emerald-900' :
                        viewingDossierStartup.evaluatorNote.recommendation === 'Not Approved for Pilot' ? 'bg-rose-100 text-rose-900' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {viewingDossierStartup.evaluatorNote.recommendation}
                      </span>
                    </div>

                    <p className="text-slate-700 leading-relaxed font-medium">
                      {viewingDossierStartup.evaluatorNote.summary}
                    </p>

                    {viewingDossierStartup.evaluatorNote.conditions && (
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                        <strong>Conditions:</strong> {viewingDossierStartup.evaluatorNote.conditions}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="p-6 text-center text-slate-500 bg-slate-50 rounded-2xl">No evaluator notes added yet.</p>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setViewingDossierStartup(null);
                  handleOpenNoteModal(viewingDossierStartup);
                }}
                className="px-5 py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Add / Edit Evaluator Note</span>
              </button>

              <button
                type="button"
                onClick={() => setViewingDossierStartup(null)}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close Dossier
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: KPI CONTRACT & PILOT SETUP COMING SOON MODAL */}
      {/* ========================================================================= */}
      {isComingSoonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center space-y-5 border border-slate-200 shadow-2xl">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#1D64EC] flex items-center justify-center mx-auto shadow-xs">
              <Clock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#1D64EC] text-[11px] font-bold uppercase tracking-wider border border-blue-100">
                Under Development
              </span>
              <h3 className="text-xl font-extrabold text-navy-900 font-display pt-1">
                Coming soon
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                The <strong>KPI Contract & Pilot Setup</strong> provisioning module is currently under development and will be available in the upcoming release.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsComingSoonModalOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#1D64EC] hover:bg-brand-cobalt text-white font-bold text-xs shadow-sm transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
