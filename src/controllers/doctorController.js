import doctorService from "../services/doctorService"
let getTopDoctorHome = async (req,res)=>{
    let limit =req.query.limit;
    if(!limit) limit=10;
    try{
        let response = await doctorService.getTopDoctorHome(+limit)
        return res.status(200).json(response);
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error from server...'
        })
    }
}

let getAllDoctors = async (req,res)=>{
    try{
        let doctors=await doctorService.getAllDoctors()
        return res.status(200).json(doctors)
    }
    catch(e){
        console.log(e)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form server'
        })
    }
}

let postInforDoctor = async (req,res)=>{
    try{
        let response= await doctorService.saveDetailInforDoctor(req.body)
        return res.status(200).json(response)
    }
    catch(e){
        console.log(e)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form server'
        })
    }
}

let getDetailDoctorById= async(req,res)=>{
    try{
        let infor = await doctorService.getDetailDoctorById(req.query.id)
        // console.log('check id',req.query.id)
        return res.status(200).json(infor)
    }
    catch(e){
        console.log(e)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form server'
        })
    }
}

let bulkCreateSchedule=async (req,res)=>{
    try{
        let infor = await doctorService.bulkCreateSchedule(req.body)
        return res.status(200).json(infor)
    }
    catch(e){
        console.log(e)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form server'
        })
    }
}
 
let getScheduleByDate= async(req,res)=>{
    try{
       // console.log('doctorId:',req.query.doctorId,'date:',req.query.date)
        let infor = await doctorService.getScheduleByDate(req.query.doctorId,req.query.date)
        return res.status(200).json(infor)
    }
    catch(e){
        console.log(e)
        return res.status(200).json({
            errCode:-1,
            errMessage:'Error form server'
        })
    }
}

let getExtraInforDoctorById = async(req,res)=>{
    try{
         let infor = await doctorService.getExtraInforDoctorById(req.query.doctorId)
         return res.status(200).json(infor)
     }
     catch(e){
         console.log(e)
         return res.status(200).json({
             errCode:-1,
             errMessage:'Error form server'
         })
     }
}

let getProfileDoctorById = async(req,res)=>{
    try{
         let infor = await doctorService.getProfileDoctorById(req.query.doctorId)
         return res.status(200).json(infor)
     }
     catch(e){
         console.log(e)
         return res.status(200).json({
             errCode:-1,
             errMessage:'Error form server'
         })
     }
}

module.exports={
    getTopDoctorHome:getTopDoctorHome,
    getAllDoctors:getAllDoctors,
    postInforDoctor:postInforDoctor,
    getDetailDoctorById:getDetailDoctorById,
    bulkCreateSchedule:bulkCreateSchedule,
    getScheduleByDate:getScheduleByDate,
    getExtraInforDoctorById:getExtraInforDoctorById,
    getProfileDoctorById:getProfileDoctorById
}