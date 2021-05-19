import express, {Request, Response} from "express";
import * as spaceshipModel from "../models/Spaceships";
import { Spaceship } from "../types/types";
const spaceshipRouter = express.Router();

spaceshipRouter.use(express.json());
spaceshipRouter.use(express.urlencoded({
  extended: true
}));
spaceshipRouter.get("/", async (req: Request, res: Response) => {
  res.send('Spaceship page')
});

spaceshipRouter.post("/create", async (req: Request, res: Response) => {
  const newSpaceship: Spaceship = req.body;

  spaceshipModel.create(newSpaceship, (err: Error, id: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"Spaceship ID": id});
  });
});

spaceshipRouter.delete('/remove', function (req: Request, res: Response) {
  const id = req.body.id

  spaceshipModel.remove(id,  (err: Error, id: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"Spaceship ID": id});
  })

});

spaceshipRouter.put('/travel', function (req: Request, res: Response) {
  const spaceship = req.body.spaceship
  const location = req.body.location

  spaceshipModel.travel(spaceship, location,  (err: Error, id: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"Spaceship ID": id});
  })

})

spaceshipRouter.put('/update', function (req: Request, res: Response) {
  const spaceship = req.body.spaceship
  const status = req.body.status
  const statusList = ['decommissioned', 'maintenance', 'operational']
  if (!statusList.includes(status)) {
    return res.status(400).json({"message": "Invalid status"})
  }

  spaceshipModel.update(spaceship, status,  (err: Error, id: number) => {
    if (err) {
      return res.status(500).json({"message": err.message});
    }

    res.status(200).json({"Spaceship ID": id});
  })

})

export {spaceshipRouter};