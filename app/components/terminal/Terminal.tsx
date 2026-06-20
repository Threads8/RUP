'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { terminalCommands, personalInfo } from '../../data/portfolio-data';
import { Section } from '../ui';
import { useUISound } from '../../hooks/useUISound';

type TermLine = { type: 'input' | 'output' | 'system'; content: string };

export const Terminal = () => {
  const [history, setHistory] = useState<TermLine[]>([
    { type: 'system', content: '╔═══════════════════════════════════════════════════╗' },
    { type: 'system', content: '║   RAHUL UNIYAL — INTERACTIVE PORTFOLIO TERMINAL   ║' },
    { type: 'system', content: '║   Type "help" to see available commands            ║' },
    { type: 'system', content: '╚═══════════════════════════════════════════════════╝' },
    { type: 'system', content: '' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playClick } = useUISound();

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  useEffect(scrollToBottom, [history, scrollToBottom]);

  const typeOutput = useCallback(async (text: string) => {
    setIsTyping(true);
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      await new Promise(r => setTimeout(r, 15));
      setHistory(prev => [...prev, { type: 'output', content: lines[i] }]);
    }
    setIsTyping(false);
  }, []);

  const executeCommand = useCallback(async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setHistory(prev => [...prev, { type: 'input', content: `$ ${cmd}` }]);
    setCmdHistory(prev => [cmd, ...prev]);
    setHistoryIdx(-1);
    setInput('');

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmed === 'resume') {
      window.open(personalInfo.resumeUrl, '_blank');
    }

    const output = terminalCommands[trimmed];
    if (output) {
      await typeOutput(output);
    } else if (trimmed) {
      setHistory(prev => [...prev,
        { type: 'output', content: `  Command not found: "${trimmed}"` },
        { type: 'output', content: '  Type "help" for available commands.' },
        { type: 'output', content: '' },
      ]);
    }
  }, [typeOutput]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isTyping) {
      executeCommand(input);
      playClick();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(cmdHistory[newIdx]);
      } else {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  return (
    <Section id="terminal" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 sm:mb-12">
          <span className="text-cyan-400 font-black tracking-widest uppercase text-xs mb-4 flex items-center gap-3">
            <span className="w-6 sm:w-8 h-[2px] bg-cyan-500/50" /> Developer Console
          </span>
          <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-extrabold text-white tracking-tighter">
            Interactive Terminal.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/5"
        >
          {/* Title bar */}
          <div className="bg-[#0a0a0a] border-b border-white/10 px-4 py-3 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-slate-500 text-xs font-mono ml-2">rahul@portfolio:~</span>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="bg-[#0a0a0a]/95 p-4 sm:p-6 h-[400px] sm:h-[500px] overflow-y-auto font-mono text-[13px] sm:text-sm leading-relaxed terminal-scrollbar"
          >
            {history.map((line, i) => (
              <div key={i} className={`whitespace-pre-wrap ${
                line.type === 'input' ? 'text-cyan-400 font-bold' :
                line.type === 'system' ? 'text-indigo-400' :
                'text-slate-300'
              }`}>
                {line.content}
              </div>
            ))}

            {/* Input line */}
            <div className="flex items-center mt-1">
              <span className="text-cyan-400 font-bold mr-2 shrink-0">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                className="flex-1 bg-transparent text-white outline-none font-mono text-[13px] sm:text-sm caret-cyan-400"
                placeholder={isTyping ? '' : 'Type a command...'}
                autoComplete="off"
                spellCheck={false}
              />
              <span className="w-2 h-5 bg-cyan-400 animate-terminal-blink ml-0.5" />
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
