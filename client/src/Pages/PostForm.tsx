import React from 'react';
import { Form, Input, Button, Typography, Space, message } from 'antd';

const { Title } = Typography;

// BlogPost component
const BlogPost: React.FC<{ onSubmit: (content: string) => void; setTitle: (title: string) => void; }> = ({ onSubmit, setTitle }) => {

    const  [form] = Form.useForm();

    const handleSubmit = (values: { content: string }) => {
        setTitle('Your Blog Post Title'); // Set the title here (you can customize this)
        onSubmit(values.content); // Pass the content back to the App component
        form.resetFields(); // Clear the input
        message.success("Blog post submitted successfully!"); 
    };

    return (
        <div style={{ maxWidth: 500, margin: "0 auto", padding: "20px" }}>
            <Title level={3} style={{ textAlign: "center" }}>Create a Blog Post</Title>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Blog Content"
                    name="content"
                    rules={[{ required: true, message: "Please enter blog content." }]}
                >
                    <Input.TextArea placeholder="Write your blog post..." rows={4} />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button 
                            type="primary" htmlType="submit"
                            className="custom-menu-item"
                        >
                            Submit
                        </Button>
                        <Button 
                            className="custom-menu-item"
                            onClick={() => form.resetFields()}
                        >
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

// CodePost component
const CodePost: React.FC<{ onSubmit: (code: string) => void; }> = ({ onSubmit }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: { code: string }) => {
        onSubmit(values.code);
        form.resetFields();
        message.success("Code snippet submitted successfully!");
    };

    return (
        <div style={{ maxWidth: 500, margin: "0 auto", padding: "20px" }}>
            <Title level={3} style={{ textAlign: "center" }}>Share Code Snippet</Title>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Code Snippet"
                    name="code"
                    rules={[{ required: true, message: "Please enter a code snippet." }]}
                >
                    <Input.TextArea placeholder="Paste your code here..." rows={4} />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button 
                            type="primary" htmlType="submit"
                            className="custom-menu-item"
                        >
                            Submit
                        </Button>
                        <Button 
                            className="custom-menu-item"
                            onClick={() => form.resetFields()}
                        >
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

// LinkPost component
const LinkPost: React.FC<{ onSubmit: (link: string) => void; }> = ({ onSubmit }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: { link: string }) => {
        onSubmit(values.link);
        form.resetFields();
        message.success("Link submitted successfully!");
    };

    return (
        <div style={{ maxWidth: 500, margin: "0 auto", padding: "20px" }}>
            <Title level={3} style={{ textAlign: "center" }}>Share a Link</Title>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label="Link URL"
                    name="link"
                    rules={[
                        { required: true, message: "Please enter a link." },
                        { type: "url", message: "Please enter a valid URL." },
                    ]}
                >
                    <Input placeholder="Provide your link here..." />
                </Form.Item>
                <Form.Item>
                    <Space>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                            className="custom-menu-item"
                        >
                            Submit
                        </Button>
                        <Button 
                            className="custom-menu-item"
                            onClick={() => form.resetFields()}
                        >
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export { BlogPost, CodePost, LinkPost };