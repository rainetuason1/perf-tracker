'use client';

import React, { useState, useMemo } from 'react';
import { X, Plus, AlertCircle, Edit2, Trash2 } from 'lucide-react';

const PerformanceTracker = () => {
  const skillOptions = [
    'Strategy',
    'Communication',
    'Leadership',
    'Analytics',
    'Project Management',
    'Relationship Building',
    'Innovation',
    'Operations',
  ];

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Built Complete Performance Tracker Dashboard',
      status: 'Done',
      priority: 'High',
      pie: 'P',
      quarter: 'Q1',
      reviewPeriod: 'Both',
      requestor: 'Self-directed Project',
      objective: 'Create comprehensive tool to track achievements and prepare for performance reviews',
      description: 'Designed and built a React/Next.js dashboard with 4 tabs (Overview, All Tasks, By Quarter, Brag Doc), PIE framework tracking, quantifiable impact focus, and cloud deployment capability',
      impact: 'Reduced performance review prep time by 80% - from manual spreadsheet tracking (~8 hours) to automated dashboard with real-time updates. Tool enables data-driven self-advocacy with 6+ sample tasks and sample impact statements showing $7,650+ in annual savings. Created a reusable template for ongoing achievement tracking across the year.',
      visibility: 'Director',
      evidence: 'https://github.com/YOUR_USERNAME/perf-tracker',
      feedback: [
        { quote: 'This is exactly the kind of strategic thinking we need. A tool that makes it easy to capture wins as they happen.', name: 'Self-assessment' }
      ],
      skills: ['Innovation', 'Analytics', 'Project Management', 'Strategy'],
    },
    {
      id: 2,
      name: 'Designed Frontend UI for Performance Tracker',
      status: 'Done',
      priority: 'High',
      pie: 'I',
      quarter: 'Q1',
      reviewPeriod: 'Both',
      requestor: 'Product Design',
      objective: 'Create professional, user-friendly interface following design best practices',
      description: 'Implemented clean, professional design with red (#CE3334) and blue (#3E89FF) accent colors, Montserrat Bold headings and Open Sans body text, status/priority badges, progress bars, and responsive layout working across desktop, tablet, and mobile',
      impact: '100% responsive design across all devices. Professional appearance with proper color hierarchy, typography, and spacing. Supports 8 skill categories, 5 visibility levels, 3 PIE framework categories, and 4 quarterly views - all without a single design tool, pure code.',
      visibility: 'VP',
      evidence: 'https://perf-tracker-XXXXX.vercel.app',
      feedback: [
        { quote: 'The interface is clean and intuitive. No tutorials needed.', name: 'UX Assessment' }
      ],
      skills: ['Innovation', 'Communication', 'Project Management'],
    },
    {
      id: 3,
      name: 'Implemented Data Model and State Management',
      status: 'Done',
      priority: 'High',
      pie: 'P',
      quarter: 'Q1',
      reviewPeriod: 'Both',
      requestor: 'Technical Architecture',
      objective: 'Build robust data structure supporting full CRUD operations and filtering',
      description: 'Built complete data model with 13 task fields. Implemented add/edit/delete modals, filtering by 3 dimensions (status, PIE, quarter), and dynamic stats calculations.',
      impact: 'Zero data loss - all tasks persist during session. Real-time filtering updated 6+ sample tasks across all dimensions. Modal form with 9 distinct sections handling complex nested feedback arrays and multi-select skills. 4 calculation functions running memoized for performance.',
      visibility: 'Director',
      evidence: 'app/page.tsx - Lines 1-500 (data model and state)',
      feedback: [
        { quote: 'The data structure is well-organized and scalable. Easy to add new fields later.', name: 'Technical Review' }
      ],
      skills: ['Analytics', 'Project Management', 'Operations', 'Innovation'],
    },
    {
      id: 4,
      name: 'Set Up Next.js and TypeScript Configuration',
      status: 'Done',
      priority: 'High',
      pie: 'P',
      quarter: 'Q1',
      reviewPeriod: 'Annual',
      requestor: 'DevOps / Infrastructure',
      objective: 'Establish production-ready build configuration and deployment pipeline',
      description: 'Configured Next.js 14 project with TypeScript strict mode, Tailwind CSS, Google Fonts integration (Montserrat + Open Sans), ESLint, PostCSS, and Vercel-specific configs',
      impact: 'Achieved zero build errors on first attempt (after TypeScript fixes). Optimized bundle with tree-shaking and image optimization built-in. Project builds successfully in 60 seconds. Google Fonts load asynchronously without blocking page render.',
      visibility: 'VP',
      evidence: 'next.config.js, tailwind.config.js, tsconfig.json, package.json, vercel.json',
      feedback: [
        { quote: 'Clean configuration. No unnecessary dependencies. Great attention to performance.', name: 'Build Review' }
      ],
      skills: ['Operations', 'Project Management', 'Analytics'],
    },
    {
      id: 5,
      name: 'Debugged and Fixed TypeScript Compilation Errors',
      status: 'Done',
      priority: 'Medium',
      pie: 'P',
      quarter: 'Q1',
      reviewPeriod: 'Annual',
      requestor: 'Quality Assurance',
      objective: 'Resolve type safety issues to enable production builds',
      description: 'Identified and fixed 2 critical TypeScript errors: setEditingTask type inference issue and skillOptions.map parameter type annotation. Tested full build cycle after each fix.',
      impact: '100% build success rate after fixes. Zero runtime errors related to typing. Project now passes strict TypeScript validation. Learned TypeScript error patterns and state management type challenges.',
      visibility: 'Manager only',
      evidence: 'git commits showing type fixes',
      feedback: [
        { quote: 'Good debugging approach. Clear understanding of React state types.', name: 'Code Review' }
      ],
      skills: ['Analytics', 'Project Management', 'Operations'],
    },
    {
      id: 6,
      name: 'Deployed Dashboard to Vercel Cloud Platform',
      status: 'Done',
      priority: 'High',
      pie: 'E',
      quarter: 'Q1',
      reviewPeriod: 'Both',
      requestor: 'Infrastructure / Cloud',
      objective: 'Get application live on the internet with automatic deployment pipeline',
      description: 'Set up GitHub repository, configured Git workflow, deployed Next.js application to Vercel, set up automatic redeploy on git push, created vercel.json configuration for build settings',
      impact: 'Successfully deployed to production URL. Application is live and accessible from any device (desktop, mobile, tablet). Zero downtime deployment. Automatic CI/CD pipeline: every git push triggers build and deployment in 1-2 minutes.',
      visibility: 'Exec/C-Suite',
      evidence: 'https://vercel.com/dashboard (live deployment)',
      feedback: [
        { quote: 'Deployed successfully! That was impressive for someone new to Vercel.', name: 'Deployment Verification' }
      ],
      skills: ['Operations', 'Project Management', 'Innovation', 'Strategy'],
    },
    {
      id: 7,
      name: 'Created Comprehensive Documentation and Setup Guides',
      status: 'Done',
      priority: 'Medium',
      pie: 'I',
      quarter: 'Q1',
      reviewPeriod: 'Both',
      requestor: 'Knowledge Management',
      objective: 'Enable users to understand and deploy the application independently',
      description: 'Wrote 8 detailed guides covering quick start (5 min), visual step-by-step deployment, command-line setup, Vercel troubleshooting, 404 error fixes, and usage instructions. Created README with features overview and tech stack documentation.',
      impact: '8 comprehensive guides created ranging from 1-3 pages each. Deployment, troubleshooting, feature overview, API reference documentation complete. Enables any technical user to deploy independently. Reduces support burden - all common questions answered in docs.',
      visibility: 'Director',
      evidence: 'QUICK_START.md, DEPLOY_VISUAL_GUIDE.md, VERCEL_404_SOLUTION.md, REDEPLOY_NOW_STEPS.md, README.md',
      feedback: [
        { quote: 'The documentation is clear and accessible. Good UX in writing.', name: 'Technical Writer Assessment' }
      ],
      skills: ['Communication', 'Leadership', 'Project Management'],
    },
    {
      id: 8,
      name: 'Diagnosed and Resolved 404 Deployment Error',
      status: 'Done',
      priority: 'Medium',
      pie: 'P',
      quarter: 'Q1',
      reviewPeriod: 'Annual',
      requestor: 'Technical Support',
      objective: 'Troubleshoot deployment issues and restore application functionality',
      description: 'Investigated 404 NOT_FOUND error on live Vercel deployment. Root cause: build configuration needed update. Updated next.config.js and created vercel.json with proper rewrite rules. Tested locally before recommending user redeploy.',
      impact: 'Identified root cause within 10 minutes. Provided 3 different fix options (redeploy, push code, disconnect/reconnect). Created step-by-step Vercel UI guide for non-technical users. 100% confidence in fix - tested locally first.',
      visibility: 'Director',
      evidence: 'next.config.js (updated), vercel.json (created), VERCEL_404_SOLUTION.md (guide)',
      feedback: [
        { quote: 'Great troubleshooting methodology. Tested before recommending user action.', name: 'QA Review' }
      ],
      skills: ['Analytics', 'Project Management', 'Operations', 'Innovation'],
    },
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [editingTask, setEditingTask] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPIE, setFilterPIE] = useState('All');
  const [filterQuarter, setFilterQuarter] = useState('All');

  // Calculate stats
  const stats = useMemo(() => {
    const completed = tasks.filter(t => t.status === 'Done').length;
    const inProgress = tasks.filter(t => t.status === 'In Progress').length;
    const highPriorityDone = tasks.filter(t => t.status === 'Done' && t.priority === 'High').length;
    const withImpact = tasks.filter(t => t.status === 'Done' && t.impact.trim()).length;
    const missingImpact = tasks.filter(t => t.status === 'Done' && !t.impact.trim());

    const pieCounts = {
      P: tasks.filter(t => t.pie === 'P').length,
      I: tasks.filter(t => t.pie === 'I').length,
      E: tasks.filter(t => t.pie === 'E').length,
    };

    return {
      total: tasks.length,
      completed,
      inProgress,
      highPriorityDone,
      withImpact,
      missingImpact,
      pieCounts,
    };
  }, [tasks]);

  const handleSaveTask = (task: any) => {
    if (editingTask) {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
    setShowModal(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
    setShowModal(false);
    setEditingTask(null);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const statusMatch = filterStatus === 'All' || task.status === filterStatus;
      const pieMatch = filterPIE === 'All' || task.pie === filterPIE;
      const quarterMatch = filterQuarter === 'All' || task.quarter === filterQuarter;
      return statusMatch && pieMatch && quarterMatch;
    });
  }, [tasks, filterStatus, filterPIE, filterQuarter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return '#10B981';
      case 'In Progress':
        return '#3E89FF';
      case 'Blocked':
        return '#CE3334';
      default:
        return '#9CA3AF';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return '#CE3334';
      case 'Medium':
        return '#F97316';
      default:
        return '#D1D5DB';
    }
  };

  // Tab 1: Overview
  const OverviewTab = () => (
    <div className="space-y-6">
      {stats.missingImpact.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
          <div className="flex gap-3">
            <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-bold text-amber-900">Impact Statements Missing</h4>
              <p className="text-sm text-amber-800">
                {stats.missingImpact.length} completed task{stats.missingImpact.length > 1 ? 's' : ''} need quantifiable impact statements for your review.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Tasks</p>
          <p className="text-3xl font-bold text-gray-900 font-montserrat">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Completed</p>
          <p className="text-3xl font-bold font-montserrat" style={{ color: '#10B981' }}>
            {stats.completed}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">In Progress</p>
          <p className="text-3xl font-bold font-montserrat" style={{ color: '#3E89FF' }}>
            {stats.inProgress}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">High Priority Done</p>
          <p className="text-3xl font-bold font-montserrat" style={{ color: '#CE3334' }}>
            {stats.highPriorityDone}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">With Impact</p>
          <p className="text-3xl font-bold font-montserrat" style={{ color: '#CE3334' }}>
            {stats.withImpact}
          </p>
        </div>
      </div>

      {/* PIE Framework */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-montserrat mb-2">PIE Framework Breakdown</h3>
        <p className="text-sm text-gray-600 mb-6">
          A balanced profile typically targets 40% Performance, 30% Image, 30% Exposure.
        </p>
        <div className="space-y-4">
          {[
            {
              label: 'Performance',
              key: 'P',
              color: '#CE3334',
              ideal: 0.4,
              description: 'Direct business impact and results'
            },
            {
              label: 'Image',
              key: 'I',
              color: '#3E89FF',
              ideal: 0.3,
              description: 'Visibility and thought leadership'
            },
            {
              label: 'Exposure',
              key: 'E',
              color: '#F97316',
              ideal: 0.3,
              description: 'External visibility and network'
            },
          ].map(cat => {
            const count = stats.pieCounts[cat.key as keyof typeof stats.pieCounts];
            const percent = stats.total > 0 ? (count / stats.total) * 100 : 0;
            return (
              <div key={cat.key}>
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{cat.label}</p>
                    <p className="text-xs text-gray-500">{cat.description}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-700">
                    {count} ({Math.round(percent)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quarterly Tracker */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-montserrat mb-4">Quarterly Completion</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Q1', 'Q2', 'Q3', 'Q4'].map(q => {
            const qTasks = tasks.filter(t => t.quarter === q);
            const qCompleted = qTasks.filter(t => t.status === 'Done').length;
            const qPercent = qTasks.length > 0 ? (qCompleted / qTasks.length) * 100 : 0;
            return (
              <div key={q} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-montserrat text-gray-900 mb-2">{q}</p>
                <p className="text-2xl font-montserrat mb-2" style={{ color: '#CE3334' }}>
                  {qCompleted}/{qTasks.length}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${qPercent}%`,
                      backgroundColor: '#10B981',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Tab 2: All Tasks
  const AllTasksTab = () => (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <button
          onClick={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-gray-700"
        >
          <Plus size={20} />
          Add Task
        </button>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
        >
          <option value="All">All Status</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Blocked">Blocked</option>
          <option value="Done">Done</option>
        </select>
        <select
          value={filterPIE}
          onChange={(e) => setFilterPIE(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
        >
          <option value="All">All PIE</option>
          <option value="P">Performance</option>
          <option value="I">Image</option>
          <option value="E">Exposure</option>
        </select>
        <select
          value={filterQuarter}
          onChange={(e) => setFilterQuarter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
        >
          <option value="All">All Quarters</option>
          <option value="Q1">Q1</option>
          <option value="Q2">Q2</option>
          <option value="Q3">Q3</option>
          <option value="Q4">Q4</option>
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="px-4 py-3 text-left text-sm font-bold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-bold">Task</th>
              <th className="px-4 py-3 text-left text-sm font-bold">PIE</th>
              <th className="px-4 py-3 text-left text-sm font-bold">Priority</th>
              <th className="px-4 py-3 text-left text-sm font-bold">Quarter</th>
              <th className="px-4 py-3 text-left text-sm font-bold">Visibility</th>
              <th className="px-4 py-3 text-center text-sm font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr
                key={task.id}
                className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setEditingTask(task);
                  setShowModal(true);
                }}
              >
                <td className="px-4 py-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: getStatusColor(task.status) }}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-900">{task.name}</p>
                  <p className="text-xs text-gray-500">{task.objective}</p>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded text-xs font-bold bg-gray-100">
                    {task.pie}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-700">{task.quarter}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{task.visibility}</td>
                <td className="px-4 py-3 text-center">
                  <Edit2 size={16} className="text-gray-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTasks.length === 0 && (
          <div className="p-8 text-center text-gray-500">No tasks match your filters</div>
        )}
      </div>
    </div>
  );

  // Tab 3: By Quarter
  const ByQuarterTab = () => (
    <div className="space-y-6">
      {['Q1', 'Q2', 'Q3', 'Q4'].map(quarter => {
        const quarterTasks = tasks.filter(t => t.quarter === quarter);
        if (quarterTasks.length === 0) return null;

        return (
          <div key={quarter}>
            <h3 className="text-lg font-montserrat mb-4 text-gray-900">{quarter}</h3>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="px-4 py-3 text-left text-sm font-bold">Task</th>
                    <th className="px-4 py-3 text-left text-sm font-bold">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-bold">PIE</th>
                    <th className="px-4 py-3 text-left text-sm font-bold">Priority</th>
                    <th className="px-4 py-3 text-left text-sm font-bold">Visibility</th>
                  </tr>
                </thead>
                <tbody>
                  {quarterTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-t border-gray-200 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setEditingTask(task);
                        setShowModal(true);
                      }}
                    >
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{task.name}</p>
                        <p className="text-xs text-gray-500">{task.objective}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: getStatusColor(task.status) }}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-bold bg-gray-100">
                          {task.pie}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: getPriorityColor(task.priority) }}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{task.visibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Tab 4: Brag Doc
  const BragDocTab = () => {
    const completedTasks = tasks.filter(t => t.status === 'Done');
    return (
      <div className="space-y-4">
        {completedTasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-900 text-white p-6 rounded-lg relative border-l-4"
            style={{ borderLeftColor: '#CE3334' }}
          >
            {!task.impact && (
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold">
                <AlertCircle size={14} />
                Missing Impact
              </div>
            )}

            <div className="mb-4">
              <h4 className="text-lg font-montserrat mb-2">{task.name}</h4>
              <p className="text-white mb-3">{task.impact || <em className="text-gray-400">No impact statement provided</em>}</p>
            </div>

            {task.feedback.length > 0 && (
              <div className="mb-4 bg-gray-800 p-3 rounded">
                <p className="text-xs font-bold text-gray-300 mb-2">FEEDBACK</p>
                {task.feedback.map((fb, idx) => (
                  <p key={idx} className="text-sm italic text-gray-200 mb-1">
                    "{fb.quote}"
                  </p>
                ))}
                <p className="text-xs text-gray-400 mt-2">
                  {task.feedback.map(f => f.name).join(', ')}
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {task.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 rounded text-xs font-bold bg-blue-900 text-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-gray-300">
              <div>
                <p className="font-bold text-gray-400">OBJECTIVE</p>
                <p>{task.objective}</p>
              </div>
              <div>
                <p className="font-bold text-gray-400">REVIEW PERIOD</p>
                <p>{task.reviewPeriod}</p>
              </div>
              <div>
                <p className="font-bold text-gray-400">REQUESTOR</p>
                <p>{task.requestor}</p>
              </div>
              <div>
                <p className="font-bold text-gray-400">VISIBILITY</p>
                <p>{task.visibility}</p>
              </div>
            </div>
          </div>
        ))}
        {completedTasks.length === 0 && (
          <div className="p-8 text-center text-gray-500">No completed tasks yet</div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9F9F9' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap');
        
        body {
          font-family: 'Open Sans', sans-serif;
        }
        
        [style*="fontFamily: 'Montserrat'"] {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
        }
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-montserrat text-gray-900">
            Performance Tracker
          </h1>
          <p className="text-gray-600 mt-2">Track achievements, build your brag doc, and prepare for reviews</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-300">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'tasks', label: 'All Tasks' },
            { id: 'quarter', label: 'By Quarter' },
            { id: 'brag', label: 'Brag Doc' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-montserrat text-sm transition-colors ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{
                borderBottom: activeTab === tab.id ? '3px solid #CE3334' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'tasks' && <AllTasksTab />}
          {activeTab === 'quarter' && <ByQuarterTab />}
          {activeTab === 'brag' && <BragDocTab />}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <TaskModal
          task={editingTask}
          skillOptions={skillOptions}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

const TaskModal = ({ task, skillOptions, onSave, onDelete, onClose }: any) => {
  const [form, setForm] = useState(
    task || {
      name: '',
      status: 'Not Started',
      priority: 'Medium',
      pie: 'P',
      quarter: 'Q1',
      reviewPeriod: 'Annual',
      requestor: '',
      objective: '',
      description: '',
      impact: '',
      visibility: 'Manager only',
      evidence: '',
      feedback: [],
      skills: [],
    }
  );

  const [feedbackInput, setFeedbackInput] = useState({ quote: '', name: '' });

  const handleFieldChange = (field: string, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleSkillToggle = (skill: string) => {
    const updated = form.skills.includes(skill)
      ? form.skills.filter((s: string) => s !== skill)
      : [...form.skills, skill];
    setForm({ ...form, skills: updated });
  };

  const addFeedback = () => {
    if (feedbackInput.quote && feedbackInput.name) {
      setForm({
        ...form,
        feedback: [...form.feedback, feedbackInput],
      });
      setFeedbackInput({ quote: '', name: '' });
    }
  };

  const removeFeedback = (idx: number) => {
    setForm({
      ...form,
      feedback: form.feedback.filter((_: any, i: number) => i !== idx),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-montserrat">
            {task ? 'Edit Task' : 'Add Task'}
          </h2>
          <button onClick={onClose} className="text-white hover:bg-gray-800 p-1 rounded">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Task Basics */}
          <div>
            <h3 className="text-lg font-montserrat mb-4 text-gray-900">Task Basics</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task name"
                value={form.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Task description"
                value={form.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
              />
              <input
                type="text"
                placeholder="Company objective this ladders to"
                value={form.objective}
                onChange={(e) => handleFieldChange('objective', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={form.status}
                  onChange={(e) => handleFieldChange('status', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Done">Done</option>
                </select>
                <select
                  value={form.priority}
                  onChange={(e) => handleFieldChange('priority', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={form.pie}
                  onChange={(e) => handleFieldChange('pie', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="P">Performance (P)</option>
                  <option value="I">Image (I)</option>
                  <option value="E">Exposure (E)</option>
                </select>
                <select
                  value={form.quarter}
                  onChange={(e) => handleFieldChange('quarter', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Q1">Q1</option>
                  <option value="Q2">Q2</option>
                  <option value="Q3">Q3</option>
                  <option value="Q4">Q4</option>
                </select>
              </div>
            </div>
          </div>

          {/* Impact & Visibility */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-montserrat mb-4 text-gray-900">Impact & Visibility</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quantifiable Impact (Include Real Numbers)
                </label>
                <textarea
                  placeholder="e.g., Reduced processing time from 4 hours to 45 minutes per week, saving 153 hours annually (~$7,650 in labor costs)"
                  value={form.impact}
                  onChange={(e) => handleFieldChange('impact', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Visibility</label>
                  <select
                    value={form.visibility}
                    onChange={(e) => handleFieldChange('visibility', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Manager only">Manager Only</option>
                    <option value="Director">Director</option>
                    <option value="VP">VP</option>
                    <option value="Exec/C-Suite">Exec/C-Suite</option>
                    <option value="Cross-functional">Cross-functional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Review Period</label>
                  <select
                    value={form.reviewPeriod}
                    onChange={(e) => handleFieldChange('reviewPeriod', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Mid-Year">Mid-Year</option>
                    <option value="Annual">Annual</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Evidence / Link</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={form.evidence}
                  onChange={(e) => handleFieldChange('evidence', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Stakeholders */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-montserrat mb-4 text-gray-900">Stakeholders</h3>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Requestor</label>
              <input
                type="text"
                placeholder="Who can validate this work?"
                value={form.requestor}
                onChange={(e) => handleFieldChange('requestor', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-montserrat mb-4 text-gray-900">Skills Demonstrated</h3>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill: string) => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-3 py-2 rounded-full text-sm font-semibold transition-colors ${
                    form.skills.includes(skill)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-montserrat mb-4 text-gray-900">Feedback Received</h3>
            <div className="space-y-4">
              {form.feedback.map((fb: any, idx: number) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-lg flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm italic">"{fb.quote}"</p>
                    <p className="text-xs text-gray-600 mt-1">— {fb.name}</p>
                  </div>
                  <button
                    onClick={() => removeFeedback(idx)}
                    className="text-red-600 hover:text-red-800 ml-2"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <div className="space-y-2">
                <textarea
                  placeholder="Feedback quote"
                  value={feedbackInput.quote}
                  onChange={(e) => setFeedbackInput({ ...feedbackInput, quote: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg h-16"
                />
                <input
                  type="text"
                  placeholder="Who gave this feedback? (Name, Title)"
                  value={feedbackInput.name}
                  onChange={(e) => setFeedbackInput({ ...feedbackInput, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={addFeedback}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm font-semibold"
                >
                  Add Feedback
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-100 border-t border-gray-200 p-6 flex justify-between gap-4">
          <div>
            {task && (
              <button
                onClick={() => {
                  onDelete(task.id);
                }}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-semibold flex items-center gap-2"
              >
                <Trash2 size={18} />
                Delete
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(form)}
              className="px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90"
              style={{ backgroundColor: '#CE3334' }}
            >
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTracker;
