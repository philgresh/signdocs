import React from 'react';
import PropTypes from 'prop-types';
import { DocPropTypeShape, UserPropTypeShape } from '../../../propTypes';

// eslint-disable-next-line react/prop-types
const Details = ({ doc: { description, owner, editors } }) => {
  const ownerName = `${owner.firstName} ${owner.lastName}`;
  return (
    <div className="doc-show details">
      <ul>
        <li>Description</li>
        <li>Owner</li>
        <li>Editors</li>
      </ul>
      <ul>
        <li>{description}</li>
        <li>{ownerName}</li>
        <li>
          <ul>
            {editors.map((e) => (
              <li key={e.id}>{`${e.firstName} ${e.lastName}`}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
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
