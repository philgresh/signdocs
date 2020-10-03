import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import FillableCF from '../shared/FillableCF';
import { signContentField } from '../../../actions/contentFields';

const ContentFields = ({ thisPage }) => {
  const { docId } = useParams();
  const dispatch = useDispatch();
  const signCF = (cfId) => dispatch(signContentField(cfId));

  // TODO: Fix this ugliness
  const allCFs = useSelector((state) => state.entities.contentFields);
  const contentFields = Object.values(allCFs).filter((ele) => {
    return ele.docId === docId && ele.bbox?.page === thisPage;
  });

  return (
    <>
      {contentFields.map((cf) => {
        return (
          <FillableCF
            key={cf.id}
            cfData={cf}
            thisPage={thisPage}
            signField={signCF}
          />
        );
      })}
    </>
  );
};

ContentFields.propTypes = {
  thisPage: PropTypes.number.isRequired,
};

export default ContentFields;
