import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Droplet,
  MapPin,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

/* ─── types ──────────────────────────────────────────────── */
interface Site {
  id: string;
  name: string;
  region: string;
  distanceFromRiyadh: number;
  overallScore: number;
  rating: string;
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

/* ─── suggested prompts ───────────────────────────────────── */
const SUGGESTIONS = [
  'Why is the regulatory score lower for this site?',
  'What is the approval pathway and which agencies are involved?',
  'Compare the cooling technologies by water consumption',
  'What nearby infrastructure supports a 150 MW data center?',
  'What are the main water access risks here?',
  'How does this site compare to typical Riyadh sites?',
];

/* ─── helpers ─────────────────────────────────────────────── */
function uid() {
  return Math.random().toString(36).slice(2);
}

function scoreColor(score: number) {
  if (score >= 80) return 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20';
  if (score >= 60) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
  return 'text-red-400 bg-red-500/10 border-red-500/20';
}

/* ─── sub-components ──────────────────────────────────────── */
function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 ml-1">
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

function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[70%] bg-[#10B981] text-white rounded-2xl rounded-tr-sm px-4 py-3 text-[14px] leading-relaxed shadow-lg shadow-[#10B981]/10">
        {content}
      </div>
    </div>
  );
}

function AssistantBubble({ content, streaming }: { content: string; streaming?: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center flex-shrink-0 mt-1">
        <Bot className="w-4 h-4 text-[#10B981]" />
      </div>
      <div className="max-w-[80%] bg-[#0D1424] border border-[#1F2937] rounded-2xl rounded-tl-sm px-4 py-3 text-[14px] leading-relaxed text-[#D1D5DB]">
        {content || (streaming ? null : '...')}
        {streaming && content === '' && <TypingDots />}
        {streaming && content !== '' && <TypingDots />}
      </div>
    </div>
  );
}

/* ─── welcome state ───────────────────────────────────────── */
function WelcomeState({
  site,
  onSuggest,
}: {
  site: Site | null;
  onSuggest: (text: string) => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center mb-5">
        <Sparkles className="w-8 h-8 text-[#10B981]" />
      </div>
      <h2 className="text-[20px] font-bold text-white mb-2">WaterIntel AI Assistant</h2>
      <p className="text-[#6B7280] text-sm max-w-[480px] leading-relaxed mb-6">
        Ask anything about water infrastructure, regulatory requirements, or site suitability for data centers in Saudi Arabia.
        {site && ' I have full context on the currently selected site.'}
      </p>

      {site && (
        <div className="flex items-center gap-2 text-sm text-[#9CA3AF] bg-[#0D1424] border border-[#1F2937] rounded-xl px-4 py-2.5 mb-8">
          <Droplet className="w-4 h-4 text-[#10B981]" />
          <span>Loaded site:</span>
          <span className="text-white font-medium">{site.name}</span>
          <span className={`ml-1 text-xs font-bold px-2 py-0.5 rounded-full border ${scoreColor(site.overallScore)}`}>
            {site.overallScore}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-[640px] w-full">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggest(s)}
            className="text-left text-[13px] text-[#9CA3AF] hover:text-white bg-[#0D1424] hover:bg-[#111827] border border-[#1F2937] hover:border-[#374151] rounded-xl px-4 py-3 transition-all leading-snug"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── main component ──────────────────────────────────────── */
export function AIChatPage({ selectedSite }: AIChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // auto-scroll on new content
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // auto-resize textarea
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 140) + 'px';
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;
    setError(null);

    const userMsg: Message = { id: uid(), role: 'user', content: text.trim() };
    const assistantId = uid();
    const assistantMsg: Message = { id: assistantId, role: 'assistant', content: '', streaming: true };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setIsStreaming(true);

    // Build history for the API (exclude the blank assistant placeholder)
    const history = [...messages, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, siteData: selectedSite }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? `HTTP ${res.status}`);
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

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
                  m.id === assistantId
                    ? { ...m, content: m.content + data.content }
                    : m
                )
              );
            }
          } catch (parseErr) {
            // ignore malformed lines
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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-full">

      {/* ── Top bar ── */}
      <div className="flex-shrink-0 px-6 pt-6 pb-4 flex items-start justify-between">
        <div>
          <h1 className="text-[20px] font-bold text-white">AI Chat Assistant</h1>
          <p className="text-[#6B7280] text-[13px] mt-1">
            Ask questions about water infrastructure, regulations, and site suitability.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedSite && (
            <div className="flex items-center gap-2 bg-[#111827] border border-[#1F2937] rounded-lg px-3 py-1.5 text-[12px]">
              <MapPin className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[#9CA3AF]">Context:</span>
              <span className="text-white font-medium truncate max-w-[140px]">{selectedSite.name}</span>
              <span className={`font-bold px-1.5 py-0.5 rounded-full border text-[11px] ${scoreColor(selectedSite.overallScore)}`}>
                {selectedSite.overallScore}
              </span>
            </div>
          )}
          {hasMessages && (
            <button
              onClick={clearChat}
              className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#D1D5DB] border border-[#1F2937] hover:border-[#374151] rounded-lg px-3 py-1.5 text-[12px] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              New chat
            </button>
          )}
        </div>
      </div>

      {/* ── Message area ── */}
      <div className="flex-1 overflow-y-auto px-6">
        {!hasMessages ? (
          <WelcomeState site={selectedSite} onSuggest={(s) => sendMessage(s)} />
        ) : (
          <div className="max-w-[800px] mx-auto flex flex-col gap-4 pb-6">
            {messages.map((msg) =>
              msg.role === 'user' ? (
                <UserBubble key={msg.id} content={msg.content} />
              ) : (
                <AssistantBubble key={msg.id} content={msg.content} streaming={msg.streaming} />
              )
            )}
            {error && (
              <div className="flex items-start gap-3 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-[13px]">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Error: </span>{error}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* ── Input bar ── */}
      <div className="flex-shrink-0 px-6 pb-6 pt-2">
        <div className="max-w-[800px] mx-auto">
          <div className={`flex items-end gap-3 bg-[#111827] border rounded-2xl px-4 py-3 transition-colors ${
            isStreaming ? 'border-[#1F2937] opacity-80' : 'border-[#1F2937] focus-within:border-[#10B981]/40'
          }`}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
              placeholder={isStreaming ? 'Waiting for response…' : 'Ask anything about water, regulations, or this site…'}
              rows={1}
              className="flex-1 resize-none bg-transparent text-white text-[14px] placeholder-[#4B5563] focus:outline-none leading-relaxed min-h-[24px]"
              style={{ maxHeight: '140px', overflowY: 'auto' }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isStreaming}
              className="w-9 h-9 rounded-xl bg-[#10B981] hover:bg-[#059669] disabled:bg-[#1F2937] disabled:text-[#4B5563] text-white flex items-center justify-center flex-shrink-0 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-[#374151] text-center mt-2">
            Press Enter to send · Shift+Enter for newline · Powered by Claude
          </p>
        </div>
      </div>

    </div>
  );
}
