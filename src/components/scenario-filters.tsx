"use client";

import type { ScenarioSummary } from "@/lib/api";
import { filterScenarios, SCENARIO_FILTERS, type ScenarioFilterId } from "@/lib/scenario-filters";

interface ScenarioFiltersProps {
  scenarios: ScenarioSummary[];
  activeFilter: ScenarioFilterId;
  onFilterChange: (filter: ScenarioFilterId) => void;
}

export function ScenarioFilters({ scenarios, activeFilter, onFilterChange }: ScenarioFiltersProps) {
  return (
    <div className="scenario-filters" role="group" aria-label="Filter scenarios by operation type">
      {SCENARIO_FILTERS.map((filter) => {
        const count = filterScenarios(scenarios, filter.id).length;
        return (
          <button
            type="button"
            key={filter.id}
            className={`scenario-filter ${activeFilter === filter.id ? "selected" : ""}`}
            aria-label={`Filter by ${filter.label}`}
            aria-pressed={activeFilter === filter.id}
            onClick={() => onFilterChange(filter.id)}
          >
            <span>{filter.label}</span>
            <span className="filter-count">{String(count).padStart(2, "0")}</span>
          </button>
        );
      })}
    </div>
  );
}
