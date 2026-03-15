import { Request, Response } from "express";
import {
  createNewTransaction,
  getTransactionById,
  getTransactions,
} from "../services/transactionService";

export async function listTransactions(
  req: Request,
  res: Response,
): Promise<void> {
  const data = await getTransactions({
    type: req.query.type,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  });

  res.status(200).json({ data });
}

export async function getTransaction(
  req: Request,
  res: Response,
): Promise<void> {
  const data = await getTransactionById(req.params.id);
  res.status(200).json({ data });
}

export async function createTransaction(
  req: Request,
  res: Response,
): Promise<void> {
  const data = await createNewTransaction(req.body);
  res.status(201).json({ message: "Transaction created", data });
}
