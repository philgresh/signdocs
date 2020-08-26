import React from 'react';
// import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './dnd/ItemTypes';

const FieldSideBar = () => {
  const [, drag] = useDrag({
    item: {
      id: '321312412',
      name: 'Signature',
      title: 'SignatureTitle',
      left: 0,
      top: 0,
      type: ItemTypes.SIG,
      hideSourceOnDrag: true,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div className="field-side-bar">
      <h2>Fields</h2>
      <hr />

      <div ref={drag} className="droppable">
        Signature
      </div>
    </div>
  );
};

FieldSideBar.propTypes = {};

export default FieldSideBar;
