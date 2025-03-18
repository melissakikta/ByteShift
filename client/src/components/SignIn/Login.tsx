import { useState, type FormEvent, type ChangeEvent} from 'react';
import { Form, Input, Button, Typography, Space, message } from "antd"; 
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import AuthService from '../../utils/auth';

const { Title } = Typography;

const Login = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      AuthService.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      username: '',
      password: '',
    });
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '20px' }}>
      <Title level={3} style={{ textAlign: 'center' }}>
        <h2>Login</h2>
      </Title>

      <Form
        form={Form}
        layout="vertical"
        onFinish={handleFormSubmit}
        style={{ maxWidth: 400, margin: '0 auto' }}
      >
        {/* Username Input */}
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
          style={{ marginBottom: '1rem' }}
        >
          <Input
            placeholder="Enter your username"
            name="username"
            value={formState.username}
            onChange={handleChange}
          />
        </Form.Item>

        {/* Password Input */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          style={{ marginBottom: '1rem' }}
          >
          <Input.Password
            placeholder="Enter your password"
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
          </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? "Logging in..." : "Logged in!"}
            </Button>
              Login
            {error && (
              <div>
                <p className="error-text">The provided credentials are incorrect</p>
              </div>
            )}
          </Space>
        </Form.Item>

    </div>
  );

};

export default Login;