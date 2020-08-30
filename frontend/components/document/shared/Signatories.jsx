/* eslint-disable react/prop-types */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserDetails } from '../../../reducers/selectors';

const SignatoriesItem = ({
  signatoryId,
  currSignatory,
  handleOptionChange,
}) => {
  const signatoryDetails = useSelector(getUserDetails(signatoryId));
  const { id, firstName, lastName } = signatoryDetails;
  const name = `${firstName} ${lastName}`;
  const location = useLocation();
  const isSign = !!location.pathname.match(/sign/);

  if (isSign)
    return (
      <div>
        <input
          type="radio"
          id={id}
          name="signatories"
          value={id}
          checked={currSignatory === id}
          onChange={handleOptionChange}
        />
        <label htmlFor={id}>{name}</label>
      </div>
    );
  return (
    <div style={{ textAlign: 'center' }}>
      <label htmlFor={id}>{name}</label>
    </div>
  );
};

const Signatories = ({ signatories, currSignatory, onChangeSignatory }) => {
  const handleOptionChange = (e) => {
    onChangeSignatory(e.target.value);
  };
  return (
    <>
      <h2>Signatories</h2>
      <hr />
      <div className="signatories-list">
        {signatories.map((signatoryId) => (
          <SignatoriesItem
            signatoryId={signatoryId}
            key={signatoryId}
            currSignatory={currSignatory}
            handleOptionChange={handleOptionChange}
          />
        ))}
      </div>
    </>
  );
};

Signatories.propTypes = {};

export default Signatories;
