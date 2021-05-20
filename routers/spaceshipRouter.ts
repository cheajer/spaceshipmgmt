import express, {Request, Response} from "express";
import * as spaceshipModel from "../models/Spaceships";
import { Spaceship } from "../types/types";

const spaceshipRouter = express.Router();
spaceshipRouter.use(express.json()); //middleware to process incoming data
spaceshipRouter.use(express.urlencoded({
  extended: true
}));

/*
    Route: /spaceship/create
    POST Method
    Calls spaceshipModel.create to add a spaceship to MySQL server

*/
spaceshipRouter.post("/create", async (req: Request, res: Response) => {
  const newSpaceship: Spaceship = req.body;

  spaceshipModel.create(newSpaceship, (err: Error) => {
    if (err) { // error handling
      return res.status(500).json({"message": err.message});
    }
    const message = "Spaceship successfully created."
    res.status(200).json({"message": message});
  });
});

/*
    Route: /spaceship/remove
    DELETE Method
    Calls spaceshipModel.remove to remove a spaceship from MySQL server

*/
spaceshipRouter.delete('/remove', function (req: Request, res: Response) {
  const id = req.body.id

  spaceshipModel.remove(id,  (err: Error) => {
    if (err) { // error handling
      return res.status(500).json({"message": err.message});
    }
    const message = "Spaceship successfully removed."
    res.status(200).json({"Spaceship ID": message});
  })

});


/*
    Route: /spaceship/travel
    PUT Method
    Calls spaceshipModel.travel to update location of a spaceship on MySQL server

    Will check:
      - status is operational
      - location is not above full capacity
    If these conditions are met, the spaceship's location is updated and a success message is 
    provided.
    Otherwise, gives an error telling user what went wrong.

*/
spaceshipRouter.put('/travel', function (req: Request, res: Response) {
  const spaceship = req.body.spaceship
  const location = req.body.location

  spaceshipModel.travel(spaceship, location,  (err: Error) => {
    if (err) { // error handling
      return res.status(500).json({"message": err.message});
    }
    const message = "Travel successfully used."
    res.status(200).json({"message": message});
  })

})

/*
    Route: /spaceship/update
    PUT Method
    Calls spaceshipModel.update to update status of a spaceship on MySQL server

    Will check the value of the 'status' key provided. If not a valid input
    (ie. not 'decommissioned, 'maintenance', or 'operational') returns a 
    tailored message
    Otherwise gives success message.

*/
spaceshipRouter.put('/update', function (req: Request, res: Response) {
  const spaceship = req.body.spaceship
  const status = req.body.status
  const statusList = ['decommissioned', 'maintenance', 'operational']
  if (!statusList.includes(status)) { // checking the validity of user input
    return res.status(400).json({"message": "Invalid status inputted."})
  }

  spaceshipModel.update(spaceship, status,  (err: Error) => {
    if (err) { // error handling
      return res.status(500).json({"message": err.message});
    }
    const message = "Successfully updated Spaceship status."
    res.status(200).json({"message": message});
  })

})


/*
    Route: /spaceship/list
    GET Method
    Calls spaceshipModel.list to list all spaceships stored in MySQL server

*/
spaceshipRouter.get('/list', function (req: Request, res: Response) {
  spaceshipModel.list((err: Error, spaceships: Spaceship[]) => {
    if (err) { // error handling
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"Spaceships": spaceships})
  })
})

/*
    Router: /spaceship/reset
    DELETE Method
    Calls spaceshipModel.reset to remove all rows from Spaceship table in MySQL
*/
spaceshipRouter.delete('/reset', function (req: Request, res: Response) {
  spaceshipModel.reset((err: Error) => {
    if (err) { // error handling
      return res.status(500).json({"message": err.message});
    }
    res.status(200).json({"message": "Spaceships have been reset."})
  })
})

export {spaceshipRouter};