import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useParams } from 'react-router-dom';
import ItemTypes from './ItemTypes';

const FieldItem = (props) => {
  const { currAssignee, children, disabled } = props;
  const [, drag] = useDrag({
    canDrag: !disabled,
    item: {
      ...props,
      assigneeId: currAssignee,
      bbox: {
        x: 0,
        y: 0,
        page: 1,
        width: 100,
        height: 50,
      },
      hideSourceOnDrag: true,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  let classNames = 'draggable';
  if (disabled) classNames += ' disabled-drag';
  return (
    <li ref={drag} className={classNames}>
      {children}
    </li>
  );
};

FieldItem.propTypes = {
  currAssignee: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.element,
  ]),
  disabled: PropTypes.bool.isRequired,
};

FieldItem.defaultProps = {
  children: null,
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
          disabled={!currAssignee}
        >
          Signature
        </FieldItem>
      </ul>
    </>
  );
};

Fields.propTypes = { currAssignee: PropTypes.string.isRequired };

export default Fields;
