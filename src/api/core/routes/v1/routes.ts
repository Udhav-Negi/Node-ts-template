import { Request, Response, Router } from "express";

const router = Router();



// eslint-disable-next-line
router.get('/', (req : any, res : Response) => { // I am doing this because I want to use express session
    console.log('session inisde default endpoint is ', req.session);
    console.log(req.sessionID);
    console.log(req.session.id);

    // attaching dynamic properties to the session or basically we are saving the session
    req.session.visited = true;
    res.json({message : "fetching cookies udhav"})
})
// eslint-disable-next-line
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
        console.log('session data received is ', sessionData);
    })

    res.json({message : "fetching cookies"})
})


export const mockUsers = [
    {id : 1, username : "anson", displayName : "anson", password : "hello123"},
    {id : 2, username : "jack", displayName : "jack", password : "hello123"},
    {id : 3, username : "adam", displayName : "adam", password : "hello123"},
    {id : 4, username : "tina", displayName : "tina", password : "hello123"},
    {id : 5, username : "jason", displayName : "jason", password : "hello123"},
    {id : 6, username : "henry", displayName : "henry", password : "hello123"},
    {id : 7, username : "marilyn", displayName : "marilyn", password : "hello123"},
]


router.post('/api/auth', (req : Request, res : Response) => {
    const {username, password} = req.body;
    const findUser = mockUsers.find((user) => user.username == username)
    
    if(!findUser || findUser.password !== password)
        res.send({message : "Bad credentials"});



    // eslint-disable-next-line
    (req.session as any).user = findUser;
    res.send(findUser);

})


router.get('/api/auth/status', (req : Request, res : Response) => {
    // eslint-disable-next-line
    console.log('session saved is ', (req.session as any).user); 
    // eslint-disable-next-line
    (req.session as any).user ? res.status(200).send((req.session as any).user) : res.send({msg : "Bad credentials"});
})


router.post('/api/cart', (req : Request, res : Response) => {
     // eslint-disable-next-line
    if(!((req.session as any).user))
        res.sendStatus(401);


    console.log('session inside cart is ', req.session);
    const {item} = req.body;
    // eslint-disable-next-line
    const {cart} = req.session as any;

    if(cart)
        cart.push(item);
    else 
    {
        // eslint-disable-next-line
        (req.session as any).cart = [item];
    }
    res.status(201).send(item);
})

export {router};

