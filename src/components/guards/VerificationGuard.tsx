import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AlertCircle } from 'lucide-react';

interface VerificationGuardProps {
  children: React.ReactNode;
}

const VerificationGuard: React.FC<VerificationGuardProps> = ({ children }) => {
  const { user } = useAuth();

  if (user && user.verification_status === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Account in behandeling
          </h2>
          <p className="text-gray-600">
            Uw account wordt momenteel gecontroleerd. U ontvangt een e-mail zodra uw account is goedgekeurd.
          </p>
        </div>
      </div>
    );
  }

  if (user && user.verification_status === 'rejected') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Account geweigerd
          </h2>
          <p className="text-gray-600">
            Uw account is helaas niet goedgekeurd. Neem contact op met de klantenservice voor meer informatie.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default VerificationGuard;