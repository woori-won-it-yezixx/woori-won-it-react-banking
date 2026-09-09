// 2. 함수
// 계좌 잔액을 "1,523,000원" 형태의 문자열로 바꿔주는 함수
export function formatWon(amount) {
  return amount.toLocaleString("ko-KR") + "원";
}

// 계좌번호 앞부분을 가리고 마지막 한 자리만 보여주는 함수
// 예) "1002-345-678901" -> "1002-345-6****1"
export function maskAccountNo(no) {
  return no.slice(0, -5) + "****" + no.slice(-1);
}

// hide 가 true 면 실제 금액 대신 "••••••원" 을 보여줍니다.
export function formatWonMasked(amount, hide) {
  return hide ? "••••••원" : formatWon(amount);
}
