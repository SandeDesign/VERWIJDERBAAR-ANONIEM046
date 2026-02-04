import { create } from 'zustand';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { User, AuthState, RegisterData } from '../types';
import { getFirebaseErrorMessage } from '../utils/validation';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        set({ user: userData, loading: false });
      } else {
        throw new Error('Gebruikersgegevens niet gevonden');
      }
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  register: async (data: RegisterData) => {
    try {
      set({ loading: true, error: null });
      
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const now = new Date().toISOString();
      
      const userData: User = {
        uid: userCredential.user.uid,
        email: data.email,
        name: '',
        phone: '',
        address: '',
        date_of_birth: '',
        role: 'customer',
        verification_status: 'approved',
        created_at: now,
        updated_at: now
      };

      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      set({ user: userData, loading: false });
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, loading: false, error: null });
    } catch (error: any) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },

  initializeAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            set({ user: userData, loading: false });
          } else {
            set({ user: null, loading: false });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          set({ user: null, loading: false });
        }
      } else {
        set({ user: null, loading: false });
      }
    });

    return unsubscribe;
  }
}));