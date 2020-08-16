import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocDetails from './DocDetails';
import { fetchDocument } from '../../actions/document';
import { getDocumentById } from '../../reducers/documents';
// import { getAssociatedUsers } from '../../reducers/users';
import { DocPropTypeShape, UserPropTypeShape } from '../propTypes';

class DocDetailsContainer extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.fetchDocument();
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
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { docId } = ownProps.match.params;
  return {
    fetchDocument: () => dispatch(fetchDocument(docId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocDetailsContainer);
