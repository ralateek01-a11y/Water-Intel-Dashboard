import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Bot, Send, Sparkles, AlertCircle, RefreshCw,
  PanelRightClose, PanelRightOpen, ChevronDown, Droplet,
} from 'lucide-react';
import { sites } from '../data/sites.js';
import { waterInfrastructure } from '../data/waterInfrastructure.js';
import { dataCenters } from '../data/dataCenters.js';
import { projects } from '../data/projects.js';

// ── Types ──────────────────────────────────────────────────────────────
interface Site {
  id: string; name: string; region: string;
  overallScore: number; rating: string;
  [key: string]: unknown;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  streaming?: boolean;
}

interface AIChatPageProps {
  selectedSite: Site | null;
}

// ── Suggested prompts ──────────────────────────────────────────────────
const PROMPT_GROUPS = [
  {
    label: 'Site Analysis',
    prompts: [
      'Can Riyadh support a new 150 MW data center?',
      'Compare Sudair and Heet.',
      'Which site has the lowest approval complexity?',
    ],
  },
  {
    label: 'Regulatory',
    prompts: [
      'Which regulations apply to this project?',
      'Summarize all desalination projects.',
    ],
  },
  {
    label: 'Documents',
    prompts: ['Translate this Arabic report.'],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────
function uid() { return Math.random().toString(36).slice(2); }

// ── Typing dots ────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 px-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </span>
  );
}

// ── Markdown renderer ──────────────────────────────────────────────────
function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p:      ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
        ul:     ({ children }) => <ul className="mb-2 pl-4 space-y-1 list-disc">{children}</ul>,
        ol:     ({ children }) => <ol className="mb-2 pl-4 space-y-1 list-decimal">{children}</ol>,
        li:     ({ children }) => <li className="leading-relaxed">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        em:     ({ children }) => <em className="text-[#D1D5DB] italic">{children}</em>,
        code:   ({ children, className }) => {
          const isBlock = className?.includes('language-');
          return isBlock
            ? <code className="block bg-[#060D19] border border-[#1F2937] rounded-lg px-3 py-2 text-[12px] text-[#10B981] font-mono my-2 overflow-x-auto whitespace-pre">{children}</code>
            : <code className="bg-[#060D19] text-[#10B981] font-mono text-[12px] px-1.5 py-0.5 rounded">{children}</code>;
        },
        pre:    ({ children }) => <>{children}</>,
        table:  ({ children }) => (
          <div className="overflow-x-auto my-2">
            <table className="w-full text-[12px] border-collapse">{children}</table>
          </div>
        ),
        thead:  ({ children }) => <thead className="bg-[#0D1525]">{children}</thead>,
        th:     ({ children }) => <th className="border border-[#1F2937] px-3 py-1.5 text-left font-semibold text-white">{children}</th>,
        td:     ({ children }) => <td className="border border-[#1F2937] px-3 py-1.5 text-[#D1D5DB]">{children}</td>,
        tr:     ({ children }) => <tr className="even:bg-white/[0.02]">{children}</tr>,
        h1:     ({ children }) => <h1 className="text-[16px] font-bold text-white mb-2 mt-3 first:mt-0">{children}</h1>,
        h2:     ({ children }) => <h2 className="text-[14px] font-bold text-white mb-1.5 mt-3 first:mt-0">{children}</h2>,
        h3:     ({ children }) => <h3 className="text-[13px] font-semibold text-white mb-1 mt-2 first:mt-0">{children}</h3>,
        blockquote: ({ children }) => <blockquote className="border-l-2 border-[#10B981] pl-3 text-[#9CA3AF] italic my-2">{children}</blockquote>,
        hr:     () => <hr className="border-[#1F2937] my-3" />,
        a:      ({ children, href }) => <a href={href} className="text-[#10B981] hover:underline" target="_blank" rel="noreferrer">{children}</a>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

// ── User bubble ────────────────────────────────────────────────────────
function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[75%] bg-[#10B981]/15 border border-[#10B981]/25 text-[#D1D5DB] rounded-2xl rounded-tr-sm px-4 py-3 text-[14px] leading-relaxed">
        {content}
      </div>
    </div>
  );
}

