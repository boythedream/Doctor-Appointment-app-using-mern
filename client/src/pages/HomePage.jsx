import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { message, Row } from 'antd';
import DoctorList from '../components/DoctorList';

const HomePage = () => {
    const [doctors, setDoctors] = useState([]);

    const getUserData = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/v1/doctors/get-all-doctors", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                message.success(res.data.message);
                setDoctors(res.data.data); // Corrected this line
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <Layout>
            <h1 className="mb-4 text-center" style={{ color: '#007bff', fontWeight: 'bold', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>HomePage</h1>
            <Row>
                {doctors && doctors.map((doctor) => (
                    <DoctorList key={doctor._id} doctor={doctor} /> // Added a key prop
                ))}
            </Row>
        </Layout>
    );
};

export default HomePage;
