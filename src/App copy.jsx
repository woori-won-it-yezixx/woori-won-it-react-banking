import "./App.css";

// 2. 함수
// 계좌 잔액을 "1,523,000원" 형태의 문자열로 바꿔주는 함수
function formatWon(amount) {
  return amount.toLocaleString("ko-KR") + "원";
}

// 계좌번호 앞부분을 가리고 마지막 한 자리만 보여주는 함수
// 예) "1002-345-678901" -> "1002-345-6****1"
function maskAccountNo(no) {
  return no.slice(0, -5) + "****" + no.slice(-1);
}

// hide 가 true 면 실제 금액 대신 "••••••원" 을 보여줍니다.
function formatWonMasked(amount, hide) {
  return hide ? "••••••원" : formatWon(amount);
}

function Clock() {
  const now = new Date();
  return <span>{now.toLocaleTimeString("ko-KR")}</span>;
}

function App() {
  // 화면이 렌더링 되기 위해 필요로 하는 값(data)을 적습니다.
  const accounts = [
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

  // flag 변수
  // default 값을 false로 만드는 것 권장
  let showFullNo = true;
  // return ( ) 바깥에서는 일반 자바스크립트처럼 // 로 주석을 적습니다.
  // return 뒤에 렌더링 될 부분을 적습니다.
  return (
    <>
      <Clock />
      <div className="card">
        <p>
          {accounts[0].ownerName}님의 {accounts[0].accountType}
        </p>
        {/*계좌번호를 가려서 출력 */}
        <p>{maskAccountNo(accounts[0].accountNo)}</p>
        {/*실제 서비스에서는 민감정보들을 화면에 직접 출력하지 않음 */}
        <p>{formatWonMasked(accounts[0].balance, showFullNo)}</p>
      </div>
    </>
  );
}

export default App;
