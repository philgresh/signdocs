/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import DocDetails from './DocDetails';
import FourOhFour from '../../_404';
import { useFetchDoc } from '../../../utils/hooks';

const DocDetailsContainer = () => {
  const history = useHistory();
  const { docId } = useParams();

  const { docErrors, doc, loading } = useFetchDoc({ docId });

  if (loading || !doc || doc === undefined) return <div>Loading...</div>;
  if (docErrors?.status === 404)
    return <FourOhFour from={history.location.pathname} errors={docErrors} />;
  return <DocDetails doc={doc} />;
};

export default withRouter(DocDetailsContainer);
