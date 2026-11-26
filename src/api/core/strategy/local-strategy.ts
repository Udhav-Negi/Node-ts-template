import passport from "passport";
import {Strategy} from "passport-local";
import { mockUsers } from "../data/mockUser";


// eslint-disable-next-line
passport.serializeUser((user : any, done) => {
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    try {
        const findUser = mockUsers.find(user => user.id === id);
        if(!findUser)
            throw new Error("User not found")
    
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
})

export default passport.use(
    new Strategy({usernameField : "email", passwordField : "password"}, (username : string, password : string, done) => {
        try {
            const findUser = mockUsers.find(user => user.username == username);
    
            if(!findUser)
                throw new Error("User not found")

            if(findUser.password !== password) {
                throw new Error("Invalid credentials");
            }

            done(null, findUser);
        } catch (error) {
            done(error, false);
        }
    })
)