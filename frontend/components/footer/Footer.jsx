import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faCodeBranch,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

const emailObfuscation =
  '&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#112;&#104;&#105;&#108;&#64;&#103;&#114;&#101;&#115;&#104;&#97;&#109;&#46;&#100;&#101;&#118;';

const Footer = () => {
  return (
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
      <a href={emailObfuscation}>
        <FontAwesomeIcon icon={faEnvelope} color="inherit" />
      </a>
      <a href="https://github.com/philgresh/signdocs">
        <FontAwesomeIcon icon={faCodeBranch} color="inherit" />
      </a>
    </div>
  );
};

export default Footer;
