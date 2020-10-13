/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Home = () => (
  <li>
    <Link to="/">
      <FontAwesomeIcon icon={faHome} color="inherit" />
    </Link>
  </li>
);

const Current = ({ title }) => <li key="home">{title}</li>;

const Separator = () => (
  <li className="breadcrumbs-sep">
    <FontAwesomeIcon icon={faChevronRight} color="inherit" />
  </li>
);

const BreadCrumbs = ({ history }) => {
  if (!history.length) return null;
  return (
    <ol className="breadcrumbs">
      <Home key="home" />
      <Separator key={`breadcrumb-sep-${-1}`} />
      {history.map(({ title, to }, index) => {
        if (index === history.length - 1)
          return <Current title={title} key="current" />;

        return (
          <Fragment key={`${to}-${title}`}>
            <li>
              <Link to={to}>{title}</Link>
            </li>
            <Separator key={`breadcrumb-sep-${index}`} />
          </Fragment>
        );
      })}
    </ol>
  );
};

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

Current.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BreadCrumbs;
