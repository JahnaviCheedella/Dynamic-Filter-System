import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Plus, X } from "lucide-react";
import type { FilterCondition } from "../../types/filter.types";
import FilterRow from "./FilterRow";
import { fieldDefinitions } from "../../utils/fieldDefinitions";

interface FilterBuilderProps {
  conditions: FilterCondition[];
  onConditionsChange: (conditions: FilterCondition[]) => void;
}

// Main container for the filter system and manages adding, updating, and removing filter conditions
const FilterBuilder: React.FC<FilterBuilderProps> = ({
  conditions,
  onConditionsChange,
}) => {
  const addFilter = () => {
    const firstField = fieldDefinitions[0];
    const newCondition: FilterCondition = {
      id: `filter-${Date.now()}`,
      fieldId: firstField.id,
      operator: firstField.operators[0],
      value: "",
    };
    onConditionsChange([...conditions, newCondition]);
  };

  const updateFilter = (index: number, condition: FilterCondition) => {
    const newConditions = [...conditions];
    newConditions[index] = condition;
    onConditionsChange(newConditions);
  };

  const removeFilter = (index: number) => {
    onConditionsChange(conditions.filter((_, i) => i !== index));
  };
  const clearAllFilters = () => {
    onConditionsChange([]);
  };
  return (
    <Paper
      sx={{
        p: { xs: 1.5, sm: 2 },
        mb: 3,
        background:
          "radial-gradient(circle at bottom right, #00aaff 0%, #000d2b 70%, #000d2b 100%)",
        border: "1px solid #000d2b",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: { xs: 1, sm: 0 },
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "#fff", mb: { xs: 1, sm: 0 } }}
        >
          Filters
        </Typography>
        {conditions.length > 0 && (
          <Button
            startIcon={<X size={16} />}
            onClick={clearAllFilters}
            variant="outlined"
            size="small"
            sx={{
              border: "1px solid red",
              color: "#fff",
              fontWeight: "bold",
              backgroundColor: "rgba(255, 0, 0, 0.57)",
              borderRadius: "8px",
              width: { xs: "100%", sm: "auto" },
              "&:hover": {
                border: "1px solid red",
                backgroundColor: "rgba(255, 0, 0, 0.39)",
                color: "#fff",
                borderRadius: "8px",
              },
            }}
          >
            Clear All
          </Button>
        )}
      </Box>
      {conditions.map((condition, index) => (
        <FilterRow
          key={condition.id}
          condition={condition}
          onUpdate={(c) => updateFilter(index, c)}
          onRemove={() => removeFilter(index)}
        />
      ))}

      <Button
        startIcon={<Plus size={16} />}
        onClick={addFilter}
        variant="contained"
        size="small"
        sx={{ width: { xs: "100%", sm: "auto" } }}
      >
        Add Filter
      </Button>
    </Paper>
  );
};

export default FilterBuilder;
