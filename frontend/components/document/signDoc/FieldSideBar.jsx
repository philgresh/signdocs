import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './dnd/ItemTypes';
import { Box } from './dnd/Box';

const FieldSideBar = () => {
  const [collectedProps, drag] = useDrag({
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

      <div ref={drag}>Signature</div>
    </div>
  );
};

FieldSideBar.propTypes = {};

export default FieldSideBar;
