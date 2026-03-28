import React, { useState, useMemo } from 'react';
import { X, Plus, AlertCircle, Download, Edit2, Trash2, Check } from 'lucide-react';

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
      name: 'Automated Weekly Reporting Process',
      status: 'Done',
      priority: 'High',
      pie: 'P',
      quarter: 'Q1',
      reviewPeriod: 'Both',
      requestor: 'Finance Director',
      objective: 'Reduce manual reporting time by 20%',
      description: 'Built automated weekly financial summary report using Python and Slack API integration',
      impact: 'Reduced weekly reporting time from 4 hours to 45 minutes per week, saving 153 hours annually (~$7,650 in labor costs)',
      visibility: 'VP',
      evidence: 'https://slack.com/shared/reporting-automation',
      feedback: [
        { quote: 'This is exactly what we needed. Game changer for our month-end process.', name: 'Sarah Chen, Finance Director' }
      ],
      skills: ['Analytics', 'Project Management', 'Operations'],
    },
    {
      id: 2,
      name: 'Led Cross-Functional Rebranding Initiative',
      status: 'Done',
      priority: 'High',
      pie: 'I',
      quarter: 'Q2',
      reviewPeriod: 'Annual',
      requestor: 'Marketing Head',
      objective: 'Update brand identity and increase market visibility',
      description: 'Coordinated rebrand across 5 departments, managed stakeholder alignment, created style guide',
      impact: '45% increase in social media engagement, 3 major press features, brand consistency achieved across 12 external channels',
      visibility: 'Director',
      evidence: 'https://brand-guidelines.internal.com',
      feedback: [
        { quote: 'Your coordination made a complex project seamless. Everyone was aligned.', name: 'James Wong, Marketing Head' }
      ],
      skills: ['Communication', 'Leadership', 'Project Management', 'Relationship Building'],
    },
    {
      id: 3,
      name: 'Client Strategy Consulting Engagements',
      status: 'Done',
      priority: 'Medium',
      pie: 'E',
      quarter: 'Q2',
      reviewPeriod: 'Both',
      requestor: 'VP of Client Success',
      objective: 'Build executive relationships and demonstrate thought leadership',
      description: 'Conducted 8 strategy sessions with Fortune 500 clients on digital transformation',
      impact: '$2.4M pipeline generated from strategy sessions, 4 clients expanded services by 30%, featured in 2 industry publications',
      visibility: 'Exec/C-Suite',
      evidence: 'https://salesforce.crm.com/opportunities/q2',
      feedback: [
        { quote: 'Your strategic insights were invaluable. Three clients specifically requested you for their next phase.', name: 'Marcus Johnson, VP Client Success' }
      ],
      skills: ['Strategy', 'Communication', 'Relationship Building', 'Innovation'],
    },
    {
      id: 4,
      name: 'Data Pipeline Migration to Cloud',
      status: 'In Progress',
      priority: 'High',
      pie: 'P',
      quarter: 'Q3',
      reviewPeriod: 'Annual',
      requestor: 'Engineering Lead',
      objective: 'Improve system scalability and reduce infrastructure costs',
      description: 'Migrating legacy data pipelines from on-premise to cloud infrastructure',
      impact: '',
      visibility: 'Manager only',
      evidence: '',
      feedback: [],
      skills: ['Analytics', 'Project Management', 'Operations'],
    },
    {
      id: 5,
      name: 'Team Mentorship Program Launch',
      status: 'In Progress',
      priority: 'Medium',
      pie: 'I',
      quarter: 'Q3',
      reviewPeriod: 'Mid-Year',
      requestor: 'People Lead',
      objective: 'Develop junior talent and improve retention',
      description: 'Created formal mentorship program structure and curriculum',
      impact: '',
      visibility: 'Director',
      evidence: '',
      feedback: [],
      skills: ['Leadership', 'Communication', 'Relationship Building'],
    },
    {
      id: 6,
      name: 'Quarterly Business Review Preparation',
      status: 'Not Started',
      priority: 'High',
      pie: 'P',
      quarter: 'Q4',
      reviewPeriod: 'Annual',
      requestor: 'CFO',
      objective: 'Present key metrics and strategic initiatives to board',
      description: 'Compile and analyze quarterly performance metrics across all departments',
      impact: '',
      visibility: 'Exec/C-Suite',
      evidence: '',
      feedback: [],
      skills: ['Analytics', 'Communication', 'Strategy'],
    },
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [editingTask, setEditingTask] = useState(null);
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

  const handleSaveTask = (task) => {
    if (editingTask) {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      setTasks([...tasks, { ...task, id: Date.now() }]);
    }
    setShowModal(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
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

  const getStatusColor = (status) => {
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#CE3334';
      case 'Medium':
        return '#F97316';
      default:
        return '#D1D5DB';
    }
  };

  const getPIELabel = (pie) => {
    switch (pie) {
      case 'P':
        return 'Performance';
      case 'I':
        return 'Image';
      case 'E':
        return 'Exposure';
      default:
        return 'N/A';
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
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Completed</p>
          <p className="text-3xl font-bold" style={{ color: '#10B981' }}>
            {stats.completed}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">In Progress</p>
          <p className="text-3xl font-bold" style={{ color: '#3E89FF' }}>
            {stats.inProgress}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">High Priority Done</p>
          <p className="text-3xl font-bold" style={{ color: '#CE3334' }}>
            {stats.highPriorityDone}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">With Impact</p>
          <p className="text-3xl font-bold" style={{ color: '#CE3334' }}>
            {stats.withImpact}
          </p>
        </div>
      </div>

      {/* PIE Framework */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Montserrat' }}>
          PIE Framework Breakdown
        </h3>
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
            const count = stats.pieCounts[cat.key];
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
        <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'Montserrat' }}>
          Quarterly Completion
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Q1', 'Q2', 'Q3', 'Q4'].map(q => {
            const qTasks = tasks.filter(t => t.quarter === q);
            const qCompleted = qTasks.filter(t => t.status === 'Done').length;
            const qPercent = qTasks.length > 0 ? (qCompleted / qTasks.length) * 100 : 0;
            return (
              <div key={q} className="bg-gray-50 p-4 rounded-lg">
                <p className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Montserrat' }}>
                  {q}
                </p>
                <p className="text-2xl font-bold mb-2" style={{ color: '#CE3334', fontFamily: 'Montserrat' }}>
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
            <h3 className="text-lg font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat' }}>
              {quarter}
            </h3>
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
              <h4 className="text-lg font-bold mb-2" style={{ fontFamily: 'Montserrat' }}>
                {task.name}
              </h4>
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
      `}</style>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat' }}>
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
              className={`px-4 py-3 font-bold text-sm transition-colors ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{
                borderBottom: activeTab === tab.id ? '3px solid #CE3334' : 'none',
                fontFamily: 'Montserrat',
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

const TaskModal = ({ task, skillOptions, onSave, onDelete, onClose }) => {
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

  const handleFieldChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSkillToggle = (skill) => {
    const updated = form.skills.includes(skill)
      ? form.skills.filter(s => s !== skill)
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

  const removeFeedback = (idx) => {
    setForm({
      ...form,
      feedback: form.feedback.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold" style={{ fontFamily: 'Montserrat' }}>
            {task ? 'Edit Task' : 'Add Task'}
          </h2>
          <button onClick={onClose} className="text-white hover:bg-gray-800 p-1 rounded">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Task Basics */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat' }}>
              Task Basics
            </h3>
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
            <h3 className="text-lg font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat' }}>
              Impact & Visibility
            </h3>
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
            <h3 className="text-lg font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat' }}>
              Stakeholders
            </h3>
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
            <h3 className="text-lg font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat' }}>
              Skills Demonstrated
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Strategy', 'Communication', 'Leadership', 'Analytics', 'Project Management', 'Relationship Building', 'Innovation', 'Operations'].map(skill => (
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
            <h3 className="text-lg font-bold mb-4 text-gray-900" style={{ fontFamily: 'Montserrat' }}>
              Feedback Received
            </h3>
            <div className="space-y-4">
              {form.feedback.map((fb, idx) => (
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
