import React from 'react';
// import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useParams } from 'react-router-dom';
import ItemTypes from './ItemTypes';

const FieldItem = (props) => {
  const { currAssignee, type, id, docId, children } = props;
  console.log(props);
  const [, drag] = useDrag({
    item: {
      id,
      docId,
      type,
      name: 'Signature',
      title: children,
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
          type={ItemTypes.UNFILLED_SIGNATURE}
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
