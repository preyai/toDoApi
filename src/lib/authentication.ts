import { RequestHandler } from "express"
import jwt from 'jsonwebtoken'
import config from 'config'

const secretKey: string = config.get('secret')

const getJwt = (user: string) => {
    return jwt.sign(user, secretKey);
}

export const localAuth: RequestHandler = (req, res, next) => {
    const { login, password } = req.body
    if (!login || !password)
        return res.status(401).send({ message: "Не заполнены поля" })
    if (login === 'admin' && password === '123')
        return res.send({ jwt: getJwt(login) })
    else
        return res.status(401).send({ message: "Не верные логин или пароль" })
}

export const jwtAuth: RequestHandler = (req, res, next) => {
    console.log(req.headers);
    if (req.headers.authorization?.split(' ')[1] !== getJwt('admin'))
        return res.status(401)
    else
        next()
}