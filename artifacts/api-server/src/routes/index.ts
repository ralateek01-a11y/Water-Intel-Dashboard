import { Router, type IRouter } from "express";
import healthRouter from "./health";
import chatRouter from "./chat";
import documentsRouter from "./documents";

const router: IRouter = Router();

router.use(healthRouter);
router.use(chatRouter);
router.use(documentsRouter);

export default router;
