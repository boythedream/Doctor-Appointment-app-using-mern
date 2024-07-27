import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice';
const { Title } = Typography;

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { name, email, password } = values;
        dispatch(showLoading())
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/user/register', values);
            dispatch(hideLoading())
            if (data?.success) {
                toast.success("User registered successfully");
                navigate('/login')
            } else {
                toast.error(data?.message || "Registration failed");
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("An error occurred during registration");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: 'auto', marginTop: 50, padding: 20, border: '1px solid #d9d9d9', borderRadius: 5 }}>
            <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{ remember: true }}
                scrollToFirstError
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input size="large" placeholder="Username" />
                </Form.Item>

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
                        Register
                    </Button>
                </Form.Item>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <span>Already have an account? <Link to="/login" style={{ color: '#1890ff' }}>Login</Link></span>
                </div>
            </Form>
        </div>
    );
};

export default Register;
