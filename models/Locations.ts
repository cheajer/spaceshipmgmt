import { Location } from "../types/types";
import { db } from "../data/db";
import { OkPacket, RowDataPacket } from "mysql2";

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