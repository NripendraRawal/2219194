import React, { useState } from 'react';


import '../App.css'
import URLForm from './UrlForm';
import URLList from './UrlList';


function Home() {
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleShorten = (data) => {
    setShortenedUrls((prev) => [...prev, ...data]);
  };

  return (
    <div className="form-container">
      <h2>URL Shortener</h2>
      <URLForm onShorten={handleShorten} />
      <URLList urls={shortenedUrls} />
    </div>
  );
}

export default Home;