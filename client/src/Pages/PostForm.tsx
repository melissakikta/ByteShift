import React, { useState } from 'react';

const BlogPost: React.FC = () => (
  <div>
    <h2>Blog Post</h2>
    <form>
      <input type="text" placeholder="Input for BlogPost form" />
    </form>
  </div>
);

const CodePost: React.FC = () => (
  <div>
    <h2>Code Form</h2>
    <form>
      <input type="text" placeholder="Input for CodePost form" />
    </form>
  </div>
);

const LinkPost: React.FC = () => {
  const [link, setLink] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle the link submission logic here
    console.log('Link submitted:', link);
    // Clear the input after submission
    setLink('');
  };

  return (
    <div>
      <h2>Link Upload</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Provide your link" 
          value={link} 
          onChange={handleInputChange} 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<string>('Blog Post');
  const [title, setTitle] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedForm(event.target.value);
  };

  const renderForm = () => {
    switch (selectedForm) {
      case 'Blog Post':
        return <BlogPost />;
      case 'Code Post':
        return <CodePost />;
      case 'Link':
        return <LinkPost />;
      default:
        return null;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label htmlFor="form-select">Select Form:</label>
          <select id="form-select" value={selectedForm} onChange={handleChange}>
            <option value="Blog Post">Blog Post</option>
            <option value="Code Post">Code Post</option>
            <option value="Link">Link</option>
          </select>
        </div>
        {renderForm()}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;