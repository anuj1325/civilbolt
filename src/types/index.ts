import React, { ReactNode } from 'react';

// User and Authentication Types
export interface User {
  id?: string;
  name: string;
  email: string;
  plan: 'Free Plan' | 'Pro Plan' | 'Enterprise Plan';
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Session and History Types
export interface Session {
  id?: string;
  title: string;
  date: string;
  type?: 'document' | 'research' | 'pdf-chat' | 'memo' | 'argument';
  lastModified?: string;
}

// Feature and Navigation Types
export interface FeatureOption {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  route: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  current?: boolean;
  badge?: string | number;
}

// Typography and Editor Types
export interface Font {
  value: string;
  label: string;
  category?: 'serif' | 'sans-serif' | 'monospace';
}

export interface Size {
  value: string;
  label: string;
}

export interface LineSpacing {
  value: string;
  label: string;
}

// Document Types
export interface Document {
  id: string;
  title: string;
  content: string;
  htmlContent?: string;
  type: 'draft' | 'memo' | 'research' | 'argument' | 'template';
  status: 'draft' | 'published' | 'archived';
  createdAt: string;
  updatedAt: string;
  author: string;
  tags?: string[];
  metadata?: DocumentMetadata;
}

export interface DocumentMetadata {
  wordCount?: number;
  characterCount?: number;
  readingTime?: number;
  lastAutoSave?: string;
  version?: number;
}

// Editor State Types
export interface EditorState {
  content: string;
  htmlContent: string;
  currentFont: string;
  currentSize: string;
  currentLineSpacing: string;
  isModified: boolean;
  lastSaved: Date | null;
  wordCount: number;
  characterCount: number;
}

export interface EditorPreferences {
  font: string;
  fontSize: string;
  lineSpacing: string;
  showLineNumbers: boolean;
  wordWrap: boolean;
  spellCheck: boolean;
  autoSave: boolean;
  autoSaveInterval: number;
}

// Component Props Types
export interface TopNavigationProps {
  currentUser: User;
  onUpgrade: () => void;
}

export interface LeftNavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
  recentSessions: Session[];
  currentUser: User;
}

export interface FeatureCardProps {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

export interface LayoutProps {
  children: ReactNode;
}

// Editor Component Props
export interface EditorToolbarProps {
  currentFont: string;
  currentSize: string;
  currentLineSpacing: string;
  fonts: Font[];
  textSizes: Size[];
  lineSpacings: LineSpacing[];
  formatText: (command: string, value?: string | null) => void;
  undo: () => void;
  redo: () => void;
  undoStack: string[];
  redoStack: string[];
  onSave: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export interface SidebarProps {
  activeTab: 'research' | 'notes' | 'outline';
  onTabChange: (tab: 'research' | 'notes' | 'outline') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  notes: string;
  onNotesChange: (notes: string) => void;
}

// Research Types
export interface LegalResearchQuery {
  query: string;
  jurisdiction?: string;
  practiceArea?: string;
  courtLevel?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  maxResults?: number;
}

export interface LegalResearchResult {
  id: string;
  title: string;
  summary: string;
  relevanceScore: number;
  source: string;
  jurisdiction: string;
  court: string;
  date: string;
  citations: string[];
  url?: string;
  excerpt?: string;
}

export interface Citation {
  id: string;
  text: string;
  source: string;
  page?: number;
  section?: string;
  url?: string;
  type: 'case' | 'statute' | 'regulation' | 'article' | 'book';
}

// PDF and File Types
export interface PDFFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  pages?: number;
  metadata?: PDFMetadata;
}

export interface PDFMetadata {
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string;
  creator?: string;
  producer?: string;
  creationDate?: string;
  modificationDate?: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  citations?: Citation[];
  attachments?: string[];
}

// API Types
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  path?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface LegalMemoForm {
  title: string;
  client: string;
  matter: string;
  issue: string;
  facts: string;
  jurisdiction: string;
  practiceArea: string;
}

export interface ArgumentGenerationForm {
  caseType: string;
  caseDetails: string;
  argumentFocus: string;
  jurisdiction: string;
  supportingDocuments?: File[];
}

// Utility Types
export type Theme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'es' | 'fr' | 'de' | 'it';
export type PlanType = 'free' | 'pro' | 'enterprise';
export type DocumentType = 'draft' | 'memo' | 'research' | 'argument' | 'template';
export type FileType = 'pdf' | 'doc' | 'docx' | 'txt' | 'rtf';

// Event Types
export interface DocumentEvent {
  type: 'save' | 'share' | 'export' | 'delete' | 'duplicate';
  documentId: string;
  timestamp: Date;
  userId: string;
}

export interface UserPreferences {
  theme: Theme;
  language: Language;
  autoSave: boolean;
  notifications: boolean;
  editorSettings: EditorPreferences;
  privacy: {
    analytics: boolean;
    marketing: boolean;
    functional: boolean;
  };
}

// Hook Return Types
export interface UseEditorReturn {
  // State
  text: string;
  htmlContent: string;
  currentFont: string;
  currentSize: string;
  currentLineSpacing: string;
  isModified: boolean;
  lastSaved: Date | null;
  undoStack: string[];
  redoStack: string[];
  
  // Refs
  editorRef: React.RefObject<HTMLDivElement>;
  
  // Actions
  formatText: (command: string, value?: string | null) => void;
  undo: () => void;
  redo: () => void;
  handlePaste: (e: React.ClipboardEvent) => void;
  saveDocument: () => Promise<{ success: boolean; message: string }>;
  loadDocument: (content: string) => void;
  clearDocument: () => void;
  updateContent: () => void;
  
  // Utilities
  getDocumentStats: () => {
    words: number;
    characters: number;
    charactersNoSpaces: number;
    paragraphs: number;
  };
  
  // Settings
  setCurrentFont: (font: string) => void;
  setCurrentSize: (size: string) => void;
  setCurrentLineSpacing: (spacing: string) => void;
}

export interface UseLocalStorageReturn<T> {
  storedValue: T;
  setValue: (value: T | ((val: T) => T)) => void;
}

// Constants
export const ROUTES = {
  HOME: '/',
  EDITOR: '/editor',
  LEGAL_RESEARCH: '/legal-research',
  LEGAL_MEMO: '/legal-memo',
  CHAT_PDF: '/chat-pdf',
  GENERATE_ARGUMENTS: '/generate-arguments',
  UPLOAD: '/upload',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  BILLING: '/billing',
} as const;

export const JURISDICTIONS = [
  'All Jurisdictions',
  'Supreme Court of India',
  'High Courts',
  'District Courts',
  'Tribunal Courts',
  'International Courts',
] as const;

export const PRACTICE_AREAS = [
  'All Practice Areas',
  'Civil Law',
  'Criminal Law',
  'Corporate Law',
  'Constitutional Law',
  'Family Law',
  'Property Law',
  'Tax Law',
  'Labor Law',
  'Environmental Law',
  'Intellectual Property',
  'International Law',
] as const;

export type JurisdictionType = typeof JURISDICTIONS[number];
export type PracticeAreaType = typeof PRACTICE_AREAS[number];

// Page Component Props
export interface PageProps {
  onNavigate: (view: string) => void;
}

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}