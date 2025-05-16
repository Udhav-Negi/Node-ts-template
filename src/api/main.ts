import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path : path.join(__dirname, "../../.local.env")})
import { createExpressApp } from "./config/server.config";


const bootStrap = async () => {

    const PORT = process.env.PORT || 3011;
    const app = await createExpressApp();
    app.listen(PORT, () => {
        console.log('server is running on port', PORT);
    })
}

bootStrap();