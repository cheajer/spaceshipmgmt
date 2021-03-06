"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var spaceshipRouter_1 = require("./routers/spaceshipRouter");
var locationRouter_1 = require("./routers/locationRouter");
var dotenv = __importStar(require("dotenv"));
var App = express_1.default();
dotenv.config();
App.use(express_1.default.json());
App.use("/spaceship", spaceshipRouter_1.spaceshipRouter);
App.use("/location", locationRouter_1.locationRouter);
App.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
App.get('/location', function (req, res) {
});
var port = process.env.PORT || 3000;
App.listen(port, function () { return console.log("App listening on port: " + port); });
