/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HelperText } from '../../helperComponents';

export default class CreateDocForm extends Component {
  constructor(props) {
    super(props);
    const { docState } = props;
    this.state = {
      title: docState.title || '',
      description: docState.description || '',
      file: null,
      loading: false,
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    document.title = `SignDocs - Create new document`;
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({
        file,
        // fileUrl: fileReader.result,
      });
    };
    if (file) fileReader.readAsDataURL(file);
  }

  handleChange(field) {
    return (e) => {
      this.setState({ [field]: e.target.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const { title, description, file } = this.state;
    const formData = new FormData();
    formData.append('doc[title]', title);
    formData.append('doc[description]', description);
    formData.append('doc[file]', file);
    this.props
      .createDocument(formData)
      .then(({ document }) => {
        this.props.history.push(`/documents/${document.id}`);
      })
      .fail(() => this.setState({ loading: false }));
  }

  render() {
    const { title, description, loading } = this.state;

    return (
      <form onSubmit={this.handleSubmit} method="POST" className="doc-form">
        <h1>Create Form</h1>
        <label htmlFor="titleInput">Title</label>
        <input
          type="text"
          name="titleInput"
          id="titleInput"
          onChange={this.handleChange('title')}
          value={title}
          required
          minLength={3}
          placeholder="Offer of employment re: P. Gresham"
        />
        <HelperText field="title" path="documents.title" />
        <label htmlFor="description">Note to Recipients</label>
        <textarea
          rows={3}
          columns={30}
          name="description"
          id="description"
          onChange={this.handleChange('description')}
          value={description}
          placeholder="Please sign, seal and deliver"
        />
        <HelperText field="description" path="documents.description" />
        <label htmlFor="file">Attach File</label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={this.handleFile}
          accept="application/pdf"
        />
        <HelperText field="file" path="documents.file" />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
        <HelperText field="document" path="documents.document" />
      </form>
    );
  }
}

CreateDocForm.propTypes = {
  docState: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  createDocument: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

CreateDocForm.defaultProps = {
  docState: {
    title: '',
    description: '',
  },
};
