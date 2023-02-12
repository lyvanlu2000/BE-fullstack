import db from "../models";
import bcrypt from 'bcryptjs';

let handleUserLogin = (email,password)=>{
    return new Promise( async(resolve,reject)=>{
        try{
            let userData = {};

            let isExist= await checkUserEmail(email);
            if(isExist){

                let user = await db.User.findOne({
                    attributes:['email','roleId','password'],
                    where:{email:email},
                    raw:true
                    
                })
                if(user){
                    //check password
                    let check =await bcrypt.compareSync(password, user.password); // false
                    
                    if(check){
                        userData.errCode=0;
                        userData.errMessage='Ok';
                        delete user.password;
                        userData.user=user;
                    }
                    else{
                        userData.errCode=3;
                        userData.errMessage='Ok';
                    }
                }
                else{
                    userData.errCode=2;
                    userData.errMessage=`user not found`
          
                }
    
            }
            else{
                userData.errCode=1;
                userData.errMessage=`Your email isn't exist in your systerm. Pls try other email!`
                
            }
            resolve(userData)
        }
        catch(e){
            reject(e)
        }
    })

}



let checkUserEmail =(userEmail)=>{
    return new Promise( async (resolve,reject)=>{
        try{
            let user = await db.User.findOne({
                where: {email:userEmail}
            })
            if(user){
                resolve(true)
            }
            else{
                resolve(false)
            }
        }
        catch(e){
            reject(e)
        }
    })
}

module.exports ={
    handleUserLogin:handleUserLogin
}