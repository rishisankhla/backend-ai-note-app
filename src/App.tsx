import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { NoteEditor } from './components/NoteEditor';
import { Login } from './components/Login';
import { exportNoteToPDF } from './utils/pdf';
import type { Note } from './types';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(
    localStorage.getItem('userEmail')
  );

  useEffect(() => {
    if (userEmail) {
      fetchNotes();
    } else {
      setNotes([]);
      setSelectedNote(null);
    }
  }, [userEmail]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_URL}/notes/${userEmail}`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    localStorage.setItem('userEmail', email);
  };

  const handleLogout = () => {
    setUserEmail(null);
    localStorage.removeItem('userEmail');
    setSelectedNote(null);
    setNotes([]);
  };

  const createNewNote = async (noteTitle: string) => {
    try {
      const response = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: noteTitle,
          content: '',
          userEmail,
        }),
      });
      const newNote = await response.json();
      setNotes([...notes, newNote]);
      setSelectedNote(newNote);
      setTitle(newNote.title);
      setContent(newNote.content);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const saveNote = async () => {
    if (!selectedNote) return;

    try {
      const response = await fetch(`${API_URL}/notes/${selectedNote._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const updatedNote = await response.json();
      setNotes(notes.map((note) => 
        note._id === selectedNote._id ? updatedNote : note
      ));
      setSelectedNote(updatedNote);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      await fetch(`${API_URL}/notes/${noteId}`, {
        method: 'DELETE',
      });
      setNotes(notes.filter((note) => note._id !== noteId));
      if (selectedNote?._id === noteId) {
        setSelectedNote(null);
        setTitle('');
        setContent('');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Login onLogin={handleLogin} userEmail={userEmail} onLogout={handleLogout} />
      
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 w-full lg:w-auto transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 lg:z-0`}
      >
        <Sidebar
          notes={notes}
          selectedNote={selectedNote}
          onNoteSelect={handleNoteSelect}
          onNoteCreate={createNewNote}
          onNoteDelete={deleteNote}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 lg:p-8 ml-0">
        {!userEmail ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p className="text-xl">Please login to access your notes</p>
          </div>
        ) : selectedNote ? (
          <NoteEditor
            note={selectedNote}
            onTitleChange={setTitle}
            onContentChange={setContent}
            onSave={saveNote}
            onExport={() => exportNoteToPDF({ ...selectedNote, title, content })}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <p className="text-xl">Select a note or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;