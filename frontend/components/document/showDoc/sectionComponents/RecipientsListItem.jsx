/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
// import { UserPropTypeShape } from '../../../propTypes';
import {
  getCurrentUser,
  getArrayOfContentFieldsByDocId,
  getDocumentById,
} from '../../../../reducers/selectors';
import ProgressCircle from '../../../helperComponents/ProgressCircle';

const RecipientsListItem = ({
  index,
  user: { id: userId, fullName, email },
}) => {
  const userNameText = fullName;
  const { docId } = useParams();
  const doc = useSelector(getDocumentById(docId));
  const currentUser = useSelector(getCurrentUser);
  const cfs = useSelector(getArrayOfContentFieldsByDocId(docId));
  const isMe = currentUser.id === userId;

  const userCFs = cfs.filter((cf) => cf.signatoryId === userId);
  const countSigned = userCFs.reduce((acc, curr) => {
    if (/^FILLED/.test(curr.type)) return acc + 1;
    return acc;
  }, 0);

  const isFinal = doc.status === 'Final';
  const anySigned = countSigned > 0;
  const allSigned = anySigned && countSigned === userCFs.length;
  const signedPercent = (countSigned / userCFs.length) * 100;

  const StatusText = () => {
    if (isFinal) return 'Signed';
    if (allSigned)
      return isMe ? (
        <Link to={`/documents/${docId}/sign`}>Signed</Link>
      ) : (
        'Signed'
      );
    if (anySigned)
      return isMe ? (
        <Link to={`/documents/${docId}/sign`}>In Progress</Link>
      ) : (
        'In Progress'
      );
    return isMe ? (
      <Link to={`/documents/${docId}/sign`}>Not yet signed</Link>
    ) : (
      'Not yet signed'
    );
  };

  const StatusIcon = () => {
    if (anySigned) {
      if (allSigned) return <FontAwesomeIcon icon={faCheck} color="green" />;
      return <ProgressCircle radius={15} stroke={4} progress={signedPercent} />;
    }
    return <FontAwesomeIcon icon={faTimes} color="orange" />;
  };

  return (
    <>
      <div className="grid-row-index">{index}</div>
      <div className="grid-row-status">
        {/* <FontAwesomeIcon icon={faSpinner} color="gray" /> */}
      </div>
      <div className="grid-row-user">
        <div>
          <strong>{userNameText}</strong>
        </div>
        <div>
          <p>{email}</p>
        </div>
      </div>
      <div className="grid-row-signed-icon">
        <StatusIcon />
      </div>
      <div className="grid-row-signed-at">
        <div>
          <strong>
            <StatusText />
          </strong>
        </div>
        <div>
          <p>{/* Signed date goes here */}</p>
        </div>
        <div>
          <p>{/* Signed location goes here */}</p>
        </div>
      </div>
    </>
  );
};

// RecipientsListItem.propTypes = {
//   index: PropTypes.number.isRequired,
//   status: PropTypes.string,
//   user: PropTypes.shape({
//     ...UserPropTypeShape,
//     id: PropTypes.string,
//     firstName: PropTypes.string,
//     lastName: PropTypes.string,
//     email: PropTypes.string,
//   }).isRequired,
// };

// RecipientsListItem.defaultProps = {
//   status: 'In Progress',
// };

export default RecipientsListItem;
