
# Doctor Appointment System

## Overview

The Doctor Appointment System is a robust web application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js) to streamline the process of scheduling medical consultations. This system offers a user-friendly interface for both patients and doctors, ensuring a seamless healthcare experience.

## Features

- **User Authentication**: Users can register, login, and logout securely.
- **Admin Dashboard**: Admins can manage users, doctors, and appointments.
- **User Dashboard**: Normal users can book appointments, check doctor availability, and view their appointment history.
- **Doctor Dashboard**: Doctors can manage their appointments, view patient requests, and update their availability.
- **Apply to Become a Doctor**: Users can apply to become doctors, subject to admin approval.
- **Book Appointments**: Users can book appointments with doctors and check their availability.
- **Request Management**: Doctors can approve or reject requests to become a doctor.
- **Notifications**: Users and doctors receive notifications about appointment status and updates.

## Getting Started

### Prerequisites

Ensure you have the following installed on your local development machine:

- Node.js
- MongoDB
- npm (Node Package Manager)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/boythedream/Doctor-Appointment-app-using-mern.git
   cd doctor-appointment-system
   ```

2. **Install server dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**:

   Create a `.env` file in the server directory and add the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. **Start the development server**:
   ```bash
   cd server
   npm run dev
   ```

   Open a new terminal and start the client:

   ```bash
   cd client
   npm start
   ```

6. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Register**: Create a new account as a normal user.
2. **Login**: Log into the system with your credentials.
3. **Book Appointment**: Navigate to the 'Book Appointment' section to check doctor availability and schedule an appointment.
4. **Apply to Become a Doctor**: Users can submit an application to become a doctor from their dashboard.
5. **Manage Requests**: Admins can approve or reject doctor applications.
6. **Doctor Management**: Doctors can manage their schedules and appointments through their dedicated dashboard.
7. **Notifications**: Receive real-time updates and notifications on appointment status and requests.

## Contributing

We welcome contributions to enhance the functionality and features of this system. Please fork the repository, create a new branch, and submit a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or support, please contact:
- Your Name: Ghulam Raza
- GitHub: https://github.com/boythedream

