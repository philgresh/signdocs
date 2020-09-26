/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { titleize } from '../../utils/general';

const FourOhFour = ({ from }) => {
  let backLink = '';
  let backLinkText = '';
  if (from) {
    const secondSlash = from.indexOf('/', 1);
    backLink = from.slice(0, secondSlash);
    backLinkText = titleize(backLink.slice(1));
  }
  return (
    <div className="fourohfour-container">
      <h2>We can&apos;t seem to find the page you&apos;re looking for.</h2>
      <div className="actions">
        <Link to={from}>Try again</Link>
        {backLink && <Link to={backLink}>Back to {backLinkText}</Link>}
      </div>
    </div>
  );
};

FourOhFour.propTypes = {
  history: PropTypes.object.isRequired,
  from: PropTypes.string,
};

FourOhFour.defaultProps = {
  from: '',
};

export default withRouter(FourOhFour);
