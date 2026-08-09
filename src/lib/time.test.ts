import { describe, it, expect } from "vitest";
import { formatDuration, formatTimestamp } from "./time";

describe("time formatting", () => {
  describe("formatDuration", () => {
    it("formats milliseconds", () => {
      expect(formatDuration("2023-01-01T12:00:00.000Z", "2023-01-01T12:00:00.450Z")).toBe("450ms");
    });

    it("formats seconds with one decimal", () => {
      expect(formatDuration("2023-01-01T12:00:00.000Z", "2023-01-01T12:00:04.250Z")).toBe("4.3s");
      expect(formatDuration("2023-01-01T12:00:00.000Z", "2023-01-01T12:00:04.000Z")).toBe("4s");
    });

    it("formats minutes and seconds", () => {
      expect(formatDuration("2023-01-01T12:00:00.000Z", "2023-01-01T12:01:15.500Z")).toBe("1m 15s");
    });

    it("handles invalid or negative durations gracefully", () => {
      expect(formatDuration("2023-01-01T12:00:10.000Z", "2023-01-01T12:00:00.000Z")).toBe("0ms");
      expect(formatDuration("invalid", "invalid")).toBe("0ms");
    });
  });

  describe("formatTimestamp", () => {
    it("returns locale string for valid date", () => {
      const result = formatTimestamp("2023-01-01T12:00:00.000Z");
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it("returns empty string for invalid date", () => {
      expect(formatTimestamp("invalid")).toBe("");
    });
  });
});
