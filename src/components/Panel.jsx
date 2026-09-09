import { useUser } from "../contexts/UserContext.jsx";

// components/Panel.jsx
function Panel({ title, action, children }) {
  const user = useUser();
  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>{title === "내 계좌" ? `${user.name}의 계좌` : title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export default Panel;
