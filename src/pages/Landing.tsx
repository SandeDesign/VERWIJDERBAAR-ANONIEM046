import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Clock, Shield, Users } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Vlottr</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                Inloggen
              </Link>
              <Link 
                to="/registreren"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Registreren
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Betrouwbare auto verhuur
              <span className="text-blue-600"> voor weken</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Huur een auto voor minimaal één week tegen scherpe prijzen. 
              Perfect voor langere reizen, tijdelijk vervoer of zakelijke doeleinden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/registreren"
                className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Nu registreren
              </Link>
              <Link
                to="/cars"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Bekijk auto's
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Waarom kiezen voor Vlottr?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wij bieden flexibele autoverhuur voor langere periodes met uitstekende service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Flexibele verhuur
              </h3>
              <p className="text-gray-600">
                Huur vanaf één week voor alle flexibiliteit die u nodig heeft.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Volledig verzekerd
              </h3>
              <p className="text-gray-600">
                Alle auto's zijn volledig verzekerd voor uw gemoedsrust.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Moderne vloot
              </h3>
              <p className="text-gray-600">
                Keuze uit een uitgebreide vloot van moderne, betrouwbare auto's.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                24/7 support
              </h3>
              <p className="text-gray-600">
                Onze klantenservice staat 24/7 voor u klaar bij vragen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Klaar om te starten?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Registreer u vandaag nog en ontdek onze uitgebreide selectie auto's.
          </p>
          <Link
            to="/registreren"
            className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors inline-block"
          >
            Account aanmaken
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Car className="h-6 w-6 text-blue-400" />
              <span className="ml-2 text-xl font-bold">Vlottr</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Vlottr. Alle rechten voorbehouden.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;