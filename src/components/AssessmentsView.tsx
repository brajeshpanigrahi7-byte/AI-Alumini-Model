import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Assessment, AssessmentQuestion, AssessmentResult } from '../types';

interface AssessmentsViewProps {
  assessments: Assessment[];
  onCompleteAssessment: (assessmentId: string, score: number, result: AssessmentResult) => void;
}

export const AssessmentsView: React.FC<AssessmentsViewProps> = ({
  assessments,
  onCompleteAssessment
}) => {
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<AssessmentResult | null>(null);

  // Timer effect
  useEffect(() => {
    if (!activeAssessment || testSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeAssessment, testSubmitted, selectedAnswers]);

  const handleStartTest = (assessment: Assessment) => {
    setActiveAssessment(assessment);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTimeRemaining(assessment.durationMinutes * 60);
    setTestSubmitted(false);
    setTestResult(null);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (testSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex
    });
  };

  const handleSubmitTest = () => {
    if (!activeAssessment) return;

    let correctCount = 0;
    const questions = activeAssessment.questions;

    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / questions.length) * 100);

    const result: AssessmentResult = {
      assessmentId: activeAssessment.id,
      assessmentTitle: activeAssessment.title,
      scorePercentage,
      totalQuestions: questions.length,
      correctCount,
      domainScores: {
        [activeAssessment.domain]: scorePercentage
      },
      identifiedStrengths: scorePercentage >= 80 ? ['High analytical precision', 'Sound algorithmic foundation'] : ['Basic conceptual familiarity'],
      skillGaps: scorePercentage < 80 ? [{
        skill: activeAssessment.targetRole,
        currentLevel: scorePercentage,
        requiredLevel: 85,
        recommendedResource: 'Review targeted practice modules in Learning Hub'
      }] : [],
      careerRecommendations: [
        'Eligible for verified fast-track placement interviews',
        'Profile highlighted with verified competency seal'
      ],
      takenAt: new Date().toLocaleDateString()
    };

    setTestResult(result);
    setTestSubmitted(true);
    onCompleteAssessment(activeAssessment.id, scorePercentage, result);

    if (scorePercentage >= 80) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Test Running View
  if (activeAssessment && !testSubmitted) {
    const currentQ: AssessmentQuestion = activeAssessment.questions[currentQuestionIndex];
    const totalQ = activeAssessment.questions.length;
    const answeredCount = Object.keys(selectedAnswers).length;

    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
        {/* Top Header bar with Timer & Progress */}
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-4 md:p-6 shadow-xs flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs font-semibold text-[#5A5A40] uppercase tracking-wider">
              {activeAssessment.domain}
            </span>
            <h2 className="text-lg font-bold text-[#2D2D2A] font-serif-display">{activeAssessment.title}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-bold border ${
              timeRemaining < 180 ? 'bg-[#FDF2F2] text-[#A63A3A] border-[#F0D5D5] animate-pulse' : 'bg-[#E8E8DF] text-[#42422E] border-[#D5D5C6]'
            }`}>
              <Clock className="w-4 h-4 text-[#5A5A40]" />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            <button
              onClick={handleSubmitTest}
              className="bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              Finish & Submit
            </button>
          </div>
        </div>

        {/* Progress Bar & Question Navigator */}
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-[#7C7B76] mb-2">
            <span>Progress: {answeredCount} of {totalQ} questions answered</span>
            <span>Question {currentQuestionIndex + 1} of {totalQ}</span>
          </div>
          <div className="w-full bg-[#E5E2D9] rounded-full h-2 mb-4">
            <div
              className="bg-[#5A5A40] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / totalQ) * 100}%` }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {activeAssessment.questions.map((_, idx) => {
              const answered = selectedAnswers[idx] !== undefined;
              const isCurrent = currentQuestionIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#33332A] text-[#F9F9F7] ring-2 ring-[#5A5A40]'
                      : answered
                      ? 'bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6]'
                      : 'bg-[#F2F1ED] text-[#7C7B76] hover:bg-[#E5E2D9]'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Question Box */}
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 md:p-8 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="text-xs bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6] px-2.5 py-1 rounded font-medium">
              Tag: {currentQ.skillTag}
            </span>
            <span className="text-xs font-semibold text-[#7C7B76]">
              Difficulty: {currentQ.difficulty}
            </span>
          </div>

          <h3 className="text-base md:text-lg font-bold text-[#2D2D2A] mb-6 leading-relaxed font-serif-display">
            {currentQuestionIndex + 1}. {currentQ.question}
          </h3>

          <div className="space-y-3 mb-8">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQuestionIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-xl text-left text-sm font-medium border-2 transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'border-[#5A5A40] bg-[#E8E8DF]/60 text-[#2D2D2A] shadow-xs'
                      : 'border-[#E5E2D9] hover:border-[#A3A380] text-[#2D2D2A] hover:bg-[#F2F1ED]/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'border-[#5A5A40] bg-[#5A5A40] text-[#F9F9F7]' : 'border-[#D5D5C6]'
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-[#F9F9F7]" />}
                  </div>
                  <span className="leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E5E2D9]">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 text-xs font-semibold text-[#5F5E59] bg-[#E8E8DF] rounded-lg hover:bg-[#DFDFD4] disabled:opacity-40 cursor-pointer"
            >
              Previous Question
            </button>

            {currentQuestionIndex < totalQ - 1 ? (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="px-5 py-2 text-xs font-semibold text-[#F9F9F7] bg-[#5A5A40] hover:bg-[#4A4A33] rounded-lg cursor-pointer flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="px-5 py-2 text-xs font-semibold text-[#F9F9F7] bg-[#34583A] hover:bg-[#2B4930] rounded-lg cursor-pointer flex items-center gap-1.5"
              >
                <span>Submit & View Results</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Test Results View
  if (testSubmitted && testResult && activeAssessment) {
    const isPass = testResult.scorePercentage >= 75;

    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 md:p-8 shadow-xs text-center">
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4 ${
            isPass ? 'bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1]' : 'bg-[#F4ECE4] text-[#8C5E3C] border border-[#E6D4C3]'
          }`}>
            {isPass ? <Award className="w-8 h-8" /> : <Zap className="w-8 h-8" />}
          </div>

          <h2 className="text-2xl font-bold text-[#2D2D2A] mb-1 font-serif-display">
            {isPass ? 'Assessment Completed with Honors!' : 'Assessment Complete'}
          </h2>
          <p className="text-sm text-[#7C7B76] mb-6">
            {activeAssessment.title} • Verified on {testResult.takenAt}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
            <div className="bg-[#F2F1ED] p-4 rounded-xl border border-[#E5E2D9]">
              <span className="text-xs text-[#7C7B76] font-semibold block">Final Score</span>
              <span className="text-3xl font-extrabold text-[#5A5A40] font-serif-display">{testResult.scorePercentage}%</span>
            </div>
            <div className="bg-[#F2F1ED] p-4 rounded-xl border border-[#E5E2D9]">
              <span className="text-xs text-[#7C7B76] font-semibold block">Accuracy</span>
              <span className="text-3xl font-extrabold text-[#34583A] font-serif-display">{testResult.correctCount}/{testResult.totalQuestions}</span>
            </div>
            <div className="bg-[#F2F1ED] p-4 rounded-xl border border-[#E5E2D9]">
              <span className="text-xs text-[#7C7B76] font-semibold block">Credential Badge</span>
              <span className="text-sm font-bold text-[#2D2D2A] mt-2 block">{activeAssessment.badgeName || 'Verified Pro'}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveAssessment(null)}
              className="px-5 py-2.5 bg-[#33332A] text-[#F9F9F7] rounded-lg text-xs font-bold hover:bg-[#24241E] transition-colors cursor-pointer"
            >
              Return to All Assessments
            </button>
            <button
              onClick={() => handleStartTest(activeAssessment)}
              className="px-5 py-2.5 border border-[#D5D5C6] text-[#2D2D2A] bg-[#F9F9F7] rounded-lg text-xs font-bold hover:bg-[#F2F1ED] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Test</span>
            </button>
          </div>
        </div>

        {/* Question by Question Review */}
        <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs">
          <h3 className="text-base font-bold text-[#2D2D2A] mb-4 font-serif-display">Detailed Question Breakdown & Explanations</h3>
          <div className="space-y-4">
            {activeAssessment.questions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctAnswer;
              return (
                <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'border-[#CFE0D1] bg-[#EAF1EB]/50' : 'border-[#F0D5D5] bg-[#FDF2F2]/50'}`}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-[#2D2D2A]">Question {idx + 1}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      isCorrect ? 'bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1]' : 'bg-[#FDF2F2] text-[#A63A3A] border border-[#F0D5D5]'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#2D2D2A] mb-2">{q.question}</p>
                  <p className="text-xs text-[#5F5E59] mb-1">
                    <strong>Correct Answer:</strong> {q.options[q.correctAnswer]}
                  </p>
                  <p className="text-xs text-[#5F5E59] bg-[#F9F9F7] p-2.5 rounded border border-[#E5E2D9] mt-2">
                    💡 <em>Explanation:</em> {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Assessments Catalog View
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="bg-[#33332A] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#48483B]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-[#E6D4C3]" />
            <span>Standardized Technical & Soft Skill Assessments</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">Industry Benchmark Evaluations</h1>
          <p className="text-sm text-[#C5C4BA] mt-1.5 leading-relaxed">
            Test your real-world problem-solving abilities on questions vetted by partner technology corporations and academic advisory boards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {assessments.map((assessment) => (
          <div
            key={assessment.id}
            className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs hover:border-[#A3A380] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6] font-semibold px-2.5 py-1 rounded">
                  {assessment.domain}
                </span>
                {assessment.completed && (
                  <span className="text-xs font-bold bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1] px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {assessment.lastScore}% Score
                  </span>
                )}
              </div>

              <h3 className="font-bold text-base text-[#2D2D2A] mb-2 leading-snug font-serif-display">
                {assessment.title}
              </h3>
              <p className="text-xs text-[#5F5E59] mb-4 leading-relaxed line-clamp-3">
                {assessment.description}
              </p>

              <div className="space-y-2 text-xs text-[#7C7B76] mb-6 bg-[#F2F1ED] p-3 rounded-lg border border-[#E5E2D9]">
                <div className="flex items-center justify-between">
                  <span>Duration:</span>
                  <span className="font-semibold text-[#2D2D2A]">{assessment.durationMinutes} mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Questions:</span>
                  <span className="font-semibold text-[#2D2D2A]">{assessment.questionCount} Questions</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Industry Partner:</span>
                  <span className="font-semibold text-[#2D2D2A]">{assessment.industryPartner}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleStartTest(assessment)}
              className={`w-full py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                assessment.completed
                  ? 'border border-[#5A5A40] text-[#5A5A40] bg-[#E8E8DF]/60 hover:bg-[#E8E8DF]'
                  : 'bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] shadow-xs'
              }`}
            >
              <span>{assessment.completed ? 'Retake Benchmark' : 'Start Assessment'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
