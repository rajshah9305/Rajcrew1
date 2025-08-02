"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import {
  Users,
  CheckSquare,
  LayoutTemplateIcon as Template,
  Play,
  BarChart3,
  FileText,
  Home,
  Download,
  Trash2,
  Clock,
  DollarSign,
  TrendingUp,
  Activity,
  AlertCircle,
  CheckCircle,
  Loader,
  Eye,
  Copy,
  Zap,
  Brain,
  Database,
  Globe,
  Code,
  Calculator,
  FileSearch,
  Palette,
  Mail,
  Calendar,
  User,
  Wifi,
  WifiOff,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Menu,
  X,
} from "lucide-react"
import { Toaster, toast } from "react-hot-toast"

const App = () => {
  // Core State Management
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [systemStatus, setSystemStatus] = useState("online")
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionOutput, setExecutionOutput] = useState("")
  const [executionLogs, setExecutionLogs] = useState([])
  const [executionProgress, setExecutionProgress] = useState(0)

  // Data State
  const [agents, setAgents] = useState([
    {
      id: 1,
      role: "Research Analyst",
      goal: "Conduct comprehensive market research and analysis",
      backstory: "Expert analyst with 10+ years in market research, specializing in emerging technologies.",
      model: "Llama 3.3 70B",
      temperature: 0.7,
      maxIterations: 15,
      tools: ["web_search", "file_reader", "calculator"],
      status: "active",
      performance: 94,
      tasksCompleted: 127,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      role: "Content Strategist",
      goal: "Create compelling content strategies and marketing materials",
      backstory: "Creative strategist with expertise in digital marketing and brand storytelling.",
      model: "GPT-4",
      temperature: 0.8,
      maxIterations: 12,
      tools: ["web_search", "code_interpreter", "file_reader"],
      status: "idle",
      performance: 91,
      tasksCompleted: 89,
      createdAt: new Date("2024-01-20"),
    },
  ])

  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Market Analysis Q1 2024",
      description: "Comprehensive analysis of market trends and competitor landscape",
      expectedOutput: "Detailed market analysis report with actionable recommendations",
      assignedAgent: 1,
      priority: "high",
      status: "completed",
      outputFormat: "PDF",
      progress: 100,
      createdAt: new Date("2024-01-25"),
    },
    {
      id: 2,
      name: "Content Strategy Development",
      description: "Develop comprehensive content strategy for social media and marketing campaigns",
      expectedOutput: "Content calendar, strategy document, and implementation guidelines",
      assignedAgent: 2,
      priority: "urgent",
      status: "in-progress",
      outputFormat: "markdown",
      progress: 65,
      createdAt: new Date("2024-01-30"),
    },
  ])

  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Q1_Market_Analysis_Report.pdf",
      type: "report",
      size: "2.4 MB",
      downloads: 23,
      createdAt: new Date("2024-01-28"),
      status: "completed",
      description: "Comprehensive market analysis for Q1 2024",
    },
    {
      id: 2,
      name: "Content_Strategy_Framework.md",
      type: "strategy",
      size: "156 KB",
      downloads: 12,
      createdAt: new Date("2024-01-30"),
      status: "completed",
      description: "Strategic framework for content creation",
    },
  ])

  // Form States
  const [agentForm, setAgentForm] = useState({
    role: "",
    goal: "",
    backstory: "",
    model: "Llama 3.3 70B",
    temperature: 0.7,
    maxIterations: 10,
    tools: [],
  })

  const [taskForm, setTaskForm] = useState({
    name: "",
    description: "",
    expectedOutput: "",
    assignedAgent: "",
    priority: "medium",
    outputFormat: "text",
  })

  const [executionForm, setExecutionForm] = useState({
    topic: "",
    model: "Llama 3.3 70B",
    processType: "sequential",
    maxIterations: 10,
    verboseLogging: true,
    memory: true,
    collaboration: true,
  })

  // Available Tools
  const availableTools = [
    { id: "web_search", name: "Web Search", icon: Globe },
    { id: "file_reader", name: "File Reader", icon: FileSearch },
    { id: "calculator", name: "Calculator", icon: Calculator },
    { id: "code_interpreter", name: "Code Interpreter", icon: Code },
    { id: "data_analyzer", name: "Data Analyzer", icon: Database },
    { id: "image_generator", name: "Image Generator", icon: Palette },
    { id: "email_sender", name: "Email Sender", icon: Mail },
    { id: "calendar_manager", name: "Calendar Manager", icon: Calendar },
  ]

  // Models
  const availableModels = ["Llama 3.3 70B", "GPT-4", "Claude-3", "Mistral Large"]

  // Priority Colors
  const priorityColors = {
    urgent: "bg-red-100 text-red-800 border-red-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    medium: "bg-blue-100 text-blue-800 border-blue-200",
    low: "bg-gray-100 text-gray-800 border-gray-200",
  }

  // Status Colors
  const statusColors = {
    active: "bg-green-100 text-green-800",
    idle: "bg-gray-100 text-gray-800",
    busy: "bg-yellow-100 text-yellow-800",
    pending: "bg-blue-100 text-blue-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
    processing: "bg-blue-100 text-blue-800",
  }

  // Tab Configuration
  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: Home, badge: null },
    { id: "agents", name: "Agents", icon: Users, badge: agents.length },
    { id: "tasks", name: "Tasks", icon: CheckSquare, badge: tasks.filter((t) => t.status !== "completed").length },
    { id: "templates", name: "Templates", icon: Template, badge: 4 },
    { id: "execution", name: "Execution", icon: Play, badge: isExecuting ? "●" : null },
    { id: "analytics", name: "Analytics", icon: BarChart3, badge: null },
    { id: "files", name: "Files", icon: FileText, badge: files.length },
  ]

  // Utility Functions
  const getAgentById = useCallback(
    (id) => {
      return agents.find((agent) => agent.id === id)
    },
    [agents],
  )

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="w-4 h-4" />
      case "high":
        return <TrendingUp className="w-4 h-4" />
      case "medium":
        return <Activity className="w-4 h-4" />
      case "low":
        return <Clock className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in-progress":
        return <Loader className="w-4 h-4 text-yellow-600 animate-spin" />
      case "pending":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "active":
        return <Zap className="w-4 h-4 text-green-600" />
      case "idle":
        return <Clock className="w-4 h-4 text-gray-600" />
      case "busy":
        return <Activity className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // System Status Effect
  useEffect(() => {
    const statusInterval = setInterval(() => {
      const statuses = ["online", "busy", "maintenance"]
      const weights = [0.8, 0.15, 0.05]
      const random = Math.random()
      let cumulativeWeight = 0

      for (let i = 0; i < statuses.length; i++) {
        cumulativeWeight += weights[i]
        if (random <= cumulativeWeight) {
          setSystemStatus(statuses[i])
          break
        }
      }
    }, 30000)

    return () => clearInterval(statusInterval)
  }, [])

  // Execution Simulation
  const simulateExecution = useCallback(async () => {
    if (isExecuting) return

    setIsExecuting(true)
    setExecutionOutput("")
    setExecutionLogs([])
    setExecutionProgress(0)

    const steps = [
      "Initializing CrewAI execution environment...",
      "Loading agent configurations and tools...",
      "Establishing model connections and API endpoints...",
      "Beginning task delegation and workflow orchestration...",
      "Research Analyst: Starting comprehensive market analysis...",
      "Research Analyst: Gathering industry data and trends...",
      "Content Strategist: Developing content framework...",
      "Cross-agent collaboration: Synthesizing findings...",
      "Quality assurance: Validating outputs and recommendations...",
      "Generating executive summary and action items...",
      "Execution completed successfully!",
    ]

    const businessContent = `# Executive Summary: Strategic Market Analysis

## Overview
Our comprehensive analysis reveals significant market opportunities in the emerging technology sector, with particular strength in AI-driven solutions and sustainable technology platforms.

## Key Findings

### Market Landscape Analysis
The current market environment presents unprecedented opportunities for growth, driven by:
- **Digital Transformation Acceleration**: 78% of enterprises are prioritizing digital initiatives
- **Consumer Behavior Shifts**: 65% increase in demand for personalized experiences
- **Regulatory Environment**: Favorable policies supporting innovation and sustainability

### Financial Projections
Based on our comprehensive analysis, we project:
- **Revenue Growth**: 45-60% increase over next 18 months
- **Market Share Expansion**: Potential to capture 12-15% of target segment
- **Cost Optimization**: 25% reduction in operational expenses through automation

### Strategic Recommendations

#### Immediate Actions (0-3 months)
1. **Product Portfolio Optimization**
   - Enhance core platform capabilities with AI integration
   - Develop mobile-first user experience improvements
   - Implement advanced analytics and reporting features

2. **Market Penetration Strategy**
   - Launch targeted campaigns in high-growth segments
   - Establish strategic partnerships with industry leaders
   - Develop channel partner program for expanded reach

## Implementation Roadmap

### Phase 1: Foundation (Months 1-3)
- Team expansion and capability building
- Technology infrastructure enhancement
- Initial market penetration activities

### Phase 2: Acceleration (Months 4-9)
- Full-scale marketing and sales campaigns
- Strategic partnership development
- Geographic expansion initiation

## Success Metrics & KPIs

### Financial Metrics
- Monthly Recurring Revenue (MRR) growth: Target 15% month-over-month
- Customer Acquisition Cost (CAC): Reduce by 30% through optimization
- Customer Lifetime Value (CLV): Increase by 50% through retention programs

## Conclusion

The strategic analysis reveals exceptional growth opportunities with clear pathways to market leadership. Success depends on disciplined execution of the recommended initiatives and continuous market monitoring.`

    let currentStep = 0
    let outputIndex = 0
    const totalSteps = steps.length

    const executionInterval = setInterval(() => {
      if (currentStep < totalSteps) {
        // Add execution log
        setExecutionLogs((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            timestamp: new Date(),
            message: steps[currentStep],
            type: currentStep === totalSteps - 1 ? "success" : "info",
          },
        ])

        // Update progress
        setExecutionProgress(((currentStep + 1) / totalSteps) * 100)
        currentStep++
      } else if (outputIndex < businessContent.length) {
        // Stream output content
        const chunkSize = Math.floor(Math.random() * 50) + 20
        const chunk = businessContent.slice(outputIndex, outputIndex + chunkSize)
        setExecutionOutput((prev) => prev + chunk)
        outputIndex += chunkSize
      } else {
        // Execution complete
        clearInterval(executionInterval)
        setIsExecuting(false)

        // Generate file
        const newFile = {
          id: Date.now(),
          name: `Strategic_Analysis_${new Date().toISOString().split("T")[0]}.md`,
          type: "report",
          size: "1.2 MB",
          downloads: 0,
          createdAt: new Date(),
          status: "completed",
          description: "Strategic market analysis and growth opportunities report generated by CrewAI execution",
        }

        setFiles((prev) => [newFile, ...prev])
        toast.success("Execution completed successfully! Report generated.")
      }
    }, 800)

    return () => clearInterval(executionInterval)
  }, [isExecuting])

  // Form Handlers
  const handleAgentSubmit = (e) => {
    e.preventDefault()
    if (!agentForm.role || !agentForm.goal || !agentForm.backstory) {
      toast.error("Please fill in all required fields")
      return
    }

    const newAgent = {
      id: Date.now(),
      ...agentForm,
      status: "idle",
      performance: Math.floor(Math.random() * 20) + 80,
      tasksCompleted: 0,
      createdAt: new Date(),
    }

    setAgents((prev) => [...prev, newAgent])
    setAgentForm({
      role: "",
      goal: "",
      backstory: "",
      model: "Llama 3.3 70B",
      temperature: 0.7,
      maxIterations: 10,
      tools: [],
    })
    toast.success("Agent created successfully!")
  }

  const handleTaskSubmit = (e) => {
    e.preventDefault()
    if (!taskForm.name || !taskForm.description || !taskForm.expectedOutput || !taskForm.assignedAgent) {
      toast.error("Please fill in all required fields")
      return
    }

    const newTask = {
      id: Date.now(),
      ...taskForm,
      assignedAgent: Number.parseInt(taskForm.assignedAgent),
      status: "pending",
      progress: 0,
      createdAt: new Date(),
    }

    setTasks((prev) => [...prev, newTask])
    setTaskForm({
      name: "",
      description: "",
      expectedOutput: "",
      assignedAgent: "",
      priority: "medium",
      outputFormat: "text",
    })
    toast.success("Task created successfully!")
  }

  const handleDeleteAgent = (id) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== id))
    toast.success("Agent deleted successfully")
  }

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
    toast.success("Task deleted successfully")
  }

  const handleDeleteFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
    toast.success("File deleted successfully")
  }

  const handleDownloadFile = (file) => {
    setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, downloads: f.downloads + 1 } : f)))
    toast.success(`Downloaded ${file.name}`)
  }

  // Dashboard Metrics
  const dashboardMetrics = useMemo(
    () => ({
      totalExecutions: 247,
      successRate: 94.2,
      avgDuration: "2m 34s",
      totalCost: 24.73,
      weeklyTrend: 12.4,
      activeAgents: agents.filter((a) => a.status === "active").length,
      pendingTasks: tasks.filter((t) => t.status === "pending").length,
      completedTasks: tasks.filter((t) => t.status === "completed").length,
    }),
    [agents, tasks],
  )

  // Render Functions
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to CrewAI Dashboard</h1>
        <p className="text-blue-100">
          Manage your AI agents, orchestrate complex workflows, and monitor execution in real-time.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Executions</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.totalExecutions}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Play className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">+{dashboardMetrics.weeklyTrend}%</span>
            <span className="text-gray-600 ml-1">this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.successRate}%</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUp className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">+2.1%</span>
            <span className="text-gray-600 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.avgDuration}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowDown className="w-4 h-4 text-green-600 mr-1" />
            <span className="text-green-600">-15s</span>
            <span className="text-gray-600 ml-1">improvement</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Cost</p>
              <p className="text-2xl font-bold text-gray-900">${dashboardMetrics.totalCost}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <ArrowUp className="w-4 h-4 text-red-600 mr-1" />
            <span className="text-red-600">+$3.20</span>
            <span className="text-gray-600 ml-1">this month</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setActiveTab("agents")}
              className="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 text-blue-600 mr-3" />
                <span className="font-medium">Create New Agent</span>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>
            <button
              onClick={() => setActiveTab("tasks")}
              className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <CheckSquare className="w-5 h-5 text-green-600 mr-3" />
                <span className="font-medium">Add New Task</span>
              </div>
              <ArrowRight className="w-4 h-4 text-green-600" />
            </button>
            <button
              onClick={() => setActiveTab("execution")}
              className="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Play className="w-5 h-5 text-purple-600 mr-3" />
                <span className="font-medium">Start Execution</span>
              </div>
              <ArrowRight className="w-4 h-4 text-purple-600" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">System Status</h3>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {systemStatus === "online" && <Wifi className="w-5 h-5 text-green-600" />}
              {systemStatus === "busy" && <Activity className="w-5 h-5 text-yellow-600" />}
              {systemStatus === "maintenance" && <WifiOff className="w-5 h-5 text-red-600" />}
              <span
                className={`text-sm font-medium ${
                  systemStatus === "online"
                    ? "text-green-600"
                    : systemStatus === "busy"
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.activeAgents}</p>
              <p className="text-sm text-gray-600">Active Agents</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.pendingTasks}</p>
              <p className="text-sm text-gray-600">Pending Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.completedTasks}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAgents = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">AI Agents</h2>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-gray-600">{agents.length} agents configured</span>
        </div>
      </div>

      {/* Create Agent Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Create New Agent</h3>
        <form onSubmit={handleAgentSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={agentForm.role}
                onChange={(e) => setAgentForm((prev) => ({ ...prev, role: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Research Analyst"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <select
                value={agentForm.model}
                onChange={(e) => setAgentForm((prev) => ({ ...prev, model: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {availableModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Goal <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={agentForm.goal}
              onChange={(e) => setAgentForm((prev) => ({ ...prev, goal: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What should this agent accomplish?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Backstory <span className="text-red-500">*</span>
            </label>
            <textarea
              value={agentForm.backstory}
              onChange={(e) => setAgentForm((prev) => ({ ...prev, backstory: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Provide context and expertise background for this agent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature: {agentForm.temperature}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={agentForm.temperature}
                onChange={(e) => setAgentForm((prev) => ({ ...prev, temperature: Number.parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Iterations</label>
              <input
                type="number"
                min="1"
                max="20"
                value={agentForm.maxIterations}
                onChange={(e) => setAgentForm((prev) => ({ ...prev, maxIterations: Number.parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tools</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {availableTools.map((tool) => (
                <label
                  key={tool.id}
                  className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={agentForm.tools.includes(tool.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAgentForm((prev) => ({ ...prev, tools: [...prev.tools, tool.id] }))
                      } else {
                        setAgentForm((prev) => ({ ...prev, tools: prev.tools.filter((t) => t !== tool.id) }))
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <tool.icon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm">{tool.name}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Agent
          </button>
        </form>
      </div>

      {/* Agents List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{agent.role}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(agent.status)}
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[agent.status]}`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteAgent(agent.id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">{agent.goal}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Performance</span>
                <span className="text-sm font-medium">{agent.performance}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${agent.performance}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tasks Completed</span>
                <span className="font-medium">{agent.tasksCompleted}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Model</span>
                <span className="font-medium">{agent.model}</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {agent.tools.map((toolId) => {
                  const tool = availableTools.find((t) => t.id === toolId)
                  return tool ? (
                    <span key={toolId} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {tool.name}
                    </span>
                  ) : null
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTasks = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Task Management</h2>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-gray-600">{tasks.length} total tasks</span>
        </div>
      </div>

      {/* Create Task Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Create New Task</h3>
        <form onSubmit={handleTaskSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={taskForm.name}
                onChange={(e) => setTaskForm((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Market Research Analysis"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assigned Agent <span className="text-red-500">*</span>
              </label>
              <select
                value={taskForm.assignedAgent}
                onChange={(e) => setTaskForm((prev) => ({ ...prev, assignedAgent: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select an agent</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={taskForm.description}
              onChange={(e) => setTaskForm((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Detailed description of what needs to be accomplished"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Output <span className="text-red-500">*</span>
            </label>
            <textarea
              value={taskForm.expectedOutput}
              onChange={(e) => setTaskForm((prev) => ({ ...prev, expectedOutput: e.target.value }))}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="What should be delivered as the result of this task"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={taskForm.priority}
                onChange={(e) => setTaskForm((prev) => ({ ...prev, priority: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
              <select
                value={taskForm.outputFormat}
                onChange={(e) => setTaskForm((prev) => ({ ...prev, outputFormat: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="text">Text</option>
                <option value="markdown">Markdown</option>
                <option value="JSON">JSON</option>
                <option value="CSV">CSV</option>
                <option value="PDF">PDF</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Task
          </button>
        </form>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => {
          const assignedAgent = getAgentById(task.assignedAgent)
          return (
            <div key={task.id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{task.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
                      {getPriorityIcon(task.priority)}
                      <span className="ml-1">{task.priority}</span>
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>{task.status}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{assignedAgent ? assignedAgent.role : "Unassigned"}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(task.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4" />
                      <span>{task.outputFormat}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors ml-4"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {task.status === "in-progress" && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Expected Output:</span> {task.expectedOutput}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderExecution = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Crew Execution</h2>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          {isExecuting ? (
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Executing</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-gray-600">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="text-sm">Ready</span>
            </div>
          )}
        </div>
      </div>

      {/* Execution Configuration */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Execution Configuration</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            simulateExecution()
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic/Project Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={executionForm.topic}
              onChange={(e) => setExecutionForm((prev) => ({ ...prev, topic: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the project or topic you want the crew to work on..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <select
                value={executionForm.model}
                onChange={(e) => setExecutionForm((prev) => ({ ...prev, model: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {availableModels.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Process Type</label>
              <select
                value={executionForm.processType}
                onChange={(e) => setExecutionForm((prev) => ({ ...prev, processType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sequential">Sequential</option>
                <option value="hierarchical">Hierarchical</option>
                <option value="parallel">Parallel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Iterations</label>
              <input
                type="number"
                min="1"
                max="50"
                value={executionForm.maxIterations}
                onChange={(e) =>
                  setExecutionForm((prev) => ({ ...prev, maxIterations: Number.parseInt(e.target.value) }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={executionForm.verboseLogging}
                onChange={(e) => setExecutionForm((prev) => ({ ...prev, verboseLogging: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Verbose Logging</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={executionForm.memory}
                onChange={(e) => setExecutionForm((prev) => ({ ...prev, memory: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Memory</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={executionForm.collaboration}
                onChange={(e) => setExecutionForm((prev) => ({ ...prev, collaboration: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Agent Collaboration</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isExecuting || !executionForm.topic}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
          >
            {isExecuting ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Executing...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start Execution</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Execution Progress */}
      {(isExecuting || executionLogs.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Output Panel */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Execution Output</h3>
            </div>
            <div className="p-4 h-96 overflow-y-auto bg-gray-50 font-mono text-sm">
              {executionOutput ? (
                <pre className="whitespace-pre-wrap text-gray-800">{executionOutput}</pre>
              ) : (
                <div className="text-gray-500 italic">Output will appear here during execution...</div>
              )}
            </div>
            {executionOutput && (
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(executionOutput)
                    toast.success("Output copied to clipboard")
                  }}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Output</span>
                </button>
              </div>
            )}
          </div>

          {/* Activity Panel */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Activity Log</h3>
            </div>
            <div className="p-4 h-96 overflow-y-auto">
              <div className="space-y-3">
                {executionLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${log.type === "success" ? "bg-green-500" : "bg-blue-500"}`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{log.message}</p>
                      <p className="text-xs text-gray-500">{log.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {isExecuting && (
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Execution Progress</span>
            <span className="text-sm text-gray-600">{Math.round(executionProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${executionProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )

  const renderFiles = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">File Management</h2>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-gray-600">{files.length} files generated</span>
        </div>
      </div>

      {/* File Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
          <div className="text-2xl font-bold text-gray-900">{files.length}</div>
          <div className="text-sm text-gray-600">Total Files</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
          <div className="text-2xl font-bold text-gray-900">{files.filter((f) => f.type === "report").length}</div>
          <div className="text-sm text-gray-600">Reports</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
          <div className="text-2xl font-bold text-gray-900">{files.reduce((sum, f) => sum + f.downloads, 0)}</div>
          <div className="text-sm text-gray-600">Total Downloads</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
          <div className="text-2xl font-bold text-gray-900">{files.filter((f) => f.status === "completed").length}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {files.map((file) => (
          <div key={file.id} className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    file.type === "report" ? "bg-blue-100" : file.type === "strategy" ? "bg-green-100" : "bg-purple-100"
                  }`}
                >
                  <FileText
                    className={`w-6 h-6 ${
                      file.type === "report"
                        ? "text-blue-600"
                        : file.type === "strategy"
                          ? "text-green-600"
                          : "text-purple-600"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{file.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[file.status]}`}>{file.status}</span>
                    <span className="text-xs text-gray-500">{file.size}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteFile(file.id)}
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">{file.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(file.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="w-4 h-4" />
                <span>{file.downloads} downloads</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => {
                  toast.success(`Previewing ${file.name}`)
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => handleDownloadFile(file)}
                className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center space-x-1"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return renderDashboard()
      case "agents":
        return renderAgents()
      case "tasks":
        return renderTasks()
      case "templates":
        return <div className="text-center py-12 text-gray-500">Templates coming soon...</div>
      case "execution":
        return renderExecution()
      case "analytics":
        return <div className="text-center py-12 text-gray-500">Analytics coming soon...</div>
      case "files":
        return renderFiles()
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CrewAI Dashboard
                </h1>
                <p className="text-xs text-gray-600 hidden sm:block">Enterprise AI Workflow Management</p>
              </div>
            </div>

            {/* System Status */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {systemStatus === "online" && <Wifi className="w-4 h-4 text-green-600" />}
                {systemStatus === "busy" && <Activity className="w-4 h-4 text-yellow-600" />}
                {systemStatus === "maintenance" && <WifiOff className="w-4 h-4 text-red-600" />}
                <span
                  className={`text-sm font-medium ${
                    systemStatus === "online"
                      ? "text-green-600"
                      : systemStatus === "busy"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }`}
                >
                  {systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
                {tab.badge && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      tab.badge === "●" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="py-2 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center justify-between py-3 px-4 text-left font-medium transition-colors ${
                      activeTab === tab.id ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.name}</span>
                    </div>
                    {tab.badge && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          tab.badge === "●" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{renderContent()}</main>

      {/* Floating Action Button */}
      {agents.length > 0 && tasks.length > 0 && (
        <button
          onClick={() => setActiveTab("execution")}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
        >
          <Play className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}

export default App
