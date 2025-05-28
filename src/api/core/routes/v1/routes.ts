import { Request, Response, Router } from "express";

const router = Router();


router.get('/', (req : Request, res : Response) => {
    console.log('cookies inside controller are ', req.cookies);
    // const users = {
    //     name : "Ritik",
    //     Age : "18"
    // }
    // res.cookie("userData", users, {
    //     maxAge : Date.now() + 40000000,  
    // });
    res.json({message : "fetching cookies"})
})

export {router};

