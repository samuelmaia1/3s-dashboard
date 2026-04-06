"use client";

import { useEffect, useState } from "react";
import { Button } from "@components/Button/Button";
import { Text } from "@components/Text/Text";
import { Icon } from "@components/Icon/Icon";
import { MenuItem, Drawer } from "@mui/material";
import { StyledTextField } from "@components/Input/style";
import { ActionsContainer, DrawerContent, FieldsContainer, Header } from "./style";

export interface ListFilterValues {
  status?: string;
  deliveryDate?: string;
  returnDate?: string;
}

interface ListFiltersProps {
  title?: string;
  values: ListFilterValues;
  statuses: string[];
  showReturnDate?: boolean;
  onApply: (values: ListFilterValues) => void;
}

export function ListFilters({
  title = "Filtros",
  values,
  statuses,
  showReturnDate = false,
  onApply,
}: ListFiltersProps) {
  const [open, setOpen] = useState(false);
  const [draftValues, setDraftValues] = useState<ListFilterValues>(values);

  useEffect(() => {
    setDraftValues(values);
  }, [values]);

  function handleChange(field: keyof ListFilterValues, value: string) {
    setDraftValues((prev) => ({
      ...prev,
      [field]: value || undefined,
    }));
  }

  function handleClear() {
    setDraftValues({});
  }

  function handleApply() {
    onApply(draftValues);
    setOpen(false);
  }

  return (
    <>
      <Button variant="outline" icon="sliders-horizontal" onClick={() => setOpen(true)}>
        Filtros
      </Button>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <DrawerContent>
          <Header>
            <Text variant="body1">{title}</Text>
            <Icon name="x" size={20} style={{ cursor: "pointer" }} onClick={() => setOpen(false)} />
          </Header>

          <FieldsContainer>
            <StyledTextField
              select
              label="Status"
              value={draftValues.status ?? ""}
              onChange={(e) => handleChange("status", e.target.value)}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="">Todos</MenuItem>
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </StyledTextField>

            <StyledTextField
              label="Data de entrega"
              type="date"
              value={draftValues.deliveryDate ?? ""}
              onChange={(e) => handleChange("deliveryDate", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />

            {showReturnDate && (
              <StyledTextField
                label="Data de devolução"
                type="date"
                value={draftValues.returnDate ?? ""}
                onChange={(e) => handleChange("returnDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            )}
          </FieldsContainer>

          <ActionsContainer>
            <Button variant="outline" fullWidth onClick={handleClear}>
              Limpar filtros
            </Button>
            <Button fullWidth onClick={handleApply}>
              Confirmar
            </Button>
          </ActionsContainer>
        </DrawerContent>
      </Drawer>
    </>
  );
}
