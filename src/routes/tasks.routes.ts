import express from "express"
import { taskValidate } from "../lib/validate"
import TaskService from "../services/Tasks"
import {jwtAuth} from "../lib/authentication"

const router = express.Router()

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.post('/', taskValidate, TaskService.create)
router.get('/', TaskService.getMany)
router.get('/:id', TaskService.getOne)
router.patch('/:id', jwtAuth, TaskService.patch)


export default router 
