import React from 'react'
import ResponsiveDrawer from '../../components/ResponsiveDrawer'
import { Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import AddCourse from './add course/AddCourse'
import AllCourse from './all course/AllCourse'
import AllStudent from './all student/AllStudent'

const AdminDashboard = () => {
  return (
    <>
      <ResponsiveDrawer screen = {
        <Box>
          <Routes>
            <Route path='/' element={<AddCourse/>}/>
            <Route path='/allCourse' element={<AllCourse/>}/>
            <Route path='/allStudent' element={<AllStudent/>}/>
          </Routes>
        </Box>
      }/>
    </>
  )
}

export default AdminDashboard