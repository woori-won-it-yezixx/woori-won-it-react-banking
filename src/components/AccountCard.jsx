// components/AccountCard.jsx
import StatusBadge from "./StatusBadge";
import { maskAccountNo, formatWonMasked } from "../utils/format";
import { useStatus } from "../contexts/StatusContext.jsx";

function AccountCard({
  accountNo,
  accountType,
  balance,
  showFullNo,
  showBalance,
  onDeposit,
}) {
  const status = useStatus();

  return (
    <div className="card">
      <div className="row">
        <span className="muted">{accountType}</span>
        <StatusBadge />
      </div>
      <p className="muted">
        {showFullNo ? accountNo : maskAccountNo(accountNo)}
      </p>
      <div className="row">
        <strong className="balance">
          {formatWonMasked(balance, showBalance)}
        </strong>
        <button
          className="btn"
          onClick={onDeposit}
          disabled={status !== "정상"}
        >
          1만원 입금
        </button>
      </div>
    </div>
  );
}

export default AccountCard;
