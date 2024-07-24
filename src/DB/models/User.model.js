import {  DataTypes } from 'sequelize'
import {sequelize} from '../connection.js'
import notemodel from './note.model.js'

export const usermodel = sequelize.define('User',{

name:{
    type: DataTypes.STRING,
    allowNull:false
},
email:{
    type: DataTypes.STRING,
    allowNull:false,
    unique:true
},
password:{
    type: DataTypes.STRING,
    allowNull:false
},
age:{
    type: DataTypes.INTEGER,
}


})

usermodel.hasMany(notemodel,{
    onDelete :'CASCADE',
    onUpdate:'CASCADE'
})
notemodel.belongsTo(usermodel,
    {
        onDelete :'CASCADE',
        onUpdate:'CASCADE'
    })

