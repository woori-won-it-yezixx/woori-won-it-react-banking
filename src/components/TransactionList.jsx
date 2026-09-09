// 사용할 컴포넌트, 함수, 변수 import
import { useState } from "react";
import TransactionRow from "./TransactionRow";
import Chip from "./Chip";
import { formatWon } from "../utils/format.js";

// 거래 종류 필터 옵션
const TYPE_OPTIONS = ["전체", "입금", "출금"];
// 카테고리 필터 옵션
const CATEGORY_OPTIONS = [
  "전체",
  "식비",
  "교통",
  "쇼핑",
  "급여",
  "이체",
  "의료",
  "통신",
];

// 컴포넌트 함수형으로 작성
function TransactionList({ transactions, hideAmount }) {
  const [typeFilter, setTypeFilter] = useState("전체");
  const [categoryFilter, setCategoryFilter] = useState("전체");

  // const { data, loading, error, reload } = useFetch(fetchTransactions);

  const visible = transactions.filter(
    (tx) =>
      (typeFilter === "전체" || tx.txType === typeFilter) &&
      (categoryFilter === "전체" || tx.category === categoryFilter),
  );
  const visibleTotal = visible.reduce((total, transaction) => {
    const signedAmount =
      transaction.txType === "입금" ? transaction.amount : -transaction.amount;
    return total + signedAmount;
  }, 0);

  // if (loading) return <p className="muted">거래 내역을 불러오는 중...</p>;
  // if (error)
  //   return (
  //     <button className="btn" onClick={reload}>
  //       다시 시도
  //     </button>
  //   );

  return (
    <>
      <div>
        <div className="chips">
          {TYPE_OPTIONS.map((option) => (
            <Chip
              key={option}
              text={option}
              active={typeFilter === option}
              onClick={() => setTypeFilter(option)}
            />
          ))}
        </div>
        <div className={`chips category-chips`}>
          {CATEGORY_OPTIONS.map((option) => (
            <Chip
              key={option}
              text={option}
              active={categoryFilter === option}
              onClick={() => setCategoryFilter(option)}
            />
          ))}
        </div>
      </div>
      <div className="summary">
        총 {visible.length}건 · 합계 {formatWon(Math.abs(visibleTotal))}
      </div>
      <div className="transaction-list">
        {visible.length > 0 ? (
          visible.map((transaction) => (
            <TransactionRow
              key={transaction.txId}
              txType={transaction.txType}
              amount={transaction.amount}
              category={transaction.category}
              memo={transaction.memo}
              counterparty={transaction.counterparty}
              txDatetime={transaction.txDatetime}
              hideAmount={hideAmount}
            />
          ))
        ) : (
          <p className="muted">조건에 맞는 거래 내역이 없습니다.</p>
        )}
      </div>
    </>
  );
}

// 컴포넌트, 함수, 변수 등을 외부에서 사용할 수 있게 export
export default TransactionList;
