import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Summary = ({ summary: { docIdsToSign, docIdsWaitingOnOthers } }) => {
  const countToSign = docIdsToSign.length;
  const countWaiting = docIdsWaitingOnOthers.length;

  let linkToSign = '/documents?tosign=true';
  let linkToWaiting = '/documents';

  if (countToSign === 1) linkToSign = `/documents/${docIdsToSign[0]}`;
  if (countWaiting === 1)
    linkToWaiting = `/documents/${docIdsWaitingOnOthers[0]}`;

  return (
    <div className="summary">
      <Link to={linkToSign}>
        <span className="num">{countToSign}</span>
        <span className="text">Signature Required</span>
      </Link>
      <div className="vert-bar" />
      <Link to={linkToWaiting}>
        <span className="num">{countWaiting}</span>
        <span className="text">Waiting for Others</span>
      </Link>
    </div>
  );
};

Summary.propTypes = {
  summary: PropTypes.shape({
    docIdsToSign: PropTypes.arrayOf(PropTypes.string),
    docIdsWaitingOnOthers: PropTypes.arrayOf(PropTypes.string),
  }),
};

Summary.defaultProps = {
  summary: {
    docIdsToSign: [],
    docIdsWaitingOnOthers: [],
  },
};

export default Summary;
