export type UserRole = 'begeleider' | 'beheerder';

export type ConversationStatus = 'wachten' | 'actief' | 'gesloten';

export type MessageAuthorType = 'jongere' | 'begeleider' | 'systeem';

export interface User {
  id: string;
  displayName: string;
  bio: string;
  role: UserRole;
  active: boolean;
}

export interface Conversation {
  id: string;
  anonymousUid: string;
  status: ConversationStatus;
  assignedTo?: string;
  isCrisis: boolean;
  recoveryId: string;
  createdAt: Date;
  updatedAt: Date;
  closedBy?: string;
  closedAt?: Date;
}

export interface Message {
  id: string;
  authorType: MessageAuthorType;
  authorId: string;
  content: string;
  createdAt: Date;
}

export interface InternalNote {
  id: string;
  authorId: string;
  content: string;
  createdAt: Date;
}