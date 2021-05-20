"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reset = exports.list = exports.remove = exports.create = void 0;
var db_1 = require("../data/db");
// facilitates the addition of locations into Location table in MySQL Spaceships Database server. 
// Given a Location object, adds details to Location table in DBMS.
var create = function (location, callback) {
    var queryString = "INSERT INTO Location (City, Planet, Capacity) VALUES (?, ?, ?)";
    db_1.db.query(queryString, [location.City, location.Planet, location.Capacity], function (err) {
        if (err) {
            callback(err);
        }
        ;
        callback(null);
    });
};
exports.create = create;
// facilitates the removal of locations from Location table in MySQL Spaceships Database server.
// Given a Location ID, removes that location from Location table in DBMS. 
var remove = function (id, callback) {
    var checkQuery = "SELECT count(*) AS count FROM Location WHERE id = (?)";
    // Checking if the location id exists in known Locations
    db_1.db.query(checkQuery, [id], function (err, result) {
        if (err) {
            callback(err);
        }
        if (result[0].count == 0) {
            callback({ 'message': 'Invalid Location ID.' });
        }
    });
    var queryString = "DELETE FROM Location WHERE id = (?)";
    db_1.db.query(queryString, [id], function (err) {
        if (err) {
            callback(err);
        }
        ;
        callback(null);
    });
};
exports.remove = remove;
// lists all locations stored in Spaceships DB.
var list = function (callback) {
    var queryString = "SELECT * FROM Location";
    db_1.db.query(queryString, function (err, result) {
        if (err) {
            callback(err);
        }
        ;
        var rows = result;
        callback(null, rows);
    });
};
exports.list = list;
// Delete all rows in Spaceship table
var reset = function (callback) {
    var queryString = "DELETE FROM Location";
    db_1.db.query(queryString, function (err) {
        if (err) {
            callback(err);
        }
        callback(null);
    });
};
exports.reset = reset;
