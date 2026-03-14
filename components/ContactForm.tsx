'use client';

import { useState } from 'react';

type FormData = {
  what_to_automate: string;
  platform: string;
  timeline: string;
  email: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    what_to_automate: '',
    platform: '',
    timeline: '',
    email: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      } else {
        setStatus('success');
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <p className="text-[#00d4aa]">Message sent. I&apos;ll be in touch.</p>
    );
  }

  const isLoading = status === 'loading';

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-black/50 mb-1">
          What would you like to automate or build?
        </label>
        <textarea
          name="what_to_automate"
          rows={3}
          value={formData.what_to_automate}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full bg-black/5 border border-black/10 rounded px-4 py-3 text-[#111] text-sm placeholder:text-black/30 focus:outline-none focus:border-[#00d4aa]/50 transition"
        />
      </div>

      <div>
        <label className="block text-sm text-black/50 mb-1">
          What platform(s) are you on?
        </label>
        <input
          type="text"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="YouTube, Instagram, TikTok..."
          className="w-full bg-black/5 border border-black/10 rounded px-4 py-3 text-[#111] text-sm placeholder:text-black/30 focus:outline-none focus:border-[#00d4aa]/50 transition"
        />
      </div>

      <div>
        <label className="block text-sm text-black/50 mb-1">
          Timeline — is this urgent or exploratory?
        </label>
        <input
          type="text"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="No rush, just exploring"
          className="w-full bg-black/5 border border-black/10 rounded px-4 py-3 text-[#111] text-sm placeholder:text-black/30 focus:outline-none focus:border-[#00d4aa]/50 transition"
        />
      </div>

      <div>
        <label className="block text-sm text-black/50 mb-1">
          Your email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="you@example.com"
          className="w-full bg-black/5 border border-black/10 rounded px-4 py-3 text-[#111] text-sm placeholder:text-black/30 focus:outline-none focus:border-[#00d4aa]/50 transition"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full border border-[#00d4aa] text-[#00d4aa] hover:bg-[#00d4aa]/10 px-6 py-3 rounded transition-colors text-sm mt-6${isLoading ? ' opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Sending...' : "Let's talk"}
      </button>

      {status === 'error' && errorMessage && (
        <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
}
