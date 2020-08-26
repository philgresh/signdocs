/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import PDF from './PDF';
import { DocPropTypeShape, ContentFieldPropTypeShape } from '../../propTypes';

const PDFContainer = ({
  doc,
  contentFields,
  receiveContentField,
  removeContentField,
}) => {
  const cfActions = { receiveContentField, removeContentField };

  return <PDF doc={doc} contentFields={contentFields} cfActions={cfActions} />;
};

PDFContainer.propTypes = {
  doc: PropTypes.shape({
    ...DocPropTypeShape,
    fileUrl: PropTypes.string.isRequired,
  }).isRequired,
  contentFields: PropTypes.arrayOf(ContentFieldPropTypeShape).isRequired,
  receiveContentField: PropTypes.func.isRequired,
  removeContentField: PropTypes.func.isRequired,
};

export default PDFContainer;
