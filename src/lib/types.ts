import { CSSProperties } from "react";

// Types
export interface RTKMapperProps {
  sourceOptions?: string[];
  targetOptions?: string[];
  initialMappings?: Record<string, string>;
  minRows?: number;
  maxRows?: number;
  sourceLabel?: string;
  targetLabel?: string;
  onChange?: (mappings: Record<string, string>) => void;
  styles?: {
    container?: CSSProperties;
    header?: CSSProperties;
    headerText?: CSSProperties;
    mappingRow?: CSSProperties;
    dropdown?: CSSProperties;
    dropdownContainer?: CSSProperties;
    searchInput?: CSSProperties;
    optionsList?: CSSProperties;
    option?: CSSProperties;
    arrow?: CSSProperties;
    deleteButton?: CSSProperties;
    addButton?: CSSProperties;
    rowsContainer?: CSSProperties;
  };
  classNames?: {
    container?: string;
    header?: string;
    headerText?: string;
    mappingRow?: string;
    dropdown?: string;
    dropdownContainer?: string;
    searchInput?: string;
    optionsList?: string;
    option?: string;
    arrow?: string;
    deleteButton?: string;
    addButton?: string;
    rowsContainer?: string;
  };
}

export interface Mapping {
  id: string;
  source: string;
  target: string;
}

// Custom Dropdown Component with Search
export interface SearchableDropdownProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  styles?: {
    dropdown?: CSSProperties;
    dropdownContainer?: CSSProperties;
    searchInput?: CSSProperties;
    optionsList?: CSSProperties;
    option?: CSSProperties;
  };
  classNames?: {
    dropdown?: string;
    dropdownContainer?: string;
    searchInput?: string;
    optionsList?: string;
    option?: string;
  };
}