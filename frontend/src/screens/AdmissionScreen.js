import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { Helmet } from 'react-helmet-async';

const CounsellingScreen = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading to false when the iframe content is loaded
    const handleLoad = () => setLoading(false);
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  useEffect(() => {
    // Scroll to the top when the route changes
    window.scrollTo(0, 0);
    // Set loading to true when the route changes
    setLoading(true);
  }, [location]);

  return (
    <div>
      <Helmet>
        <title>Admission</title>
      </Helmet>
      {loading && (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdmo54YWM9QL7aa_b3CkbQFGhjugcfmRcXyBFhvQ8gt7y5Whg/viewform?embedded=true"
        width="100%"
        height="1008"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        onLoad={() => setLoading(false)} // Hide the spinner when iframe content is loaded
        style={{ display: loading ? 'none' : 'block' }} // Hide iframe while loading
      ></iframe>
    </div>
  );
};

export default CounsellingScreen;
