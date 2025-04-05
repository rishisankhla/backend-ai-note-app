export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export interface SidebarProps {
  notes: Note[];
  selectedNote: Note | null;
  onNoteSelect: (note: Note) => void;
  onNoteCreate: (title: string) => void;
  onNoteDelete: (noteId: string) => void;
}

export interface NoteEditorProps {
  note: Note;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onSave: () => void;
  onExport: () => void;
}