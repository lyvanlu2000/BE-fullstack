import db from "../models";
require('dotenv').config();

let postBookAppointment=async(data)=>{
    return new Promise (async(resolve,reject)=>{
        try{
            if(!data.email || !data.doctorId || !data.timeType || !data.date){
                resolve({
                    errCode:1,
                    errMessage:'missing parameter'
                })
            }else{
                //upsert patient
                let user = await db.User.findOrCreate({
                    where:{email:data.email},
                    defaults:{
                        email:data.email,
                        roleId:'R3'
                    }
                });

                //create a booking record
                if(user && user[0]){
                    await db.Booking.findOrCreate({
                        where:{patientId:user[0].id},
                        defaults:{
                            statusId:'S1',
                            doctorId:data.doctorId,
                            patientId:user[0].id,
                            date:data.date,
                            timeType:data.timeType
                        }
                        
                    })
                }

                resolve({
                    errCode:0,
                    errMessage:"booking succeed"
                })
            }
            
        }
        catch(e){
            reject(e)
        }
    })
}

module.exports={
    postBookAppointment:postBookAppointment
}