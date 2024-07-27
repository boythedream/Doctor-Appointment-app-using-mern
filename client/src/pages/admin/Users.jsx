import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { message, Table } from 'antd'
import axios from 'axios'

const Users = () => {
    const [users, setUsers] = useState("")


    const getUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/admin/get-all-user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res.data.success) {
                setUsers(res.data.data)

            }
            else {
                message.error(res.data, message)
            }
        }
        catch (error) {
            message.error(res.data.message)
        }
    }
    useEffect(() => {
        getUsers()
    }, [])

    //ANtD table columns
    const columns = [
        {
            title: 'Name',
            dataIndex: "name"
        },
        {
            title: 'Email',
            dataIndex: "email"
        },
        {
            title: 'Doctor',
            dataIndex: "isDoctor",
            render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>
        },
        {
            title: 'Actions',
            dataIndex: "actions",
            render: (text, record) => (
                <div className='d-flex'>
                    <button className='btn btn-danger'>Block</button>
                </div>
            )
        },
    ]
    return (
        <Layout>
            <h1 className="mb-4 text-center" style={{ color: '#007bff', fontWeight: 'bold', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Users List</h1>
            <Table columns={columns} dataSource={users} />
        </Layout>
    )
}

export default Users