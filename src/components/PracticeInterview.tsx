import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Clock, 
  RefreshCw, 
  Volume2, 
  Zap, 
  ArrowRight, 
  BarChart3, 
  BrainCircuit, 
  X,
  Send,
  FileCode,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  category: string;
  expectedKeyPoints: string[];
  interviewerPersona: string;
}

const INTERVIEW_TOPICS = [
  { id: 'react-frontend', name: 'Frontend React & Performance', icon: '⚡' },
  { id: 'node-backend', name: 'Backend Node.js & Databases', icon: '🛠️' },
  { id: 'system-design', name: 'System Design & Scalability', icon: '🏛️' },
  { id: 'dsa', name: 'Data Structures & Algorithms', icon: '📊' },
  { id: 'ai-ml', name: 'AI & Generative Models', icon: '🤖' },
  { id: 'hr-behavioral', name: 'HR & Behavioral Leadership', icon: '🤝' },
];

const MOCK_QUESTIONS_DATABASE: Record<string, Question[]> = {
  'react-frontend': [
    {
      id: 1,
      question: "Explain how React's Virtual DOM diffing algorithm works, and how reconciliation optimizes re-renders.",
      category: 'React Architecture',
      expectedKeyPoints: ['Reconciliation', 'Fiber tree structure', 'Keys in lists', 'Virtual DOM tree comparison'],
      interviewerPersona: 'Senior Frontend Architect @ Meta'
    },
    {
      id: 2,
      question: "What strategies do you use to prevent unnecessary re-renders in large React applications?",
      category: 'Performance Optimization',
      expectedKeyPoints: ['useMemo / useCallback', 'React.memo', 'State colocation', 'Debouncing / Throttling'],
      interviewerPersona: 'Staff Engineer @ Vercel'
    },
    {
      id: 3,
      question: "How do you handle client-side caching and optimistic UI updates when dealing with async API requests?",
      category: 'State Management',
      expectedKeyPoints: ['React Query / TanStack Query', 'Optimistic mutations', 'Rollback on error', 'Stale-while-revalidate'],
      interviewerPersona: 'Principal Engineer @ Stripe'
    }
  ],
  'node-backend': [
    {
      id: 1,
      question: "How does the Node.js event loop handle asynchronous I/O and microtasks vs macrotasks?",
      category: 'Node Core',
      expectedKeyPoints: ['Event Loop Phases', 'libuv worker pool', 'process.nextTick vs Promise microtasks', 'Non-blocking I/O'],
      interviewerPersona: 'Backend Tech Lead @ Netflix'
    },
    {
      id: 2,
      question: "How would you design a database indexing strategy for a table with billions of time-series records?",
      category: 'Databases & SQL',
      expectedKeyPoints: ['B-Tree vs Hash indexes', 'Partitioning', 'Composite indexes', 'Query execution plan (EXPLAIN)'],
      interviewerPersona: 'Data Architect @ Uber'
    }
  ],
  'system-design': [
    {
      id: 1,
      question: "Design a high-throughput URL Shortener service like Bit.ly that can handle 10,000 writes/sec.",
      category: 'System Architecture',
      expectedKeyPoints: ['Base62 encoding', 'Redis caching', 'Database sharding', 'Rate limiting'],
      interviewerPersona: 'Principal System Architect @ AWS'
    }
  ],
  'dsa': [
    {
      id: 1,
      question: "Given an array of integers, how do you find the longest contiguous subarray with maximum sum in O(N) time?",
      category: 'Algorithms',
      expectedKeyPoints: ['Kadane Algorithm', 'Dynamic Programming', 'Tracking start/end indices', 'O(1) space complexity'],
      interviewerPersona: 'Algorithms Specialist @ Google'
    }
  ],
  'ai-ml': [
    {
      id: 1,
      question: "Explain the difference between Retrieval-Augmented Generation (RAG) and Fine-tuning LLMs.",
      category: 'Generative AI',
      expectedKeyPoints: ['Vector embeddings', 'Context window limits', 'Parametric vs non-parametric memory', 'Hallucination reduction'],
      interviewerPersona: 'AI Research Engineer @ OpenAI'
    }
  ],
  'hr-behavioral': [
    {
      id: 1,
      question: "Tell me about a time when you faced a critical technical conflict with a teammate during a tight hackathon deadline.",
      category: 'Behavioral',
      expectedKeyPoints: ['STAR method', 'Conflict resolution', 'Focus on goal', 'Empathy & active listening'],
      interviewerPersona: 'Engineering Director @ Apple'
    }
  ]
};

