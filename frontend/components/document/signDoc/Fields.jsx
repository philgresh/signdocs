import React, { Children } from 'react';
// import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useParams } from 'react-router-dom';
import ItemTypes from './dnd/ItemTypes';

const FieldItem = ({ currAssignee, type, id, docId, children }) => {
  const [, drag] = useDrag({
    item: {
      id,
      docId,
      type,
      name: 'Signature',
      title: 'SignatureTitle',
      bbox: {
        x: 0,
        y: 0,
        page: 1,
        width: 100,
        height: 50,
      },
      assigneeId: currAssignee,
      hideSourceOnDrag: true,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <li ref={drag} className="droppable">
      {children}
    </li>
  );
};

const Fields = ({ currAssignee }) => {
  const { docId } = useParams();
  const tempId = () => `${new Date().valueOf()}`;

  return (
    <>
      <h2>Fields</h2>
      <hr />
      <ul>
        <FieldItem
          currAssignee={currAssignee}
          type={ItemTypes.SIG}
          id={tempId()}
          docId={docId}
        >
          Signature
        </FieldItem>
      </ul>
    </>
  );
};

Fields.propTypes = {};

export default Fields;
