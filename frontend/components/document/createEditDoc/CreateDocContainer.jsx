import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CreateDocForm from './DocForm';
import { createDocument, receiveError } from '../../../actions/document';
import { getErrors } from '../../../reducers/selectors';

const mapStateToProps = (state) => ({
  docState: {
    title: '',
    description: '',
  },
  errors: getErrors(state, 'documents'),
  formType: 'Create Document',
});

const mapDispatchToProps = (dispatch) => ({
  action: (formData) => dispatch(createDocument(formData)),
  receiveError: (err) => dispatch(receiveError(err)),
});

const CreateDocContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateDocForm),
);

export default CreateDocContainer;
