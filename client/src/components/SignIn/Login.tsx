import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Form, Input, Button, Typography, Card as AntCard, Alert } from "antd"; 
import { LockOutlined } from '@ant-design/icons';
import { LOGIN_USER } from '../../utils/mutations';
import AuthService from '../../utils/auth';

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [login, { error }] = useMutation(LOGIN_USER);
  const [loading, setloading] = useState(false);

  const handleFormSubmit = async (values: {username: string; password: string }) => {
    setloading(true);
    try {
      const { data } = await login({
        variables: { ...values },
      });

      AuthService.login(data.login.token);
    }
    catch (e) {
      console.error(e);
    } finally {
      setloading(false);
    }
  };

  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', margin: '0 auto', background: "var(--primary)" }}>
      <AntCard style={{width: 400, textAlign: 'center', padding: '20px', background: "var(--primary)", color: "var(--secondary)" }}>
        <Title level={2} style={{ textAlign: 'center', color: "var(--tertiary)", fontFamily: "var(--font-header)", fontSize: "2rem" }}>Login</Title>

        {error && <Alert message="Incorrect username and/or password, please try again." type="error" showIcon style={{ marginBottom: 16, background: "white", color: "var(--warning)" }} />}
        
        <Form
          form={form}
          layout="vertical"
          name="login"
          onFinish={handleFormSubmit}
          style={{ maxWidth: 400, margin: '0 auto', fontFamily: "var(--font-body)", color: "var(--secondary)" }}
          autoComplete="off"
        >
          {/* Username Input */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            style={{ marginBottom: '1rem', color: "var(--secondary)" }}
          >
            <Input prefix={<LockOutlined />} placeholder="Username" />
          </Form.Item>

          {/* Password Input */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            style={{ marginBottom: '1rem' }}
            >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

          {/* Submit Button */}
          <Form.Item>
              <Button type="primary" htmlType="submit"  className="custom-menu-item" style={{fontSize: "1.5rem" }} block loading={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>

              {error && (
                <div>
                  <p className="error-text">The provided credentials are incorrect</p>
                </div>
              )}
          </Form.Item>
        </Form>
      </AntCard>
    </div>
  );
};

export default Login;