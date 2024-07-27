import React from 'react';
import Layout from '../components/Layout';
import { message, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notification = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const handMarkRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('http://localhost:8080/api/v1/user/get-all-notification', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong");
        }
    };

    const handMarkDelete = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('http://localhost:8080/api/v1/user/delete-all-notification', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error("Something went wrong");
        }
    };

    return (
        <Layout>
            <div className="container mt-4">
                <h4 className="mb-4 text-center" style={{ color: '#007bff', fontWeight: 'bold', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Notification</h4>
                <Tabs defaultActiveKey="0">
                    <Tabs.TabPane tab="Unread" key="0">
                        <div className="d-flex justify-content-end mb-2">
                            <button className="btn btn-primary" onClick={handMarkRead}>Mark all Read</button>
                        </div>
                        {user?.notification.map((notificationMsg) => (
                            <div className="card mb-2" key={notificationMsg._id} onClick={() => navigate("/admin/doctors")}>
                                <div className="card-body">
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Read" key="1">
                        <div className="d-flex justify-content-end mb-2">
                            <button className="btn btn-danger" onClick={handMarkDelete}>Delete all Read</button>
                        </div>
                        {user?.seennotification.map((notificationMsg) => (
                            <div className="card mb-2" key={notificationMsg._id} onClick={() => navigate("/admin/doctors")}>
                                <div className="card-body">
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))}
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Layout>
    );
};

export default Notification;
