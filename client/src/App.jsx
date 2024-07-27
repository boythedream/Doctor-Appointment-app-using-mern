
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import Spinner from './components/Spinner'
import PublicRoute from './components/PublicRoute'
import ProtectedRoute from './components/ProtectedRoute'
import ApplyDoctor from './pages/ApplyDoctor'
import Notification from './pages/Notification'
import Users from './pages/admin/Users'
import Doctors from './pages/admin/Doctors'
import Profile from './pages/doctor/Profile'
import BookingPage from './pages/BookingPage'
import Appointment from './pages/Appointment'
import DoctorAppointment from './pages/doctor/DoctorAppointment'
function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <>
      <Toaster />
      <BrowserRouter>
        {loading ? (<Spinner />) : (
          <Routes>
            <Route path='/' element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />

            <Route path='/apply-doctor' element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            } />
            <Route path='/admin-users' element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            } />
            <Route path='/admin-doctors' element={
              <ProtectedRoute>
                <Doctors />
              </ProtectedRoute>
            } />
            <Route path='/doctor-Profile/:id' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path='/book-appointment/:doctorId' element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            } />
            <Route path='/appointments' element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            } />
            <Route path='/doctor-appointments' element={
              <ProtectedRoute>
                <DoctorAppointment />
              </ProtectedRoute>
            } />
            <Route path='/get-all-notification' element={
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            } />
            <Route path='/login' element={
              <PublicRoute>
                <Login />
              </PublicRoute>} />
            <Route path='/register' element={
              <PublicRoute>
                <Register />
              </PublicRoute>} />
          </Routes>
        )
        }
      </BrowserRouter>

    </>
  )
}

export default App
