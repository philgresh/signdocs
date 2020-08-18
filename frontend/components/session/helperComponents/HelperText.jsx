import React from 'react';
import PropTypes from 'prop-types';
import humanizeString from 'humanize-string';
import { connect } from 'react-redux';
import { getErrors } from '../../../reducers/selectors';

const HelperText = ({ field, errors }) => {
  if (!errors[field]) return <div className="helper-text" />;
  const newFieldName = humanizeString(field);
  return (
    <div className="helper-text error">
      {`${newFieldName} ${errors[field][0]}`}
    </div>
  );
};

HelperText.propTypes = {
  field: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
};

HelperText.defaultProps = {
  errors: {},
};

const mapStateToProps = (state, ownProps) => {
  let errors = getErrors(state);
  if (ownProps.errors) errors = ownProps.errors[ownProps.field];
  return {
    errors,
  };
};

export default connect(mapStateToProps)(HelperText);
