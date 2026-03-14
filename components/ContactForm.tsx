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
      <p className="text-[#00d4aa] font-medium">Message sent. I&apos;ll be in touch.</p>
    );
  }

  const isLoading = status === 'loading';

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm text-[#6b6b6b] font-medium mb-1.5">
          What would you like to automate or build?
        </label>
        <textarea
          name="what_to_automate"
          rows={3}
          value={formData.what_to_automate}
          onChange={handleChange}
          disabled={isLoading}
          className="w-full bg-white border border-[#e8e8e6] rounded-lg px-4 py-3.5 text-[#1a1a1a] text-sm placeholder:text-[#a0a0a0] focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa]/20 focus:outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm text-[#6b6b6b] font-medium mb-1.5">
          What platform(s) are you on?
        </label>
        <input
          type="text"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="YouTube, Instagram, TikTok..."
          className="w-full bg-white border border-[#e8e8e6] rounded-lg px-4 py-3.5 text-[#1a1a1a] text-sm placeholder:text-[#a0a0a0] focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa]/20 focus:outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm text-[#6b6b6b] font-medium mb-1.5">
          Timeline — is this urgent or exploratory?
        </label>
        <input
          type="text"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="No rush, just exploring"
          className="w-full bg-white border border-[#e8e8e6] rounded-lg px-4 py-3.5 text-[#1a1a1a] text-sm placeholder:text-[#a0a0a0] focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa]/20 focus:outline-none transition-all"
        />
      </div>

      <div>
        <label className="block text-sm text-[#6b6b6b] font-medium mb-1.5">
          Your email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="you@example.com"
          className="w-full bg-white border border-[#e8e8e6] rounded-lg px-4 py-3.5 text-[#1a1a1a] text-sm placeholder:text-[#a0a0a0] focus:border-[#00d4aa] focus:ring-1 focus:ring-[#00d4aa]/20 focus:outline-none transition-all"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full bg-[#00d4aa] text-white px-7 py-3.5 rounded-lg font-medium text-sm hover:bg-[#00c49e] transition-all shadow-[0_1px_2px_rgba(0,212,170,0.3)] hover:shadow-[0_4px_12px_rgba(0,212,170,0.25)] mt-6${isLoading ? ' opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Sending...' : "Let's talk"}
      </button>

      {status === 'error' && errorMessage && (
        <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
}
