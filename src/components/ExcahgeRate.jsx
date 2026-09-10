// import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchUsdKrw } from "../api/exchange";

function ExchangeRate() {
  const { data: rate, loading, error, reload } = useFetch(fetchUsdKrw);

  if (loading) return <p className="muted">환율을 불러오는 중...</p>;
  if (error)
    return (
      <button className="btn" onClick={reload}>
        다시 시도
      </button>
    );
  return (
    <p className="balance">
      1달러 = {Math.round(rate).toLocaleString("ko-KR")}원
    </p>
  );
}

export default ExchangeRate;
