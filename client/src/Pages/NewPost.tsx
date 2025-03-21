import React, { useState } from 'react';
import { Typography, Layout, Row, Col, Select } from 'antd';
const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;
import BlogPost from '../components/PostForms/blogPost';
import CodePost from '../components/PostForms/codePost';
import LinkPost from '../components/PostForms/linkPost';
const NewPost: React.FC = () => {
const [postType, setPostType] = useState<string>("blog");

const handlePostTypeChange = (value: string) => {
  setPostType(value);
}
    
    return (
       <Layout className="home" style={{ minHeight: "100vh", padding: "40px", background: "var(--primary)" }}>
         <Content className="page-section" style={{ textAlign: "center", maxWidth: 800, margin: "auto" }}>
           <Title level={1} style={{ color: "var(--tertiary)"}}>Welcome to ByteShift!</Title>    
           <Row gutter={{ xs: 16, sm: 16, md: 16, lg: 16 }} justify="center">
             <Col span={24}>
               <Paragraph style={{ color: "var(--secondary)"}}>What would you like to post today?</Paragraph>
               <Select defaultValue="blog" onChange={handlePostTypeChange} style={{ width: 120 }}>
                 <Option value="blog">Blog</Option>
                 <Option value="code">Code Snippet</Option>
                 <Option value="link">Link</Option>
               </Select>
             </Col>
           </Row>

           <Row gutter={16} justify="center">
             {postType === "blog" && <BlogPost />}
             {postType === "code" && <CodePost />}
             {postType === "link" && <LinkPost />}
           </Row>
         </Content>
       </Layout>

    );
};

export default NewPost;