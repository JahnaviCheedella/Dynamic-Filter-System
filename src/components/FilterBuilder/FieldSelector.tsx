import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { fieldDefinitions } from "../../utils/fieldDefinitions";

interface FieldSelectorProps {
  value: string;
  onChange: (fieldId: string) => void;
}

// Dropdown for selecting which field to filter on and options are dynamic based on field definitions
const FieldSelector: React.FC<FieldSelectorProps> = ({ value, onChange }) => {
  return (
      <TextField
        size="small"
        select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label="Field"
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
        {fieldDefinitions.map((field) => (
          <MenuItem key={field.id} value={field.id}>
            {field.label}
          </MenuItem>
        ))}
      </TextField>
  );
};

export default FieldSelector;
