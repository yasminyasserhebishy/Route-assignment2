import {DataTypes} from 'sequelize'
import { sequelize } from '../connection.js'

export const notemodel = sequelize.define('note',{
title:{
    type : DataTypes.STRING ,
    allowNull:false
},
content:{
    type : DataTypes.STRING,
    allowNull : true 
},
})

export default notemodel
