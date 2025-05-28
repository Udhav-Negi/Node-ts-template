import dotenv from 'dotenv'
import path from 'path';
// eslint-disable-next-line
dotenv.config({path : path.join(__dirname, "../../.local.env")})
import { createExpressApp } from "./config/server.config";


const bootStrap = async () => {
    // eslint-disable-next-line
    const PORT = process.env.PORT || 3011;
    const app = await createExpressApp();
    app.listen(PORT, () => {
        console.log('server is running on port', PORT);
    })
}

bootStrap();