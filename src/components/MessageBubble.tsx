import React from 'react';
import { Message } from '../types';
import { Bot, User, Users } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage?: boolean;
}

export function MessageBubble({ message, isOwnMessage = false }: MessageBubbleProps) {
  const isSystem = message.authorType === 'systeem';
  const isBegeleider = message.authorType === 'begeleider';
  
  if (isSystem) {
    return (
      <div className="flex items-center justify-center my-4">
        <div className="bg-slate-800 text-slate-300 px-4 py-2 rounded-full text-sm max-w-xs text-center border border-slate-700">
          <Bot className="w-4 h-4 inline mr-2" />
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      {!isOwnMessage && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            {isBegeleider ? (
              <Users className="w-4 h-4 text-white" />
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </div>
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-1' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isOwnMessage
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              : 'bg-slate-800 text-slate-200'
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <p className="text-xs text-slate-500 mt-1 px-1">
          {message.createdAt.toLocaleTimeString('nl-NL', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>

      {isOwnMessage && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}