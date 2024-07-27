import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Col, Input, message, Row, TimePicker, Form } from 'antd';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import moment from 'moment';

const Profile = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [doctor, setDoctor] = useState(null);
    const params = useParams();

    const getDoctorInfo = async () => {
        try {
            const res = await axios.post("http://localhost:8080/api/v1/doctors/get-single-doc-info", { userId: params.id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (res.data.success) {
                const docData = res.data.data;
                // Ensure timings are in the correct format for the TimePicker
                if (docData.timings) {
                    docData.timings = docData.timings.map(time => moment(time, "HH:mm"));
                }
                setDoctor(docData);
            }
        } catch (error) {
            message.error(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        getDoctorInfo();
    }, []);

    const handleFinish = async (values) => {
        try {
            dispatch(showLoading());
            // Convert timings back to string format before sending to backend
            if (values.timings) {
                values.timings = values.timings.map(time => time.format("HH:mm"));
            }
            const res = await axios.post("http://localhost:8080/api/v1/doctors/update-profile", { ...values, userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                navigate("/");
            } else {
                message.error(res.data.error);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error("Something went wrong", error);
        }
    };

    return (
        <Layout>
            <h1 className="mb-4 text-center" style={{ color: '#007bff', fontWeight: 'bold', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Manage Profile</h1>
            {doctor && (
                <Form
                    layout='vertical'
                    onFinish={handleFinish}
                    className='m-3'
                    initialValues={{
                        ...doctor,
                        // Ensure timings are in the correct format for the TimePicker
                        timings: doctor.timings ? doctor.timings.map(time => moment(time, "HH:mm")) : []
                    }}
                >
                    <h4 className=''>Personal Details: </h4>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="First Name" name="firstName" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Enter your first name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Last Name" name="lastName" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Enter your last name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Phone" name="phone" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Enter your phone number' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Email Address" name="email" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Enter your email address' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Website" name="website">
                                <Input type='text' placeholder='If any website' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Address" name="address" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Enter address' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h4 className=''>Professional Details: </h4>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Specialization" name="specialization" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Enter specialization' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Experience" name="experience" required rules={[{ required: true }]}>
                                <Input type='text' placeholder='Enter experience' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Fees" name="fees" required rules={[{ required: true }]}>
                                <Input type='number' placeholder='Enter fees' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Timings" name="timings" required rules={[{ required: true }]}>
                                <TimePicker.RangePicker format="HH:mm" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end mb-3">
                        <button className="btn btn-primary" type='submit'>Submit</button>
                    </div>
                </Form>
            )}
        </Layout>
    );
};

export default Profile;
