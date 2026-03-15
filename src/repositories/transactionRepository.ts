import { query } from "../db";
import {
  DateFilter,
  TransactionFilter,
  TransactionPayload,
  TransactionRow,
} from "../types/transaction";

function buildDateConditions(filter: DateFilter): {
  conditions: string[];
  params: unknown[];
} {
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (filter.startDate !== undefined) {
    params.push(filter.startDate);
    conditions.push(`tx_date >= $${params.length}`);
  }

  if (filter.endDate !== undefined) {
    params.push(filter.endDate);
    conditions.push(`tx_date <= $${params.length}`);
  }

  return { conditions, params };
}

export async function findTransactions(
  filter: TransactionFilter,
): Promise<TransactionRow[]> {
  const { conditions, params } = buildDateConditions(filter);

  if (filter.type !== undefined) {
    params.push(filter.type);
    conditions.push(`type = $${params.length}`);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await query<TransactionRow>(
    `SELECT id, type, amount, note, tx_date, created_at
     FROM transactions
     ${whereClause}
     ORDER BY tx_date DESC, id DESC`,
    params,
  );

  return result.rows;
}

export async function findTransactionById(
  id: number,
): Promise<TransactionRow | null> {
  const result = await query<TransactionRow>(
    `SELECT id, type, amount, note, tx_date, created_at
     FROM transactions
     WHERE id = $1`,
    [id],
  );

  return result.rowCount === 0 ? null : result.rows[0];
}

export async function createTransaction(
  payload: TransactionPayload,
): Promise<TransactionRow> {
  const result = await query<TransactionRow>(
    `INSERT INTO transactions (type, amount, note, tx_date)
     VALUES ($1, $2, $3, $4)
     RETURNING id, type, amount, note, tx_date, created_at`,
    [payload.type, payload.amount, payload.note, payload.date],
  );

  return result.rows[0];
}
