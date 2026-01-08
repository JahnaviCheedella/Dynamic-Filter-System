import React from "react";
import {  MenuItem, TextField } from "@mui/material";
import type { Operator } from "../../types/field.types";
import { operatorLabels } from "../../utils/fieldDefinitions";

interface OperatorSelectorProps {
  operators: Operator[];
  value: Operator;
  onChange: (operator: Operator) => void;
}

// Dropdown for selecting filter operators and options are dynamic based on field type
const OperatorSelector: React.FC<OperatorSelectorProps> = ({
  operators,
  value,
  onChange,
}) => {
  return (
      <TextField
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value as Operator)}
        label="Operator"
        select
        sx={{
          width: { xs: "100%", sm: 150 },
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputLabel-root": {
            color: "white",
            "&.Mui-focused": {
              color: "white",
            },
          },
          "& .MuiSelect-icon": {
            color: "white",
          },
        }}
      >
        {operators.map((op) => (
          <MenuItem key={op} value={op}>
            {operatorLabels[op] || op}
          </MenuItem>
        ))}
      </TextField>
  );
};

export default OperatorSelector;
