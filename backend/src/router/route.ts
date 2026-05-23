import { Router } from "express";
import { adminSignup } from "../controller/signup/admin";
import { userSignup } from "../controller/signup/user";
import { adminSignin } from "../controller/signin/admin";
import { userSignin } from "../controller/signin/user";
import { middleware } from "../middleware/middleware";
import { createCourse } from "../controller/admin/create";
import { getCourse } from "../controller/admin/getCourse";
import { getTutor } from "../controller/admin/getTutor";
import { getAllCourses } from "../controller/user/getAllCourses";
import { buyCourse } from "../controller/user/buycourse";
import { getUserCourse } from "../controller/user/getCourse";
import { addLecture } from "../controller/admin/addLecture";
import { verifyPayment } from "../controller/user/verifyPayment";

export const appRouter=Router();

appRouter.post('/adminSignup', adminSignup);
appRouter.post('/userSignup',userSignup);
appRouter.post('/userSignin',userSignin);
appRouter.post('/adminSignin',adminSignin);
appRouter.post('/createCourse',middleware,createCourse)
appRouter.get('/getCourse',middleware,getCourse)
appRouter.get('/tutorDetail',middleware,getTutor)
appRouter.post('/addLecture',middleware,addLecture)
appRouter.get('/getAllCourses', getAllCourses);
appRouter.post('/buyCourse', middleware, buyCourse);
appRouter.post("/verify-payment", middleware, verifyPayment)
appRouter.get('/getUserCourse', middleware, getUserCourse);
