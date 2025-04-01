import React from "react";
import { Card, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type CommentProps from "../../interfaces/Comment";
import dayjs from "dayjs";

const { Text, Paragraph } = Typography;

const Comment: React.FC<{ comment: CommentProps }> = ({ comment }) => {
    return (
        <Card style={{ 
            marginBottom: '16px', 
            backgroundColor: "var(--tertiary)", 
            color: "var(--secondary)", 
            fontFamily: "var(--font-body)", 
            fontSize: "1rem", 
            border: "2px var(--quaternary)", // Lime border
            borderRadius: "10px", // Rounded corners
            padding: "20px", // Padding for better spacing
            boxShadow: "0 0 10px var(--quaternary)", // Lime shadow
           }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Avatar icon={<UserOutlined />} />
                <Text style={{ color: "var(--secondary)", fontFamily: "var(--font-body)", fontSize: "1rem" }} strong>{comment.username}</Text>
            </div>

            <Paragraph style={{ color: "var(--secondary)", fontFamily: "var(--font-body)", fontSize: "1rem", marginTop: "8px" }}>{comment.content}</Paragraph>
            <Text type="secondary" style={{ color: "var(--secondary)", fontFamily: "var(--font-body)", fontSize: "1rem"}}>
                {dayjs(comment.createdAt).format("MM DD, YYYY h:mm A")}
            </Text>
        </Card>
    );
};
 
export default Comment;