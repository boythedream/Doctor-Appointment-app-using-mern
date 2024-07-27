import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();
    return (
        <div className="col-md-4">
            <div className="card m-2 shadow-sm" onClick={() => navigate(`/book-appointment/${doctor._id}`)} style={{ cursor: "pointer" }}>
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Dr. {doctor.firstName} {doctor.lastName}</h5>
                </div>
                <div className="card-body">
                    <p>
                        <b>Specialization:</b> {doctor.specialization}
                    </p>
                    <p>
                        <b>Experience:</b> {doctor.experience} years
                    </p>
                    <p>
                        <b>Fees:</b> ${doctor.fees}
                    </p>
                    <p>
                        <b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DoctorList;
