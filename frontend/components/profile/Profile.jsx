/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import {
  NameHeader,
  SigTabsList,
  FontFamilySelection,
  SigPad,
  Footer,
} from './profileComponents';
import { SigPropTypeShape, UserPropTypeShape } from '../propTypes';

const Profile = ({ sig: sigProps, user, updateSig, fetchMe }) => {
  const [updating, setUpdating] = useState(false);
  const [sig] = useState(sigProps);
  const [changed, setChanged] = useState(false);
  const [tab, setTab] = useState('choice');
  const sigPadRef = createRef();
  window.sigPadRef = sigPadRef;

  const { pubKeyFingerprint, styling } = sig;

  const [choiceState, setChoiceState] = useState({
    pubKeyFingerprint,
    selectedFont: styling?.font_family,
    color: styling?.fill_color || '#000028',
  });

  const onUpdate = () => {
    setUpdating(true);
    const sigData = {
      id: sig.id,
    };
    if (tab === 'choice') {
      const { selectedFont, color } = choiceState;
      sigData['signature[styling]'] = {
        font_family: selectedFont,
        fill_color: color,
      };
    } else if (tab === 'draw') {
      const svgData = sigPadRef.current.toDataURL('image/svg+xml');
      sigData['signature[svg_data]'] = svgData;
    }

    updateSig(sigData).then(() => fetchMe(user.id));
    setUpdating(false);
  };

  const onTabClick = (name) => () => {
    setTab(name);
  };

  const { fullName } = user;
  const currFont = sig?.styling?.font_family || '';

  return (
    <div className="signature-create-container">
      <h2>Create Your Signature</h2>
      <NameHeader fullName={fullName} sig={sig} />
      <SigTabsList tab={tab} onTabClick={onTabClick} />
      <div className="sig-tab">
        {tab === 'choice' ? (
          sig &&
          user &&
          sig.imageUrl &&
          fullName && (
            <FontFamilySelection
              fullName={fullName}
              choiceState={choiceState}
              setChoiceState={setChoiceState}
              setChanged={setChanged}
              currFont={currFont}
            />
          )
        ) : (
          <SigPad sigPadRef={sigPadRef} setChanged={setChanged} />
        )}
      </div>
      <Footer changed={changed} onUpdate={onUpdate} updating={updating} />
    </div>
  );
};

Profile.propTypes = {
  sig: SigPropTypeShape.isRequired,
  user: UserPropTypeShape.isRequired,
  updateSig: PropTypes.func.isRequired,
  fetchMe: PropTypes.func.isRequired,
  history: PropTypes.shape({
    go: PropTypes.func,
  }).isRequired,
};

export default Profile;
