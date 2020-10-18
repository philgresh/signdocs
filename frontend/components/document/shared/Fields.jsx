import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useParams } from 'react-router-dom';
import ItemTypes from './ItemTypes';

function* tempId() {
  let index = new Date().valueOf();

  while (true) {
    // eslint-disable-next-line no-plusplus
    yield index++;
  }
}

//  x 	          decimal percent of page from left
//  y 	          decimal percent of page from top
//  widthPct      decimal ratio of width to page width
//  aspectRatio 	decimal ratio of width to height
//  page 	        page of the document (1-based index)

const defaultSignatureBBOX = Object.freeze({
  x: 0,
  y: 0,
  page: 1,
  widthPct: 0.162,
  aspectRatio: 3,
  initial: true,
});

const defaultTextboxBBOX = Object.freeze({
  x: 0,
  y: 0,
  page: 1,
  widthPct: 0.277,
  aspectRatio: 11.33,
  initial: true,
});

const FieldItem = (props) => {
  const { children, disabled, type } = props;
  const [, drag] = useDrag({
    canDrag: !disabled,
    item: {
      ...props,
      hideSourceOnDrag: true,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  let classNames = 'draggable';
  if (disabled) classNames += ' disabled-drag';
  return (
    <li ref={drag} className={classNames} id={`FIELD-${type}`}>
      {children}
    </li>
  );
};

FieldItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

FieldItem.defaultProps = {
  children: null,
};

const Fields = ({ currSignatory }) => {
  const { docId } = useParams();
  // const tempId = () => `${new Date().valueOf()}`;

  const idGenerator = tempId();

  return (
    <>
      <h2>Fields</h2>
      <hr />
      <ul>
        <FieldItem
          signatoryId={currSignatory}
          type={ItemTypes.UNFILLED_SIGNATURE}
          id={idGenerator.next().value}
          docId={docId}
          disabled={!currSignatory}
          bbox={defaultSignatureBBOX}
        >
          Signature
        </FieldItem>
        <FieldItem
          signatoryId={currSignatory}
          type={ItemTypes.UNFILLED_TEXT}
          id={idGenerator.next().value}
          docId={docId}
          disabled={!currSignatory}
          placeholder="CURRENT_DATE"
          bbox={defaultTextboxBBOX}
        >
          <p>Date of Signature</p>
        </FieldItem>
        <FieldItem
          signatoryId={currSignatory}
          type={ItemTypes.UNFILLED_TEXT}
          id={idGenerator.next().value}
          docId={docId}
          disabled={!currSignatory}
          placeholder="SIGNEE_NAME"
          bbox={defaultTextboxBBOX}
        >
          <p>Signee&apos;s name</p>
        </FieldItem>
      </ul>
    </>
  );
};

Fields.propTypes = { currSignatory: PropTypes.string.isRequired };

export default Fields;
