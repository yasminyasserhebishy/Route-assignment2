import userRouter from './modules/user/user.router.js'
import noteRouter from './modules/note/note.router.js'
import { connection } from './DB/connection.js'
const bootstrap = (app,express)=>{
    connection()
    app.use(express.json())
   app.use('/user',userRouter)
   app.use ('/note',noteRouter)
}

export default bootstrap 