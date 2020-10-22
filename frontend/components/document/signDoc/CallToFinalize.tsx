import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { finalizeDocument } from '../../../actions/document';

const CallToFinalize: React.FunctionComponent<{
  docId: string;
  allCFsAreSigned: boolean;
  isOwner: boolean;
}> = ({ docId, allCFsAreSigned, isOwner }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onClick = (e: React.SyntheticEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    dispatch(finalizeDocument(docId)).then((res) => {
      if (res.document) {
        const { title, fileUrl } = res.document;
        window.open(fileUrl, `${title} - Final`);
        history.push(`/documents/${docId}`);
      }
    });
  };

  return (
    <div className="call-to-finalize">
      <h2>Congratulations!</h2>
      <p>All of your document&apos;s fields have been signed.</p>
      {isOwner && allCFsAreSigned && (
        <p>
          Click&nbsp;
          <button type="button" onClick={onClick}>
            here
          </button>
          &nbsp;to finalize your document and have the completed version sent to
          your signatories.
        </p>
      )}
    </div>
  );
};

export default CallToFinalize;
