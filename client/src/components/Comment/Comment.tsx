import React from "react";
import { Card, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import type CommentProps from "../../interfaces/Comment";
import dayjs from "dayjs";

const { Text, Paragraph } = Typography;

const Comment: React.FC<{ comment: CommentProps }> = ({ comment }) => {
    return (
        <Card style={{ marginBottom: '16px', backgroundColor: "var(--secondary)", color: "var(--primary)", fontFamily: "var(--font-body)", fontSize: "1rem", borderRadius: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Avatar icon={<UserOutlined />} />
                <Text strong>{comment.username}</Text>
            </div>

            <Paragraph style={{ marginTop: "8px" }}>{comment.content}</Paragraph>
            <Text type="secondary" style={{ fontFamily: "var(--font-body)", fontSize: "1rem"}}>
                {dayjs(comment.createdAt).format("MM DD, YYYY h:mm A")}
            </Text>
        </Card>
    );
};

export default Comment;