"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.create = void 0;
var db_1 = require("../data/db");
var create = function (location, callback) {
    var queryString = "INSERT INTO Location (City, Planet, Capacity) VALUES (?, ?, ?)";
    db_1.db.query(queryString, [location.City, location.Planet, location.Capacity], function (err, result) {
        if (err) {
            callback(err);
        }
        ;
        var insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.create = create;
var remove = function (id, callback) {
    var queryString = "DELETE FROM Location WHERE id = (?)";
    db_1.db.query(queryString, [id], function (err, result) {
        if (err) {
            callback(err);
        }
        ;
        var insertId = result.insertId;
        callback(null, insertId);
    });
};
exports.remove = remove;
