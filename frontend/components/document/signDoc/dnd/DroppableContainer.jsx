/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import find from 'lodash/find';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ItemTypes from './ItemTypes';
import Box from './Box';
import { receiveContentField } from '../../../../actions/contentFields';
import { getArrayOfContentFieldsByDocId } from '../../../../reducers/selectors';

const DroppableContainer = ({ children, className, thisPage }) => {
  const { docId } = useParams();
  const dispatch = useDispatch();
  const receiveCF = (cfData) => dispatch(receiveContentField(cfData));

  const contentFields = useSelector((state) => {
    const allCFs = state.entities.contentFields;
    return Object.values(allCFs).filter(
      (ele) => ele.docId === docId && ele.bbox?.page === thisPage,
    );
  });
  // const contentFields = allContentFields.filter(
  //   (ele) => ele.bbox?.page === thisPage,
  // );

  const addCF = (cfData, x, y) => {
    receiveCF({
      ...cfData,
      bbox: {
        ...cfData.bbox,
        x,
        y,
      },
    });
  };
  const moveCF = (cfData, x, y) => {
    receiveCF({
      ...cfData,
      bbox: {
        ...cfData.bbox,
        x,
        y,
      },
    });
  };

  const [, drop] = useDrop({
    accept: [ItemTypes.BOX, ItemTypes.SIG],
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() || { x: 0, y: 0 };
      const x = Math.max(0, Math.round(item.bbox.x + delta.x));
      const y = Math.max(0, Math.round(item.bbox.y + delta.y));

      if (find(contentFields, (ele) => ele.id === item.id)) {
        moveCF(item, x, y);
      } else {
        addCF(item, x, y);
      }
      return undefined;
    },
  });

  return (
    <div ref={drop} className={className}>
      {contentFields.map((cf) => {
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Box key={cf.id} cfData={cf} hideSourceOnDrag>
            <p>
              {/* {title} */}
              Title
            </p>
          </Box>
        );
      })}
      {children}
    </div>
  );
};

DroppableContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string.isRequired,
  thisPage: PropTypes.number.isRequired,
};

export default DroppableContainer;
