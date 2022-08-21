import express from 'express';
import { getData , PostTxtFile, getTxtFile, deleteData, changeTtl} from './controller.js';



const router  = express.Router();
router.post("/ttl", changeTtl)
router.get("/actor", getData)
router.delete("/actor/:id", deleteData)
router.post("/actor/properties", PostTxtFile)
router.get("/actor/properties", getTxtFile)


router.get("/", (req, res) => {
  res.send("Let's build a CRUD API!");
});

export default router; 