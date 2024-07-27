import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd'

const Appointment = () => {
    const [appointment, setAppointment] = useState([])
    const getAppointments = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/user/appointment", {
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

export default Appointment