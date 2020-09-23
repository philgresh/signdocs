/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import DocDetails from './DocDetails';
import {
  fetchDocument,
  deleteDocument as deleteAction,
} from '../../../actions/document';
import {
  getDocumentById,
  getAssociatedUsers,
  getCurrentUser,
} from '../../../reducers/selectors';

const DocDetailsContainer = () => {
  const [loading, setLoading] = useState(true);
  const [doc, setDoc] = useState(null);

  const dispatch = useDispatch();
  const { docId } = useParams();

  const staleDocData = useSelector((state) => getDocumentById(docId)(state));
  const currentUser = useSelector(getCurrentUser);
  const associatedUsers = useSelector((state) =>
    getAssociatedUsers(docId)(state),
  );
  const { editors, owner } = associatedUsers;

  const deleteDocument = () => dispatch(deleteAction(docId));

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchDocument(docId)).then((res) => {
        setDoc(res.document);
        setLoading(false);

        document.title = `SignDocs - ${res.document.title}`;
      });
    };

    fetchData();
  }, []);

  const newDoc = doc
    ? {
        ...doc,
        editors,
        owner,
        isOwner: owner.id === currentUser.id,
      }
    : {};

  return loading || !doc ? (
    <div>Loading...</div>
  ) : (
    <div>
      {newDoc && (
        <DocDetails
          doc={newDoc}
          currentUser={currentUser}
          deleteDocument={deleteDocument}
        />
      )}
    </div>
  );
};

// class DocDetailsContainer extends Component {
//   componentDidMount() {
//     const { fetchDocument: fetchDoc, doc } = this.props;
//     fetchDoc();
//     if (doc) {
//       document.title = `SignDocs - ${doc.title}`;
//     }
//   }

//   render() {
//     if (!this.props.doc || Object.keys(this.props.doc).length === 0)
//       return <div />;
//     const {
//       doc,
//       associatedUsers: { editors, owner },
//       currentUser,
//       deleteDocument,
//       fetchSignedUrl,
//     } = this.props;
//     const newDoc = {
//       ...doc,
//       editors,
//       owner,
//       isOwner: owner.id === currentUser.id,
//     };
//     return (
//       <div>
//         {newDoc && (
//           <DocDetails
//             doc={newDoc}
//             currentUser={currentUser}
//             deleteDocument={deleteDocument}
//             fetchSignedUrl={fetchSignedUrl}
//           />
//         )}
//       </div>
//     );
//   }
// }

// DocDetailsContainer.propTypes = {
//   doc: DocPropTypeShape.isRequired,
//   associatedUsers: PropTypes.shape({
//     editors: PropTypes.arrayOf(UserPropTypeShape),
//     owner: UserPropTypeShape,
//   }).isRequired,
//   fetchDocument: PropTypes.func.isRequired,
//   deleteDocument: PropTypes.func.isRequired,
//   fetchSignedUrl: PropTypes.func.isRequired,
//   currentUser: UserPropTypeShape.isRequired,
// };

// const mapStateToProps = (state, ownProps) => {
//   const { docId } = ownProps.match.params;
//   return {
//     doc: getDocumentById(docId)(state),
//     associatedUsers: getAssociatedUsers(docId)(state),
//     currentUser: getCurrentUser(state),
//   };
// };

// const mapDispatchToProps = (dispatch, ownProps) => {
//   const { docId } = ownProps.match.params;
//   return {
//     fetchDocument: () => dispatch(fetchDocument(docId)),
//     deleteDocument: () => dispatch(delDoc(docId)),
//     fetchSignedUrl: () => dispatch(fetchUrl(docId)),
//   };
// };

export default withRouter(DocDetailsContainer);
