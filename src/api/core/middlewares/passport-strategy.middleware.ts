import passport from "passport";
import { Strategy } from "passport-local";
import { DatabaseConfig } from "../../config/database.config";
import bcrypt from "bcrypt";

class PassportStrategy {
    static async initialiseLocalStrategy() {
        passport.serializeUser((user: any, cb) => {
          cb(null, { id: user.id, email: user.email });
        });
        
        passport.deserializeUser((user: any, cb) => {
          console.log('inside deserialise:', user);
          cb(null, user);
        });
        
        passport.use(
            new Strategy({usernameField : "email", passwordField : "password"}, async (username: string, password: string, cb) => {
            console.log("username inside local strategy is ", username);
            console.log("password inside local strategy are ", password);
        
            try {
              const db = DatabaseConfig.getPgDbObject();
        
              const plan = db.raw.sql`
                            select id, email, password from "User" where email = ${username}
                        `
                .returnsRow({
                  id: db.sql.public.User.columns.id,
                  email: db.sql.public.User.columns.email,
                  password: db.sql.public.User.columns.password,
                })
                .build();
        
              const users = await db.query(plan);
              const user = users[0];
              console.log("users:", users);
              if (!user) {
                cb(null, false, { message: "Incorrect username or password." });
                return;
              }
        
              const comparePassword = await bcrypt.compare(password, user["password"]);
              if (comparePassword == false) {
                cb(null, false, { message: "Incorrect username or password." });
                return;
              }
              console.log("user:", user);
              cb(null, user);
            } catch (error) {
              cb(error);
            }
          }),
        );
    }

}

export {PassportStrategy};