// ── Assistant bubble ───────────────────────────────────────────────────
function AssistantBubble({ content, streaming }: { content: string; streaming?: boolean }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-8 h-8 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Droplet className="w-4 h-4 text-[#10B981]" />
      </div>
      <div className="flex-1 min-w-0 bg-[#0D1424] border border-[#1F2937] rounded-2xl rounded-tl-sm px-4 py-3 text-[14px] text-[#D1D5DB]">
        {streaming && content === '' ? (
          <TypingDots />
        ) : (
          <>
            <MarkdownContent content={content} />
            {streaming && <TypingDots />}
          </>
        )}
      </div>
    </div>
  );
}

// ── Welcome state ──────────────────────────────────────────────────────
function WelcomeState({ onSend }: { onSend: (text: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full py-16 text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center mb-5">
        <Sparkles className="w-7 h-7 text-[#10B981]" />
      </div>
      <h2 className="text-[22px] font-bold text-white mb-2 tracking-tight">
        How can I help with your site selection today?
      </h2>
      <p className="text-[#6B7280] text-[13px] max-w-[420px] leading-relaxed">
        I have full context on all candidate sites, water infrastructure, data centers,
        and your projects. Ask anything.
      </p>
    </div>
  );
}

// ── Right sidebar ──────────────────────────────────────────────────────
function Sidebar({
  selectedProjectId,
  onSelectProject,
  onSend,
}: {
  selectedProjectId: string;
  onSelectProject: (id: string) => void;
  onSend: (text: string) => void;
}) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Project selector */}
      <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-[#1F2937]">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#6B7280] mb-2">Active Project</p>
        <div className="relative">
          <select
            value={selectedProjectId}
            onChange={(e) => onSelectProject(e.target.value)}
            className="w-full h-8 bg-[#0A0E17] border border-[#1F2937] hover:border-[#374151] text-[#D1D5DB] text-[12px] rounded-lg pl-3 pr-7 focus:outline-none focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] transition-colors appearance-none"
          >
            <option value="">No project selected</option>
            {projects.map((p: { id: string; name: string }) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <ChevronDown className="w-3 h-3 text-[#6B7280] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        {selectedProjectId && (() => {
          const proj = projects.find((p: { id: string }) => p.id === selectedProjectId) as { region?: string; powerMW?: number; status?: string } | undefined;
          return proj ? (
            <div className="mt-2 flex flex-wrap gap-1">
              {proj.region && <span className="text-[10px] bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-full">{proj.region}</span>}
              {proj.powerMW && <span className="text-[10px] bg-[#1F2937] text-[#9CA3AF] px-2 py-0.5 rounded-full">{proj.powerMW} MW</span>}
              {proj.status && <span className="text-[10px] bg-[#1F2937] text-[#9CA3AF] px-2 py-0.5 rounded-full capitalize">{proj.status}</span>}
            </div>
          ) : null;
        })()}
      </div>

      {/* Prompt groups */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-[#6B7280]">Suggested Prompts</p>
        {PROMPT_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold text-[#4B5563] uppercase tracking-wider mb-1.5">{group.label}</p>
            <div className="space-y-1.5">
              {group.prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => onSend(prompt)}
                  className="w-full text-left text-[12px] text-[#9CA3AF] hover:text-white bg-[#0A0E17] hover:bg-[#111827] border border-[#1F2937] hover:border-[#374151] rounded-lg px-3 py-2 transition-all leading-snug"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────
export function AIChatPage({ selectedSite }: AIChatPageProps) {
  const [messages,          setMessages]          = useState<Message[]>([]);
  const [input,             setInput]             = useState('');
  const [isStreaming,       setIsStreaming]        = useState(false);
  const [error,             setError]             = useState<string | null>(null);
  const [sidebarOpen,       setSidebarOpen]       = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState('');

  const bottomRef   = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  // auto-scroll on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return;
    setError(null);

    const userMsg: Message     = { id: uid(), role: 'user',      content: text.trim() };
    const assistantId          = uid();
    const assistantMsg: Message = { id: assistantId, role: 'assistant', content: '', streaming: true };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
    if (textareaRef.current) { textareaRef.current.style.height = 'auto'; }
    setIsStreaming(true);

    const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));

    const selectedProject = selectedProjectId
      ? projects.find((p: { id: string }) => p.id === selectedProjectId) ?? null
      : null;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history,
          context: {
            sites,
            waterInfrastructure,
            dataCenters,
            selectedProject,
          },
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? `HTTP ${res.status}`);
      }

      const reader  = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer    = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6).trim();
          if (!payload) continue;
          try {
            const data = JSON.parse(payload) as { content?: string; done?: boolean; error?: string };
            if (data.error) throw new Error(data.error);
            if (data.done) break;
            if (data.content) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: m.content + data.content } : m
                )
              );
            }
          } catch {
            // ignore malformed SSE lines
          }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.';
      setError(msg);
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    } finally {
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, streaming: false } : m))
      );
      setIsStreaming(false);
    }
  }, [isStreaming, messages, selectedProjectId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  const clearChat = () => { setMessages([]); setError(null); };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">

      {/* ── Main chat column ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 pt-5 pb-3 border-b border-[#1F2937]">
          <div>
            <h1 className="text-[17px] font-bold text-white leading-none">AI Chat Assistant</h1>
            <p className="text-[#6B7280] text-[12px] mt-0.5">
              Powered by Claude · Full site, infrastructure &amp; project context loaded
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasMessages && (
              <button
                onClick={clearChat}
                className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#D1D5DB] border border-[#1F2937] hover:border-[#374151] rounded-lg px-3 py-1.5 text-[12px] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                New chat
              </button>
            )}
            <button
              onClick={() => setSidebarOpen((o) => !o)}
              title={sidebarOpen ? 'Hide prompts' : 'Show prompts'}
              className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#D1D5DB] border border-[#1F2937] hover:border-[#374151] rounded-lg px-3 py-1.5 text-[12px] transition-colors"
            >
              {sidebarOpen
                ? <><PanelRightClose className="w-3.5 h-3.5" /> Hide prompts</>
                : <><PanelRightOpen  className="w-3.5 h-3.5" /> Prompts</>
              }
            </button>
          </div>
        </div>

        {/* Scroll area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          {!hasMessages ? (
            <div className="h-full flex items-center justify-center">
              <WelcomeState onSend={sendMessage} />
            </div>
          ) : (
            <div className="max-w-[800px] mx-auto px-6 py-6 flex flex-col gap-5">
              {messages.map((msg) =>
                msg.role === 'user'
                  ? <UserBubble      key={msg.id} content={msg.content} />
                  : <AssistantBubble key={msg.id} content={msg.content} streaming={msg.streaming} />
              )}
              {error && (
                <div className="flex items-start gap-3 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-[13px]">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div><span className="font-semibold">Error: </span>{error}</div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Pinned input bar */}
        <div className="flex-shrink-0 border-t border-[#1F2937] px-6 py-4">
          <div className="max-w-[800px] mx-auto">
            <div className={`flex items-end gap-3 bg-[#111827] border rounded-2xl px-4 py-3 transition-colors ${
              isStreaming ? 'border-[#1F2937]' : 'border-[#1F2937] focus-within:border-[#10B981]/50'
            }`}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={isStreaming}
                placeholder={isStreaming ? 'Waiting for response…' : 'Ask about water access, regulations, site scores, or project fit…'}
                rows={1}
                className="flex-1 resize-none bg-transparent text-white text-[14px] placeholder-[#4B5563] focus:outline-none leading-relaxed"
                style={{ maxHeight: '160px', overflowY: 'auto' }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isStreaming}
                className="w-9 h-9 rounded-xl bg-[#10B981] hover:bg-[#059669] disabled:bg-[#1F2937] disabled:text-[#374151] text-white flex items-center justify-center flex-shrink-0 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-[#374151] text-center mt-2">
              Enter to send · Shift+Enter for newline · Responses may take a few seconds
            </p>
          </div>
        </div>
      </div>

      {/* ── Right sidebar ── */}
      <div
        className={`flex-shrink-0 border-l border-[#1F2937] bg-[#080E1A] overflow-hidden transition-all duration-200 ease-out ${
          sidebarOpen ? 'w-[272px]' : 'w-0'
        }`}
      >
        {sidebarOpen && (
          <div className="w-[272px] h-full">
            <Sidebar
              selectedProjectId={selectedProjectId}
              onSelectProject={setSelectedProjectId}
              onSend={sendMessage}
            />
          </div>
        )}
      </div>

    </div>
  );
}
