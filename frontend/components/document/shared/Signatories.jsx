/* eslint-disable react/prop-types */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserDetails } from '../../../reducers/selectors';

const SignatoriesItem = ({
  signatoryId,
  currSignatory,
  handleOptionChange,
  index,
}) => {
  const signatoryDetails = useSelector(getUserDetails(signatoryId));
  const { id, firstName, lastName } = signatoryDetails;
  const name = `${firstName} ${lastName}`;
  const location = useLocation();
  const isPrepare = !!location.pathname.match(/prepare/);

  if (isPrepare)
    return (
      <div>
        <input
          type="radio"
          id={id}
          name="signatories"
          className={index === 0 ? 'attention' : ''}
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
  const removeAttention = () => {
    const allElesWithAttention = Array.from(
      document.querySelectorAll('.attention'),
    );
    allElesWithAttention.forEach((el) => el.classList.remove('attention'));
  };

  const handleOptionChange = (e) => {
    removeAttention();
    onChangeSignatory(e.target.value);
  };
  return (
    <>
      <h2>Signatories</h2>
      <hr />
      <div className="signatories-list">
        {signatories.map((signatoryId, index) => (
          <SignatoriesItem
            signatoryId={signatoryId}
            key={signatoryId}
            currSignatory={currSignatory}
            handleOptionChange={handleOptionChange}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

Signatories.propTypes = {};

export default Signatories;
