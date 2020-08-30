/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { SvgLoader } from 'react-svgmt';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sig: {},
    };
  }

  componentDidMount() {
    const { currentUser, fetchDocuments, fetchSignature } = this.props;
    if (currentUser.sigId) {
      fetchSignature(currentUser.sigId).then((res) => {
        this.setState({ sig: res.signature });
      });
    }
    fetchDocuments();
  }

  render() {
    const { sig } = this.state;
    return (
      <div className="main-container home">
        <div className="top-background-gradient" />
        <div className="home-sig-link" role="presentation">
          {sig && sig.imageUrl && (
            <Link to="profile">
              <SvgLoader path={sig.imageUrl} />
            </Link>
          )}
        </div>
        <h1>This is the home component</h1>
      </div>
    );
  }
}

Home.propTypes = {
  currentUser: PropTypes.object.isRequired,
  fetchDocuments: PropTypes.func.isRequired,
  fetchSignature: PropTypes.func.isRequired,
};

export default Home;
