import { Router } from "express";
// import { activate} from "../../controllers/activate.controller";
// import { authenticate } from "../../controllers/authenticate.controller";
// import { getConfig } from "../../controllers/getConfig.controller";
// import { updateVersion } from "../../controllers/updateVersion.controller";
// import { musicList } from "../../controllers/musicList.controller";
// import { imagingList } from "../../controllers/imagingList.controller";
// import { storeContactGet, storeContactPost } from "../../controllers/storeContact.controller";
// import { setRestartGet, setRestartPost } from "../../controllers/setRestart.controller";
// import { verifyToken } from "../../middlewares/verifyToekn.middleware";
// import { dbService } from "../../services/db.services";
// import { pool, wpool } from "../../../config/database.config";
const router = Router();


// let poolConnection = dbService(pool);
// let wpoolConnection = dbService(wpool);



// router.post('/v2/activate', activate(wpoolConnection)); 
// router.post('/v2/authenticate', authenticate(poolConnection));
// router.post('/v2/get_config',verifyToken, getConfig(poolConnection));
// router.post('/v2/update_version', updateVersion(wpoolConnection));
// router.post('/v2/musicList', verifyToken, musicList(poolConnection));
// router.post('/v2/imagingList', verifyToken, imagingList(poolConnection));



// router.route('/v2/storeContact')
//     .get(verifyToken, storeContactGet(poolConnection))
//     .post(verifyToken, storeContactPost(wpoolConnection))


// router
//     .get('/v2/setRestart/:username', setRestartGet)
//     .post('/v2/setRestart/', setRestartPost)


export {router};

