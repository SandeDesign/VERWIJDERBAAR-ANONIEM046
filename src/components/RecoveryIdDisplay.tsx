import React, { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';

interface RecoveryIdDisplayProps {
  recoveryId: string;
}

export function RecoveryIdDisplay({ recoveryId }: RecoveryIdDisplayProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(recoveryId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback voor oudere browsers
      const textArea = document.createElement('textarea');
      textArea.value = recoveryId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-2">
        <RefreshCw className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-medium text-purple-300">Gesprekscode</span>
      </div>
      
      <div className="flex items-center justify-between bg-slate-800 rounded-lg p-3">
        <code className="text-lg font-mono text-white tracking-wider">
          {recoveryId}
        </code>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="ml-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Gekopieerd
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Kopieer
            </>
          )}
        </Button>
      </div>
      
      <p className="text-xs text-slate-400 mt-2">
        Bewaar deze code om later terug te komen naar dit gesprek
      </p>
    </div>
  );
}