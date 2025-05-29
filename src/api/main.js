"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// eslint-disable-next-line
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.local.env") });
const server_config_1 = require("./config/server.config");
const bootStrap = () => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line
    const PORT = process.env.PORT || 3011;
    const app = yield (0, server_config_1.createExpressApp)();
    app.listen(PORT, () => {
        console.log('server is running on port', PORT);
    });
});
bootStrap();
