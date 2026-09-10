import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AccountCard from "./AccountCard";
import { UserProvider } from "../contexts/UserContext.jsx";

describe("AccountCard", () => {
  it("showFullNo 가 false 면 계좌번호가 마스킹되어 보인다", () => {
    // Given & When: 조건이 부여된 상태로 컴포넌트를 렌더링
    // 1. UserProvider의 user 정보와 AccountCard의 Props(showFullNo=false 등)를 준비(Given)
    // 2. 가상 DOM에 해당 상태로 컴포넌트를 마운트(When)
    render(
      <UserProvider user={{ name: "김연지", status: "정상" }}>
        <AccountCard
          accountNo="1002-345-678901"
          accountType="입출금"
          balance={1523000}
          showFullNo={false}
          showAmount={false}
          onDeposit={vi.fn()}
        />
      </UserProvider>,
    );
    // Then: 렌더링된 결과물에 마스킹 처리된 텍스트가 존재하는지 검증
    expect(screen.getByText("1002-345-6****1")).toBeInTheDocument();
    expect(screen.queryByText("1002-345-678901")).not.toBeInTheDocument();
  });
});
