import express from "express";
import { spaceshipRouter } from "./routers/spaceshipRouter"
import { locationRouter } from "./routers/locationRouter"
import * as dotenv from "dotenv";

const App = express();
dotenv.config();
App.use(express.json())
App.use("/spaceship", spaceshipRouter);
App.use("/location", locationRouter);

App.get('/', (req, res) => {
    res.sendFile('./views/index.html')
});

App.get('/location', (req, res) => {
})



const port = process.env.PORT || 3000;

App.listen(port, () => console.log(`App listening on port: ${port}`));
