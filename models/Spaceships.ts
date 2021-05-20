import { Spaceship } from "../types/types";
import { db } from "../data/db";
import { RowDataPacket } from "mysql2";

// facilitates the addition of spaceships into Spaceship table in MySQL Spaceships Database server. 
// Given a Spaceship object, adds details to Spaceship table in DBMS.
export const create = (spaceship: Spaceship, callback: Function) => {
  const queryString = "INSERT INTO Spaceship (id, Name, Model, locatedAt, Status) VALUES (?, ?, ?, ?, ?)"

  db.query(
    queryString,
    [spaceship.id, spaceship.Name, spaceship.Model, spaceship.locatedAt, spaceship.Status],
    (err) => {
      if (err) {callback(err)};

      callback(null);
    }
  );
};

// facilitates the removal of spaceships from Spaceship table in MySQL Spaceships Database server.
// Given a Spaceship ID, removes that spaceship from Spaceship table in DBMS.
export const remove = (id: number, callback: Function) => {
  const queryString = "DELETE FROM Spaceship WHERE id = (?)"

  db.query(
    queryString,
    [id],
    (err) => {
      if (err) {callback(err)};

      callback(null);
    }
  );
};

// Given a Spaceship ID, and Location ID, moves spaceship with that Spaceship ID, to location with Location ID.
export const travel = (spaceship: number,location: number , callback: Function) => {
  var maxCapacity: number;
  var currentCapacity: number;
  // To travel, a spaceship's status must be 'operational' not 'maintenance' or 'decommissioned'
  // Only select if status is 'operational'
  const statusQuery = "SELECT * from Spaceship WHERE id = (?) AND status = 'operational' "
  db.query(statusQuery, [spaceship], (err, result) => {
    if (err) {callback(err)}
    if (Array.isArray(result) && result.length == 0) {
      callback({
        'message': 'Spaceship is not operational.'
      });
    }
  });
  // To travel, Location must have capacity for another spaceship
  // 1. Get the number of spaceships at location 
  const currentCapacityQuery = "SELECT count(*) as currCap from Spaceship WHERE locatedAt = (?)"
  db.query(currentCapacityQuery, [location], (err, result) => {
    if (err) {callback(err)}
    currentCapacity = (<RowDataPacket>result)[0].currCap
  });

  // 2. Get the max capacity at the destination. If the current capacity is reached or exceeded, do not allow travel.
  const capacityQuery = "SELECT capacity from Location WHERE id = (?)"
  db.query(capacityQuery, [location], (err, result) => {
    if (err) {callback(err)}
    maxCapacity = (<RowDataPacket>result)[0].capacity
    if (currentCapacity >= maxCapacity) {
      callback({'message': 'This location is at max capacity.'})
    }
  });

  // Otherwise, if conditions allow (i.e. enough capacity, spaceship operational), update spaceship location
  const queryString = "UPDATE Spaceship SET locatedAt = (?) WHERE id = (?)"
  db.query(
    queryString,
    [location, spaceship],
    (err) => {
      if (err) {callback(err)};

      callback(null);
    }
  );
};

// Update a spaceship's status to one of the following [operational, maintenance, decommissioned]
// Data validation is handled in locationRouter.ts
export const update = (spaceship: number, status: string , callback: Function) => {
  const queryString = "UPDATE Spaceship SET status = (?) WHERE id = (?)"

  db.query(
    queryString,
    [status, spaceship],
    (err) => {
      if (err) {callback(err)};

      callback(null);
    }
  );
};

//
export const list = (callback: Function) => {
  const queryString = "SELECT * FROM Spaceship"

  db.query(
    queryString,
    (err, result) => {
      if (err) {callback(err)};
      const rows = <RowDataPacket>result
      callback(null, rows)
    }
  )
};