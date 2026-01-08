import React, { useState, useMemo } from "react";
import {
  Container,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import FilterBuilder from "./components/FilterBuilder/FilterBuilder";
import DataTable from "./components/DataTable/DataTable";
import type { FilterCondition } from "./types/filter.types";
import { generateMockData } from "./utils/dataGenerator";
import { applyFilters } from "./utils/filterEngine";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

// Generate mock data once when the app loads
const mockData = generateMockData(50);

const App: React.FC = () => {
  const [conditions, setConditions] = useState<FilterCondition[]>([]);

  // Apply filters to data whenever conditions change
  const filteredData = useMemo(() => {
    return applyFilters(mockData, conditions);
  }, [conditions]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} sx={{ width: "100%", py: 3 }}>
        <Typography
          variant="h5"
          component="h1"
          fontWeight="bold"
          textAlign="center"
          sx={{ color: "#fff" }}
          gutterBottom
        >
          Dynamic Filter System
        </Typography>

        <FilterBuilder
          conditions={conditions}
          onConditionsChange={setConditions}
        />

        <DataTable data={filteredData} totalRecords={mockData.length} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
