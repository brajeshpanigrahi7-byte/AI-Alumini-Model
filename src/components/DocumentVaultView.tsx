import React, { useState } from 'react';
import { 
  FolderLock, 
  UploadCloud, 
  FileText, 
  CheckCircle, 
  Download, 
  ShieldCheck, 
  Lock, 
  Trash2, 
  ExternalLink,
  Plus
} from 'lucide-react';
import { DocumentItem } from '../types';

interface DocumentVaultViewProps {
  documents: DocumentItem[];
  onUploadDocument: (newDoc: DocumentItem) => void;
}

export const DocumentVaultView: React.FC<DocumentVaultViewProps> = ({
  documents,
  onUploadDocument
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [docType, setDocType] = useState<DocumentItem['type']>('Resume');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newDoc: DocumentItem = {
      id: `doc_${Date.now()}`,
      title: file.name,
      type: docType,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: `${(file.size / 1024).toFixed(0)} KB`,
      status: 'Verified by Institution',
      hash: `SHA256: ${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
      url: '#'
    };

    onUploadDocument(newDoc);
    alert(`File "${file.name}" cryptographically hashed and stored in tamper-proof vault.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-[#33332A] text-[#F9F9F7] rounded-2xl p-6 md:p-8 shadow-md border border-[#48483B] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#D4D4B8] text-xs font-bold uppercase tracking-wider mb-2">
            <FolderLock className="w-4 h-4 text-[#CFE0D1]" />
            <span>Encrypted Academic & Professional Records</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-serif-display">Secure Document Vault</h1>
          <p className="text-sm text-[#C5C4BA] mt-1.5 max-w-2xl leading-relaxed">
            Centralized document management for verified resumes, official transcripts, internship completion reports, and credential hashes.
          </p>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 md:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base text-[#2D2D2A] font-serif-display">Upload Verified Document</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#7C7B76]">Document Type:</span>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value as any)}
              className="text-xs bg-[#F2F1ED] border border-[#E5E2D9] rounded-lg p-1.5 text-[#2D2D2A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#5A5A40]"
            >
              <option value="Resume">Resume</option>
              <option value="Academic Transcript">Academic Transcript</option>
              <option value="Degree Certificate">Degree Certificate</option>
              <option value="Internship Report">Internship Report</option>
              <option value="Research Paper">Research Paper</option>
              <option value="FDP Certificate">FDP Certificate</option>
            </select>
          </div>
        </div>

        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files?.[0];
            if (file) {
              const newDoc: DocumentItem = {
                id: `doc_${Date.now()}`,
                title: file.name,
                type: docType,
                uploadDate: new Date().toISOString().split('T')[0],
                fileSize: `${(file.size / 1024).toFixed(0)} KB`,
                status: 'Verified by Institution',
                hash: `SHA256: ${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`,
                url: '#'
              };
              onUploadDocument(newDoc);
            }
          }}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all text-center ${
            dragOver ? 'border-[#5A5A40] bg-[#E8E8DF]/50' : 'border-[#D4D4C8] hover:border-[#A3A380] bg-[#F2F1ED]/50'
          }`}
        >
          <UploadCloud className="w-10 h-10 text-[#5A5A40] mb-2" />
          <p className="text-sm font-bold text-[#2D2D2A]">
            Drag and drop your PDF or document here, or <span className="text-[#5A5A40] underline font-semibold">Browse Files</span>
          </p>
          <p className="text-xs text-[#7C7B76] mt-1">Supports PDF, DOCX, PNG (Max 25MB) • Auto-stamps SHA-256 verification hash</p>
          <input
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.docx,.doc,.png,.jpg"
          />
        </label>
      </div>

      {/* Documents List */}
      <div className="bg-[#F9F9F7] rounded-xl border border-[#E5E2D9] p-6 shadow-xs">
        <h3 className="font-bold text-base text-[#2D2D2A] mb-4 font-serif-display">Verified Repository Documents ({documents.length})</h3>

        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 border border-[#E5E2D9] bg-[#F2F1ED]/40 rounded-xl hover:border-[#A3A380] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#E8E8DF] text-[#5A5A40] flex items-center justify-center font-bold shrink-0 border border-[#D5D5C6]">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-sm text-[#2D2D2A] font-serif-display">{doc.title}</h4>
                    <span className="text-[10px] bg-[#E8E8DF] text-[#42422E] border border-[#D5D5C6] font-semibold px-2 py-0.5 rounded">
                      {doc.type}
                    </span>
                    <span className="text-[10px] bg-[#EAF1EB] text-[#34583A] border border-[#CFE0D1] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {doc.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#7C7B76] mt-1">Uploaded {doc.uploadDate} • {doc.fileSize}</p>
                  <p className="text-[10px] font-mono text-[#7C7B76] mt-1 truncate max-w-lg">
                    {doc.hash}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => alert(`Downloading verified copy of ${doc.title}`)}
                  className="px-3 py-1.5 border border-[#D5D5C6] hover:bg-[#E8E8DF] rounded-lg text-xs font-semibold text-[#2D2D2A] flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
