import passport from "passport";
import {Strategy} from "passport-local";
import { mockUsers } from "../data/mockUser";


// eslint-disable-next-line
passport.serializeUser((user : any, done) => {
    console.log('Inside serialize user');
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('Inside deserialize user');
    console.log('Deserilize User id ', id);
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