"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.update = exports.travel = exports.remove = exports.create = void 0;
var db_1 = require("../data/db");
// facilitates the addition of spaceships into Spaceship table in MySQL Spaceships Database server. 
// Given a Spaceship object, adds details to Spaceship table in DBMS.
var create = function (spaceship, callback) {
    var queryString = "INSERT INTO Spaceship (id, Name, Model, locatedAt, Status) VALUES (?, ?, ?, ?, ?)";
    db_1.db.query(queryString, [spaceship.id, spaceship.Name, spaceship.Model, spaceship.locatedAt, spaceship.Status], function (err) {
        if (err) {
            callback(err);
        }
        ;
        callback(null);
    });
};
exports.create = create;
// facilitates the removal of spaceships from Spaceship table in MySQL Spaceships Database server.
// Given a Spaceship ID, removes that spaceship from Spaceship table in DBMS.
var remove = function (id, callback) {
    var queryString = "DELETE FROM Spaceship WHERE id = (?)";
    db_1.db.query(queryString, [id], function (err) {
        if (err) {
            callback(err);
        }
        ;
        callback(null);
    });
};
exports.remove = remove;
// Given a Spaceship ID, and Location ID, moves spaceship with that Spaceship ID, to location with Location ID.
var travel = function (spaceship, location, callback) {
    var maxCapacity;
    var currentCapacity;
    // To travel, a spaceship's status must be 'operational' not 'maintenance' or 'decommissioned'
    // Only select if status is 'operational'
    var statusQuery = "SELECT * from Spaceship WHERE id = (?) AND status = 'operational' ";
    db_1.db.query(statusQuery, [spaceship], function (err, result) {
        if (err) {
            callback(err);
        }
        if (Array.isArray(result) && result.length == 0) {
            callback({
                'message': 'Spaceship is not operational.'
            });
        }
    });
    // To travel, Location must have capacity for another spaceship
    // 1. Get the number of spaceships at location 
    var currentCapacityQuery = "SELECT count(*) as currCap from Spaceship WHERE locatedAt = (?)";
    db_1.db.query(currentCapacityQuery, [location], function (err, result) {
        if (err) {
            callback(err);
        }
        currentCapacity = result[0].currCap;
    });
    // 2. Get the max capacity at the destination. If the current capacity is reached or exceeded, do not allow travel.
    var capacityQuery = "SELECT capacity from Location WHERE id = (?)";
    db_1.db.query(capacityQuery, [location], function (err, result) {
        if (err) {
            callback(err);
        }
        maxCapacity = result[0].capacity;
        if (currentCapacity >= maxCapacity) {
            callback({ 'message': 'This location is at max capacity.' });
        }
    });
    // Otherwise, if conditions allow (i.e. enough capacity, spaceship operational), update spaceship location
    var queryString = "UPDATE Spaceship SET locatedAt = (?) WHERE id = (?)";
    db_1.db.query(queryString, [location, spaceship], function (err) {
        if (err) {
            callback(err);
        }
        ;
        callback(null);
    });
};
exports.travel = travel;
// Update a spaceship's status to one of the following [operational, maintenance, decommissioned]
// Data validation is handled in locationRouter.ts
var update = function (spaceship, status, callback) {
    var queryString = "UPDATE Spaceship SET status = (?) WHERE id = (?)";
    db_1.db.query(queryString, [status, spaceship], function (err) {
        if (err) {
            callback(err);
        }
        ;
        callback(null);
    });
};
exports.update = update;
//
var list = function (callback) {
    var queryString = "SELECT * FROM Spaceship";
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
