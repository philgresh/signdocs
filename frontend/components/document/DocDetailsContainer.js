import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocDetails from './DocDetails';
import { fetchDocument } from '../../actions/document';
import { getDocumentById, getAssociatedUsers } from '../../reducers/selectors';
import { DocPropTypeShape, UserPropTypeShape } from '../propTypes';

class DocDetailsContainer extends Component {
  componentDidMount() {
    const { fetchDocument: fetchDoc } = this.props;
    fetchDoc();
  }

  render() {
    const { doc, editors } = this.props;
    if (Object.keys(doc).length === 0) return <div />;
    return (
      <div>
        <DocDetails doc={doc} editors={editors} />
      </div>
    );
  }
}

DocDetailsContainer.propTypes = {
  doc: DocPropTypeShape,
  editors: PropTypes.arrayOf(UserPropTypeShape),
  fetchDocument: PropTypes.func.isRequired,
};

DocDetailsContainer.defaultProps = {
  doc: {},
  editors: [],
};

const mapStateToProps = (state, ownProps) => {
  const { docId } = ownProps.match.params;
  return {
    doc: getDocumentById(docId)(state),
    editors: getAssociatedUsers(docId)(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { docId } = ownProps.match.params;
  return {
    fetchDocument: () => dispatch(fetchDocument(docId)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DocDetailsContainer),
);
