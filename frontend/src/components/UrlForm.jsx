// src/components/URLForm.jsx
import React, { useState } from 'react';
import { nanoid } from 'nanoid';

function URLForm({ onShorten }) {
  const [urls, setUrls] = useState([{ originalUrl: '', shortcode: '', expiry: '' }]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addField = () => {
    if (urls.length < 5)
      setUrls([...urls, { originalUrl: '', shortcode: '', expiry: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntries = urls.map((entry) => {
      const expiryMinutes = parseInt(entry.expiry) || 30;
      return {
        originalUrl: entry.originalUrl,
        shortcode: entry.shortcode.trim() || nanoid(6),
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + expiryMinutes * 60000).toISOString(),
        clicks: []
      };
    });

    const existing = JSON.parse(localStorage.getItem('shortUrls')) || [];
    const shortcodes = new Set(existing.map((e) => e.shortcode));

    // Check for duplicates
    for (const entry of newEntries) {
      if (shortcodes.has(entry.shortcode)) {
        alert(`Shortcode '${entry.shortcode}' already exists. Please choose a different one.`);
        return;
      }
    }

    const all = [...existing, ...newEntries];
    localStorage.setItem('shortUrls', JSON.stringify(all));
    onShorten(newEntries);
    setUrls([{ originalUrl: '', shortcode: '', expiry: '' }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {urls.map((entry, index) => (
        <div key={index}>
          <input
            type="url"
            placeholder="Enter original URL"
            value={entry.originalUrl}
            onChange={(e) => handleChange(index, 'originalUrl', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Optional custom shortcode"
            value={entry.shortcode}
            onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
          />
          <input
            type="number"
            placeholder="Validity (minutes) — default 30"
            value={entry.expiry}
            onChange={(e) => handleChange(index, 'expiry', e.target.value)}
            min="1"
          />
        </div>
      ))}
      <button type="button" onClick={addField}>Add More</button>
      <button type="submit">Shorten URLs</button>
    </form>
  );
}

export default URLForm;
