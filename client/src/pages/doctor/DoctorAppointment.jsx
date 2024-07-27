import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Table, message } from 'antd'
import Layout from '../../components/Layout'

const DoctorAppointment = () => {
    const [appointment, setAppointment] = useState([])
    const getAppointments = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/doctors/doctor-appointments", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (res.data.success) {
                setAppointment(res.data.data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAppointments()
    }, [])

    const handleStatus = async (record, status) => {
        try {
            const res = await axios.post("http://localhost:8080/api/v1/doctors/update-status", { appointmentId: record._id, status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            if (res.data.success) {
                message.success(res.data.message)
                getAppointments()
            }
        } catch (error) {
            console.log(error);
        }
    }
    const columns = [
        {
            title: "ID",
            dataIndex: "_id"
        },
        // {
        //     title: "Name",
        //     dataIndex: "name",
        //     render: (text, record) => (
        //         <span>

        //             {record.doctorId.firstName} {record.doctorId.lastName}
        //         </span>
        //     )
        // },
        // {
        //     title: "Phone",
        //     dataIndex: "phone"
        // },
        {
            title: "Date & time",
            dataIndex: "date",
            render: (text, record) => (
                <span>

                    {moment(record.date).format("DD-MM-YYYY")}
                    {moment(record.time).format("HH:mm")}
                </span>
            )
        },
        {
            title: "Status",
            dataIndex: "status",

        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className='d-flex '>
                    {record.status === "pending" && (
                        <div className='d-flex mx-2'>
                            <button className='btn btn-success' onClick={() => handleStatus(record, 'approved')}>Approve</button>
                            <button className='btn btn-danger' onClick={() => handleStatus(record, 'reject')}>Reject</button>
                        </div>
                    )}
                </div>
            )

        },
    ]



    return (
        <Layout>
            <h1 className="mb-4 text-center" style={{ color: '#007bff', fontWeight: 'bold', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
                Appointments List
            </h1>
            <Table columns={columns} dataSource={appointment} />
        </Layout>
    )
}

export default DoctorAppointment;