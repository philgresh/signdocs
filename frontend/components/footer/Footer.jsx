import React from 'react';
import PropTypes from 'prop-types';
import Obfuscate from 'react-obfuscate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faCodeBranch,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

const EmailObfuscation = ({ children }) => (
  <Obfuscate
    email="phil@gresham.dev"
    headers={{
      subject: 'SignDocs',
    }}
  >
    {children}
  </Obfuscate>
);

const Footer = () => {
  return (
    <footer id="footer">
      <div className="flex-row-container flex-center small smallest">
        <div className="footer-links">
          <a href="https://github.com/philgresh/">
            <FontAwesomeIcon icon={faGithub} color="inherit" />
          </a>
          <a href="https://www.linkedin.com/in/philgresham">
            <FontAwesomeIcon icon={faLinkedin} color="inherit" />
          </a>
          <a href="https://gresham.dev">
            <FontAwesomeIcon icon={faHome} color="inherit" />
          </a>
          <EmailObfuscation>
            <FontAwesomeIcon icon={faEnvelope} color="inherit" />
          </EmailObfuscation>
          <a href="https://github.com/philgresh/signdocs">
            <FontAwesomeIcon icon={faCodeBranch} color="inherit" />
          </a>
        </div>
      </div>
    </footer>
  );
};

EmailObfuscation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
};

export default Footer;
