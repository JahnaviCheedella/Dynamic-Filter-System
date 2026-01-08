import React from "react";
import { IconButton, Grid } from "@mui/material";
import { Trash2 } from "lucide-react";
import type { FilterCondition, FilterValue } from "../../types/filter.types";
import { getFieldById } from "../../utils/fieldDefinitions";
import FieldSelector from "./FieldSelector";
import OperatorSelector from "./OperatorSelector";
import ValueInput from "./ValueInput";
import type { Operator } from "../../types/field.types";

interface FilterRowProps {
  condition: FilterCondition;
  onUpdate: (condition: FilterCondition) => void;
  onRemove: () => void;
}

// Helper function to get default value based on field type
const getDefaultValue = (type: string): FilterValue => {
  switch (type) {
    case "text":
      return "";
    case "number":
      return 0;
    case "amount":
      return { min: 0, max: 100000 };
    case "date":
      return { start: "", end: "" };
    case "boolean":
      return false;
    case "singleSelect":
      return "";
    case "multiSelect":
      return [];
    default:
      return "";
  }
};

// Represents a single filter condition with field, operator, and value
const FilterRow: React.FC<FilterRowProps> = ({
  condition,
  onUpdate,
  onRemove,
}) => {
  const field = getFieldById(condition.fieldId);

  const handleFieldChange = (fieldId: string) => {
    const newField = getFieldById(fieldId);
    if (newField) {
      onUpdate({
        ...condition,
        fieldId,
        operator: newField.operators[0],
        value: getDefaultValue(newField.type),
      });
    }
  };

  const handleOperatorChange = (operator: Operator) => {
    onUpdate({ ...condition, operator });
  };

  const handleValueChange = (value: FilterValue) => {
    onUpdate({ ...condition, value });
  };

  return (
    <Grid container sx={{ gap: { xs: 1.5, sm: 2 }, mb: 2 }} alignItems="flex-start">
      <Grid size={{ xs: 12, sm: "auto" }}>
        <FieldSelector value={condition.fieldId} onChange={handleFieldChange} />
      </Grid>

      {field && (
        <>
          <Grid size={{ xs: 12, sm: "auto" }}>
            <OperatorSelector
              operators={field.operators}
              value={condition.operator}
              onChange={handleOperatorChange}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: "auto" }}>
            <ValueInput
              field={field}
              operator={condition.operator}
              value={condition.value}
              onChange={handleValueChange}
            />
          </Grid>
        </>
      )}

      <Grid size={{ xs: 12, sm: "auto" }}>
        <IconButton
          onClick={onRemove}
          color="error"
          size="small"
          sx={{
            border: "1.5px solid red",
            "&:hover": { border: "1.5px solid red" },
          }}
        >
          <Trash2 size={20} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default FilterRow;
