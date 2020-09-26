import React from 'react';
import PropTypes from 'prop-types';
import RecipientsListItem from './RecipientsListItem';
import { UserPropTypeShape } from '../../../propTypes';

const RecipientsList = ({ editors, owner }) => {
  const allSignatories = [...editors, owner];
  return (
    <div className="doc-show-recipients">
      <h3>Recipients</h3>
      <div className="doc-show-recipients-grid">
        {allSignatories.map((editor, index) => (
          <RecipientsListItem user={editor} index={index + 1} key={editor.id} />
        ))}
      </div>
    </div>
  );
};

RecipientsList.propTypes = {
  editors: PropTypes.arrayOf(UserPropTypeShape),
  owner: UserPropTypeShape,
};

RecipientsList.defaultProps = {
  editors: [],
  owner: {},
};

export default RecipientsList;
