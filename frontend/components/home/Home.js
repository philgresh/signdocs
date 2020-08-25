import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Home = ({ currentUser, fetchDocuments, fetchSignature }) => {
  let isCurrent = false;
  // useEffect(() => {
  //   if (!isCurrent) {
  //     isCurrent = true;
  //     if (currentUser.sigId) fetchSignature(currentUser.sigId);
  //     fetchDocuments();
  //   }
  // }, [currentUser]);
  return (
    <main>
      <h1>This is the home component</h1>
    </main>
  );
};

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currentUser: PropTypes.object.isRequired,
  fetchDocuments: PropTypes.func.isRequired,
  fetchSignature: PropTypes.func.isRequired,
};

// Home.defaultProps = {
//   currentUser: {},
// };

export default Home;
