import {notemodel} from '../../../DB/models/note.model.js'
import {usermodel} from '../../../DB/models/User.model.js'

export const getallnote = async (req , res ,next)=>{
   try {
    const note = await notemodel.findAll({
    })
    return note.length == 0 ?  res.json({msg:"no notes found"}) :  res.json({msg:"done",note})
   } catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

   }
    }

export const allWoner = async (req , res ,next)=>{
try {
    const note = await notemodel.findAll({
        include:{
            model : usermodel,
            attributes : ['name','email']
    
        }
    })
        res.json({msg:"done",note})
} catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

}
}

export const addnote = async (req, res, next) => {
    try {
      const { title, content, UserId } = req.body;
      const existingUser = await usermodel.findByPk(UserId);
      if (!existingUser) {
        return res.json({ message: 'user not found' });
      }
      const existingNote = await notemodel.findOne({ where: { title, UserId } });
      if (existingNote) {
        return res.json({ message: 'You already have this note' });
      }
      const note = await notemodel.create({ title, content, UserId });
  
      return res.json({ msg: 'Note added', note });
    } catch (error) {
        return res.json({message:"error",errorMessage:error.message, stack:error.stack})
    }
  };
  

export const updatenote = async (req,res,next) =>{
  try {
    const {id} = req.params
    const {title , content,UserId } = req.body
    const note = await notemodel.update({title , content},{
        where : {
            id , 
            UserId
        },
    }
        )
    return note[0]? res.json({message:"updated successfully",note}) : res.json({message:"invalid id or you are not the owner of the note "})
  } catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})
 
  }

    }

    
export const deletenote= async (req,res,next) =>{
   try {
    const {id} = req.params
    const {UserId} = req.body 
    const note = await notemodel.destroy({
        where : {
            id , 
            UserId
        }
    })   
    return note == 0 ? res.json({message:"invalid id or you are not the owner of the note "}) : res.json({message:"deleted successfully",note})
   } catch (error) {
    return res.json({message:"error",errorMessage:error.message, stack:error.stack})

   }
    }

