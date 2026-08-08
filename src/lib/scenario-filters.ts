export type ScenarioFilterId = "all" | "xlm" | "issued-asset" | "expected-failure";

export interface ScenarioFilterDefinition {
  id: ScenarioFilterId;
  label: string;
  scenarioIds: readonly string[];
}

export const SCENARIO_FILTERS: readonly ScenarioFilterDefinition[] = [
  { id: "all", label: "All", scenarioIds: [] },
  { id: "xlm", label: "XLM", scenarioIds: ["xlm-payment"] },
  { id: "issued-asset", label: "Issued asset", scenarioIds: ["issued-asset-payment"] },
  { id: "expected-failure", label: "Expected failure", scenarioIds: ["missing-trustline"] },
];

export function filterScenarios<T extends { id: string }>(
  scenarios: readonly T[],
  filter: ScenarioFilterId,
): T[] {
  if (filter === "all") return scenarios.slice();
  const ids = new Set(SCENARIO_FILTERS.find((item) => item.id === filter)?.scenarioIds ?? []);
  return scenarios.filter((scenario) => ids.has(scenario.id));
}
