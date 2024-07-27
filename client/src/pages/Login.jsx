import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

const { Title } = Typography;

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        dispatch(showLoading());
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/user/login', values);
            dispatch(hideLoading());
            if (data?.success) {
                toast.success("User login successfully");
                localStorage.setItem('token', data.token);
                dispatch(setUser(data.user)); // Update the global state with the logged-in user
                navigate('/'); // Navigate to the homepage
            } else {
                toast.error(data?.message || "Login failed");
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred during login");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', marginTop: 50, padding: 20, border: '1px solid #d9d9d9', borderRadius: 5 }}>
            <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
            <Form
                form={form}
                name="login"
                onFinish={onFinish}
                initialValues={{ remember: true }}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input size="large" placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password size="large" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Login
                    </Button>
                </Form.Item>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <span>Don't have an account? <Link to="/register" style={{ color: '#1890ff' }}>Register</Link></span>
                </div>
            </Form>
        </div>
    );
};

export default Login;
