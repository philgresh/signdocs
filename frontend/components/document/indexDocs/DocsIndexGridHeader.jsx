import React from 'react';

const DocsIndexGridHeader = () => {
  return (
    <>
      <div className="docs-index-header selection">&nbsp;</div>
      <div className="docs-index-header subject">Subject</div>
      <div className="docs-index-header status">Status</div>
      <div className="docs-index-header last-change">Last Change</div>
      <div className="docs-index-header actions">&nbsp;</div>
    </>
  );
};

DocsIndexGridHeader.propTypes = {};

export default DocsIndexGridHeader;
