import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  BookOpen, 
  FileText, 
  User, 
  Upload, 
  BrainCircuit,
  Sun,
  Moon,
  Award,
  TrendingUp,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sparkles,
  Printer,
  Download,
  RotateCcw
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCadre, setSelectedCadre] = useState('ISS');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [enrolledCourses, setEnrolledCourses] = useState([1, 2]);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  // Dynamic Data per Cadre
  const cadreProfiles = {
    ISS: {
      role: 'Senior Statistical Officer',
      level: 'Level 4 Standard',
      overallGap: '28%',
      learningHours: '24.5 Hrs',
      gapSummary: '2 Domains need upskilling',
      competencies: [
        { name: 'Survey Design & Sampling', domain: 'Statistical', target: 5, current: 4, gap: 1 },
        { name: 'National Accounts Statistics', domain: 'Statistical', target: 4, current: 2, gap: 2 },
        { name: 'Python & R Analytics', domain: 'Technical', target: 4, current: 2, gap: 2 },
        { name: 'GIS & Spatial Mapping', domain: 'Technical', target: 3, current: 1, gap: 2 },
        { name: 'DPDP Act 2023 & Privacy', domain: 'Digital Governance', target: 4, current: 3, gap: 1 },
      ],
      domainData: [
        { domain: 'Statistical', Current: 3.0, Target: 4.5 },
        { domain: 'Technical', Current: 1.5, Target: 3.5 },
        { domain: 'Governance', Current: 3.0, Target: 4.0 },
      ]
    },
    SSS: {
      role: 'Junior Statistical Officer',
      level: 'Level 2 Standard',
      overallGap: '18%',
      learningHours: '16.0 Hrs',
      gapSummary: '1 Domain needs upskilling',
      competencies: [
        { name: 'Survey Design & Sampling', domain: 'Statistical', target: 4, current: 3, gap: 1 },
        { name: 'National Accounts Statistics', domain: 'Statistical', target: 3, current: 3, gap: 0 },
        { name: 'Python & R Analytics', domain: 'Technical', target: 3, current: 1, gap: 2 },
        { name: 'GIS & Spatial Mapping', domain: 'Technical', target: 2, current: 2, gap: 0 },
        { name: 'DPDP Act 2023 & Privacy', domain: 'Digital Governance', target: 3, current: 3, gap: 0 },
      ],
      domainData: [
        { domain: 'Statistical', Current: 3.0, Target: 3.5 },
        { domain: 'Technical', Current: 1.5, Target: 2.5 },
        { domain: 'Governance', Current: 3.0, Target: 3.0 },
      ]
    },
    DES: {
      role: 'District Statistical Analyst',
      level: 'Level 3 Standard',
      overallGap: '35%',
      learningHours: '10.0 Hrs',
      gapSummary: '3 Domains need upskilling',
      competencies: [
        { name: 'Survey Design & Sampling', domain: 'Statistical', target: 4, current: 2, gap: 2 },
        { name: 'National Accounts Statistics', domain: 'Statistical', target: 4, current: 2, gap: 2 },
        { name: 'Python & R Analytics', domain: 'Technical', target: 4, current: 1, gap: 3 },
        { name: 'GIS & Spatial Mapping', domain: 'Technical', target: 4, current: 2, gap: 2 },
        { name: 'DPDP Act 2023 & Privacy', domain: 'Digital Governance', target: 3, current: 2, gap: 1 },
      ],
      domainData: [
        { domain: 'Statistical', Current: 2.0, Target: 4.0 },
        { domain: 'Technical', Current: 1.5, Target: 4.0 },
        { domain: 'Governance', Current: 2.0, Target: 3.0 },
      ]
    }
  };

  const currentProfile = cadreProfiles[selectedCadre];

  const coursesList = [
    { id: 1, title: 'Advanced Python & R for National Accounts', domain: 'Technical', provider: 'iGOT Karmayogi', hours: '12 Hrs', level: 'Intermediate', desc: 'Focuses on GDP computation scripts, seasonal adjustments, and price index modeling.' },
    { id: 2, title: 'Sampling Methods & Survey Design (PLFS/ASI)', domain: 'Statistical', provider: 'NSSTA Greater Noida', hours: '18 Hrs', level: 'Advanced', desc: 'Comprehensive guide to stratified multi-stage sampling protocols used in PLFS & ASI.' },
    { id: 3, title: 'QGIS & Spatial Analytics for Official Statistics', domain: 'Technical', provider: 'iGOT Karmayogi', hours: '8 Hrs', level: 'Beginner', desc: 'Map socio-economic survey data over district boundary shapefiles using QGIS.' },
    { id: 4, title: 'Data Governance & DPDP Act Compliance 2023', domain: 'Digital Governance', provider: 'MeitY / TPAC', hours: '6 Hrs', level: 'Intermediate', desc: 'Legal and procedural frameworks for micro-data anonymization and citizen privacy protection.' },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleGenerateQuiz = () => {
    if (!selectedFile) return;
    setIsGenerating(true);
    setUserAnswers({});

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedQuiz([
        {
          id: 1,
          question: "Under PLFS, how is 'Current Weekly Status' (CWS) defined?",
          options: [
            "Activity status during last 365 days",
            "Activity status during reference period of 7 days preceding survey",
            "Employment maintained for 30 consecutive days",
            "Activity status on any single day of month"
          ],
          correct: 1,
          explanation: "CWS measures activity status during the 7 days preceding the survey date."
        },
        {
          id: 2,
          question: "Which model is primarily used for seasonal adjustment in price statistics (CPI/WPI)?",
          options: ["RegARIMA / X-13ARIMA-SEATS", "Simple Moving Average", "Linear Regression", "K-Means Clustering"],
          correct: 0,
          explanation: "X-13ARIMA-SEATS is the standard methodology for official seasonal adjustments."
        },
        {
          id: 3,
          question: "Under the DPDP Act 2023, what is the core responsibility regarding statistical micro-data release?",
          options: ["Complete restriction on data access", "Anonymization and protection of personally identifiable information (PII)", "Free public access to unedited raw survey files", "Mandatory paper-only reporting"],
          correct: 1,
          explanation: "The DPDP Act requires strict anonymization of all PII before public micro-data dissemination."
        }
      ]);
    }, 1200);
  };

  const handleSelectAnswer = (qId, optionIdx) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const toggleCourseEnrollment = (cId) => {
    if (enrolledCourses.includes(cId)) {
      setEnrolledCourses(enrolledCourses.filter(id => id !== cId));
    } else {
      setEnrolledCourses([...enrolledCourses, cId]);
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  // CSV Export Functionality
  const handleExportCSV = () => {
    const headers = ["Competency Name", "Domain", "Target Score", "Current Score", "Gap"];
    const rows = currentProfile.competencies.map(c => [
      `"${c.name}"`,
      `"${c.domain}"`,
      c.target,
      c.current,
      c.gap
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MoSPI_Competency_Report_${selectedCadre}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCourses = selectedDomain === 'All' 
    ? coursesList 
    : coursesList.filter(c => c.domain === selectedDomain);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* HEADER WITH CADRE SELECTOR */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 print:hidden">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-500 p-2 rounded-xl text-slate-900">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide text-slate-900 dark:text-white">MoSPI Skill Intelligence</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Data Informatics & Innovation Division (DIID)</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-xs">
              <User className="h-4 w-4 text-teal-600 dark:text-teal-400 mr-2" />
              <span className="font-semibold text-slate-500 dark:text-slate-400 mr-1">Cadre:</span>
              <select 
                value={selectedCadre}
                onChange={(e) => setSelectedCadre(e.target.value)}
                className="bg-transparent font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer pr-1"
              >
                <option value="ISS" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">ISS (Indian Statistical Service)</option>
                <option value="SSS" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">SSS (Subordinate Statistical Service)</option>
                <option value="DES" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">DES (State Directorate)</option>
              </select>
            </div>

            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              title="Toggle Light/Dark Theme"
            >
              {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </button>
          </div>
        </div>
      </header>

      {/* PRINT-ONLY OFFICIAL HEADER */}
      <div className="hidden print:block p-6 border-b border-slate-300">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Ministry of Statistics and Programme Implementation (MoSPI)</h1>
            <p className="text-sm text-slate-600">Data Informatics & Innovation Division (DIID) — Officer Competency Assessment Report</p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p><b>Cadre:</b> {selectedCadre}</p>
            <p><b>Generated:</b> {new Date().toLocaleDateString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex gap-8">
        
        {/* SIDEBAR */}
        <aside className="w-64 flex flex-col space-y-2 shrink-0 print:hidden">
          <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
                activeTab === 'dashboard' 
                  ? 'bg-teal-600 dark:bg-teal-500 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}>
              <BarChart3 className="h-4 w-4" />
              <span>Skill Gap Profile</span>
            </button>

            <button 
              onClick={() => setActiveTab('recommendations')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
                activeTab === 'recommendations' 
                  ? 'bg-teal-600 dark:bg-teal-500 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}>
              <BookOpen className="h-4 w-4" />
              <span>iGOT & TPAC Courses</span>
            </button>

            <button 
              onClick={() => setActiveTab('quizGen')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-sm transition ${
                activeTab === 'quizGen' 
                  ? 'bg-teal-600 dark:bg-teal-500 text-white shadow-md' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}>
              <FileText className="h-4 w-4" />
              <span>AI MCQ Generator</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 space-y-6">
          {activeTab === 'dashboard' && (
            <>
              {/* ACTION BAR WITH CSV & PRINT BUTTONS */}
              <div className="flex justify-between items-center print:hidden">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Competency Assessment Dashboard</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Cadre: {selectedCadre} | Role: {currentProfile.role}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleExportCSV}
                    className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition shadow-sm"
                  >
                    <Download className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                    <span>Export CSV</span>
                  </button>

                  <button 
                    onClick={handlePrintReport}
                    className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition shadow-sm"
                  >
                    <Printer className="h-4 w-4" />
                    <span>Print PDF Report</span>
                  </button>
                </div>
              </div>

              {/* STAT CARDS */}
              <div className="grid grid-cols-3 gap-5">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-teal-500">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Overall Skill Gap ({selectedCadre})</p>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">{currentProfile.overallGap}</p>
                  <p className="text-xs text-teal-600 dark:text-teal-400 mt-1 font-medium">{currentProfile.gapSummary}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-blue-500">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">iGOT Learning Hours</p>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">{currentProfile.learningHours}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Modules complete</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm border-l-4 border-l-amber-500">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Target Role</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mt-2">{currentProfile.role}</p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">{currentProfile.level}</p>
                </div>
              </div>

              {/* CHARTS */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Competency Assessment ({selectedCadre})</h3>
                    <TrendingUp className="h-4 w-4 text-teal-500" />
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={currentProfile.competencies}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="name" tick={{ fill: darkMode ? '#94a3b8' : '#475569', fontSize: 10 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: darkMode ? '#64748b' : '#94a3b8' }} />
                        <Radar name="Target Level" dataKey="target" stroke="#0d9488" fill="#14b8a6" fillOpacity={0.3} />
                        <Radar name="Current Skill" dataKey="current" stroke="#f59e0b" fill="#fbbf24" fillOpacity={0.5} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Domain-wise Skill Proficiency</h3>
                    <Award className="h-4 w-4 text-teal-500" />
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentProfile.domainData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                        <XAxis dataKey="domain" tick={{ fill: darkMode ? '#94a3b8' : '#475569', fontSize: 11 }} />
                        <YAxis domain={[0, 5]} tick={{ fill: darkMode ? '#64748b' : '#94a3b8' }} />
                        <Tooltip contentStyle={{ backgroundColor: darkMode ? '#0f172a' : '#ffffff', borderRadius: '8px', borderColor: '#334155' }} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="Current" fill="#0d9488" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="Target" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* TABLE */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Competency Matrix ({selectedCadre})</h3>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-xs uppercase">
                      <th className="pb-3">Skill Name</th>
                      <th className="pb-3">Domain</th>
                      <th className="pb-3">Current / Target</th>
                      <th className="pb-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {currentProfile.competencies.map((comp, idx) => (
                      <tr key={idx}>
                        <td className="py-3 font-medium text-slate-800 dark:text-slate-200">{comp.name}</td>
                        <td className="py-3"><span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2.5 py-1 rounded-full">{comp.domain}</span></td>
                        <td className="py-3 font-bold text-slate-800 dark:text-slate-200">{comp.current} / {comp.target}</td>
                        <td className="py-3 text-right">
                          {comp.gap > 0 ? (
                            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-full">Gap: -{comp.gap}</span>
                          ) : (
                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">Proficient</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recommended Courses (iGOT / TPAC)</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tailored for {selectedCadre} officers ({currentProfile.role})</p>
                </div>
                <div className="flex space-x-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium">
                  {['All', 'Statistical', 'Technical', 'Digital Governance'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDomain(d)}
                      className={`px-3 py-1.5 rounded-lg transition ${
                        selectedDomain === d 
                          ? 'bg-teal-600 text-white' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredCourses.map((c) => {
                  const isEnrolled = enrolledCourses.includes(c.id);
                  return (
                    <div key={c.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center hover:border-teal-500/50 transition">
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex items-center space-x-2">
                          <span className="bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 text-xs font-bold px-2.5 py-0.5 rounded-md">
                            {c.provider}
                          </span>
                          <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {c.hours}
                          </span>
                          <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md">
                            {c.level}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">{c.title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{c.desc}</p>
                      </div>

                      <button 
                        onClick={() => toggleCourseEnrollment(c.id)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
                          isEnrolled 
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                            : 'bg-slate-900 dark:bg-teal-600 text-white hover:bg-slate-800 dark:hover:bg-teal-500'
                        }`}
                      >
                        {isEnrolled ? (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Enrolled</span>
                          </>
                        ) : (
                          <>
                            <ExternalLink className="h-4 w-4" />
                            <span>Enroll Course</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'quizGen' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI MCQ & Assessment Simulator</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Upload MoSPI survey guidelines or methodology notes to generate adaptive quizzes</p>
              </div>

              <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 rounded-2xl text-center flex flex-col items-center print:hidden">
                <Upload className="h-10 w-10 text-teal-600 dark:text-teal-400 mb-2" />
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Upload PDF / PPT Study Material</p>
                <input type="file" id="pdf-input" className="hidden" accept=".pdf,.pptx" onChange={handleFileUpload} />
                <label htmlFor="pdf-input" className="mt-4 bg-slate-900 dark:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm cursor-pointer border dark:border-slate-700 hover:bg-slate-800 transition">
                  {selectedFile ? selectedFile.name : "Select File"}
                </label>
                {selectedFile && (
                  <button onClick={handleGenerateQuiz} className="mt-3 bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center space-x-2 hover:bg-teal-500 transition">
                    <Sparkles className="h-4 w-4" />
                    <span>{isGenerating ? "Processing Document & Generating..." : "Generate AI MCQs"}</span>
                  </button>
                )}
              </div>

              {generatedQuiz && (
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
                  <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                      <BrainCircuit className="h-5 w-5 text-teal-500" />
                      <span>Generated Assessment Quiz</span>
                    </h3>
                  </div>

                  {generatedQuiz.map((q, idx) => {
                    const selectedOpt = userAnswers[q.id];
                    const hasAnswered = selectedOpt !== undefined;

                    return (
                      <div key={q.id} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl space-y-3 border border-slate-200/80 dark:border-slate-700/80">
                        <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                          Q{idx + 1}. {q.question}
                        </p>

                        <div className="grid grid-cols-2 gap-2.5">
                          {q.options.map((opt, oIdx) => {
                            let btnStyle = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-teal-500 text-slate-800 dark:text-slate-200";

                            if (hasAnswered) {
                              if (oIdx === q.correct) {
                                btnStyle = "bg-emerald-50 dark:bg-emerald-950/80 border-emerald-400 dark:border-emerald-600 font-bold text-emerald-900 dark:text-emerald-200";
                              } else if (selectedOpt === oIdx) {
                                btnStyle = "bg-rose-50 dark:bg-rose-950/80 border-rose-400 dark:border-rose-600 font-bold text-rose-900 dark:text-rose-200";
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleSelectAnswer(q.id, oIdx)}
                                className={`p-3 rounded-xl border text-xs text-left transition flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {hasAnswered && oIdx === q.correct && (
                                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {hasAnswered && (
                          <div className="text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-900/50 p-3 rounded-xl font-medium mt-2">
                            💡 <b>Explanation:</b> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;