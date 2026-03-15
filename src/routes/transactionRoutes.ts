import { Router } from "express";
import {
  createTransaction,
  getTransaction,
  listTransactions,
} from "../controllers/transactionController";
import { asyncHandler } from "../utils/asyncHandler";

const transactionRoutes = Router();

transactionRoutes.get("/transactions", asyncHandler(listTransactions));
transactionRoutes.get("/transactions/:id", asyncHandler(getTransaction));
transactionRoutes.post("/transactions", asyncHandler(createTransaction));

export { transactionRoutes };
