import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DocsIndex from './DocsIndex';
import { fetchDocuments } from '../../actions/document';
import { getDocumentsAsArray } from '../../reducers/selectors';
import { DocPropTypeShape } from '../propTypes';

class DocsIndexContainer extends Component {
  componentDidMount() {
    const { fetchDocuments: fetchDocs } = this.props;
    fetchDocs();
  }

  render() {
    const { documents } = this.props;

    return (
      <div>
        <DocsIndex documents={documents} />
      </div>
    );
  }
}

DocsIndexContainer.propTypes = {
  documents: PropTypes.arrayOf(DocPropTypeShape),
  fetchDocuments: PropTypes.func.isRequired,
};

DocsIndexContainer.defaultProps = {
  documents: [],
};

const mapStateToProps = createStructuredSelector({
  documents: getDocumentsAsArray,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDocuments: () => dispatch(fetchDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocsIndexContainer);
