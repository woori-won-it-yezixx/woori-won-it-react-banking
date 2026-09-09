import { useState, useEffect } from "react";

function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id); // 정리 함수
  }, []);

  return <span className="muted">{now.toLocaleTimeString("ko-KR")}</span>;
}

export default Clock;
