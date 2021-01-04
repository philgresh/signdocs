import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { humanize } from '../../utils/general';
import { getErrorsAt } from '../../reducers/selectors';

function genErrorMessages(errors, fieldName, prefix) {
  let errorMessages = [];
  let leadingString = `${fieldName}: `;
  if (prefix !== null) {
    leadingString = '';
  }
  errors.forEach((err) => {
    if (err instanceof Array) {
      errorMessages = [...errorMessages, ...err];
    } else {
      const message = `${leadingString}${err}`;
      errorMessages.push(message);
    }
  });
  return errorMessages;
}

const HelperText = ({ errors, field, prefix, errorClass }) => {
  const className = `helper-text ${errorClass}`;
  if (!errors || !errors.length) return <div className={className} />;
  const fieldName = humanize(field);

  const errorMessages = genErrorMessages(errors, fieldName, prefix);

  return (
    <div className={className}>
      {errorMessages.map((err) => (
        <p key={err}>{err}</p>
      ))}
    </div>
  );
};

HelperText.propTypes = {
  field: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  ).isRequired,
  prefix: PropTypes.string,
  errorClass: PropTypes.string,
};

HelperText.defaultProps = {
  prefix: null,
  errorClass: 'error',
};

const mapStateToProps = (state, ownProps) => {
  const { path } = ownProps;
  const errors = getErrorsAt(path)(state);
  return {
    errors,
  };
};

export default connect(mapStateToProps)(HelperText);
