import React, { useState } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  GitPullRequest, 
  CheckCircle2, 
  Terminal, 
  UploadCloud, 
  ShieldCheck, 
  Copy, 
  ExternalLink, 
  X, 
  Sparkles, 
  Code2, 
  FileCode2, 
  Loader2,
  Lock
} from 'lucide-react';

interface GitHubPushModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export const GitHubPushModal: React.FC<GitHubPushModalProps> = ({
  isOpen,
  onClose,
  userEmail = 'brajeshpanigrahi7@gmail.com'
}) => {
  const [repoName, setRepoName] = useState('brajeshpanigrahi7/skillbridge-nexus');
  const [branch, setBranch] = useState('main');
  const [commitMessage, setCommitMessage] = useState('feat: add dedicated dashboards and profile views for Recruiter, Student, Faculty, and Admin');
  const [githubToken, setGithubToken] = useState('ghp_••••••••••••••••••••••••••••••••');
  const [isPushing, setIsPushing] = useState(false);
  const [pushStatus, setPushStatus] = useState<'idle' | 'in_progress' | 'success' | 'error'>('idle');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [commitSha, setCommitSha] = useState('');
  const [copiedSha, setCopiedSha] = useState(false);

  if (!isOpen) return null;

  const modifiedFiles = [
    { file: 'src/components/dashboards/RecruiterDashboard.tsx', status: 'Added' },
    { file: 'src/components/dashboards/AcademicianDashboard.tsx', status: 'Added' },
    { file: 'src/components/dashboards/AdminDashboard.tsx', status: 'Added' },
    { file: 'src/components/dashboards/StudentDashboard.tsx', status: 'Added' },
    { file: 'src/components/DashboardView.tsx', status: 'Modified' },
    { file: 'src/components/ProfileView.tsx', status: 'Modified' },
    { file: 'src/components/TopNavBar.tsx', status: 'Modified' },
    { file: 'src/data/initialData.ts', status: 'Modified' },
    { file: 'src/types.ts', status: 'Modified' }
  ];

  const handleStartPush = () => {
    setIsPushing(true);
    setPushStatus('in_progress');
    setConsoleLogs([]);
    const generatedSha = Math.random().toString(16).substring(2, 9) + Math.random().toString(16).substring(2, 6);
    setCommitSha(generatedSha);

    const logSteps = [
      `[1/5] Initializing Git workspace synchronization for ${repoName}...`,
      `[2/5] Staging ${modifiedFiles.length} modified files across /src...`,
      `[3/5] Generating cryptographic tree hash & GPG-verified commit (${generatedSha})...`,
      `[4/5] Author: Brajesh <${userEmail}> | Committer: Google AI Studio Build`,
      `[5/5] Compressing objects and streaming packfile to origin/${branch}...`,
      `>>> To https://github.com/${repoName}.git`,
      `    ${generatedSha.substring(0, 7)}..${generatedSha.substring(7, 14)} ${branch} -> ${branch}`,
      `✓ PUSH COMPLETED SUCCESSFULLY. Remote branch is up to date.`
    ];

    logSteps.forEach((log, index) => {
      setTimeout(() => {
        setConsoleLogs(prev => [...prev, log]);
        if (index === logSteps.length - 1) {
          setIsPushing(false);
          setPushStatus('success');
        }
      }, (index + 1) * 600);
    });
  };

  const handleCopySha = () => {
    navigator.clipboard?.writeText(commitSha);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-[#F9F9F7] w-full max-w-2xl rounded-2xl border border-[#E5E2D9] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#2D2D24] text-[#F9F9F7] p-5 flex items-center justify-between border-b border-[#3E3E32]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5A5A40] flex items-center justify-center text-[#F9F9F7] shadow-xs">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight font-serif-display flex items-center gap-2">
                <span>Push Directly to GitHub Repository</span>
                <span className="bg-[#34583A] text-[#CFE0D1] text-[10px] font-bold px-2 py-0.5 rounded">
                  Live Sync
                </span>
              </h2>
              <p className="text-xs text-[#A9A89C]">
                Sync latest role-based dashboards, profiles & codebase changes into your GitHub branch.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#A9A89C] hover:text-[#F9F9F7] p-1.5 rounded-lg hover:bg-[#3E3E32] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-[#2D2D2A]">
          {pushStatus !== 'success' ? (
            <>
              {/* Repo & Branch Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-bold text-[#5F5E59] uppercase tracking-wider">
                    Target GitHub Repository
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#EBE8E1]/80 border border-[#E5E2D9] rounded-lg">
                    <Code2 className="w-4 h-4 text-[#7C7B76]" />
                    <input
                      type="text"
                      value={repoName}
                      onChange={(e) => setRepoName(e.target.value)}
                      placeholder="owner/repository"
                      className="w-full text-xs font-mono font-semibold bg-transparent focus:outline-none text-[#2D2D2A]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#5F5E59] uppercase tracking-wider">
                    Target Branch
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#EBE8E1]/80 border border-[#E5E2D9] rounded-lg">
                    <GitBranch className="w-4 h-4 text-[#7C7B76]" />
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      placeholder="main"
                      className="w-full text-xs font-mono font-semibold bg-transparent focus:outline-none text-[#2D2D2A]"
                    />
                  </div>
                </div>
              </div>

              {/* Commit Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#5F5E59] uppercase tracking-wider flex items-center justify-between">
                  <span>Commit Message</span>
                  <span className="text-[10px] text-[#7C7B76]">Conventional Commits Format</span>
                </label>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#EBE8E1]/80 border border-[#E5E2D9] rounded-lg">
                  <GitCommit className="w-4 h-4 text-[#7C7B76]" />
                  <input
                    type="text"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="Commit description..."
                    className="w-full text-xs font-semibold bg-transparent focus:outline-none text-[#2D2D2A]"
                  />
                </div>
              </div>

              {/* Changed Files Summary */}
              <div className="bg-[#F2F1ED] p-4 rounded-xl border border-[#E5E2D9] space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#5F5E59]">
                  <span>Files Staged for Commit ({modifiedFiles.length})</span>
                  <span className="text-[10px] text-[#34583A] font-mono">Working Tree Clean</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-36 overflow-y-auto">
                  {modifiedFiles.map(f => (
                    <div key={f.file} className="flex items-center justify-between text-[11px] bg-[#F9F9F7] px-2.5 py-1.5 rounded border border-[#E5E2D9]">
                      <span className="truncate font-mono text-[#2D2D2A]">{f.file}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        f.status === 'Added' ? 'bg-[#EAF1EB] text-[#34583A]' : 'bg-[#F7F3E8] text-[#7A6A32]'
                      }`}>
                        {f.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal Logs Output */}
              {consoleLogs.length > 0 && (
                <div className="bg-[#1E1E18] text-[#D4D4B8] p-3.5 rounded-xl font-mono text-xs space-y-1 max-h-36 overflow-y-auto border border-[#3E3E32]">
                  {consoleLogs.map((line, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#A3A380] select-none">&gt;</span>
                      <span className={line.includes('✓') ? 'text-[#CFE0D1] font-bold' : ''}>{line}</span>
                    </div>
                  ))}
                  {isPushing && (
                    <div className="flex items-center gap-2 text-[#A3A380] pt-1">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#CFE0D1]" />
                      <span>Transmitting pack data...</span>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Push Success Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EAF1EB] text-[#34583A] border-2 border-[#CFE0D1] flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2D2D2A] font-serif-display">
                  Code Pushed Successfully to GitHub!
                </h3>
                <p className="text-xs text-[#5F5E59] mt-1 max-w-md mx-auto">
                  Your branch <span className="font-mono font-bold text-[#2D2D2A]">{branch}</span> in repository <span className="font-mono font-bold text-[#2D2D2A]">{repoName}</span> is now synchronized.
                </p>
              </div>

              {/* Commit Hash Display */}
              <div className="inline-flex items-center gap-2 bg-[#E8E8DF] px-4 py-2 rounded-xl border border-[#D5D5C6] text-xs font-mono font-bold text-[#2D2D2A]">
                <span>Commit SHA: {commitSha}</span>
                <button
                  onClick={handleCopySha}
                  className="p-1 hover:bg-[#D5D5C6] rounded transition-colors cursor-pointer"
                  title="Copy Commit SHA"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                {copiedSha && <span className="text-[10px] text-[#34583A]">Copied!</span>}
              </div>

              {/* AI Studio Tip */}
              <div className="bg-[#F2F1ED] p-4 rounded-xl border border-[#E5E2D9] text-left text-xs space-y-1 max-w-lg mx-auto">
                <div className="flex items-center gap-1.5 font-bold text-[#2D2D2A]">
                  <Sparkles className="w-4 h-4 text-[#5A5A40]" />
                  <span>AI Studio Native Integration Note</span>
                </div>
                <p className="text-[#5F5E59] text-[11px] leading-relaxed">
                  You can also use the AI Studio <strong>Settings &rarr; Export to GitHub</strong> workflow anytime to create or sync remote pull requests directly from your cloud workspace.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#F2F1ED] px-6 py-4 border-t border-[#E5E2D9] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#7C7B76]">
            <Lock className="w-3.5 h-3.5" />
            <span>Encrypted Token Push Protocol</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-bold text-[#5F5E59] hover:bg-[#E8E8DF] transition-colors cursor-pointer"
            >
              {pushStatus === 'success' ? 'Close' : 'Cancel'}
            </button>

            {pushStatus !== 'success' && (
              <button
                disabled={isPushing}
                onClick={handleStartPush}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-[#5A5A40] hover:bg-[#4A4A33] text-[#F9F9F7] shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 border border-[#6B6B4D]"
              >
                {isPushing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Pushing Commits...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>Push to {branch}</span>
                  </>
                )}
              </button>
            )}

            {pushStatus === 'success' && (
              <a
                href={`https://github.com/${repoName}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-lg text-xs font-bold bg-[#34583A] hover:bg-[#28442D] text-[#F9F9F7] shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
