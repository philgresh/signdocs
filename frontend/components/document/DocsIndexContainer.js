import React, { Component } from 'react';
import { connect } from 'react-redux';
import DocsIndex from './DocsIndex';
import { fetchDocuments } from '../../actions/document';
import { getDocuments } from '../../reducers/documentsReducer';

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

const mapStateToProps = (state) => ({
  documents: getDocuments(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchDocuments: () => dispatch(fetchDocuments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocsIndexContainer);
