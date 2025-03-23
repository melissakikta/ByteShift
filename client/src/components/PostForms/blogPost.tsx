import React from 'react';
import { Form, Input, Button, Typography, Space, message } from "antd"; 
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import { QUERY_GET_POSTS } from '../../utils/queries';
import AuthService from '../../utils/auth';

const { Title } = Typography;
const { TextArea } = Input;

const BlogPost: React.FC = () => {
  const [form] = Form.useForm(); //Ant Design form instance
  //GraphQL Mutation Hook
  const [addPost, { loading }] = useMutation(ADD_POST, {
    refetchQueries: [{ query: QUERY_GET_POSTS }],
  });

  //Get current user
  const user = AuthService.loggedIn() ? AuthService.getProfile().data.username : null;

  //Handle form submission
  const handleSumbit = async (values: { title: string; blog: string; imgURL?: string }) => {

    //Check if user is logged in
    if (!user) {
      message.error("You must be logged in to post a blog.");
      return;
    }
    
    try {
      await addPost({
        variables: {
          input: { 
            username: user,
            type: "blog",
            title: values.title,
            content: values.blog,
            imgURL: values.imgURL || "",
          }, 
        },
      });

      message.success("Blog posted successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Failed to submit blog. Please try again.");
      console.error("Error submitting blog:", error);
    }
  };


  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "20px" }}>
      <Title level={3} style={{ textAlign: "center", fontFamily: "var(--font-header)", fontSize: "4rem" }}>
      <h2>Share a Blog Post</h2>
      </Title>

      <Form
        //form={Form}
        layout="vertical"
        onFinish={handleSumbit}
        style={{
          border: "2px var(--quaternary)", // Lime border
          borderRadius: "10px", // Rounded corners
          padding: "20px", // Padding for better spacing
          backgroundColor: "var(--secondary)", // Ensure background color
          color: "var(--primary)", // Ensure text color
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Optional shadow for a modern look
          fontFamily: "var(--font-body)",
          fontSize: "1.5rem",
        }}
      >
        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title." }]}
        >
          <Input placeholder="Enter a title here" />
        </Form.Item>

        {/* Blog */}
        <Form.Item
          label="Blog Content"
          name="blog"
          rules={[
            { required: true, message: "Please enter your blog content here." }]}
        >
          <TextArea rows={10} placeholder="Begin typing..." />
        </Form.Item>

        {/* Image URL */}

        <Form.Item
          label="Image URL (Optional)"
          name="imgURL">
          <Input placeholder="Enter an image URL here" />
          </Form.Item>
          
        {/* Submit Button */}
        <Form.Item>
          <Space>
           <Button 
              type="primary" 
              htmlType="submit"
              className="custom-menu-item" 
              loading={loading}
            >
              {loading ? "Submitting..." : "Submit Link"}
            </Button>
            <Button 
              htmlType="reset" 
              onClick={() => form.resetFields()}
              className="custom-menu-item"
            >
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogPost;