import { formatWonMasked } from "../utils/format";

function TotalBalance({ totalBalance, showBalance }) {
  return (
    <div className="total">
      <p className="muted">총 자산</p>
      <strong className="balance">
        {formatWonMasked(totalBalance, showBalance)}
      </strong>
    </div>
  );
}

export default TotalBalance;
