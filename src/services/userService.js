import db from "../models";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

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
                        // userData.errMessage='Ok';
                        delete user.password;
                        userData.user=user;
                    }
                    else{
                        userData.errCode=3;
                        userData.errMessage='Wrong password';
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

let getAllUsers = ( userId) =>{
    return new Promise (async (resolve,reject)=>{
        try{
            let users='';
            if(userId ==='ALL') {
                users = await db.User.findAll({
                    attributes:{
                        exclude:['password']
                    }

                })
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where:{id:userId},
                    attributes:{
                        exclude:['password']
                    }
                })
            }

            resolve(users)
        }
        catch(e){
            reject(e)
        }
    })
}

let hashUserPassWord = (password)=>{
    return new Promise(async(resolve,reject)=>{
      try{
            var hashPassword = await bcrypt.hashSync(password,salt);
            resolve(hashPassword);
      }
      catch(e){
        reject(e);
      }

    })
}

let createNewUser=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let check = await checkUserEmail(data.email)
            if(check===true){
                resolve({
                    errCode:1,
                    message:'email is exist'
                })
            }
            
            let hashPasswordFromBcrypt = await hashUserPassWord(data.password)
            await db.User.create({
                email: data.email,
                password:hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address:data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true: false,
                roleId:data.roleId,
            })
            resolve({
                errCode: 0,
                message:'ok'
            })
        }
        catch(e){
            reject(e)
        }
    })
}

let deleteUser =(userId)=>{
    return new Promise (async(resolve,reject)=>{
       let user = await db.User.findOne({
        where: {id:userId}
       })
       if(!user){
        resolve({
            errCode:2,
            errMessage:`the user isn't exist`
        })
       }
       await db.User.destroy({
        where: {id:userId}
       });

       resolve({
            errCode:0,
            errMessage:`the user is deleted`
       })

    })
}

let updateUser =(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            if(!data.id){
                resolve({
                    errCode:2,
                    errMessage:'missing require parameter'
                    
                })
            }
            let user = await db.User.findOne({
                where:{ id:data.id},
                raw:false

            })
            if(user){
                user.firstName=data.firstName;
                user.lastName=data.lastName;
                user.address=data.address;
                await user.save();

                // await db.User.save({
                //     firstName:data.firstName,
                //     lastName:data.lastName,
                //     address:data.address,
                // });
                resolve({
                    errCode:0,
                    message:'update the user succeed'
                })
            }
            else{
                resolve({
                    errCode:1,
                    errMessage:`user's not found`
                });
            }
        }
        catch(e){
            reject(e)
        }
    })
}

module.exports ={
    handleUserLogin:handleUserLogin,
    getAllUsers:getAllUsers,
    createNewUser:createNewUser,
    deleteUser:deleteUser,
    updateUser:updateUser
}