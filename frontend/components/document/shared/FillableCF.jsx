/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { getUserDetails, getCurrentUser } from '../../../reducers/selectors';
import ItemTypes from './ItemTypes';
import FilledSignature from './FilledSignature';
import { convertBBOXtoPixels } from '../../../utils/contentField';

const FillableCF = ({ cfData, thisPage, signField }) => {
  const { id, type, bbox, signatoryId, placeholder, body } = cfData;
  const currUser = useSelector(getCurrentUser);
  const signatory = useSelector(getUserDetails(signatoryId));
  const signatoryName = `${signatory.firstName}\u00A0${signatory.lastName}`;
  const signable = currUser.id === signatoryId;
  const filled = /^FILLED/.test(type);

  const onClick = () => {
    if (signable && !filled) signField(id);
  };

  let component = null;
  let fillable = false;
  const newBBOX = convertBBOXtoPixels(bbox, thisPage);
  const { left, top, width, height } = newBBOX;

  switch (type) {
    case ItemTypes.UNFILLED_SIGNATURE: {
      component = (
        <div className="content-field-description">
          <div className="signature-box">{signatoryName}</div>
        </div>
      );
      fillable = true;
      break;
    }
    case ItemTypes.UNFILLED_TEXT: {
      component = (
        <div className="content-field-description">
          <div className="textbox-box">{placeholder}</div>
        </div>
      );
      fillable = true;
      break;
    }
    case ItemTypes.FILLED_TEXT: {
      component = (
        <div className="content-field-description">
          <div className="textbox-box">{body}</div>
        </div>
      );
      break;
    }
    case ItemTypes.FILLED_SIGNATURE: {
      component = <FilledSignature signatory={signatory} bbox={newBBOX} />;
      break;
    }
    default:
      break;
  }

  const containerClasses = clsx({
    'content-field': true,
    fillable,
    signable: fillable && signable,
  });

  return (
    <div
      className={containerClasses}
      style={{ left, top, width, height }}
      onClick={onClick}
      role="presentation"
    >
      {component}
    </div>
  );
};

export default FillableCF;
