import React, { useState } from 'react';
import { MessageCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { PrivacyDisclaimer } from '../components/PrivacyDisclaimer';
import { useAuthStore } from '../stores/authStore';
import { useConversationStore } from '../stores/conversationStore';
import { useNavigate } from 'react-router-dom';

export function YouthStartPage() {
  const [showPrivacyDisclaimer, setShowPrivacyDisclaimer] = useState(false);
  const [showResumeForm, setShowResumeForm] = useState(false);
  const [recoveryId, setRecoveryId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { signInAnonymous, currentUser } = useAuthStore();
  const { createConversation, loadConversationByRecoveryId } = useConversationStore();

  const handleStartNewChat = () => {
    setShowPrivacyDisclaimer(true);
  };

  const handleAcceptPrivacy = async () => {
    try {
      await signInAnonymous();
      if (currentUser) {
        const conversationId = await createConversation(currentUser.uid);
        navigate(`/chat/${conversationId}`);
      }
    } catch (error) {
      setError('Kon gesprek niet starten');
    }
  };

  const handleResumeChat = async () => {
    if (!recoveryId.trim()) {
      setError('Voer je gesprekscode in');
      return;
    }

    try {
      const found = await loadConversationByRecoveryId(recoveryId.trim().toUpperCase());
      if (found) {
        await signInAnonymous();
        navigate(`/chat/${recoveryId}`);
      } else {
        setError('Gesprekscode niet gevonden');
      }
    } catch (error) {
      setError('Kon gesprek niet laden');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Anoniem046</h1>
          <p className="text-slate-300">
            Veilig en anoniem praten met begeleiders van Jong046
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleStartNewChat}
            className="w-full"
            size="lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start nieuw gesprek
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-500">of</span>
            </div>
          </div>

          {!showResumeForm ? (
            <Button
              variant="secondary"
              onClick={() => setShowResumeForm(true)}
              className="w-full"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Hervat gesprek
            </Button>
          ) : (
            <div className="space-y-3">
              <Input
                label="Gesprekscode"
                value={recoveryId}
                onChange={(e) => setRecoveryId(e.target.value.toUpperCase())}
                placeholder="Voer je 15-cijferige code in"
                error={error}
                maxLength={15}
              />
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowResumeForm(false);
                    setRecoveryId('');
                    setError('');
                  }}
                  className="flex-1"
                >
                  Annuleer
                </Button>
                <Button
                  onClick={handleResumeChat}
                  className="flex-1"
                >
                  <ArrowRight className="w-4 h-4 mr-1" />
                  Ga naar gesprek
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-400">
            Heb je een crisis? Bel 113 Zelfmoordpreventie:{' '}
            <a href="tel:0800-0113" className="text-purple-400 hover:text-purple-300">
              0800-0113
            </a>
          </p>
        </div>
      </div>

      {showPrivacyDisclaimer && (
        <PrivacyDisclaimer onAccept={handleAcceptPrivacy} />
      )}
    </div>
  );
}