import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { DocPropTypeShape } from '../propTypes';

const RecentActivityCard = ({
  doc: { title, status, updatedAt, id: docId },
}) => {
  const updatedAtText = moment(updatedAt).format('M/D/YYYY | hh:mm a');
  return (
    <div className="card">
      <Link to={`/documents/${docId}`}>
        <div className="title">{title}</div>
        <div className="status">{status}</div>
        <div className="updated-at">
          Last activity: <time dateTime={updatedAt}>{updatedAtText}</time>
        </div>
      </Link>
    </div>
  );
};

RecentActivityCard.propTypes = {
  doc: DocPropTypeShape.isRequired,
};

export default RecentActivityCard;
