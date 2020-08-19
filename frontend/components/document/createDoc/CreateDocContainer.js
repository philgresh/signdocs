import { connect } from 'react-redux';
import CreateDocForm from './CreateDocForm';
import { createDocument } from '../../../actions/document';

const mapStateToProps = (_state) => ({
  docState: {
    title: '',
    description: '',
  },
});

const mapDispatchToProps = (dispatch) => ({
  createDocument: (formData) => dispatch(createDocument(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocForm);
