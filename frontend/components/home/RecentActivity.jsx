import React from 'react';
import PropTypes from 'prop-types';
import NoDocsCallToCreate from '../document/shared/NoDocsCallToCreate';
import { DocPropTypeShape } from '../propTypes';
import RecentActivityCard from './RecentActivityCard';

const NUM_RECENT_DOCS = 6;

const sortedDocs = (docs) =>
  docs.sort((a, b) => a.updatedAt < b.updatedAt).slice(0, NUM_RECENT_DOCS);

const RecentActivity = ({ docs }) => {
  if (docs.length === 0) return <NoDocsCallToCreate />;
  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      <div className="recent-docs">
        {sortedDocs(docs).map((doc) => {
          return <RecentActivityCard key={doc.id} doc={doc} />;
        })}
      </div>
    </div>
  );
};

RecentActivity.propTypes = {
  docs: PropTypes.arrayOf(DocPropTypeShape),
};

RecentActivity.defaultProps = {
  docs: [],
};

export default RecentActivity;
