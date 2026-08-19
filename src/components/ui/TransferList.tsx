import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SearchIcon from "@mui/icons-material/Search";

type TransferListProps<T> = Readonly<{
  availableItems: T[];
  selectedItems: T[];
  setAvailableItems: (items: T[]) => void;
  setSelectedItems: (items: T[]) => void;
  getUniqueId: (item: T) => string | number;
  renderLabel: (item: T) => string;
  availableTitle?: string;
  selectedTitle?: string;
  disabled?: boolean;
}>;

export function TransferList<T>({
  availableItems,
  selectedItems,
  setAvailableItems,
  setSelectedItems,
  getUniqueId,
  renderLabel,
  availableTitle,
  selectedTitle,
  disabled = false,
}: TransferListProps<T>) {
  const [checkedAvailable, setCheckedAvailable] = useState<(string | number)[]>(
    []
  );
  const [checkedSelected, setCheckedSelected] = useState<(string | number)[]>(
    []
  );
  const [searchAvailable, setSearchAvailable] = useState("");
  const [searchSelected, setSearchSelected] = useState("");

  const filteredAvailable = availableItems.filter((item) =>
    renderLabel(item).toLowerCase().includes(searchAvailable.toLowerCase())
  );

  const filteredSelected = selectedItems.filter((item) =>
    renderLabel(item).toLowerCase().includes(searchSelected.toLowerCase())
  );

  const handleToggleAvailable = (item: T) => {
    const id = getUniqueId(item);
    const currentIndex = checkedAvailable.indexOf(id);
    const newChecked = [...checkedAvailable];
    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedAvailable(newChecked);
  };

  const handleToggleSelected = (item: T) => {
    const id = getUniqueId(item);
    const currentIndex = checkedSelected.indexOf(id);
    const newChecked = [...checkedSelected];
    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedSelected(newChecked);
  };

  const handleTransferToSelected = () => {
    const itemsToTransfer = availableItems.filter((item) =>
      checkedAvailable.includes(getUniqueId(item))
    );
    setSelectedItems([...selectedItems, ...itemsToTransfer]);
    setAvailableItems(
      availableItems.filter(
        (item) => !checkedAvailable.includes(getUniqueId(item))
      )
    );
    setCheckedAvailable([]);
  };

  const handleTransferToAvailable = () => {
    const itemsToTransfer = selectedItems.filter((item) =>
      checkedSelected.includes(getUniqueId(item))
    );
    setAvailableItems([...availableItems, ...itemsToTransfer]);
    setSelectedItems(
      selectedItems.filter(
        (item) => !checkedSelected.includes(getUniqueId(item))
      )
    );
    setCheckedSelected([]);
  };

  const filteredAvailableIds = filteredAvailable.map(getUniqueId);
  const isAllFilteredAvailableChecked =
    filteredAvailableIds.length > 0 &&
    filteredAvailableIds.every((id) => checkedAvailable.includes(id));

  const handleSelectAllAvailable = () => {
    if (isAllFilteredAvailableChecked) {
      setCheckedAvailable((prev) =>
        prev.filter((id) => !filteredAvailableIds.includes(id))
      );
    } else {
      setCheckedAvailable((prev) => {
        const uniqueNewIds = filteredAvailableIds.filter(
          (id) => !prev.includes(id)
        );
        return [...prev, ...uniqueNewIds];
      });
    }
  };

  const filteredSelectedIds = filteredSelected.map(getUniqueId);
  const isAllFilteredSelectedChecked =
    filteredSelectedIds.length > 0 &&
    filteredSelectedIds.every((id) => checkedSelected.includes(id));

  const handleSelectAllSelected = () => {
    if (isAllFilteredSelectedChecked) {
      setCheckedSelected((prev) =>
        prev.filter((id) => !filteredSelectedIds.includes(id))
      );
    } else {
      setCheckedSelected((prev) => {
        const uniqueNewIds = filteredSelectedIds.filter(
          (id) => !prev.includes(id)
        );
        return [...prev, ...uniqueNewIds];
      });
    }
  };

  return (
    <Box sx={{ opacity: disabled ? 0.6 : 1, pointerEvents: disabled ? "none" : "auto" }}>
      {(availableTitle || selectedTitle) && (
        <Box
          sx={{
            display: { xs: "none", md: "grid" },
            gridTemplateColumns: "1fr 1fr",
            gap: "95px",
            marginBottom: "16px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "20px",
              letterSpacing: "1%",
              verticalAlign: "middle",
              color: "#757575",
            }}
          >
            {availableTitle}
          </Typography>

          <Typography
            sx={{
              fontFamily: "Inter",
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "20px",
              letterSpacing: "1%",
              verticalAlign: "middle",
              color: "#757575",
            }}
          >
            {selectedTitle}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr auto 1fr" },
          gap: "16px",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {availableTitle && (
            <Typography
              sx={{
                display: { xs: "block", md: "none" },
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "15px",
                color: "#757575",
                mb: 1,
              }}
            >
              {availableTitle}
            </Typography>
          )}
          <Box
            sx={{
              border: "1px solid #E0E0E0",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Box
              sx={{
                padding: "12px 16px",
                borderBottom: "1px solid #E0E0E0",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                backgroundColor: "#FAFAFA",
              }}
            >
              <Checkbox
                sx={{
                  padding: 0,
                  color: "#207840",
                  "&.Mui-checked": { color: "#207840" },
                }}
                checked={isAllFilteredAvailableChecked}
                indeterminate={
                  filteredAvailableIds.some((id) =>
                    checkedAvailable.includes(id)
                  ) && !isAllFilteredAvailableChecked
                }
                onChange={handleSelectAllAvailable}
                disabled={disabled}
              />
              <Typography sx={{ fontSize: "16px", color: "#848484" }}>
                Selecionar Todos
              </Typography>
            </Box>
            <Box sx={{ padding: "12px 16px", borderBottom: "1px solid #E0E0E0" }}>
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                placeholder="Pesquisar..."
                value={searchAvailable}
                onChange={(e) => setSearchAvailable(e.target.value)}
                disabled={disabled}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#9E9E9E", fontSize: "20px" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "6px",
                    height: "36px",
                    fontSize: "14px",
                    backgroundColor: "#FAFAFA",
                    "& fieldset": { borderColor: "#E0E0E0" },
                    "&:hover fieldset": { borderColor: "#BDBDBD" },
                    "&.Mui-focused fieldset": { borderColor: "#207840" },
                  },
                }}
              />
            </Box>
            <List
              sx={{
                maxHeight: "300px",
                minHeight: "300px",
                overflow: "auto",
                width: "100%",
                color: "#848484",
                fontSize: "14px",
                padding: "4px 0",
              }}
            >
              {filteredAvailable.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "220px",
                    color: "#9E9E9E",
                    gap: "8px",
                  }}
                >
                  <SearchIcon sx={{ fontSize: "32px", color: "#BDBDBD" }} />
                  <Typography sx={{ fontSize: "14px", color: "#9E9E9E" }}>
                    Nenhum resultado encontrado
                  </Typography>
                </Box>
              ) : (
                filteredAvailable.map((item) => {
                  const id = getUniqueId(item);
                  return (
                    <ListItem
                      key={id}
                      disablePadding
                      onClick={() => !disabled && handleToggleAvailable(item)}
                    >
                      <ListItemButton
                        disabled={disabled}
                        sx={{
                          padding: "8px 16px",
                          margin: "2px 8px",
                          borderRadius: "6px",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            backgroundColor: "#EAF3EC",
                            color: "#207840",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", marginRight: "15px" }}>
                          <Checkbox
                            sx={{
                              padding: 0,
                              color: "#207840",
                              "&.Mui-checked": { color: "#207840" },
                            }}
                            checked={checkedAvailable.includes(id)}
                            tabIndex={-1}
                            disableRipple
                            disabled={disabled}
                          />
                        </Box>
                        <ListItemText primary={renderLabel(item)} />
                      </ListItemButton>
                    </ListItem>
                  );
                })
              )}
            </List>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            gap: "12px",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            alignSelf: "center",
            my: { xs: 1, md: 0 },
          }}
        >
          <Button
            variant="outlined"
            size="large"
            onClick={handleTransferToSelected}
            disabled={disabled || checkedAvailable.length === 0}
            sx={{ minWidth: { xs: "40px", md: "14px" }, width: { xs: "40px", md: "14px" }, height: { xs: "40px", md: "28px" }, padding: 0 }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}><ChevronRight /></Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}><ExpandMoreIcon /></Box>
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={handleTransferToAvailable}
            disabled={disabled || checkedSelected.length === 0}
            sx={{ minWidth: { xs: "40px", md: "14px" }, width: { xs: "40px", md: "14px" }, height: { xs: "40px", md: "28px" }, padding: 0 }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" } }}><ChevronLeft /></Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}><ExpandLessIcon /></Box>
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {selectedTitle && (
            <Typography
              sx={{
                display: { xs: "block", md: "none" },
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "15px",
                color: "#757575",
                mb: 1,
              }}
            >
              {selectedTitle}
            </Typography>
          )}
          <Box
            sx={{
              border: "1px solid #E0E0E0",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Box
              sx={{
                padding: "12px 16px",
                borderBottom: "1px solid #E0E0E0",
                display: "flex",
                alignItems: "center",
                gap: "15px",
                backgroundColor: "#FAFAFA",
              }}
            >
              <Checkbox
                sx={{
                  padding: 0,
                  color: "#207840",
                  "&.Mui-checked": { color: "#207840" },
                }}
                checked={isAllFilteredSelectedChecked}
                indeterminate={
                  filteredSelectedIds.some((id) =>
                    checkedSelected.includes(id)
                  ) && !isAllFilteredSelectedChecked
                }
                onChange={handleSelectAllSelected}
                disabled={disabled}
              />
              <Typography sx={{ fontSize: "16px", color: "#848484" }}>
                Selecionar Todos
              </Typography>
            </Box>
            <Box sx={{ padding: "12px 16px", borderBottom: "1px solid #E0E0E0" }}>
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                placeholder="Pesquisar..."
                value={searchSelected}
                onChange={(e) => setSearchSelected(e.target.value)}
                disabled={disabled}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#9E9E9E", fontSize: "20px" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "6px",
                    height: "36px",
                    fontSize: "14px",
                    backgroundColor: "#FAFAFA",
                    "& fieldset": { borderColor: "#E0E0E0" },
                    "&:hover fieldset": { borderColor: "#BDBDBD" },
                    "&.Mui-focused fieldset": { borderColor: "#207840" },
                  },
                }}
              />
            </Box>
            <List
              sx={{
                maxHeight: "300px",
                minHeight: "300px",
                overflow: "auto",
                width: "100%",
                color: "#848484",
                fontSize: "14px",
                padding: "4px 0",
              }}
            >
              {filteredSelected.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "220px",
                    color: "#9E9E9E",
                    gap: "8px",
                  }}
                >
                  <SearchIcon sx={{ fontSize: "32px", color: "#BDBDBD" }} />
                  <Typography sx={{ fontSize: "14px", color: "#9E9E9E" }}>
                    Nenhum resultado encontrado
                  </Typography>
                </Box>
              ) : (
                filteredSelected.map((item) => {
                  const id = getUniqueId(item);
                  return (
                    <ListItem
                      key={id}
                      disablePadding
                      onClick={() => !disabled && handleToggleSelected(item)}
                    >
                      <ListItemButton
                        disabled={disabled}
                        sx={{
                          padding: "8px 16px",
                          margin: "2px 8px",
                          borderRadius: "6px",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            backgroundColor: "#EAF3EC",
                            color: "#207840",
                          },
                        }}
                      >
                        <Box sx={{ display: "flex", marginRight: "15px" }}>
                          <Checkbox
                            sx={{
                              padding: 0,
                              color: "#207840",
                              "&.Mui-checked": { color: "#207840" },
                            }}
                            checked={checkedSelected.includes(id)}
                            tabIndex={-1}
                            disableRipple
                            disabled={disabled}
                          />
                        </Box>
                        <ListItemText primary={renderLabel(item)} />
                      </ListItemButton>
                    </ListItem>
                  );
                })
              )}
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
