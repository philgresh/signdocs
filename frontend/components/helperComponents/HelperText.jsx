import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { humanize } from '../../utils/general';
import { getErrorsAt } from '../../reducers/selectors';

function genErrorMessages(errors, fieldName) {
  let errorMessages = [];
  errors.forEach((err) => {
    if (err instanceof Array) {
      errorMessages = [...errorMessages, ...err];
    } else {
      const message = `${fieldName}: ${err}`;
      errorMessages.push(message);
    }
  });
  return errorMessages;
}

const HelperText = ({ errors, field }) => {
  if (!errors || !errors.length) return <div className="helper-text error" />;
  const fieldName = humanize(field);

  const errorMessages = genErrorMessages(errors, fieldName);

  return (
    <div className="helper-text error">
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
};

const mapStateToProps = (state, ownProps) => {
  const { path } = ownProps;
  const errors = getErrorsAt(path)(state);
  return {
    errors,
  };
};

export default connect(mapStateToProps)(HelperText);
