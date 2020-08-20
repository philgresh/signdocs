import React from 'react';
import PropTypes from 'prop-types';
import { DocPropTypeShape, UserPropTypeShape } from '../../../propTypes';

// eslint-disable-next-line react/prop-types
const Details = ({ doc: { description, owner, editors } }) => {
  const ownerName = `${owner.firstName} ${owner.lastName}`;
  return (
    <>
      <div className="flex-row-container">
        <h3 className="flex-item-right doc-attr-key">Description:</h3>
        <p className="flex-item-left">{description}</p>
      </div>
      <div className="flex-row-container">
        <h3 className="flex-item-right doc-attr-key">Owner:</h3>
        <p className="flex-item-left">{ownerName}</p>
      </div>
      {editors.length > 0 && (
        <div className="flex-row-container">
          <h3 className="flex-item-right doc-attr-key">Editors:</h3>
          <ul className="flex-item-left">
            {editors.map((e) => (
              <li key={e.id}>{`${e.firstName} ${e.lastName}`}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

Details.propTypes = {
  doc: PropTypes.shape({
    ...DocPropTypeShape,
    editors: PropTypes.arrayOf(UserPropTypeShape),
    owner: UserPropTypeShape,
  }),
};

Details.defaultProps = {
  doc: {},
};

export default Details;
