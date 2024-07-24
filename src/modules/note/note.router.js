import { Router } from "express"
import {addnote, deletenote, getallnote, updatenote,allWoner} from './controller/note.controller.js'
const router = Router()

router.get('/',getallnote)
router.get('/allWoner',allWoner)
router.post('/',addnote)
router.patch('/:id',updatenote)
router.delete('/:id',deletenote)


export default router 