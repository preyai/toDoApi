import { RequestHandler } from "express"
import TaskModel from '../models/Tasks'

type order = 'asc' | 'desc'

interface IService {
    getOne: RequestHandler,
    getMany: RequestHandler,
    create: RequestHandler,
    patch: RequestHandler,
}

const TaskService: IService = {
    getOne: (req, res, next) => {
        const { id } = req.params;
        TaskModel.findById(id)
            .then((task) => res.send(task))
            .catch(() => res.status(404).send())
    },
    getMany: async (req, res, next) => {
        // const { offset, sortField, sortOrder } = req.params
        const offset: number = Number(req.query.offset) || 0
        const sortField: string = req.query.sortField as string || '_id'
        const sortOrder: order = req.query.sortOrder as order || 'asc'

        console.log(req.query)

        console.log({ offset, sortField, sortOrder })

        const tasks = await TaskModel.find().skip(offset).limit(3).sort({ [sortField]: sortOrder })
        const total = await TaskModel.count()
        res.send({
            data: tasks,
            total,
        })
    },
    create: (req, res, next) => {
        const { userName, email, text } = req.body
        TaskModel.create({ userName, email, text, status: false, changed: false})
            .then((task) => res.send(task))
    },
    patch: (req, res, next) => {
        const { id } = req.params;
        const { text, status } = req.body
        TaskModel.findById(id)
            .then(task => {
                if (text){
                    task.text = text
                    task.changed = true
                }
                if (status)
                    task.status = status
                console.log(task)
                task.save()
            })
    }
}

export default TaskService