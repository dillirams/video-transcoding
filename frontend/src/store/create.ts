import { create } from "zustand";


interface CourseState{
    upload:boolean,
    chatAi:boolean
    setUpload:(upload:boolean)=>void,
    setChatAi:(cahtAi:boolean)=>void
}

export const useCourseState= create<CourseState>((set)=>({
upload:false,
chatAi:false,
setUpload:(upload)=>set({upload}),
setChatAi:(chatAi)=>set({chatAi})

}))