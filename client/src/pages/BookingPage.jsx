import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DatePicker, TimePicker, message } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';

const BookingPage = () => {
    const [doctor, setDoctor] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState([]);
    const [availability, setAvailability] = useState(false);
    const params = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const getUserData = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/doctors/get-single-doctor', { doctorId: params.doctorId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (res.data.success) {
                message.success(res.data.message);
                setDoctor(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, [params]);

    // handle booking

    const handleBooking = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post("http://localhost:8080/api/v1/user/book-appointment", {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: JSON.stringify(doctor), // Convert object to string
                userInfo: JSON.stringify(user), // Convert object to string
                date: moment(date).format('DD-MM-YYYY'),
                time: time.map(t => moment(t).format('HH:mm'))
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    // handle booking availability
    const handleAvailability = async () => {
        if (!date || !time.length) {
            message.error("Please select date and time.");
            return;
        }

        try {
            dispatch(showLoading());
            const res = await axios.post("http://localhost:8080/api/v1/user/booking-availability", {
                doctorId: params.doctorId,
                date: moment(date).format('DD-MM-YYYY'),
                time: time.map(t => moment(t).format('HH:mm'))
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                setAvailability(true);
                message.success(res.data.message);
            } else {
                setAvailability(false);
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };


    return (
        <Layout>
            <div className="container mt-4">
                <h1 className="mb-4 text-center" style={{ color: '#007bff', fontWeight: 'bold', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>
                    Booking Page
                </h1>
                {doctor && (
                    <div className="card p-3 mx-auto" style={{ maxWidth: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <div className="card-body">
                            <h4 className="card-title text-center mb-3" style={{ color: '#333' }}>
                                Dr. {doctor.firstName} {doctor.lastName}
                            </h4>
                            <h6 className="card-subtitle mb-2 text-muted text-center">Fees: ${doctor.fees}</h6>
                            <h6 className="card-subtitle mb-2 text-muted text-center">Timings: {doctor.timings[0]} - {doctor.timings[1]}</h6>
                            <div className="d-flex flex-column mt-3">
                                <DatePicker
                                    className="mb-3"
                                    style={{ width: '100%' }}
                                    format={"DD-MM-YYYY"}
                                    onChange={(date) => setDate(date)}
                                />
                                <TimePicker.RangePicker
                                    className="mb-3"
                                    style={{ width: '100%' }}
                                    format={"HH:mm"}
                                    onChange={(time) => setTime(time)}
                                />
                                <button className="btn btn-primary mb-2" style={{ width: '100%' }} onClick={handleAvailability}>Check Availability</button>

                                <button className="btn btn-dark" style={{ width: '100%' }} onClick={handleBooking}>Book Now</button>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default BookingPage;
