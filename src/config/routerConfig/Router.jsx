import React from 'react'
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Admission from '../../screens/admission/Admission'
import Login from '../../screens/login/Login'
import AdminDashboard from '../../screens/adminDashboard/AdminDashboard'
import StudentDashboard from '../../screens/studentDashboard/StudentDashboard';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login/>} />
        <Route path="admission" element={<Admission/>} />
        <Route path="studentDashboard" element={<StudentDashboard/>} />
        <Route path="admin/*" element={<AdminDashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router