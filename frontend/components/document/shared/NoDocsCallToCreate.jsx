import React from 'react';
import { Link } from 'react-router-dom';

const NoDocsCallToCreate = () => (
  <div className="call-to-create">
    <h2>You have no documents yet!</h2>
    <p>
      <Link to="/documents/new">Create a new document</Link>.
    </p>
  </div>
);

export default NoDocsCallToCreate;
