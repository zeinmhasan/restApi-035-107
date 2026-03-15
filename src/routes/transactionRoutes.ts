import { Router } from "express";
import {
  createTransaction,
  getTransaction,
  listTransactions,
  deleteTransaction,
  getSummary,
  updateTransaction,
} from "../controllers/transactionController";
import { asyncHandler } from "../utils/asyncHandler";

const transactionRoutes = Router();

transactionRoutes.get('/transactions/summary', asyncHandler(getSummary));
transactionRoutes.get("/transactions", asyncHandler(listTransactions));
transactionRoutes.get("/transactions/:id", asyncHandler(getTransaction));
transactionRoutes.post("/transactions", asyncHandler(createTransaction));
transactionRoutes.put("/transactions/:id", asyncHandler(updateTransaction));
transactionRoutes.delete("/transactions/:id", asyncHandler(deleteTransaction));

export { transactionRoutes };
