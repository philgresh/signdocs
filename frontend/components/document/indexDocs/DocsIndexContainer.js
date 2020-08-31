/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocsIndex from './DocsIndex';
import Sidebar from './Sidebar';
import NoDocsCallToCreate from '../shared/NoDocsCallToCreate';
import { fetchDocuments, deleteDocument } from '../../../actions/document';
import {
  getDocumentsAsArray,
  getCurrentUser,
} from '../../../reducers/selectors';
import { DocPropTypeShape, UserPropTypeShape } from '../../propTypes';

const DocsIndexContainer = (props) => {
  const { fetchDocs, currentUser, deleteDoc } = props;
  // eslint-disable-next-line react/destructuring-assignment
  const [docs, setDocs] = useState(props.docs);
  useEffect(() => {
    document.title = `SignDocs - Documents`;

    const fetchData = async () => {
      const docsResult = await fetchDocs();
      const arrayifiedDocs = Object.values(docsResult.documents);
      setDocs(arrayifiedDocs);
    };

    fetchData();
  }, []);

  return (
    <div className="index-container">
      <Sidebar />
      <div className="index-inbox">
        <div className="search-bar">
          <h2>Inbox</h2>
        </div>

        {docs.length > 0 ? (
          <DocsIndex
            docs={docs}
            currentUser={currentUser}
            deleteDocument={deleteDoc}
          />
        ) : (
          <NoDocsCallToCreate />
        )}
      </div>
    </div>
  );
};

DocsIndexContainer.propTypes = {
  docs: PropTypes.arrayOf(DocPropTypeShape),
  fetchDocs: PropTypes.func.isRequired,
  deleteDoc: PropTypes.func.isRequired,
  currentUser: UserPropTypeShape.isRequired,
};

DocsIndexContainer.defaultProps = {
  docs: [],
};

const mapStateToProps = (state) => ({
  docs: getDocumentsAsArray(state),
  currentUser: getCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchDocs: () => dispatch(fetchDocuments()),
  deleteDoc: (docId) => dispatch(deleteDocument(docId)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocsIndexContainer),
);
