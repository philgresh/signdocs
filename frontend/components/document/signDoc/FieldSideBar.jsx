import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './dnd/ItemTypes';
import { Box } from './dnd/Box';

const FieldSideBar = () => {
  // const [collectedProps, drag] = useDrag({
  //   item: { id: 'sig' },
  // });
  return (
    <div className="field-side-bar">
      <h2>Fields</h2>
      <hr />

      <Box name="Glass" type={ItemTypes.BOX} />
      <Box name="Banana" type={ItemTypes.BOX} />
      <Box name="Signature" type={ItemTypes.BOX}>
        Signature Child
      </Box>
    </div>
  );
};

FieldSideBar.propTypes = {};

export default FieldSideBar;
