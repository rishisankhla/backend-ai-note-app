import React, { useState } from 'react';
import { LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
  userEmail: string | null;
  onLogout: () => void;
}

export function Login({ onLogin, userEmail, onLogout }: LoginProps) {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onLogin(email.trim());
      setIsModalOpen(false);
      setEmail('');
    }
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      {userEmail ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{userEmail}</span>
          <button
            onClick={onLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <LogIn size={20} />
          Login
        </button>
      )}

      {isModalOpen && !userEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}