import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createGrievance,
  deleteGrievance,
  getAllGrievances,
  getGrievanceById,
  searchGrievances,
  updateGrievance
} from "../controllers/grievanceController.js";

const router = express.Router();

router.use(protect);

router.get("/search", searchGrievances);
router.route("/").post(createGrievance).get(getAllGrievances);
router.route("/:id").get(getGrievanceById).put(updateGrievance).delete(deleteGrievance);

export default router;
