import React, { useState } from 'react';

export default function CreateDocForm({ createDocument }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFile = (e) => {
    setFile(e.currentTarget.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('document[title]', title);
    formData.append('document[description]', description);
    formData.append('document[file]', file);
    createDocument(formData)
      .then((res) => console.log(res))
      .fail((err) => console.error(err));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="titleInput">
        Title
        <input
          type="text"
          name="titleInput"
          id="titleInput"
          onChange={(e) => setTitle(e)}
          value={title}
        />
      </label>
      <label htmlFor="description">
        Description
        <input
          type="text"
          name="description"
          id="description"
          onChange={(e) => setDescription(e)}
          value={description}
        />
      </label>
      <input type="file" name="file" id="file" onChange={handleFile} />
    </form>
  );
}
