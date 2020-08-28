/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignature } from '@fortawesome/free-solid-svg-icons';
import { getUserDetails } from '../../../reducers/selectors';
import { deleteContentField } from '../../../actions/contentFields';
import ItemTypes from './ItemTypes';

const DraggableBox = ({ cfData }) => {
  const dispatch = useDispatch();
  const {
    type,
    bbox: { x, y, width, height },
    hideSourceOnDrag = false,
    assigneeId,
    placeholder,
  } = cfData;
  const onRemove = () => dispatch(deleteContentField(cfData.id));
  const assignee = useSelector(getUserDetails(assigneeId));
  const assigneeName = `${assignee.firstName}\u00A0${assignee.lastName}`;

  const [{ isDragging }, drag] = useDrag({
    item: { ...cfData, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  let component = null;
  switch (type) {
    case ItemTypes.UNFILLED_SIGNATURE: {
      component = (
        <div className="signature-box unfilled">
          <FontAwesomeIcon icon={faSignature} color="inherit" />
          {assigneeName}
        </div>
      );
      break;
    }
    case ItemTypes.UNFILLED_TEXT: {
      component = <div className="textbox-box unfilled">{placeholder}</div>;
      break;
    }
    default:
      break;
  }

  return (
    <div
      ref={drag}
      className="content-field draggable-item"
      style={{ left: x, top: y, width, height }}
    >
      <div className="content-field-description">
        <button className="close flat" type="button" onClick={onRemove}>
          &times;
        </button>
        {component}
      </div>
    </div>
  );
};

export default DraggableBox;
