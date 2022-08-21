
import cors from "cors";
import express from "express";
import router from "./router.js";





const app = express();

app.use(cors());

app.use(express.json());
app.use(router);
app.use(express.urlencoded({ extended: false }));

app.listen('4000', () => {
    console.log('Server started on port 4000')
});


