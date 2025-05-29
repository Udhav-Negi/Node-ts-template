import passport from "passport";
import {Strategy} from "passport-local";
import { mockUsers } from "../data/mockUser";

export default passport.use(
    new Strategy((username : string, password : string, done) => {
        console.log('username inside local strategy is ', username);
        console.log('password inside local strategy are ', password);
        try {
            const findUser = mockUsers.find(user => user.username == username);
    
            if(!findUser)
                throw new Error("User not found")

            if(findUser.password !== password) {
                throw new Error("Invalid credentials");
            }

            done(null, findUser);
        } catch (error) {
            done(error, null);
        }
    })
)