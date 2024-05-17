import express from "express";
import SubmissionRepository from "../modules/Submissions/Repository/SubmissionsRepository";
import SubmissionController from "../controllers/submissions/submissionsControler";

const repository = new SubmissionRepository();
const submissionController = new SubmissionController(repository);

const submissionsRouter = express.Router();

// Create a new submission
submissionsRouter.post(
    "/",
    async (req, res) => await submissionController.CreateSubmission(req, res)
  );

export default submissionsRouter;