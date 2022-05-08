import { RequestHandler } from "express";

export const taskValidate: RequestHandler = (res, req, next) => {
    const { userName, email, text } = res.body
    const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

    console.log(res.body);
    
    if (!userName || !email || !text)
        req.status(400).send({ message: 'Не заполнены поля' })
    else if (!email.match(emailRegex))
        req.status(400).send({ message: 'Некорректный email' })
    else next()
}