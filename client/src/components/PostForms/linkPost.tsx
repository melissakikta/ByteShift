import React from 'react';
import { Form, Input, Button, Typography, Space, message } from "antd";
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../../utils/mutations';
import AuthService from '../../utils/auth';

const { Title } = Typography;

const LinkPost: React.FC = () => {
	const [form] = Form.useForm(); //Ant Design form instance
	//GraphQL Mutation Hook
	const [addPost, { loading }] = useMutation(ADD_POST);

	const username = AuthService.getProfile().username || null;
	console.log(username);
	//Get current user
	const user = AuthService.loggedIn() ? AuthService.getProfile().username : null;

	//Handle form submission
	const handleSumbit = async (values: { title: string; content: string; link: string }) => {

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
						type: "link",
						title: values.title,
						content: values.content,
						link: values.link,
					},
				},
			});

			message.success("Link posted successfully!");
			form.resetFields();
		} catch (error) {
			message.error("Failed to submit link. Please try again.");
			console.error("Error submitting post:", error);
		}
	};


	return (
		<div style={{ maxWidth: 500, margin: "0 auto", padding: "20px" }}>
			<Title level={3} style={{ textAlign: "center", fontFamily: "var(--font-header)", fontSize: "3rem", color: "var(--tertiary)" }}>
				Share a Link
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
				
				{/* Content */}
				<Form.Item
					label={<span style={{ color: "var(--primary)" }}>Description</span>}
					name="content"
					rules={[{ required: true, message: "Please enter a description for the shared content." }]}
				>
					<Input placeholder="Enter description here" />
				</Form.Item>

				{/* Link */}
				<Form.Item
					label={<span style={{ color: "var(--primary)" }}>Link URL</span>}
					name="link"
					rules={[
						{ required: true, message: "Please enter a image URL." },
						{ type: "url", message: "Please enter a valid URL." },
					]}
				>
					<Input placeholder="Enter a link here" />
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

export default LinkPost;