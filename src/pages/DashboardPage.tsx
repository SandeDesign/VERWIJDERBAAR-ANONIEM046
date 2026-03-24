import React, { useEffect, useState } from 'react';
import { Users, MessageSquare, Clock, CheckCircle, XCircle, LogOut, User } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../stores/authStore';
import { useConversationStore } from '../stores/conversationStore';
import { Conversation } from '../types';
import { useNavigate } from 'react-router-dom';

export function DashboardPage() {
  const [filter, setFilter] = useState<'all' | 'wachten' | 'actief' | 'gesloten'>('all');
  const navigate = useNavigate();

  const { signOut, userData } = useAuthStore();
  const { conversations, subscribeToConversations, assignConversation } = useConversationStore();

  useEffect(() => {
    const unsubscribe = subscribeToConversations();
    return unsubscribe;
  }, []);

  const filteredConversations = conversations.filter(conv => {
    if (filter === 'all') return true;
    return conv.status === filter;
  });

  const handleTakeConversation = async (conversationId: string) => {
    if (userData) {
      await assignConversation(conversationId, userData.id);
      navigate(`/chat/${conversationId}`);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'wachten':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'actief':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'gesloten':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'wachten':
        return 'Wachtend';
      case 'actief':
        return 'Actief';
      case 'gesloten':
        return 'Gesloten';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-500" />
            <div>
              <h1 className="text-xl font-bold text-white">Jong046 Dashboard</h1>
              <p className="text-sm text-slate-400">
                Welkom, {userData?.displayName}
              </p>
            </div>
          </div>
          
          <Button variant="ghost" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Uitloggen
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Totaal</p>
                <p className="text-2xl font-bold text-white">{conversations.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Wachtend</p>
                <p className="text-2xl font-bold text-amber-500">
                  {conversations.filter(c => c.status === 'wachten').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Actief</p>
                <p className="text-2xl font-bold text-green-500">
                  {conversations.filter(c => c.status === 'actief').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Gesloten</p>
                <p className="text-2xl font-bold text-gray-500">
                  {conversations.filter(c => c.status === 'gesloten').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'all', label: 'Alle gesprekken' },
            { key: 'wachten', label: 'Wachtend' },
            { key: 'actief', label: 'Actief' },
            { key: 'gesloten', label: 'Gesloten' }
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilter(key as any)}
            >
              {label}
            </Button>
          ))}
        </div>

        {/* Conversations List */}
        <div className="bg-slate-800 rounded-xl overflow-hidden">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">Geen gesprekken gevonden</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {filteredConversations.map((conversation) => (
                <div key={conversation.id} className="p-4 hover:bg-slate-750 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-slate-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(conversation.status)}
                          <span className="font-medium text-white">
                            {getStatusText(conversation.status)}
                          </span>
                          {conversation.isCrisis && (
                            <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded">
                              Crisis
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400">
                          Gestart op {conversation.createdAt.toLocaleDateString('nl-NL')} om{' '}
                          {conversation.createdAt.toLocaleTimeString('nl-NL', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {conversation.status === 'wachten' && (
                        <Button
                          size="sm"
                          onClick={() => handleTakeConversation(conversation.id)}
                        >
                          Neem gesprek aan
                        </Button>
                      )}
                      
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(`/chat/${conversation.id}`)}
                      >
                        {conversation.status === 'gesloten' ? 'Bekijk' : 'Open'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}