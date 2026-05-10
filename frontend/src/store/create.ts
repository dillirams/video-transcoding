import { create } from "zustand";


interface CourseState{
    upload:boolean,
    setUpload:(upload:boolean)=>void
}

export const useCourseState= create<CourseState>((set)=>({
upload:false,
setUpload:(upload)=>set({upload})

}))