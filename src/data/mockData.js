// 1. 데이터
// 계좌 목록 (실제 서비스에서는 백엔드 DB에서 내려오는 데이터가 뿌려집니다)
export const accounts = [
  {
    accountId: 1,
    accountNo: "1002-345-678901",
    accountType: "입출금",
    balance: 1523000,
    status: "정상",
    ownerName: "김연지",
  },
  {
    accountId: 2,
    accountNo: "1002-345-112233",
    accountType: "적금",
    balance: 1200000,
    status: "정상",
    ownerName: "김연지",
  },
  {
    accountId: 3,
    accountNo: "1002-345-998877",
    accountType: "적금",
    balance: 397000,
    status: "휴면",
    ownerName: "김연지",
  },
];

// 최근 거래 내역 (계좌 1번의 거래만 예시로 담았습니다)
export const transactions = [
  {
    txId: 1,
    accountId: 1,
    txType: "출금",
    amount: 12000,
    balanceAfter: 1511000,
    category: "식비",
    memo: "점심",
    counterparty: "김밥천국",
    txDatetime: "2026-09-02T12:31:00",
  },
  {
    txId: 2,
    accountId: 1,
    txType: "입금",
    amount: 2400000,
    balanceAfter: 3911000,
    category: "급여",
    memo: "9월 급여",
    counterparty: "우리회사",
    txDatetime: "2026-09-01T09:00:00",
  },
  {
    txId: 3,
    accountId: 1,
    txType: "출금",
    amount: 45000,
    balanceAfter: 3866000,
    category: "쇼핑",
    memo: "운동화",
    counterparty: "무신사",
    txDatetime: "2026-08-31T20:14:00",
  },
];

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
