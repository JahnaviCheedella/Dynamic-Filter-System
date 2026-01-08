// Field and operator types for the filter system

// All supported field types in the system
export type FieldType =
  | "text"
  | "number"
  | "date"
  | "amount"
  | "singleSelect"
  | "multiSelect"
  | "boolean";

// Operator types for text fields
export type TextOperator =
  | "equals"
  | "contains"
  | "startsWith"
  | "endsWith"
  | "doesNotContain";

// Operator types for number fields
export type NumberOperator =
  | "equals"
  | "greaterThan"
  | "lessThan"
  | "greaterThanOrEqual"
  | "lessThanOrEqual";

// Operator types for date fields
export type DateOperator = "between";

// Operator types for amount/currency fields
export type AmountOperator = "between";

// Operator types for single select fields
export type SingleSelectOperator = "is" | "isNot";

// Operator types for multi-select fields
export type MultiSelectOperator = "in" | "notIn";

// Operator types for boolean fields
export type BooleanOperator = "is";

// Union type of all operators
export type Operator =
  | TextOperator
  | NumberOperator
  | DateOperator
  | AmountOperator
  | SingleSelectOperator
  | MultiSelectOperator
  | BooleanOperator;

// Describes the configuration for each filterable field
export interface FieldDefinition {
  id: string;
  label: string;
  type: FieldType;
  path: string; 
  operators: Operator[];
  options?: string[]; 
}
