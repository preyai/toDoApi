import express from "express";

const router = express.Router()

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

export default router 