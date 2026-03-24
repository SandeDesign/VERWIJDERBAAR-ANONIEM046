import { create } from 'zustand';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc, 
  onSnapshot,
  query,
  orderBy,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Conversation, Message, ConversationStatus } from '../types';

interface ConversationState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  
  createConversation: (anonymousUid: string) => Promise<string>;
  loadConversationByRecoveryId: (recoveryId: string) => Promise<boolean>;
  loadConversation: (conversationId: string) => Promise<void>;
  sendMessage: (conversationId: string, content: string, authorType: 'jongere' | 'begeleider', authorId: string) => Promise<void>;
  updateConversationStatus: (conversationId: string, status: ConversationStatus, closedBy?: string) => Promise<void>;
  assignConversation: (conversationId: string, userId: string) => Promise<void>;
  subscribeToConversations: () => () => void;
  subscribeToMessages: (conversationId: string) => () => void;
  clearError: () => void;
}

// Helper functie voor recovery ID
const generateRecoveryId = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Geen ambigue characters
  let result = '';
  for (let i = 0; i < 15; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Welkomstberichten variaties
const welcomeMessages = [
  "Hallo! Fijn dat je er bent. Ik ben hier om naar je te luisteren. Vertel maar wat er speelt.",
  "Hey! Welkom bij Anoniem046. Je bent hier veilig om te praten over wat je bezighoudt.",
  "Hoi! Wat goed dat je de stap hebt gezet om hier te komen. Ik ben er voor je.",
  "Hallo daar! Je bent anoniem en veilig hier. Vertel gerust wat er in je omgaat.",
  "Hey! Mooi dat je er bent. Dit is jouw plek om vrijuit te praten over wat je dwars zit.",
  "Hallo! Ik ben blij dat je contact opneemt. Je kunt hier alles kwijt wat je bezighoudt."
];

export const useConversationStore = create<ConversationState>((set, get) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoading: false,
  error: null,

  createConversation: async (anonymousUid: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const recoveryId = generateRecoveryId();
      const conversationData = {
        anonymousUid,
        status: 'wachten' as ConversationStatus,
        isCrisis: false,
        recoveryId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'a046_conversations'), conversationData);
      
      // Voeg welkomstbericht toe
      const welcomeMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      await addDoc(collection(db, 'a046_conversations', docRef.id, 'messages'), {
        authorType: 'systeem',
        authorId: 'system',
        content: welcomeMessage,
        createdAt: Timestamp.now()
      });

      set({ isLoading: false });
      return docRef.id;
    } catch (error) {
      set({ error: 'Kon gesprek niet starten', isLoading: false });
      throw error;
    }
  },

  loadConversationByRecoveryId: async (recoveryId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const q = query(
        collection(db, 'a046_conversations'),
        where('recoveryId', '==', recoveryId.toUpperCase())
      );
      
      // Voor deze demo gebruiken we een workaround omdat onSnapshot met query complex is
      // In productie zou je een cloud function kunnen gebruiken
      const conversationDoc = await getDoc(doc(db, 'a046_conversations', recoveryId));
      
      if (conversationDoc.exists()) {
        const conversation = {
          id: conversationDoc.id,
          ...conversationDoc.data(),
          createdAt: conversationDoc.data().createdAt.toDate(),
          updatedAt: conversationDoc.data().updatedAt.toDate(),
          closedAt: conversationDoc.data().closedAt?.toDate()
        } as Conversation;
        
        set({ currentConversation: conversation, isLoading: false });
        return true;
      } else {
        set({ error: 'Gesprek niet gevonden', isLoading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Kon gesprek niet laden', isLoading: false });
      return false;
    }
  },

  loadConversation: async (conversationId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const conversationDoc = await getDoc(doc(db, 'a046_conversations', conversationId));
      
      if (conversationDoc.exists()) {
        const conversation = {
          id: conversationDoc.id,
          ...conversationDoc.data(),
          createdAt: conversationDoc.data().createdAt.toDate(),
          updatedAt: conversationDoc.data().updatedAt.toDate(),
          closedAt: conversationDoc.data().closedAt?.toDate()
        } as Conversation;
        
        set({ currentConversation: conversation, isLoading: false });
      } else {
        set({ error: 'Gesprek niet gevonden', isLoading: false });
      }
    } catch (error) {
      set({ error: 'Kon gesprek niet laden', isLoading: false });
    }
  },

  sendMessage: async (conversationId: string, content: string, authorType: 'jongere' | 'begeleider', authorId: string) => {
    try {
      await addDoc(collection(db, 'a046_conversations', conversationId, 'messages'), {
        authorType,
        authorId,
        content,
        createdAt: Timestamp.now()
      });

      // Update conversation timestamp
      await updateDoc(doc(db, 'a046_conversations', conversationId), {
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      set({ error: 'Kon bericht niet verzenden' });
    }
  },

  updateConversationStatus: async (conversationId: string, status: ConversationStatus, closedBy?: string) => {
    try {
      const updateData: any = {
        status,
        updatedAt: Timestamp.now()
      };

      if (status === 'gesloten' && closedBy) {
        updateData.closedBy = closedBy;
        updateData.closedAt = Timestamp.now();
      }

      await updateDoc(doc(db, 'a046_conversations', conversationId), updateData);
      
      // Voeg systeembericht toe
      if (status === 'gesloten') {
        const closedByText = closedBy === 'jongere' ? 'jongere' : 'begeleider';
        await addDoc(collection(db, 'a046_conversations', conversationId, 'messages'), {
          authorType: 'systeem',
          authorId: 'system',
          content: `Dit gesprek is gesloten door de ${closedByText}.`,
          createdAt: Timestamp.now()
        });
      }
    } catch (error) {
      set({ error: 'Kon gespreksstatus niet bijwerken' });
    }
  },

  assignConversation: async (conversationId: string, userId: string) => {
    try {
      await updateDoc(doc(db, 'a046_conversations', conversationId), {
        assignedTo: userId,
        status: 'actief',
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      set({ error: 'Kon gesprek niet toewijzen' });
    }
  },

  subscribeToConversations: () => {
    const q = query(
      collection(db, 'a046_conversations'),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const conversations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
        closedAt: doc.data().closedAt?.toDate()
      })) as Conversation[];
      
      set({ conversations });
    });

    return unsubscribe;
  },

  subscribeToMessages: (conversationId: string) => {
    const q = query(
      collection(db, 'a046_conversations', conversationId, 'messages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      })) as Message[];
      
      set({ messages });
    });

    return unsubscribe;
  },

  clearError: () => set({ error: null })
}));