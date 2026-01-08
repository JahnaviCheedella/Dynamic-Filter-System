// Filter condition types
import type { Operator } from "./field.types";

// Filter value types and can be various types depending on the field type
export type FilterValue =
  | string
  | number
  | boolean
  | string[]
  | { min: number; max: number }
  | { start: string; end: string };

// Individual filter condition and represents a single filter rule
export interface FilterCondition {
  id: string;
  fieldId: string;
  operator: Operator;
  value: FilterValue;
}

// Overall filter state and contains all active filter conditions
export interface FilterState {
  conditions: FilterCondition[];
}
