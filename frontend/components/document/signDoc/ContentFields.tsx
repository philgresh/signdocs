import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import FillableCF from '../shared/FillableCF';
import { signContentField } from '../../../actions/contentFields';
import { CFProps } from '../../tsProps';

type ContentFieldsProps = {
  thisPage: number;
};

const ContentFields = ({ thisPage }: ContentFieldsProps) => {
  const { docId } = useParams();
  const dispatch = useDispatch();
  const signCF = (cfId: string) => dispatch(signContentField(cfId));

  const cfFilter = (ele: CFProps) => {
    return ele.docId === docId && ele.bbox?.page === thisPage;
  };

  // TODO: Fix this ugliness
  const allCFs = useSelector(
    (state: { entities: { contentFields: CFProps[] } }) =>
      state.entities.contentFields,
  );
  const contentFields = Object.values(allCFs).filter(cfFilter);

  return (
    <>
      {contentFields.map((cf: CFProps) => {
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

export default ContentFields;
