import { describe, it, expect } from "vitest";
import { formatWon, maskAccountNo, formatWonMasked } from "./format";

describe("format 유틸", () => {
  it('formatWon: 숫자를 "1,523,000원" 형태로 바꾼다', () => {
    // Given: 1523000 이라는 숫자 데이터 (입력값)
    // When: formatWon 함수에 값을 넣고 실행
    // Then: 반환값이 천 단위 콤마가 포함된 '1,523,000원' 문자열인지 검증
    expect(formatWon(1523000)).toBe("1,523,000원");
  });
  it("maskAccountNo: 계좌번호 앞을 가리고 마지막 한 자리만 보여준다", () => {
    // Given: '1002-345-678901' 이라는 원본 계좌번호 문자열 (입력값)
    // When: maskAccountNo 함수에 입력값을 넣고 실행
    // Then: 반환값이 '1002-345-6****1' 와 일치하는지 검증
    expect(maskAccountNo("1002-345-678901")).toBe("1002-345-6****1");
  });
});
