// /src/api/exchange.js
import { transactions } from "../data/mockData.js";

// 환율 API.
const API_URL = "https://open.er-api.com/v6/latest/USD";

export function fetchTransactions() {
  return transactions;
}

// async 안에 await으로 걸어놓은 동작은 응답이 도착하기 전까지 실행되지 않음
export async function fetchUsdKrw() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("응답 오류 " + res.status);
  const data = await res.json();
  return data.rates.KRW;
}
