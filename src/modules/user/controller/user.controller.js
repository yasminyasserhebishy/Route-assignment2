import {usermodel} from '../../../../src/DB/models/User.model.js'
import notemodel from '../../../DB/models/note.model.js'
import { Op, where } from 'sequelize';


export const getallusers = async(req,res,next)=>{
try{
    const users =await usermodel.findAll({
        attributes : ['name','email'],
        include:{
            model : notemodel,
            attributes : ['title','content']
    }
})
    return users.length == 0 ?  res.json({msg:"no users found"}) :  res.json({msg:"done",users})
} catch (error){
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})
}

}

 export const signup = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await usermodel.findOne({ where: { email} });
      if (existingUser) {
        return res.json({ message: 'You already have an account , please login' });
      }
      const newUser = await usermodel.create({ name, email, password });
  
      return res.json({ message: 'Account created successfully', user: newUser });
    } catch (error) {
      return res.json({
        message: 'Error',
        errorMessage: error.message,
        stack: error.stack,
      });
    }
  };

// export const signup =  async(req,res,next)=>{
// try {
//     const {name,email,password} = req.body
//     const user = await usermodel.create({name,email,password})
//     return res.json({message:"done",user})
// } catch (error) {
//     if(error.original?.errno == 1062){
//         return res.json({message:"you already have an account "})
//     }
//     return res.json({message:"error",errorMessage:error.message, stack:error.stack})
// }

// }

export const signin = async(req,res,next)=>{
    const { email, password } = req.body;
    const login = await usermodel.findOne({where:{ email  }})
    if (!login) {
        return res.json({ message: 'email not found ' });
    }
    if (login.password != password){
    return res.json({ message: 'password incorrect ' })
  }
    return res.json({ message: 'login successfully' })
  }
// export const signin = async(req,res,next)=>{
//   try {
//     const { email, password } = req.body;
//     const login = await usermodel.findOne({ where: { email , password } })
//     if (login) {
//         return res.json({ message: 'signed in successfully ' });
//     }
//     return res.json({ message: 'wrong email or password ' });
//   } catch (error) {
   
//         return res.json({
//           message: 'Error',
//           errorMessage: error.message,
//           stack: error.stack,
//         });
//       }
//   }

export const oneUser = async(req,res,next)=>{
try {
    const {id}=req.params
const oneUser = await usermodel.findOne({
    include:{
        model : notemodel,
        attributes : ['title','content']
    }
,
    where:{
        id 
    }
    
})
return oneUser? res.json({msg:"done",oneUser}) : res.json({msg:"invalid id "})
} catch (error) {
    return res.json({
        message: 'Error',
        errorMessage: error.message,
        stack: error.stack,
      });
}
}

export const updateUser = async(req,res,next)=>{
try {
    const {id} = req.params
    const {name ,age , password } = req.body
    const user = await usermodel.update({name ,age , password},{
        where :
        { 
            id
        } 
    })

    return user[0]? res.json({message:"user updated successfully",user}): res.json({message:"invalid id"})
} catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})
}
} 

export const deleteUser = async(req,res,next) => {
try {
    const {id}= req.params 
    const user = await usermodel.destroy({
        where:{
            id
        }
    })
 return user? res.json({message:"user deleted successfully", user}) : res.json({message:"invalid id"})
} catch (error) {
    
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

}
 }


export const searchbyname = async(req,res,next)=>{
  try {
    const{name,age}= req.body
    const search = await usermodel.findAll({ where: {
        name: {
          [Op.like]: `${name}%`
        },
        age: {
          [Op.lt]: `${age}`
        }
      }
    })

return search[0] ? res.json({msg:"done",search}) : res.json({msg:"no users match your condition"})
  } catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

  }
}

export const searchbyage = async(req,res,next)=>{
   try {
    const{minage,maxage}= req.body
    const search = await usermodel.findAll({ where: {
        age: {
          [Op.between]: [`${minage}`, `${maxage}`]
        }
      }
    })

return search[0] ? res.json({msg:"done",search}) : res.json({msg:"no users match your condition"})
   } catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

   }
}

export const getoldest = async(req,res,next)=>{
   try {
    const search = await usermodel.findAll({
        order: [
            ['age', 'DESC'] 
          ],
          limit: 3
    })

return search[0] ? res.json({msg:"done",search}) : res.json({msg:"no users match your condition"})
   } catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

   }
}

export const searchbyid = async(req, res,next) => {
  try {
    const { ids } = req.body;
    //console.log(ids );
    const search = await usermodel.findAll({ where: {
            id: {
              [Op.in] : ids
            }
      }
    })
    return search[0] ? res.json({msg:"done",search}) : res.json({msg:"no users match your condition"})
  } catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

  }
}


