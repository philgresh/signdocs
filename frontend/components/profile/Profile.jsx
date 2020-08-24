/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SvgLoader } from 'react-svgmt';
import FontFamilySelection from './signature/FontFamilySelection';
import { SigPropTypeShape, UserPropTypeShape } from '../propTypes';

const SVG = ({ svgUrl }) => <SvgLoader path={svgUrl}></SvgLoader>;

const Profile = ({ sig, user, updateSig, history }) => {
  const [changed, setChanged] = useState(false);
  const [tab, setTab] = useState('choice');
  const onUpdate = (font_family, fill_color) => {
    console.log(font_family, fill_color);
    updateSig({
      id: sig.id,
      'signature[styling]': {
        font_family,
        fill_color,
      },
    }).then(() => history.go(0));
  };

  const onTabClick = (name) => () => {
    setTab(name);
  };

  const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <div className="signature-create-container">
      <h2>Create Your Signature</h2>
      <div className="name-header">
        <label htmlFor="fullname">
          Full Name
          <input type="text" id="fullname" value={fullName} disabled />
        </label>
        <div className="current-sig">
          <label>
            Your Current Signature:
            <SVG svgUrl={sig.imageUrl} />
          </label>
        </div>
      </div>
      <ul className="sig-tabs-list">
        <li
          className={tab === 'choice' ? 'current' : ''}
          onClick={onTabClick('choice')}
          role="menuitem"
        >
          Choose
        </li>
        <li
          className={tab === 'draw' ? 'current' : ''}
          onClick={onTabClick('draw')}
          role="menuitem"
        >
          Draw
        </li>
      </ul>
      <div className="sig-tab">
        {tab === 'choice' ? (
          <div className="sig-choice">
            {sig && user && sig.imageUrl && fullName && (
              <>
                <FontFamilySelection
                  sig={sig}
                  user={user}
                  onUpdate={onUpdate}
                  fullName={fullName}
                />
              </>
            )}
          </div>
        ) : (
          <div className="sig-draw">THIS IS THE DRAW COMPONENT</div>
        )}
      </div>
      <div className="footer">
        <p className="small">
          By clicking Update, I agree that the signature will be the electronic
          representation of my signature for all purposes when I use them on
          documents.
        </p>
      </div>
      <div className="actions">
        <button disabled={changed} type="button">
          Update
        </button>
        <button className="cancel" type="button">
          Cancel
        </button>
      </div>
    </div>
  );
};

Profile.propTypes = {
  sig: SigPropTypeShape.isRequired,
  user: UserPropTypeShape.isRequired,
  updateSig: PropTypes.func.isRequired,
  history: PropTypes.shape({
    go: PropTypes.func,
  }).isRequired,
};

export default Profile;
