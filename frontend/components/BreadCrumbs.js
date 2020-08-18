/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BREADCRUMB_SEPARATOR = '/';

export default function BreadCrumbs({ history }) {
  const crumbs = history.map(({ to, title }, index) => {
    return (
      <>
        <li key={title}>
          <Link to={to}>{title}</Link>
        </li>
        {index !== 0 ? (
          <li key={`breadcrumb-sep-${index}`} className="breadcrumbs-sep">
            {BREADCRUMB_SEPARATOR}
          </li>
        ) : null}
      </>
    );
  });
  return <ol className="breadcrumbs">{crumbs}</ol>;
}

BreadCrumbs.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

BreadCrumbs.defaultProps = {
  history: [],
};
