import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RedirectPage() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('shortUrls')) || [];
    const found = stored.find((item) => item.shortcode === shortcode);
    if (found) {
      window.location.href = found.originalUrl;
    } else {
      navigate('/');
    }
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
}

export default RedirectPage;