/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from 'react';
// import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { deleteContentField } from '../../../../actions/contentFields';
import ItemTypes from '../ItemTypes';

const Box = ({ cfData, children }) => {
  const dispatch = useDispatch();

  const onRemove = () => dispatch(deleteContentField(cfData.id));

  const {
    bbox: { x, y, width, height },
    hideSourceOnDrag = false,
    type = ItemTypes.BOX,
  } = cfData;

  const [{ isDragging }, drag] = useDrag({
    item: { ...cfData, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div
      ref={drag}
      className="droppable-item"
      style={{ left: x, top: y, width, height }}
    >
      <button className="close flat" type="button" onClick={onRemove}>
        &times;
      </button>
      {children}
    </div>
  );
};

// Box.propTypes = {
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

// Box.defaultProps = {
//   left: 0,
//   top: 0,
//   page: 1,
//   hideSourceOnDrag: true,
//   children: null,
// };

export default Box;
