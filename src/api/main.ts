import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path : path.join(__dirname, "../../.env")});
import { createExpressApp } from "./config/server.config";


const bootStrap = async () => {
    try {
        // eslint-disable-next-line
        const PORT = process.env.PORT || 3011;
        const app = await createExpressApp();
        app.listen(PORT, () => {
            console.log('server is running on port', PORT);
        })


    } catch (error) {
        console.log("error:", error);
    }
}

bootStrap();