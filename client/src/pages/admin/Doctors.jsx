import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios';
import { message, Table } from 'antd';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    const getDoctors = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/admin/get-all-doctor', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (res.data.success) {
                setDoctors(res.data.data);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong");
        }
    };

    const handleAccountStatus = async (record, status) => {
        try {
            const res = await axios.post("http://localhost:8080/api/v1/admin/change-account-status",
                { doctorId: record._id, userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            if (res.data.success) {
                message.success(res.data.message);
                getDoctors(); // Refresh the doctors list
            }
        } catch (error) {
            console.log(error);
            message.error("Something went wrong");
        }
    };

    useEffect(() => {
        getDoctors();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span>{record.firstName} {record.lastName}</span>
            )
        },
        {
            title: "Status",
            dataIndex: "status"
        },
        {
            title: "Phone",
            dataIndex: "phone"
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className='d-flex'>
                    {record.status === "pending" ? (
                        <button className='btn btn-success' onClick={() => handleAccountStatus(record, 'approved')}>Approve</button>
                    ) : (
                        <button className='btn btn-danger' onClick={() => handleAccountStatus(record, 'rejected')}>Reject</button>
                    )}
                </div>
            )
        },
    ];

    return (
        <Layout>
            <h1 className="mb-4 text-center" style={{ color: '#007bff', fontWeight: 'bold', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>All Doctors</h1>
            <Table columns={columns} dataSource={doctors} rowKey="_id" />
        </Layout>
    );
};

export default Doctors;
