/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SvgLoader } from 'react-svgmt';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RecentActivity from './RecentActivity';
import Summary from './Summary';
import {
  getCurrentUserSig,
  getDocumentsAsArray,
  getSummary,
} from '../../reducers/selectors';

const Home = ({
  currentUser,
  fetchDocuments,
  fetchSignature,
  fetchSummary,
}) => {
  const [loading, setLoading] = useState(true);

  const sig = useSelector((state) => getCurrentUserSig()(state));
  const docs = useSelector(getDocumentsAsArray);
  const summary = useSelector(getSummary);

  useEffect(() => {
    const fetchData = async () => {
      return Promise.all([
        fetchSignature(currentUser.sigId),
        fetchDocuments(),
        fetchSummary(),
      ]);
    };

    fetchData().finally(() => setLoading(false));
  }, []);

  return (
    <div className="main-container home">
      <div className="top-background-gradient" />
      <div className="top-actions">
        <div className="home-sig-link" role="presentation">
          {sig && sig.imageUrl && (
            <Link to="profile">
              <SvgLoader path={sig.imageUrl} />
            </Link>
          )}
        </div>
        {summary && Object.keys(summary).length > 0 && (
          <Summary summary={summary} />
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
  fetchSummary: PropTypes.func.isRequired,
};

export default Home;
