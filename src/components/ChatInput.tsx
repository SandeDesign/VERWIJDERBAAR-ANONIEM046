import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Typ je bericht..." 
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700 bg-slate-900">
      {disabled && (
        <div className="flex items-center gap-2 text-amber-400 text-sm mb-3 bg-amber-500/10 rounded-lg p-3">
          <AlertTriangle className="w-4 h-4" />
          <span>Dit gesprek is gesloten. Je kunt geen nieuwe berichten verzenden.</span>
        </div>
      )}
      
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none min-h-[52px] max-h-32"
          />
        </div>
        
        <Button
          type="submit"
          disabled={!message.trim() || disabled}
          size="md"
          className="flex-shrink-0 h-[52px] w-12"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}