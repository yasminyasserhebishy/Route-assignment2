import {Sequelize} from 'sequelize'

 export const sequelize = new Sequelize ('assignment5','root','',{
    host:'localhost',
    dialect:'mysql'
})

export const connection = async()=>{
return await sequelize.sync({alter: false , force: false }).then(()=>{
    console.log("connected");
}).catch((error)=>{
    console.log("error");
    console.log(error)
})
}
