/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { getUserDetails } from '../../../reducers/selectors';
import { deleteContentField } from '../../../actions/contentFields';
import ItemTypes from './ItemTypes';
import { convertBBOXtoPixels } from '../../../utils/contentField';
import { UnfilledSignature, UnfilledTextBox } from './UnfilledCFs';

const DraggableBox = ({ cfData, thisPage }) => {
  const dispatch = useDispatch();
  const {
    type,
    bbox,
    hideSourceOnDrag = false,
    signatoryId,
    placeholder,
  } = cfData;
  const onRemove = () => dispatch(deleteContentField(cfData.id));
  const signatory = useSelector(getUserDetails(signatoryId));

  const [{ isDragging, opacity }, drag, preview] = useDrag({
    item: { ...cfData, type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  const style = convertBBOXtoPixels(bbox, thisPage);

  if (type === ItemTypes.UNFILLED_SIGNATURE)
    return (
      <div
        ref={preview}
        className="content-field draggable-item"
        style={{ ...style, opacity }}
      >
        <UnfilledSignature
          onRemove={onRemove}
          signatoryName={signatory.fullName}
          width={style.width}
          height={style.height}
          ref={drag}
        />
      </div>
    );

  if (type === ItemTypes.UNFILLED_TEXT)
    return (
      <div
        ref={preview}
        className="content-field draggable-item fillable"
        style={{ ...style, opacity }}
      >
        <UnfilledTextBox
          placeholder={placeholder}
          onRemove={onRemove}
          width={style.width}
          height={style.height}
          ref={drag}
        />
      </div>
    );
};

export default DraggableBox;
