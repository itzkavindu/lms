import express from "express";
import { addCourse, getEducatorCourses, updateRoleToEducator ,getEducatorDashboardData, getEnrolledStudentsData, requestEducatorRole ,deleteCourse} from "../controllers/educatorController.js";
import upload from "../configs/multer.js";
import { protectEducator } from "../middlewares/authMiddleware.js";

const educatorRouter = express.Router();

//Add Educator Role
educatorRouter.get("/request-role", requestEducatorRole)
educatorRouter.get("/update-role", updateRoleToEducator)
educatorRouter.post("/add-course", upload.single('image'), addCourse)
educatorRouter.get("/courses", getEducatorCourses)
educatorRouter.get("/dashboard", getEducatorDashboardData)
educatorRouter.get("/enrolled-students", getEnrolledStudentsData)
educatorRouter.delete("/delete-course/:courseId", deleteCourse)

export default educatorRouter;