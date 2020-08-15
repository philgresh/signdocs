import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocsIndex from './DocsIndex';
import { fetchDocuments } from '../../actions/document';
import { getDocuments } from '../../reducers/documents';
import DocPropTypeShape from './propTypes';

class DocsIndexContainer extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchDocuments();
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

const mapStateToProps = (state) => ({
  documents: getDocuments(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchDocuments: () => dispatch(fetchDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocsIndexContainer);
