import React from 'react';
import { Form, Input, Button, Typography, Space, message } from "antd";
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import AuthService from '../../utils/auth';

const { Title } = Typography;
const { TextArea } = Input;

const CodePost: React.FC = () => {
	const [form] = Form.useForm(); //Ant Design form instance
	//GraphQL Mutation Hook
	const [addPost, { loading }] = useMutation(ADD_POST);

	//Get current user
	const user = AuthService.loggedIn() ? AuthService.getProfile().username : null;

	//Handle form submission
	const handleSumbit = async (values: { title: string; code: string }) => {

		//Check if user is logged in
		if (!user) {
			message.error("You must be logged in to post a blog.");
			return;
		}

		try {
			await addPost({
				variables: {
					postInput: {
						username: user,
						type: "code",
						title: values.title,
						content: values.code,
					},
				},
			});

			message.success("Code posted successfully!");
			form.resetFields();
		} catch (error) {
			message.error("Failed to submit code. Please try again.");
			console.error("Error submitting code:", error);
		}
	};


	return (
		<div style={{ maxWidth: 500, margin: "0 auto", padding: "20px" }}>
			<Title level={3} style={{ textAlign: "center", fontFamily: "var(--font-header)", fontSize: "3rem", color: "var(--tertiary)" }}>
				Share a Code Snippet
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
					label={<span style={{ color: "var(--primary)" }}>Title</span>}
					name="title"
					rules={[{ required: true, message: "Please enter a title." }]}
				>
					<Input placeholder="Enter a title here" />
				</Form.Item>

				{/* Code */}
				<Form.Item
					label={<span style={{ color: "var(--primary)" }}>Code Snippet</span>}
					name="code"
					rules={[
						{ required: true, message: "Please enter your code." }]}
				>
					<TextArea rows={10} placeholder="Enter a code snippet..." />
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
							type="primary"
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

export default CodePost;