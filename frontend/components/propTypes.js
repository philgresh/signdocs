import PropTypes from 'prop-types';

export const DocPropTypeShape = PropTypes.shape({
  id: PropTypes.string,
  editorIds: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  description: PropTypes.string,
  fileUrl: PropTypes.string,
  downloadUrl: PropTypes.string,
  ownerId: PropTypes.string,
});

export const UserPropTypeShape = PropTypes.shape({
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  imageTag: PropTypes.string,
});
