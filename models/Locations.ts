import { Location } from "../types/types";
import { db } from "../data/db";
import { RowDataPacket } from "mysql2";


// facilitates the addition of locations into Location table in MySQL Spaceships Database server. 
// Given a Location object, adds details to Location table in DBMS.
export const create = (location: Location, callback: Function) => {
    const queryString = "INSERT INTO Location (City, Planet, Capacity) VALUES (?, ?, ?)"
    db.query(
      queryString,
      [location.City, location.Planet, location.Capacity],
      (err) => {
        if (err) {callback(err)};

        callback(null);
      }
    );
};
// facilitates the removal of locations from Location table in MySQL Spaceships Database server.
// Given a Location ID, removes that location from Location table in DBMS.
export const remove = (id: number, callback: Function) => {
    const queryString = "DELETE FROM Location WHERE id = (?)"
    db.query(
      queryString,
      [id],
      (err) => {
        if (err) {callback(err)};

        callback(null);
      }
    );
};

// lists all locations stored in Spaceships DB.
export const list = (callback: Function) => {
    const queryString = "SELECT * FROM Location"
  
    db.query(
      queryString,
      (err, result) => {
        if (err) {callback(err)};
        const rows = <RowDataPacket>result
        callback(null, rows)
      }
    )
};

// Delete all rows in Spaceship table
export const reset = (callback: Function) => {
    const queryString = "DELETE FROM Location"
    db.query(queryString,
      (err) => {
        if (err) {callback(err)}
        callback(null)
      })
  
  };
