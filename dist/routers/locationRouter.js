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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRouter = void 0;
var express_1 = __importDefault(require("express"));
var locationModel = __importStar(require("../models/Locations"));
var locationRouter = express_1.default.Router();
exports.locationRouter = locationRouter;
locationRouter.use(express_1.default.json()); //middleware to process incoming data
locationRouter.use(express_1.default.urlencoded({
    extended: true
}));
/*
    Route: /location/create
    POST Method
    Calls locationModel.create to add a new location to MySQL server

*/
locationRouter.post("/create", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newLocation;
    return __generator(this, function (_a) {
        newLocation = req.body;
        locationModel.create(newLocation, function (err) {
            if (err) { // error handling
                return res.status(500).json({ "message": err.message });
            }
            var message = "Succesfully created a location.";
            res.status(200).json({ "message": message });
        });
        return [2 /*return*/];
    });
}); });
/*
    Route: /location/remove
    DELETE Method
    Calls locationModel.remove to remove a location from the MySQL server

*/
locationRouter.delete('/remove', function (req, res) {
    var id = req.body.id;
    locationModel.remove(id, function (err) {
        if (err) { // error handling
            return res.status(500).json({ "message": err.message });
        }
        var message = "Succesfully removed a location.";
        res.status(200).json({ "message": message });
    });
});
/*
    Route: /location/list
    GET Method
    Calls locationModel.list to list all locations stored in MySQL server

*/
locationRouter.get('/list', function (req, res) {
    locationModel.list(function (err, locations) {
        if (err) { // error handling
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "Locations": locations });
    });
});
