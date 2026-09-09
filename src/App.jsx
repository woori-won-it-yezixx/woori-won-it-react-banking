import { useState } from "react";
import "./App.css";
import Clock from "./components/Clock.jsx";
import AccountCard from "./components/AccountCard.jsx";
import Panel from "./components/Panel.jsx";
import Header from "./components/Header.jsx";
import TotalBalance from "./components/TotalBalance.jsx";
import ExchangeRate from "./components/ExcahgeRate.jsx";
import TransactionList from "./components/TransactionList.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { StatusProvider } from "./contexts/StatusContext.jsx";
import TransferForm from "./components/TransferForm.jsx";
import {
  transactions as initialTransactions,
  accounts as initialAccounts,
} from "./data/mockData.js";

function App() {
  // 화면이 렌더링 되기 위해 필요로 하는 값(data)을 적습니다.
  // flag 변수
  // default 값을 false로 만드는 것 권장
  // let showFullNo = true;
  const [showFullNo, setShowFullNo] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [hideAmount, setHideAmound] = useState(false);
  const [accountList, setAccountList] = useState(initialAccounts);
  const totalBalance = accountList.reduce(
    (total, account) => total + account.balance,
    0,
  );
  // 추가: 이 state 가 바뀌고, 그 값을 props 로 받는 TransactionList가 그려집니다
  // 거래내역을 처음에 한 번 전체 정보로 불러와서 여러 하위 컴포넌트를 감싼다
  const [transactions, setTransactions] = useState(initialTransactions);

  // accounts의 특정 위치의 balance를 변경하는 함수
  // accountId라는 고유key로 특정 고객의 balance를 변경
  // 입력받은 accountId가 일치하는 고객의 계좌 dict에서만
  // map 함수를 가지고 특정 dict의 모든 값-value에 접근해서
  // balance 라는 key에만 10000을 더합니다.
  function handleDeposit(accountId) {
    setAccountList((accounts) =>
      accounts.map((a) =>
        a.accountId === accountId ? { ...a, balance: a.balance + 10000 } : a,
      ),
    );
  }

  // 추가: 이체 폼(TransferForm)에서 이체 버튼을 누르면 이 함수가 실행됩니다.
  // 계좌 잔액과 거래내역, 이 두 state 를 한 번에 갱신하는 것이 이번 세션의 핵심입니다.
  function handleTransfer({ toAccount, amount, memo }) {
    const from = accountList[0];
    const nextBalance = from.balance - amount;

    setAccountList((prev) =>
      prev.map((a) =>
        a.accountId === from.accountId ? { ...a, balance: nextBalance } : a,
      ),
    );

    setTransactions((prev) => [
      {
        txId: Date.now(), // 현재 시간 UNIXTIME으로 timestamp
        accountId: from.accountId,
        txType: "출금",
        amount,
        balanceAfter: nextBalance,
        category: "이체",
        memo: memo || "이체",
        counterparty: toAccount,
        txDatetime: new Date().toISOString().slice(0, 19),
      },
      ...prev, // 새 거래를 맨 앞에
    ]);
  }

  // return ( ) 바깥에서는 일반 자바스크립트처럼 // 로 주석을 적습니다.
  // return 뒤에 렌더링 될 부분을 적습니다.
  return (
    <>
      <UserProvider user={{ name: "김연지", grade: "우수" }}>
        <Clock />
        <Header />
        <div className="toolbar">
          <button
            className="btn-ghost"
            onClick={() => setShowFullNo(!showFullNo)}
          >
            {showFullNo ? "계좌번호 숨기기" : "계좌번호 보기"}
          </button>
          <button
            className="btn-ghost"
            onClick={() => setShowBalance(!showBalance)}
          >
            {showBalance ? "금액 보기" : "금액 숨기기"}
          </button>
        </div>
        <Panel title="이체">
          <TransferForm
            fromAccount={accountList[0]}
            onTransfer={handleTransfer}
          />
        </Panel>
        <TotalBalance totalBalance={totalBalance} showBalance={showBalance} />
        <Panel title="내 계좌">
          {accountList.map((account) => (
            <StatusProvider key={account.accountId} status={account.status}>
              <AccountCard
                accountNo={account.accountNo}
                accountType={account.accountType}
                balance={account.balance}
                showFullNo={showFullNo}
                showBalance={showBalance}
                onDeposit={() => handleDeposit(account.accountId)}
              />
            </StatusProvider>
          ))}
        </Panel>
        <Panel
          title="최근 거래"
          action={
            <button
              className="btn-ghost"
              onClick={() => setHideAmound(!hideAmount)}
            >
              {hideAmount ? "금액 보기" : "금액 숨기기"}
            </button>
          }
        >
          <TransactionList
            transactions={transactions}
            hideAmount={hideAmount}
          />
        </Panel>
        <Panel title="오늘의 환율">
          <ExchangeRate />
        </Panel>
      </UserProvider>
    </>
  );
}

export default App;
