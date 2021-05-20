import { Spaceship } from "../types/types";
import { db } from "../data/db";
import { OkPacket, RowDataPacket } from "mysql2";

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

export const travel = (spaceship: number,location: number , callback: Function) => {
  var maxCapacity: number;
  var currentCapacity: number;
  const statusQuery = "SELECT * from Spaceship WHERE id = (?) AND status = 'operational' "
  db.query(statusQuery, [spaceship], (err, result) => {
    if (err) {callback(err)}
    if (Array.isArray(result) && result.length == 0) {
      callback({
        'message': 'Spaceship is not operational.'
      });
    }
  });

  const currentCapacityQuery = "SELECT count(*) as currCap from Spaceship WHERE locatedAt = (?)"
  db.query(currentCapacityQuery, [location], (err, result) => {
    if (err) {callback(err)}
    currentCapacity = (<RowDataPacket>result)[0].currCap
  });

  const capacityQuery = "SELECT capacity from Location WHERE id = (?)"
  db.query(capacityQuery, [location], (err, result) => {
    if (err) {callback(err)}
    maxCapacity = (<RowDataPacket>result)[0].capacity
    if (currentCapacity >= maxCapacity) {
      callback({'message': 'This location is at max capacity.'})
    }
  });


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