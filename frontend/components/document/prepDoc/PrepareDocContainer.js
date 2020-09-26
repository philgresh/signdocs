/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PrepPDF from './PrepPDF';
import { Fields, Signatories } from '../shared';
import FourOhFour from '../../_404';
import { getSignatories } from '../../../reducers/selectors';
import { useFetchDoc } from '../../../utils/hooks';

const PrepareDocContainer = () => {
  const [currSignatory, setCurrSignatory] = useState('');

  const history = useHistory();
  const { docId } = useParams();

  const { docErrors, doc, loading } = useFetchDoc({ docId });
  const signatories = useSelector(getSignatories(docId));

  if (loading || !doc || doc === undefined) return <div>Loading...</div>;
  if (docErrors?.status === 404)
    return <FourOhFour from={history.location.pathname} errors={docErrors} />;
  return (
    <div className="sign-doc-container">
      <h2>Prepare your document for signatures</h2>
      <div className="pdf-drag-container">
        <DndProvider backend={HTML5Backend}>
          <div className="side-bar">
            <Signatories
              currSignatory={currSignatory}
              signatories={signatories}
              onChangeSignatory={(sigId) => setCurrSignatory(sigId)}
            />
            <Fields currSignatory={currSignatory} />
          </div>
          {doc && doc.fileUrl && <PrepPDF doc={doc} />}
        </DndProvider>
      </div>
    </div>
  );
};

// const PrepareDocContainer = () => {
//   const dispatch = useDispatch();
//   const { docId } = useParams();

//   const [loading, setLoading] = useState(true);
//   const [doc, setDoc] = useState(null);
//   const [currSignatory, setCurrSignatory] = useState('');

//   const signatories = useSelector((state) => getSignatories(docId)(state));
//   const staleDocData = useSelector((state) => getDocumentById(docId)(state));

//   useEffect(() => {
//     const fetchData = async () => {
//       dispatch(fetchDocument(docId)).then((res) => {
//         setDoc(res.document);
//         setLoading(false);

//         document.title = `SignDocs - Sign ${res.document.title}`;
//       });
//     };

//     if (staleDocData) {
//       setDoc(staleDocData);
//     } else fetchData();
//   }, []);

//   return loading ? (
//     <div>Loading...</div>
//   ) : (
//     <div className="sign-doc-container">
//       <h2>Prepare your document for signatures</h2>
//       <div className="pdf-drag-container">
//         <DndProvider backend={HTML5Backend}>
//           <div className="side-bar">
//             <Signatories
//               currSignatory={currSignatory}
//               signatories={signatories}
//               onChangeSignatory={(sigId) => setCurrSignatory(sigId)}
//             />
//             <Fields currSignatory={currSignatory} />
//           </div>
//           {doc && doc.fileUrl && <PrepPDF doc={doc} />}
//         </DndProvider>
//       </div>
//     </div>
//   );
// };

export default withRouter(PrepareDocContainer);
