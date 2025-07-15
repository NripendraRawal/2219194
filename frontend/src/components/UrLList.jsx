// src/components/URLList.jsx
import React from 'react';

function URLList({ urls }) {
  return (
    <div>
      <h3>Shortened URLs</h3>
      <ul>
        {urls.map((item, index) => (
          <li key={index}>
            <strong>Original:</strong> {item.originalUrl}<br />
            <strong>Short:</strong> 
            <a href={`/${item.shortcode}`} target="_blank" rel="noreferrer">
              http://localhost:3000/{item.shortcode}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default URLList;
