import { Request, Response, Router } from "express";

const router = Router();


// router.get('/', (req : Request, res : Response) => {
// eslint-disable-next-line
router.get('/', (req : any, res : Response) => { // I am doing this because I want to use express session
    console.log('session is ', req.session);
    console.log(req.sessionID);
    console.log(req.session.id);

    // attaching dynamic properties to the session or basically we are saving the session
    req.session.visited = true;
    res.json({message : "fetching cookies"})
})
router.get('/getid', (req : any, res : Response) => { // I am doing this because I want to use express session
    console.log('session inside get id is', req.session);
    console.log(req.sessionID);
    console.log(req.session.id);


    // this is the way to get session id 
    req.sessionStore.get(req.session.id, (err, sessionData) => {
        if(err)
        {
            console.log(err);
            throw err;
        }
        console.log('session data is ', sessionData);
    })

    res.json({message : "fetching cookies"})
})

export {router};

