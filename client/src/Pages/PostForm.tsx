import React, { useState } from 'react';

// BlogPost component
const BlogPost: React.FC<{ onSubmit: (content: string) => void; setTitle: (title: string) => void; }> = ({ onSubmit, setTitle }) => {
    const [inputContent, setInputContent] = useState<string>('');

    const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputContent(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTitle('Your Blog Post Title'); // Set the title here (you can customize this)
        onSubmit(inputContent); // Pass the content back to the App component
        setInputContent(''); // Clear the input
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Input for Blog Post"
                onChange={handleContentChange}
                value={inputContent}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

// CodePost component
const CodePost: React.FC<{ onSubmit: (code: string) => void; }> = ({ onSubmit }) => {
    const [inputCode, setInputCode] = useState<string>('');

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputCode(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(inputCode); // Pass the code back to the App component
        setInputCode(''); // Clear the input
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Input for Code Post"
                onChange={handleCodeChange}
                value={inputCode}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

// LinkPost component
const LinkPost: React.FC<{ onSubmit: (link: string) => void; }> = ({ onSubmit }) => {
    const [link, setLink] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(link); // Pass the link back to the App component
        setLink(''); // Clear the input
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Provide your link"
                value={link}
                onChange={handleInputChange}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export { BlogPost, CodePost, LinkPost };