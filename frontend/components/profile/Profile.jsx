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

const Profile = ({ sig: sigProps, user, updateSig, history }) => {
  const [sig, setSig] = useState(sigProps);
  const [changed, setChanged] = useState(false);
  const [tab, setTab] = useState('choice');
  const sigPadRef = createRef();

  const { pubKeyFingerprint, styling } = sig;

  const [choiceState, setChoiceState] = useState({
    pubKeyFingerprint,
    selectedFont: styling?.font_family,
    color: styling?.fill_color || '#000028',
  });

  const onUpdate = () => {
    switch (tab) {
      case 'choice': {
        const { selectedFont, color } = choiceState;
        updateSig({
          id: sig.id,
          'signature[styling]': {
            font_family: selectedFont,
            fill_color: color,
          },
        }).then(() => history.go(0));
        break;
      }
      case 'draw': {
        const svgData = sigPadRef.current.toDataURL('image/svg+xml');
        updateSig({
          id: sig.id,
          'signature[svg_data]': svgData,
        }).then(() => history.go(0));
        // }).then(({ signature }) => setSig(signature));
        break;
      }
      default:
        break;
    }
  };

  const onTabClick = (name) => () => {
    setTab(name);
  };

  const fullName = `${user.firstName} ${user.lastName}`;
  return (
    <div className="signature-create-container">
      <h2>Create Your Signature</h2>
      <NameHeader fullName={fullName} sig={sig} />
      <SigTabsList tab={tab} onTabClick={onTabClick} />
      <div className="sig-tab">
        {tab === 'choice' ? (
          <div className="sig-choice">
            {sig && user && sig.imageUrl && fullName && (
              <>
                <FontFamilySelection
                  fullName={fullName}
                  choiceState={choiceState}
                  setChoiceState={setChoiceState}
                  setChanged={setChanged}
                />
              </>
            )}
          </div>
        ) : (
          <SigPad sigPadRef={sigPadRef} setChanged={setChanged} />
        )}
      </div>
      <Footer
        changed={changed}
        onUpdate={onUpdate}
        // onCancel={onCancel}
      />
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
