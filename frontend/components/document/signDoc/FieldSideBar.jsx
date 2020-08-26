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

      <Box
        name="Signature"
        title="SignatureTitle"
        type={ItemTypes.BOX}
        id="321312412"
        left={0}
        top={0}
        hideSourceOnDrag
      >
        Signature
      </Box>
    </div>
  );
};

FieldSideBar.propTypes = {};

export default FieldSideBar;
