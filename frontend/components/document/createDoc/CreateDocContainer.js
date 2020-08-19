import { connect } from 'react-redux';
import CreateDocForm from './CreateDocForm';
import { createDocument } from '../../../actions/document';
import { getErrors } from '../../../reducers/selectors';

const mapStateToProps = (state) => ({
  docState: {
    title: '',
    description: '',
  },
  errors: getErrors(state, 'documents'),
});

const mapDispatchToProps = (dispatch) => ({
  createDocument: (formData) => dispatch(createDocument(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocForm);
