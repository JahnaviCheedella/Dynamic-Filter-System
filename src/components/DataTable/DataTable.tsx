import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import type { Employee } from "../../types/data.types";

interface DataTableProps {
  data: Employee[];
  totalRecords: number;
}

type SortDirection = "asc" | "desc";
type SortField = keyof Employee | "address.city";

// Displays filtered data in a sortable table and shows record counts and handles empty states
const DataTable: React.FC<DataTableProps> = ({ data, totalRecords }) => {
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortField(field);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      if (sortField === "address.city") {
        aVal = a.address.city;
        bVal = b.address.city;
      } else {
        aVal = a[sortField as keyof Employee];
        bVal = b[sortField as keyof Employee];
      }

      // Handle arrays (skills) - sort by length
      if (Array.isArray(aVal) && Array.isArray(bVal)) {
        const diff = aVal.length - bVal.length;
        return sortDirection === "asc" ? diff : -diff;
      }

      // Handle booleans (isActive)
      if (typeof aVal === "boolean" && typeof bVal === "boolean") {
        const diff = aVal === bVal ? 0 : aVal ? 1 : -1;
        return sortDirection === "asc" ? diff : -diff;
      }

      // Handle strings
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      // Handle numbers
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }, [data, sortField, sortDirection]);

  if (data.length === 0) {
    return (
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
          background: "#f2f2f2",
          border: "1px solid #000d2b",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No results found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Try adjusting your filters to see more results
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ border: "1px solid #000d2b", background: "#f2f2f2" }}>
      <Box sx={{ p: 1, borderBottom: 1, borderColor: "divider" }}>
        <Typography variant="body2" color="text.secondary">
          Showing <strong>{data.length}</strong> of{" "}
          <strong>{totalRecords}</strong> records
        </Typography>
      </Box>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortField === "name"}
                  direction={sortField === "name" ? sortDirection : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortField === "email"}
                  direction={sortField === "email" ? sortDirection : "asc"}
                  onClick={() => handleSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortField === "department"}
                  direction={sortField === "department" ? sortDirection : "asc"}
                  onClick={() => handleSort("department")}
                >
                  Department
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortField === "role"}
                  direction={sortField === "role" ? sortDirection : "asc"}
                  onClick={() => handleSort("role")}
                >
                  Role
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortField === "salary"}
                  direction={sortField === "salary" ? sortDirection : "asc"}
                  onClick={() => handleSort("salary")}
                >
                  Salary
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortField === "joinDate"}
                  direction={sortField === "joinDate" ? sortDirection : "asc"}
                  onClick={() => handleSort("joinDate")}
                >
                  Join Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortField === "isActive"}
                  direction={sortField === "isActive" ? sortDirection : "asc"}
                  onClick={() => handleSort("isActive")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortField === "skills"}
                  direction={sortField === "skills" ? sortDirection : "asc"}
                  onClick={() => handleSort("skills")}
                >
                  Skills
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortField === "address.city"}
                  direction={
                    sortField === "address.city" ? sortDirection : "asc"
                  }
                  onClick={() => handleSort("address.city")}
                >
                  City
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={sortField === "projects"}
                  direction={sortField === "projects" ? sortDirection : "asc"}
                  onClick={() => handleSort("projects")}
                >
                  Projects
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((employee) => (
              <TableRow key={employee.id} hover>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>${employee.salary.toLocaleString()}</TableCell>
                <TableCell>{employee.joinDate}</TableCell>
                <TableCell>
                  <Chip
                    label={employee.isActive ? "Active" : "Inactive"}
                    color={employee.isActive ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {employee.skills.slice(0, 2).map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                    {employee.skills.length > 2 && (
                      <Tooltip
                        title={employee.skills.slice(2).join(", ")}
                        arrow
                        placement="top"
                      >
                        <Chip
                          label={`+${employee.skills.length - 2}`}
                          size="small"
                          sx={{ cursor: "pointer" }}
                        />
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
                <TableCell>{employee.address.city}</TableCell>
                <TableCell>{employee.projects}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DataTable;
