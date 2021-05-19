import express, {Request, Response} from "express";
import * as locationModel from "../models/Locations";
import { Location } from "../types/types";
const locationRouter = express.Router();
locationRouter.use(express.json());
locationRouter.use(express.urlencoded({
  extended: true
}));

locationRouter.post("/create", async (req: Request, res: Response) => {
    const newLocation: Location = req.body;
    locationModel.create(newLocation, (err: Error, id: number) => {
      if (err) {
        return res.status(500).json({"message": err.message});
      }
  
      res.status(200).json({"Location ID": id});
    });
  });
  
  locationRouter.delete('/remove', function (req: Request, res: Response) {
    const id = req.body.id
  
    locationModel.remove(id,  (err: Error, id: number) => {
      if (err) {
        return res.status(500).json({"message": err.message});
      }
  
      res.status(200).json({"Location ID": id});
    })
  
  });

export {locationRouter};