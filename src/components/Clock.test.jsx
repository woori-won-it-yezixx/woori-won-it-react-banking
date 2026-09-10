import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import Clock from "./Clock";

describe("Clock", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("현재 시각을 한국어 시간 형식으로 표시한다", () => {
    // Given: 고정된 현재 시각을 준비한다.
    vi.useFakeTimers();
    const currentTime = new Date("2026-09-10T13:05:07+09:00");
    vi.setSystemTime(currentTime);

    // When: Clock을 렌더링한다.
    render(<Clock />);

    // Then: 고정한 현재 시각이 표시된다.
    expect(
      screen.getByText(currentTime.toLocaleTimeString("ko-KR")),
    ).toBeInTheDocument();
  });

  it("1초가 지나면 표시 시각을 갱신한다", () => {
    // Given: 갱신 전 시각으로 Clock을 렌더링한다.
    vi.useFakeTimers();
    const initialTime = new Date("2026-09-10T13:05:07+09:00");
    const nextTime = new Date("2026-09-10T13:05:08+09:00");
    vi.setSystemTime(initialTime);
    render(<Clock />);

    // When: 1초를 흐르게 한다.
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Then: 다음 시각이 표시된다.
    expect(
      screen.getByText(nextTime.toLocaleTimeString("ko-KR")),
    ).toBeInTheDocument();
  });

  it("언마운트되면 시각 갱신 타이머를 정리한다", () => {
    // Given: Clock이 마운트된 상태를 준비한다.
    vi.useFakeTimers();
    const clearIntervalSpy = vi.spyOn(globalThis, "clearInterval");
    const { unmount } = render(<Clock />);

    // When: Clock을 언마운트한다.
    unmount();

    // Then: 등록한 interval이 정리된다.
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
  });
});
