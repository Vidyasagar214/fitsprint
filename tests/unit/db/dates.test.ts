import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  dayLabelForDate,
  formatRelativeSessionDate,
  lastNDays,
  todayDateString,
} from "@/lib/db/dates";

describe("todayDateString", () => {
  it("formats as YYYY-MM-DD in local calendar", () => {
    expect(todayDateString(new Date(2026, 4, 28, 15, 30))).toBe("2026-05-28");
  });
});

describe("dayLabelForDate", () => {
  it("returns short weekday label", () => {
    expect(dayLabelForDate("2026-05-28")).toBe("Thu");
  });
});

describe("lastNDays", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 4, 28, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns n consecutive calendar dates ending today", () => {
    expect(lastNDays(3)).toEqual(["2026-05-26", "2026-05-27", "2026-05-28"]);
  });
});

describe("formatRelativeSessionDate", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 4, 28, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "Today" for same calendar day', () => {
    expect(formatRelativeSessionDate("2026-05-28T08:00:00")).toBe("Today");
  });

  it('returns "Yesterday" for previous calendar day', () => {
    expect(formatRelativeSessionDate("2026-05-27T20:00:00")).toBe("Yesterday");
  });

  it("returns days ago within the last week", () => {
    expect(formatRelativeSessionDate("2026-05-25T10:00:00")).toBe("3 days ago");
  });

  it("returns short date for older sessions", () => {
    expect(formatRelativeSessionDate("2026-04-01T10:00:00")).toMatch(/Apr/);
  });
});
