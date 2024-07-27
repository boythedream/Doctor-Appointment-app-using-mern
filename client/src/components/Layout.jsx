import React from 'react';
import '../style/layout.css';
import { AdminMenu, userMenu } from '../Data/data';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Badge, message } from 'antd';
import "../style/layout.css"

const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);

    const handleLogout = async () => {
        localStorage.clear();
        message.success('Logout successfully');
        navigate('/login');
    };

    // *********************Admin menu  ********************
    const DoctorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'fa-solid fa-house'
        },
        {
            name: 'Appointments',
            path: '/doctor-appointments',
            icon: 'fa-solid fa-calendar-check'
        },
        {
            name: 'Profile',
            path: `/doctor-profile/${user?._id}`,
            icon: 'fa-solid fa-user'
        }
    ];

    // *********************Admin menu  ********************
    const SideBarMenu = user?.isAdmin ? AdminMenu : user?.isDoctor ? DoctorMenu : userMenu;

    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h6>Doc App</h6>
                            <hr />
                        </div>
                        <div className="menu">
                            {SideBarMenu.map((menu, index) => {
                                const isActive = location.pathname === menu.path;
                                return (
                                    <div key={index} className={`menu-item ${isActive && 'active'}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                );
                            })}
                            <div className="menu-item" onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <Link to="/login">LogOut</Link>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <div className="header-content">
                                <Badge count={user && user.notification.length} onClick={() => navigate('/get-all-notification')}>
                                    <i className="fa-solid fa-bell"></i>
                                </Badge>
                                <Link to="/profile">{user?.name}</Link>
                            </div>
                        </div>
                        <div className="body">{children}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
