/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import DocDetails from './DocDetails';
import FourOhFour from '../../_404';
import { fetchDocument } from '../../../actions/document';
import {
  getDocumentById,
  getAssociatedUsers,
  getCurrentUser,
  getErrorsAt,
} from '../../../reducers/selectors';
import { useFetchDoc } from '../shared/hooks';

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
