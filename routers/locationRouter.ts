import express, {Request, Response} from "express";
import * as locationModel from "../models/Locations";
import { Location } from "../types/types";

const locationRouter = express.Router();
locationRouter.use(express.json()); //middleware to process incoming data
locationRouter.use(express.urlencoded({ 
  extended: true
}));

/*
    Route: /location/create
    POST Method
    Calls locationModel.create to add a new location to MySQL server

*/
locationRouter.post("/create", async (req: Request, res: Response) => {
    const newLocation: Location = req.body;
    locationModel.create(newLocation, (err: Error) => {
      if (err) { // error handling
        return res.status(500).json({"message": err.message});
      } 
      const message = "Succesfully created a location.";
      res.status(200).json({"message": message});
    });
  });
  

/*
    Route: /location/remove
    DELETE Method
    Calls locationModel.remove to remove a location from the MySQL server

*/
locationRouter.delete('/remove', function (req: Request, res: Response) {
    const id = req.body.id
  
    locationModel.remove(id,  (err: Error) => {
      if (err) { // error handling
        return res.status(500).json({"message": err.message});
      }
      const message = "Succesfully removed a location.";
      res.status(200).json({"message": message});
    })
  
});


/*
    Route: /location/list
    GET Method
    Calls locationModel.list to list all locations stored in MySQL server

*/
locationRouter.get('/list', function (req: Request, res: Response) {
    locationModel.list((err: Error, locations: Location[]) => {
      if (err) { // error handling
        return res.status(500).json({"message": err.message});
      }
      res.status(200).json({"Locations": locations})
    })
})

/*
    Router: /location/reset
    DELETE Method
    Calls locationModel.reset to remove all rows from Location table in MySQL
*/
locationRouter.delete('/reset', function (req: Request, res: Response) {
    locationModel.reset((err: Error) => {
      if (err) { // error handling
        return res.status(500).json({"message": err.message});
      }
      res.status(200).json({"message": "Locations have been reset."})
    })
})



export {locationRouter};