export const PracticeInterview: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('react-frontend');
  const [difficulty, setDifficulty] = useState<'Junior' | 'Mid-Level' | 'Senior'>('Mid-Level');
  const [sessionActive, setSessionActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number;
    depthScore: number;
    clarityScore: number;
    problemSolvingScore: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
  } | null>(null);

  const questionsList = MOCK_QUESTIONS_DATABASE[selectedTopic] || MOCK_QUESTIONS_DATABASE['react-frontend'];
  const currentQuestion = questionsList[currentQuestionIndex] || questionsList[0];

  useEffect(() => {
    let interval: any = null;
    if (sessionActive && !evaluationResult && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && sessionActive && !evaluationResult) {
      handleEvaluateAnswer();
    }
    return () => clearInterval(interval);
  }, [sessionActive, timerSeconds, evaluationResult]);

  const handleStartSession = () => {
    setSessionActive(true);
    setCurrentQuestionIndex(0);
    setTimerSeconds(120);
    setUserAnswer('');
    setEvaluationResult(null);
  };

  const handleToggleRecord = () => {
    setIsRecording(!isRecording);
    if (!isRecording && !userAnswer) {
      setUserAnswer("For React reconciliation, the virtual DOM compares two trees using a heuristic O(N) algorithm based on component types and key attributes. Keys allow React to match children across renders efficiently.");
    }
  };

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) return;

    setIsEvaluating(true);

    // Simulate AI LLM evaluation
    setTimeout(() => {
      setIsEvaluating(false);
      const isDetailed = userAnswer.length > 80;
      const score = isDetailed ? Math.floor(Math.random() * 15) + 84 : Math.floor(Math.random() * 20) + 65;
      
      setEvaluationResult({
        score: score,
        depthScore: Math.min(100, score + 4),
        clarityScore: Math.min(100, score + 2),
        problemSolvingScore: Math.min(100, score - 3),
        feedback: isDetailed 
          ? "Excellent response! You clearly articulated the key concepts, mentioned time complexity heuristics, and gave precise architectural examples."
          : "Good attempt! To score higher in top tech interviews, expand on time complexities, Fiber reconciliation, and specific trade-offs.",
        strengths: [
          'Clear technical terminology',
          'Addressed key reconciliation principles',
          'Good logical structure'
        ],
        improvements: [
          'Mention state batching in React 18',
          'Elaborate on key stability in list mapping'
        ]
      });
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionsList.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setUserAnswer('');
      setEvaluationResult(null);
      setTimerSeconds(120);
    } else {
      // Completed session
      setSessionActive(false);
      setEvaluationResult(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 py-6">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel-accent border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="space-y-2 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>AI Mock Technical Interviewer • Student Exclusive</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
            Practice Interview <span className="text-gradient-cyan">Session</span>
          </h2>

          <p className="text-sm text-slate-300 max-w-2xl">
            Simulate real FAANG & YC startup technical interviews with voice & text AI evaluation, real-time feedback, and scoring rubrics.
          </p>
        </div>

        {!sessionActive && (
          <button
            onClick={handleStartSession}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:scale-105 text-white font-bold text-sm shadow-xl shadow-cyan-500/30 transition-all flex items-center gap-2 group flex-shrink-0 relative z-10"
          >
            <span>Start Practice Interview</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      {!sessionActive ? (
        /* Configuration Screen */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Topic Selector */}
          <div className="md:col-span-2 glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-cyan-400" />
              Select Interview Topic
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INTERVIEW_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className={`p-4 rounded-xl text-left border transition-all flex items-center gap-3 ${
                    selectedTopic === topic.id
                      ? 'bg-cyan-500/20 border-cyan-500/60 text-white shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="text-xs font-semibold">{topic.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty & Details */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Target Level
              </h3>

              <div className="space-y-2">
                {(['Junior', 'Mid-Level', 'Senior'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setDifficulty(lvl)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono text-left border transition-all flex justify-between items-center ${
                      difficulty === lvl
                        ? 'bg-purple-500/20 border-purple-500/60 text-purple-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{lvl} Engineer</span>
                    {difficulty === lvl && <CheckCircle2 className="w-4 h-4 text-purple-400" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
              <span className="text-cyan-400 font-mono font-bold block">Interview Spec:</span>
              <p>3 Questions • Timed Responses • Voice/Text • Deep AI Feedback Scorecard</p>
            </div>
          </div>

        </div>
      ) : (
        /* Active Interview Simulator Screen */
        <div className="space-y-6">
          
          {/* Interviewer Box */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 space-y-6">
            
            {/* Top Bar with Timer */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{currentQuestion.interviewerPersona}</h4>
                  <p className="text-xs font-mono text-cyan-400">AI Senior Technical Interviewer</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-amber-400">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* AI Question */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Question {currentQuestionIndex + 1} of {questionsList.length} • {currentQuestion.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-relaxed">
                "{currentQuestion.question}"
              </h3>
            </div>

            {/* Answer Input Area */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Your Response (Voice or Typed):</span>
                <button
                  onClick={handleToggleRecord}
                  className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all ${
                    isRecording 
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 animate-pulse'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{isRecording ? 'Listening (Click to Stop)' : 'Use AI Voice Input'}</span>
                </button>
              </div>

              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your detailed technical explanation here, or click 'Use AI Voice Input'..."
                rows={5}
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-cyan-500 leading-relaxed"
              />
            </div>

            {/* Submit Answer */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setSessionActive(false);
                }}
                className="text-xs font-mono text-slate-400 hover:text-rose-400"
              >
                End Session Early
              </button>

              <button
                onClick={handleEvaluateAnswer}
                disabled={!userAnswer.trim() || isEvaluating}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>AI Analyzing Technical Depth...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Submit for AI Evaluation</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* AI Evaluation Scorecard Card */}
          {evaluationResult && (
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-accent border-emerald-500/40 space-y-6 animate-in slide-in-from-bottom-4 duration-300">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                  <Award className="w-5 h-5 text-emerald-400" />
                  <span>AI Scorecard Generated</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-3xl font-display font-extrabold text-white">{evaluationResult.score}</span>
                  <span className="text-xs font-mono text-slate-400">/ 100</span>
                </div>
              </div>

              {/* Sub-scores */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400">Technical Depth</span>
                  <p className="text-base font-bold text-cyan-400">{evaluationResult.depthScore}%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400">Clarity & Communication</span>
                  <p className="text-base font-bold text-emerald-400">{evaluationResult.clarityScore}%</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400">Problem Solving</span>
                  <p className="text-base font-bold text-purple-400">{evaluationResult.problemSolvingScore}%</p>
                </div>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed font-sans bg-slate-950 p-4 rounded-xl border border-slate-800">
                "{evaluationResult.feedback}"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                  <span className="font-mono font-bold text-emerald-300 block">Key Strengths</span>
                  {evaluationResult.strengths.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                  <span className="font-mono font-bold text-amber-300 block">Areas for Improvement</span>
                  {evaluationResult.improvements.map((imp, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-300">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
                >
                  <span>Next Interview Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
