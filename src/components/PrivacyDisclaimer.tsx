import React from 'react';
import { Shield, Eye, Database, UserX } from 'lucide-react';
import { Button } from './ui/Button';

interface PrivacyDisclaimerProps {
  onAccept: () => void;
}

export function PrivacyDisclaimer({ onAccept }: PrivacyDisclaimerProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-2xl p-6 max-w-lg w-full border border-slate-700 shadow-2xl">
        <div className="text-center mb-6">
          <Shield className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Privacy & Veiligheid</h2>
          <p className="text-slate-300">
            Voordat je start, is het belangrijk dat je begrijpt hoe we je privacy beschermen.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-xl">
            <UserX className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-white mb-1">Geen registratie</h3>
              <p className="text-sm text-slate-300">
                Je hoeft geen account aan te maken. Je blijft volledig anoniem.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-xl">
            <Database className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-white mb-1">Wat we opslaan</h3>
              <p className="text-sm text-slate-300">
                Alleen je berichten en een unieke code om je gesprek terug te vinden.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-800 rounded-xl">
            <Eye className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-white mb-1">Wie kan meelezen</h3>
              <p className="text-sm text-slate-300">
                Alleen jij en de begeleider van Jong046 die jouw gesprek heeft.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
          <p className="text-amber-300 text-sm">
            <strong>Let op:</strong> In crisissituaties kunnen we contact opnemen met hulpdiensten. 
            Je veiligheid staat voorop.
          </p>
        </div>

        <Button 
          onClick={onAccept} 
          className="w-full"
          size="lg"
        >
          Ik begrijp het, start gesprek
        </Button>
      </div>
    </div>
  );
}