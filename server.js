import express from 'express';

import router from "./routes/router.js";

import cors from 'cors';

const app = express();

const PORT = 8000;

app.use("/usuarios", router);

app.use(cors());

app.use(express.static("./FrontEnd"));

app.listen(PORT, () => {

    console.log("Server On");
})
