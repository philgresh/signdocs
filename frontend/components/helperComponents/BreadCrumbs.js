/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Home = () => (
  <li key="home">
    <Link to="/">
      <FontAwesomeIcon icon={faHome} color="inherit" />
    </Link>
  </li>
);

const Current = ({ title }) => <li key="home">{title}</li>;

const Separator = ({ index }) => (
  <li key={`breadcrumb-sep-${index}`} className="breadcrumbs-sep">
    <FontAwesomeIcon icon={faChevronRight} color="inherit" />
  </li>
);

const BreadCrumbs = ({ history }) => {
  if (!history.length) return null;
  return (
    <ol className="breadcrumbs">
      <Home />
      <Separator index={-1} />
      {history.map(({ title, to }, index) => {
        if (index === history.length - 1) return <Current title={title} />;

        return (
          <>
            <li key={title}>
              <Link to={to}>{title}</Link>
            </li>
            <Separator />
          </>
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

Separator.propTypes = {
  index: PropTypes.number.isRequired,
};

export default BreadCrumbs;
