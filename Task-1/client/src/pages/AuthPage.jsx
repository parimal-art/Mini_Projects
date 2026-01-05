// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { API_URL } from '../config';

export default function AuthPage({ type, onComplete, onError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    onError(''); // Clear previous errors

    const endpoint = type === 'signup' ? `${API_URL}/api/auth/signup` : `${API_URL}/api/auth/login`;
    const payload = type === 'signup' ? { username: name, email, password } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.msg || 'Authentication failed');
      
      onComplete(data.user, data.token);
    } catch (err) {
      console.error(err);
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-neutral-200 border border-neutral-100">
          <h2 className="text-2xl font-bold text-neutral-900 text-center mb-8">
            {type === 'login' ? 'Welcome Back' : 'Join the Community'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Display Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 outline-none" placeholder="Picasso Jr." required />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-xl border border-neutral-200 bg-neutral-50 outline-none" required />
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 flex justify-center">
              {loading ? <Loader2 className="animate-spin" /> : (type === 'login' ? 'Log In' : 'Create Account')}
            </button>
          </form>
      </div>
    </div>
  );
}