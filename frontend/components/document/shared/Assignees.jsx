/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserDetails } from '../../../reducers/selectors';

const AssigneeItem = ({ assigneeId, currAssignee, handleOptionChange }) => {
  const assigneeDetails = useSelector(getUserDetails(assigneeId));
  const { id, firstName, lastName } = assigneeDetails;
  const name = `${firstName} ${lastName}`;

  return (
    <div>
      <input
        type="radio"
        id={id}
        name="assignees"
        value={id}
        checked={currAssignee === id}
        onChange={handleOptionChange}
      />
      <label htmlFor={id}>{name}</label>
    </div>
  );
};

const Assignees = ({ assignees, currAssignee, onChangeAssignee }) => {
  const handleOptionChange = (e) => {
    onChangeAssignee(e.target.value);
  };
  return (
    <>
      <h2>Assignees</h2>
      <hr />
      <div className="assignees-list">
        {assignees.map((assigneeId) => (
          <AssigneeItem
            assigneeId={assigneeId}
            key={assigneeId}
            currAssignee={currAssignee}
            handleOptionChange={handleOptionChange}
          />
        ))}
      </div>
    </>
  );
};

Assignees.propTypes = {};

export default Assignees;
