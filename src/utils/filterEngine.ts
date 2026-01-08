import type { Employee } from "../types/data.types";
import type { FilterCondition } from "../types/filter.types";
import { getFieldById } from "./fieldDefinitions";


// Core filtering engine that handles all filter logic and data processing


// Get nested value from object using dot notation
// Example: getNestedValue(employee, 'address.city') returns employee.address.city
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

/*
 * Apply a single filter condition to a record
 * @param record - Employee record to test
 * @param condition - Filter condition to apply
 * @returns true if record matches the condition
 */
const applyCondition = (record: Employee, condition: FilterCondition): boolean => {
  const field = getFieldById(condition.fieldId);
  if (!field) return true;

  const value = getNestedValue(record, field.path);
  const filterValue = condition.value;

  switch (field.type) {
    case 'text': {
      const strValue = String(value).toLowerCase();
      const strFilter = String(filterValue).toLowerCase();
      
      switch (condition.operator) {
        case 'equals':
          return strValue === strFilter;
        case 'contains':
          return strValue.includes(strFilter);
        case 'startsWith':
          return strValue.startsWith(strFilter);
        case 'endsWith':
          return strValue.endsWith(strFilter);
        case 'doesNotContain':
          return !strValue.includes(strFilter);
        default:
          return true;
      }
    }

    case 'number': {
      const numValue = Number(value);
      const numFilter = Number(filterValue);
      
      switch (condition.operator) {
        case 'equals':
          return numValue === numFilter;
        case 'greaterThan':
          return numValue > numFilter;
        case 'lessThan':
          return numValue < numFilter;
        case 'greaterThanOrEqual':
          return numValue >= numFilter;
        case 'lessThanOrEqual':
          return numValue <= numFilter;
        default:
          return true;
      }
    }

    case 'amount': {
      const numValue = Number(value);
      const range = filterValue as { min: number; max: number };
      return numValue >= range.min && numValue <= range.max;
    }

    case 'date': {
      const dateValue = new Date(value).getTime();
      const range = filterValue as { start: string; end: string };
      const startTime = new Date(range.start).getTime();
      const endTime = new Date(range.end).getTime();
      return dateValue >= startTime && dateValue <= endTime;
    }

    case 'boolean': {
      return value === filterValue;
    }

    case 'singleSelect': {
      switch (condition.operator) {
        case 'is':
          return value === filterValue;
        case 'isNot':
          return value !== filterValue;
        default:
          return true;
      }
    }

    case 'multiSelect': {
      const arrayValue = Array.isArray(value) ? value : [];
      const filterArray = Array.isArray(filterValue) ? filterValue : [filterValue];
      
      switch (condition.operator) {
        case 'in':
          // Check if any filter value is in the array
          return filterArray.some(fv => arrayValue.includes(fv));
        case 'notIn':
          // Check if no filter value is in the array
          return !filterArray.some(fv => arrayValue.includes(fv));
        default:
          return true;
      }
    }

    default:
      return true;
  }
};

/*
 * Apply all filter conditions to dataset
 * Uses AND logic - all conditions must pass
 * @param data - Array of employee records
 * @param conditions - Array of filter conditions
 * @returns Filtered array of employee records
 */
export const applyFilters = (
  data: Employee[], 
  conditions: FilterCondition[]
): Employee[] => {
  if (conditions.length === 0) return data;

  return data.filter(record => {
    // All conditions must pass (AND logic)
    return conditions.every(condition => applyCondition(record, condition));
  });
};