import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  FormControlLabel,
  Switch,
  Box,
  Checkbox,
  ListItemText,
  IconButton,
  MenuList,
} from "@mui/material";
import { X } from "lucide-react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import type { FilterValue } from "../../types/filter.types";
import type { FieldDefinition } from "../../types/field.types";

interface ValueInputProps {
  field: FieldDefinition;
  operator: string;
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

// Shared white input styles for all input components
const whiteInputStyles = {
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& input": {
      color: "white",
      WebkitTextFillColor: "white",
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
      WebkitTextFillColor: "white",
    },
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    "& input::placeholder": {
      color: "rgba(255, 255, 255, 0.7)",
      opacity: 1,
    },
  },
  "& .MuiInputLabel-root": {
    color: "white",
    "&.Mui-focused": {
      color: "white",
    },
  },
  "& .MuiIconButton-root": {
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
};

// Optimized DatePicker styles with explicit white text and borders
const datePickerStyles = {
  "& .MuiOutlinedInput-root": {
    color: "white !important",
    "& input": {
      color: "white !important",
      WebkitTextFillColor: "white !important",
      "-webkit-text-fill-color": "white !important",
    },
    "& .MuiOutlinedInput-input": {
      color: "white !important",
      WebkitTextFillColor: "white !important",
      "-webkit-text-fill-color": "white !important",
    },
    "& fieldset": {
      borderColor: "white !important",
    },
    "&:hover": {
      "& fieldset": {
        borderColor: "white !important",
      },
    },
    "&.Mui-focused": {
      "& fieldset": {
        borderColor: "white !important",
      },
    },
    "& input::placeholder": {
      color: "rgba(255, 255, 255, 0.7) !important",
      opacity: 1,
    },
  },
  "& .MuiInputLabel-root": {
    color: "white !important",
    "&.Mui-focused": {
      color: "white !important",
    },
  },
  "& .MuiIconButton-root": {
    color: "white !important",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
};

// Renders the appropriate input type based on field type and handles value changes and validation
const ValueInput: React.FC<ValueInputProps> = ({ field, value, onChange }) => {
  switch (field.type) {
    case "text":
      return (
        <TextField
          size="small"
          placeholder="Enter value"
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          sx={{
            ...whiteInputStyles,
            width: { xs: "100%", sm: 150 },
          }}
        />
      );

    case "number":
      return (
        <TextField
          size="small"
          type="number"
          placeholder="Enter number"
          value={(value as number) || ""}
          onChange={(e) => onChange(Number(e.target.value))}
          sx={{
            ...whiteInputStyles,
            width: { xs: "100%", sm: 150 },
          }}
        />
      );

    case "amount":
      const amountValue = (value as { min: number; max: number }) || {
        min: 0,
        max: 0,
      };
      return (
        <Box
          sx={{ display: "flex", gap: 1, width: { xs: "100%", sm: "auto" } }}
        >
          <TextField
            size="small"
            type="number"
            label="Min"
            value={amountValue.min || ""}
            onChange={(e) =>
              onChange({ ...amountValue, min: Number(e.target.value) })
            }
            sx={{ ...whiteInputStyles, width: { xs: "100%", sm: 150 } }}
          />
          <TextField
            size="small"
            type="number"
            label="Max"
            value={amountValue.max || ""}
            onChange={(e) =>
              onChange({ ...amountValue, max: Number(e.target.value) })
            }
            sx={{ ...whiteInputStyles, width: { xs: "100%", sm: 150 } }}
          />
        </Box>
      );

    case "date":
      const dateValue = (value as { start: string; end: string }) || {
        start: "",
        end: "",
      };
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "150px 150px" },
              gap: { xs: 1.5, sm: 1 },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Box
              sx={{
                "& .MuiOutlinedInput-root":
                  datePickerStyles["& .MuiOutlinedInput-root"],
              }}
            >
              <DatePicker
                label="Start Date"
                value={dateValue.start ? dayjs(dateValue.start) : null}
                onChange={(newValue: Dayjs | null) =>
                  onChange({
                    ...dateValue,
                    start: newValue?.format("YYYY-MM-DD") || "",
                  })
                }
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    sx: datePickerStyles,
                    InputProps: {
                      sx: {
                        color: "white !important",
                        "& input": {
                          color: "white !important",
                          WebkitTextFillColor: "white !important",
                          "-webkit-text-fill-color": "white !important",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "white !important",
                          WebkitTextFillColor: "white !important",
                          "-webkit-text-fill-color": "white !important",
                        },
                        "& fieldset": {
                          borderColor: "white !important",
                        },
                        "&:hover fieldset": {
                          borderColor: "white !important",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white !important",
                        },
                      },
                    },
                    inputProps: {
                      style: {
                        color: "white",
                      },
                    },
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                "& .MuiOutlinedInput-root":
                  datePickerStyles["& .MuiOutlinedInput-root"],
              }}
            >
              <DatePicker
                label="End Date"
                value={dateValue.end ? dayjs(dateValue.end) : null}
                onChange={(newValue: Dayjs | null) =>
                  onChange({
                    ...dateValue,
                    end: newValue?.format("YYYY-MM-DD") || "",
                  })
                }
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    sx: datePickerStyles,
                    InputProps: {
                      sx: {
                        color: "white !important",
                        "& input": {
                          color: "white !important",
                          WebkitTextFillColor: "white !important",
                          "-webkit-text-fill-color": "white !important",
                        },
                        "& .MuiOutlinedInput-input": {
                          color: "white !important",
                          WebkitTextFillColor: "white !important",
                          "-webkit-text-fill-color": "white !important",
                        },
                        "& fieldset": {
                          borderColor: "white !important",
                        },
                        "&:hover fieldset": {
                          borderColor: "white !important",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "white !important",
                        },
                      },
                    },
                    inputProps: {
                      style: {
                        color: "white",
                      },
                    },
                  },
                }}
              />
            </Box>
          </Box>
        </LocalizationProvider>
      );

    case "boolean":
      return (
        <FormControlLabel
          control={
            <Switch
              checked={(value as boolean) || false}
              onChange={(e) => onChange(e.target.checked)}
            />
          }
          label={value ? "True" : "False"}
          sx={{
            "& .MuiFormControlLabel-label": {
              color: "white",
            },
          }}
        />
      );

    case "singleSelect":
      return (
        <TextField
          size="small"
          select
          value={(value as string) || ""}
          onChange={(e) => onChange(e.target.value)}
          label="Select value"
          sx={{
            width: { xs: "100%", sm: 150 },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& input": {
                color: "white",
              },
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
          {field.options?.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      );

    case "multiSelect":
      const multiValue = (value as string[]) || [];
      const [open, setOpen] = useState(false);

      // Custom MenuList component with header
      const CustomMenuList = React.forwardRef<HTMLUListElement, any>(
        (props, ref) => {
          return (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  p: 1,
                  borderBottom: 1,
                  borderColor: "divider",
                  position: "sticky",
                  top: 0,
                  backgroundColor: "background.paper",
                  zIndex: 1,
                }}
              >
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                  sx={{
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                >
                  <X size={16} />
                </IconButton>
              </Box>
              <MenuList ref={ref} {...props} />
            </Box>
          );
        }
      );
      CustomMenuList.displayName = "CustomMenuList";

      return (
        <TextField
          size="small"
          select
          SelectProps={{
            multiple: true,
            open: open,
            onClose: () => setOpen(false),
            onOpen: () => setOpen(true),
            renderValue: (selected) => (selected as string[]).join(", "),
            MenuProps: {
              PaperProps: {
                sx: {
                  maxHeight: 300,
                },
              },
              MenuListProps: {
                component: CustomMenuList,
              },
            },
          }}
          value={multiValue}
          onChange={(e) => {
            const val = e.target.value;
            onChange(typeof val === "string" ? val.split(",") : val);
          }}
          label="Select values"
          sx={{
            width: { xs: "100%", sm: 150 },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& input": {
                color: "white",
              },
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
          {field.options?.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={multiValue.includes(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </TextField>
      );

    default:
      return null;
  }
};

export default ValueInput;
