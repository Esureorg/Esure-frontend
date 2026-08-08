import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Dashboard } from "./dashboard";

const scenarios = [
  { id: "xlm-payment", version: 1, name: "XLM payment", description: "Fund and send XLM." },
  { id: "issued-asset-payment", version: 1, name: "Issued asset payment", description: "Trustline and TESTUSD." },
  { id: "missing-trustline", version: 1, name: "Missing trustline", description: "Expected failure." },
];

function mockFetch(items: typeof scenarios) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({ items }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })),
  );
}

beforeEach(() => {
  mockFetch(scenarios);
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Dashboard scenario filters", () => {
  it("filters scenario cards and updates the available count", async () => {
    render(<Dashboard />);

    expect((await screen.findAllByText("XLM payment")).length).toBeGreaterThan(0);

    const expectedFailure = screen.getByRole("button", { name: /filter by expected failure/i });
    await userEvent.click(expectedFailure);

    expect(screen.queryByRole("button", { name: /xlm payment/i })).toBeNull();
    expect(screen.getByRole("button", { name: /missing trustline/i })).toBeTruthy();
    expect(screen.getByText("01 AVAILABLE")).toBeTruthy();
    expect(expectedFailure.getAttribute("aria-pressed")).toBe("true");
  });

  it("supports keyboard selection", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);

    expect((await screen.findAllByText("XLM payment")).length).toBeGreaterThan(0);

    const issuedAsset = screen.getByRole("button", { name: /filter by issued asset/i });
    issuedAsset.focus();
    await user.keyboard("{Enter}");

    expect(screen.queryByRole("button", { name: /missing trustline/i })).toBeNull();
    expect(screen.getByRole("button", { name: /issued asset payment/i })).toBeTruthy();
  });

  it("shows a clear empty state when no scenario matches", async () => {
    mockFetch(scenarios.slice(0, 1));
    render(<Dashboard />);

    expect((await screen.findAllByText("XLM payment")).length).toBeGreaterThan(0);
    await userEvent.click(screen.getByRole("button", { name: /filter by expected failure/i }));

    expect(screen.getByText(/no scenarios match/i)).toBeTruthy();
    expect(screen.getByText("00 AVAILABLE")).toBeTruthy();
  });
});
