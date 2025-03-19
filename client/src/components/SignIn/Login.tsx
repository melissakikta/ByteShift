import React, { useState } from 'react';
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', margin: '0 auto' }}>
      <AntCard style={{ width: 400, textAlign: 'center', padding: '2rem' }}>
        <Title level={3} style={{ textAlign: 'center' }}>Login</Title>

        {error && <Alert message="Incorrect username and/or password, please try again." type="error" showIcon style={{ marginBottom: 16 }} />}
        
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          style={{ maxWidth: 400, margin: '0 auto' }}
          autoComplete="off"
        >
          {/* Username Input */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            style={{ marginBottom: '1rem' }}
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
              <Button type="primary" htmlType="submit" block loading={loading}>
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