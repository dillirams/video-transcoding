import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './pages/homepage'
import { TutorSignup } from './auth/tutor/signup'
import { TutorSignin } from './auth/tutor/signin'
import { TutorDashboard } from './pages/tutor-dashboard'
import { UserSignup } from './auth/user/signup'
import { UserSignin } from './auth/user/signin'
import { UserDashboard } from './pages/user-dashboard'
import { MyCourses } from './pages/my-courses'
import { AddVideo } from './pages/add-video'
import { CourseViewer } from './pages/course-viewer'


function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path='/tutorSignup' element={<TutorSignup/>}></Route>
         <Route path='/tutorSignin' element={<TutorSignin/>}></Route>
         <Route path='/tutorDashboard' element={<TutorDashboard/>}></Route>
         <Route path='/signup' element={<UserSignup/>}></Route>
         <Route path='/studentLogin' element={<UserSignin/>}></Route>
         <Route path='/courses' element={<UserDashboard/>}></Route>
         <Route path='/my-courses' element={<MyCourses/>}></Route>
         <Route path='/add-video/:courseId' element={<AddVideo/>}></Route>
         <Route path='/learn/:courseId' element={<CourseViewer/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
