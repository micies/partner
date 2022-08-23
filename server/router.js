import express from 'express';
import { changeTimeCache , getIdsToActors, readRemark, getActor, deleteItem, writeRemark} from './controller.js';


const router  = express.Router();
router.post("/timeCache", changeTimeCache)
router.get("/actor", getIdsToActors)
router.get("/actor/properties", readRemark)
router.get("/actor/:id", getActor)
router.delete("/actor/:id", deleteItem)
router.post("/actor/properties", writeRemark)


router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
}); 

export default router; 