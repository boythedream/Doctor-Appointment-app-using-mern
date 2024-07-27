import React from 'react'
import Layout from '../components/Layout'
import { Col, Input, message, Row, TimePicker, Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
const ApplyDoctor = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleFinish = async (values) => {
        try {
            dispatch(showLoading())
            const res = await axios.post("http://localhost:8080/api/v1/user/apply-doctor", { ...values, userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
                navigate("/")
            } else {
                message.error("res.data.error")
            }
        } catch (error) {
            dispatch(hideLoading())
            message.error("SomeThing went Wrong", error)
        }
    }
    return (
        <Layout>
            <h1 className="mb-4 text-center" style={{ color: '#007bff', fontWeight: 'bold', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Apply Doctor</h1>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'>
                <h4 className=''>Personal Details: </h4>
                <Row gutter={20}>

                    <Col xs={24} md={24} lg={8} >
                        <Form.Item label="First Name" name={"firstName"} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='"enter your first name' />
                        </Form.Item>
                    </Col >
                    <Col xs={24} md={24} lg={8} >
                        <Form.Item label="Last Name" name={"lastName"} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='"enter your last name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8} >
                        <Form.Item label="Phone" name={"phone"} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='"enter your phone number' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8} >

                        <Form.Item label="Email Address" name={"email"} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='"enter your Email Address' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8} >

                        <Form.Item label="Website" name={"website"}>
                            <Input type='text' placeholder='"if any Website' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8} >

                        <Form.Item label="Address" name={"address"} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='"enter Address' />
                        </Form.Item>
                    </Col>
                </Row>
                <h4 className="mb-4 text-center" style={{ color: '#007bff', fontWeight: 'bold', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Professional Details: </h4>
                <Row gutter={20}>


                    <Col xs={24} md={24} lg={8} >
                        <Form.Item label="Specialization" name={"specialization"} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='"enter Specialization' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8} >
                        <Form.Item label="Experience" name={"exprience"} required rules={[{ required: true }]}>
                            <Input type='text' placeholder='"enter Experience' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8} >
                        <Form.Item label="Fees" name={"fees"} required rules={[{ required: true }]}>
                            <Input type='Number' placeholder='"enter fees' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8} >
                        <Form.Item label="Timings" name={"timings"} required rules={[{ required: true }]}>
                            <TimePicker.RangePicker format={"HH:mm"} />
                        </Form.Item>
                    </Col>

                </Row>
                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-primary" type='submit'>Submit</button>
                </div>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor