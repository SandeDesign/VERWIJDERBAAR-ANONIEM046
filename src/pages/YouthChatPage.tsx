import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { MessageBubble } from '../components/MessageBubble';
import { ChatInput } from '../components/ChatInput';
import { RecoveryIdDisplay } from '../components/RecoveryIdDisplay';
import { useConversationStore } from '../stores/conversationStore';
import { useAuthStore } from '../stores/authStore';

export function YouthChatPage() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  const { currentUser } = useAuthStore();
  const { 
    currentConversation, 
    messages, 
    loadConversation, 
    sendMessage, 
    subscribeToMessages,
    updateConversationStatus
  } = useConversationStore();

  useEffect(() => {
    if (conversationId) {
      loadConversation(conversationId);
      const unsubscribe = subscribeToMessages(conversationId);
      return unsubscribe;
    }
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (conversationId && currentUser) {
      sendMessage(conversationId, content, 'jongere', currentUser.uid);
    }
  };

  const handleCloseConversation = async () => {
    if (conversationId) {
      await updateConversationStatus(conversationId, 'gesloten', 'jongere');
      setShowCloseConfirm(false);
    }
  };

  const isClosed = currentConversation?.status === 'gesloten';

  if (!currentConversation) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Gesprek wordt geladen...</p>
          <Button variant="secondary" onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Terug naar start
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Terug
          </button>
          
          <h1 className="text-lg font-semibold text-white">Anoniem046</h1>
          
          {!isClosed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCloseConfirm(true)}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Recovery ID */}
      <div className="p-4">
        <RecoveryIdDisplay recoveryId={currentConversation.recoveryId} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwnMessage={message.authorType === 'jongere'}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isClosed}
      />

      {/* Close Confirmation */}
      {showCloseConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-2">Gesprek sluiten?</h3>
            <p className="text-slate-300 mb-6">
              Weet je zeker dat je dit gesprek wilt sluiten? Je kunt daarna geen nieuwe berichten meer verzenden.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowCloseConfirm(false)}
                className="flex-1"
              >
                Annuleer
              </Button>
              <Button
                variant="danger"
                onClick={handleCloseConversation}
                className="flex-1"
              >
                Sluit gesprek
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}