"use strict";
// import { Spaceship, Location } from "./types";
// import { db } from "./data/db";
// import { OkPacket, RowDataPacket } from "mysql2";
// export const create = (spaceship: Spaceship, callback: Function) => {
//     const queryString = "INSERT INTO Spaceship (product_id, customer_id, product_quantity) VALUES (?, ?, ?)"
//     db.query(
//       queryString,
//       [order.product.id, order.customer.id, order.productQuantity],
//       (err, result) => {
//         if (err) {callback(err)};
//         const insertId = (<OkPacket> result).insertId;
//         callback(null, insertId);
//       }
//     );
//   };
