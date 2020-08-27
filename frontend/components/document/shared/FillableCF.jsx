/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../reducers/selectors';
import ItemTypes from './ItemTypes';

const FillableCF = ({ cfData }) => {
  const dispatch = useDispatch();
  const {
    type,
    bbox: { x, y, width, height },
    assigneeId,
    placeholder,
    body,
  } = cfData;
  const assignee = useSelector(getUserDetails(assigneeId));
  const assigneeName = `${assignee.firstName}\u00A0${assignee.lastName}`;

  let component = null;
  switch (type) {
    case ItemTypes.UNFILLED_SIGNATURE: {
      component = <div className="signature-box">{assigneeName}</div>;
      break;
    }
    case ItemTypes.UNFILLED_TEXT: {
      component = <div className="textbox-box">{placeholder}</div>;
      break;
    }
    case ItemTypes.FILLED_TEXT: {
      component = <div className="textbox-box">{body}</div>;
      break;
    }
    case ItemTypes.FILLED_SIGNATURE: {
      component = <div className="textbox-box">{body}</div>;
      break;
    }
    default:
      break;
  }

  return (
    <div className="content-field" style={{ left: x, top: y, width, height }}>
      <div className="content-field-description">{component}</div>
    </div>
  );
};

export default FillableCF;
