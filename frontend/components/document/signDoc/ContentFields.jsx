/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ItemTypes, FillableCF } from '../shared';
import { updateContentField } from '../../../actions/contentFields';

const DroppableContentFields = ({ children, className, thisPage }) => {
  const { docId } = useParams();
  const dispatch = useDispatch();
  // const createCF = (cfData) => dispatch(createContentField(cfData));
  const updateCF = (cfData) => dispatch(updateContentField(cfData));

  // TODO: Fix this ugliness
  const allCFs = useSelector((state) => state.entities.contentFields);
  const contentFields = Object.values(allCFs).filter(
    (ele) => ele.docId === docId && ele.bbox?.page === thisPage,
  );

  return (
    <>
      {contentFields.map((cf) => {
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <FillableCF cfData={cf} key={cf.id} thisPage={thisPage} />
        );
      })}
    </>
  );
};

DroppableContentFields.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
  thisPage: PropTypes.number.isRequired,
};

DroppableContentFields.defaultProps = {
  className: 'droppable-container',
};

export default DroppableContentFields;
