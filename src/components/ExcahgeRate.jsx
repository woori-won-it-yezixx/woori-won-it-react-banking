// import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { fetchUsdKrw } from "../api/exchange";

// function ExchangeRate() {
//   const [rate, setRate] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reloadKey, setReloadKey] = useState(0);

//   useEffect(() => {
//     // fetch는 API를 호출해서 data를 가져오는 JS의 비동기 함수
//     fetch("https://open.er-api.com/v6/latest/USD")
//       .then((res) => {
//         if (!res.ok) throw new Error("응답 오류 " + res.status);
//         return res.json();
//       })
//       .then((data) => setRate(data.rates.KRW))
//       .catch((e) => {
//         setError(e.message);
//         console.log(e);
//       }) // 예외(에러났을 때 처리 동작)
//       .finally(() => {
//         setLoading(false);
//         console.log("finally");
//       }); // 성공/실패와 관계없이 무조건 수행 후 종료
//   }, [reloadKey]);

//   function handleReload() {
//     setLoading(true);
//     setError(null);
//     setReloadKey((key) => key + 1);
//   }

//   if (loading) return <p className="muted">환율을 불러오는 중...</p>;
//   if (error)
//     return (
//       <>
//         <p className="muted">환율을 못 불러왔습니다</p>
//         {/* reloadKey - useEffect의 결과를 넘깁니다. */}
//         <button onClick={handleReload}>다시 시도</button>
//       </>
//     );
//   return (
//     <p className="balance">
//       1달러 = {Math.round(rate).toLocaleString("ko-KR")}원
//     </p>
//   );
// }
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
