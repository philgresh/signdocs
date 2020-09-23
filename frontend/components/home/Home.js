/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SvgLoader } from 'react-svgmt';
import { Link } from 'react-router-dom';
import RecentActivity from './RecentActivity';

const Home = ({ currentUser, fetchDocuments, fetchSignature }) => {
  const [loading, setLoading] = useState(true);
  const [sig, setSig] = useState({});
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser.sigId) {
        const sigResult = await fetchSignature(currentUser.sigId);
        setSig(sigResult.signature);
      }
      const docsResult = await fetchDocuments();
      if (docsResult?.documents) {
        const arrayifiedDocs = Object.values(docsResult.documents);

        setDocs(arrayifiedDocs);
      }
    };

    fetchData();
    setLoading(false);
  }, []);

  return (
    <div className="main-container home">
      <div className="top-background-gradient" />
      <div className="home-sig-link" role="presentation">
        {sig && sig.imageUrl && (
          <Link to="profile">
            <SvgLoader path={sig.imageUrl} />
          </Link>
        )}
      </div>
      {loading ? <h2>Loading data...</h2> : <RecentActivity docs={docs} />}
    </div>
  );
};

Home.propTypes = {
  currentUser: PropTypes.object.isRequired,
  fetchDocuments: PropTypes.func.isRequired,
  fetchSignature: PropTypes.func.isRequired,
};

export default Home;
