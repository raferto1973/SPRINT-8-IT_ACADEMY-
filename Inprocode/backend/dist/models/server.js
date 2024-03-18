"use strict";
// Server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var connection_1 = __importDefault(require("../db/connection"));
var cors_1 = __importDefault(require("cors"));
var activity_routes_1 = __importDefault(require("../routes/activity.routes"));
var markers_routes_1 = __importDefault(require("../routes/markers.routes"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
        this.middlewares();
        this.routes();
        this.conectarDB();
    }
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log('Aplicació corrent per el port ', _this.port);
        });
    };
    Server.prototype.middlewares = function () {
        // Parseo del body
        this.app.use(express_1.default.json());
        // Cors
        this.app.use((0, cors_1.default)());
    };
    Server.prototype.routes = function () {
        this.app.use('/api/activities', activity_routes_1.default);
        this.app.use('/api/markers', markers_routes_1.default);
    };
    Server.prototype.conectarDB = function () {
        connection_1.default.connect(function (err) {
            if (err)
                throw err;
            console.log('Conectat a la base de dades');
        });
    };
    return Server;
}());
exports.default = Server;
