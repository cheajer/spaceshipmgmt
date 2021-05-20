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
    locationModel.create(newLocation, (err: Error) => {
      if (err) {
        return res.status(500).json({"message": err.message});
      } 
      const message = "Succesfully created a location.";
      res.status(200).json({"message": message});
    });
  });
  
locationRouter.delete('/remove', function (req: Request, res: Response) {
    const id = req.body.id
  
    locationModel.remove(id,  (err: Error) => {
      if (err) {
        return res.status(500).json({"message": err.message});
      }
      const message = "Succesfully removed a location.";
      res.status(200).json({"message": message});
    })
  
});

locationRouter.get('/list', function (req: Request, res: Response) {
    locationModel.list((err: Error, locations: Location[]) => {
      if (err) {
        return res.status(500).json({"message": err.message});
      }
      res.status(200).json({"Locations": locations})
    })
})

  

export {locationRouter};