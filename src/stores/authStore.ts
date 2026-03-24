import { create } from 'zustand';
import { 
  signInAnonymously, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User as FirebaseUser,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { User, UserRole } from '../types';

interface AuthState {
  currentUser: FirebaseUser | null;
  userRole: UserRole | 'jongere' | null;
  userData: User | null;
  isLoading: boolean;
  error: string | null;
  
  signInAnonymous: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initAuth: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  userRole: null,
  userData: null,
  isLoading: true,
  error: null,

  signInAnonymous: async () => {
    try {
      set({ isLoading: true, error: null });
      await signInAnonymously(auth);
    } catch (error) {
      set({ error: 'Kon geen anonieme sessie starten' });
    } finally {
      set({ isLoading: false });
    }
  },

  signInWithEmail: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      set({ error: 'Ongeldige inloggegevens' });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      set({ error: 'Kon niet uitloggen' });
    }
  },

  initAuth: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.isAnonymous) {
          set({ 
            currentUser: user, 
            userRole: 'jongere', 
            userData: null,
            isLoading: false 
          });
        } else {
          // Haal begeleider/beheerder data op
          try {
            const userDoc = await getDoc(doc(db, 'a046_users', user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data() as User;
              set({ 
                currentUser: user, 
                userRole: userData.role, 
                userData,
                isLoading: false 
              });
            } else {
              set({ 
                currentUser: user, 
                userRole: null, 
                userData: null,
                isLoading: false,
                error: 'Geen toegang'
              });
            }
          } catch (error) {
            set({ error: 'Kon gebruikersgegevens niet ophalen' });
          }
        }
      } else {
        set({ 
          currentUser: null, 
          userRole: null, 
          userData: null,
          isLoading: false 
        });
      }
    });
  },

  clearError: () => set({ error: null })
}));