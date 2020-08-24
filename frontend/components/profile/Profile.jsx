/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { SvgLoader, SvgProxy } from 'react-svgmt';
import FontFamilySelection from './signature/FontFamilySelection';

const SVG = ({ svgUrl }) => (
  <SvgLoader path={svgUrl}>
    {/* Important! this proxy will reset the color to black,
          otherwise old elements would still be shown in red
          because this library doesn't store previous states */}
    {/* <SvgProxy selector={'path'} fill="white" /> */}
    {/* {countryCodes.map(code => (
          <SvgProxy
            key={code}
            selector={"#" + code + ",#" + code + " path"}
            fill="red"
          />
        ))} */}
  </SvgLoader>
);

const Profile = ({ sig, user, updateSig }) => {
  const onUpdate = (font_family, fill_color) => {
    console.log(font_family, fill_color);
    updateSig({
      id: sig.id,
      'signature[styling]': {
        font_family,
        fill_color,
      },
    }).then(() => history.go(0))
  };

  return (
    <>
      <div className="sig-svg">
        {sig && user && sig.imageUrl && user.firstName && (
          <>
            <SVG svgUrl={sig.imageUrl} />
            <FontFamilySelection sig={sig} user={user} onUpdate={onUpdate} />
          </>
        )}
      </div>
    </>
  );
};

Profile.propTypes = {};

export default Profile;
