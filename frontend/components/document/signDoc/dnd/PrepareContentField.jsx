/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
// import clsx from 'clsx';
import { getUserDetails } from '../../../../reducers/selectors';
import { deleteContentField } from '../../../../actions/contentFields';
import ItemTypes from '../ItemTypes';

const ContentField = ({ cfData }) => {
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
      component = <div className="signature-box">{assigneeName}</div>;
      break;
    }
    case ItemTypes.UNFILLED_TEXT: {
      component = <div className="textbox-box">{placeholder}</div>;
      break;
    }
    default:
      break;
  }

  return (
    <div
      ref={drag}
      className="draggable-item"
      style={{ left: x, top: y, width, height }}
    >
      <div className="draggable-info">
        <button className="close flat" type="button" onClick={onRemove}>
          &times;
        </button>
        {component}
      </div>
    </div>
  );
};

// ContentField.propTypes = {
//   id: PropTypes.string.isRequired,
//   children: PropTypes.oneOfType([
//     PropTypes.func,
//     PropTypes.array,
//     PropTypes.element,
//   ]),
//   left: PropTypes.number,
//   top: PropTypes.number,
//   page: PropTypes.number,
//   hideSourceOnDrag: PropTypes.bool,
// };

// ContentField.defaultProps = {
//   left: 0,
//   top: 0,
//   page: 1,
//   hideSourceOnDrag: true,
//   children: null,
// };

export default ContentField;
