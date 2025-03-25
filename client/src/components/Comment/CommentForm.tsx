import React from 'react';
import { Form, Input, Button, Typography, Space, message } from "antd";
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
import AuthService from '../../utils/auth';

const { Title } = Typography;

interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [form] = Form.useForm(); //Ant Design form instance
  //GraphQL Mutation Hook
  const [addComment, { loading }] = useMutation(ADD_COMMENT);

  //Get current user
  const user = AuthService.loggedIn() ? AuthService.getProfile().data.username : null;

  //Handle form submission
  const handleSumbit = async (values: { content: string }) => {

    //Check if user is logged in
    if (!user) {
      message.error("You must be logged in to post a comment.");
      return;
    }

    try {
      await addComment({
        variables: {
          input: {
            postId,
            username: user,
            content: values.content,
          },
        },
      });

      message.success("Comment posted successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Failed to submit comment. Please try again.");
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "20px" }}>
      <Title level={3} style={{ textAlign: "center", fontFamily: "var(--font-header)", fontSize: "2rem", color: "var(--tertiary)" }}>
        Add a Comment
      </Title>

      <Form
        //form={Form}
        layout="vertical"
        onFinish={handleSumbit}
        style={{
          border: "2px var(--quaternary)", // Lime border
          borderRadius: "10px", // Rounded corners
          padding: "20px", // Padding for better spacing
          boxShadow: "0 0 10px var(--quaternary)", // Lime shadow
          backgroundColor: "var(--secondary)", // Ensure background color
					color: "var(--primary)", // Ensure text color
          fontFamily: "var(--font-body)",
					fontSize: "1.5rem",
        }}
        form={form}
      >
        <Form.Item
          label={<span style={{ color: "var(--primary)" }}>Comment</span>}
          name="content"
          rules={[{ required: true, message: "Please enter a comment." }]}
        >
          <Input.TextArea placeholder="Enter your comment here" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" className="custom-menu-item" loading={loading}>
              Submit Comment
            </Button>
            <Button
              type="primary"
              onClick={() => {
                form.resetFields();
              }}
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

export default CommentForm;
