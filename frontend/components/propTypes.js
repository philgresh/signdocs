import PropTypes from 'prop-types';

export const DocPropTypeShape = PropTypes.shape({
  id: PropTypes.string,
  editorIds: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  description: PropTypes.string,
  file_url: PropTypes.string,
});

export const UserPropTypeShape = PropTypes.shape({
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
});
