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

	//Get current user
	const user = AuthService.loggedIn() ? AuthService.getProfile().username : null;

	//Handle form submission
	const handleSumbit = async (values: { title: string; content: string; link: string }) => {

		//Check if user is logged in
		if (!user) {
			message.error("You must be logged in to post a blog.");
			return;
		}

		if (!values.title || !values.content) {
			message.error("Please enter a title and description content.");
			return;
		}

		if (!values.link) {
			message.error("Please enter a link URL.");
			return;
		}

		try {
			const url = values.link;
			await addPost({
				variables: {
					postInput: {
						username: user,
						type: "link",
						title: values.title,
						content: values.content,
						link: url,
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
		<div style={{ minWidth: 450, maxWidth: 500, margin: "0 auto", padding: "20px" }}>
			<Title level={3} style={{ textAlign: "center", fontFamily: "var(--font-header)", fontSize: "2.5rem", color: "var(--active-color)" }}>
				Share a Link
			</Title>

			<Form
				//form={Form}
				layout="vertical"
				onFinish={handleSumbit}
				style={{
					padding: "20px", // Padding for better spacing
					backgroundColor: "var(--tertiary)", // Ensure background color
					color: "var(--primary)", // Ensure text color
					fontFamily: "var(--font-body)",
					fontSize: "1.5rem",
					border: "2px var(--quaternary)", // Lime border
        	borderRadius: "10px", // Rounded corners
       	 	boxShadow: "0 0 10px var(--quaternary)"
				}}
			>
				{/* Title */}
				<Form.Item
					label={<span style={{ color: "var(--secondary)" }}>Title</span>}
					name="title"
					rules={[{ required: true, message: "Please enter a title." }]}
				>
					<Input placeholder="Enter a title here" />
				</Form.Item>

				{/* Content */}
				<Form.Item
					label={<span style={{ color: "var(--secondary)" }}>Description</span>}
					name="content"
					rules={[{ required: true, message: "Please enter a description for the shared content." }]}
				>
					<Input placeholder="Enter description here" />
				</Form.Item>

				{/* Link */}
				<Form.Item
					label={<span style={{ color: "var(--secondary)" }}>Link URL</span>}
					name="link"
					rules={[
						{ required: true, message: "Please enter a valid URL." },
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

export default LinkPost;