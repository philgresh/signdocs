/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
  }

  handleFile(e) {
    this.setState({ file: e.currentTarget.files[0] });
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
    // console.log({ formData });
    // eslint-disable-next-line react/destructuring-assignment
    this.props
      .createDocument(formData)
      .then(({ document }) => {
        this.props.history.push(`/documents/${document.id}`);
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { title, description, loading } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="titleInput">
          Title
          <input
            type="text"
            name="titleInput"
            id="titleInput"
            onChange={this.handleChange('title')}
            value={title}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            rows={3}
            columns={30}
            name="description"
            id="description"
            onChange={this.handleChange('description')}
            value={description}
          />
        </label>
        <input type="file" name="file" id="file" onChange={this.handleFile} />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
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
