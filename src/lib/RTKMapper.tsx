import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { Mapping, RTKMapperProps, SearchableDropdownProps } from './types';


const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  value,
  options,
  onChange,
  placeholder = "Select",
  styles = {},
  classNames = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Include current value in options if it exists
  const displayOptions = value && !options.includes(value) 
    ? [value, ...filteredOptions]
    : filteredOptions;

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const defaultDropdownStyles: CSSProperties = {
    position: 'relative',
    width: '100%',
  };

  const defaultButtonStyles: CSSProperties = {
    padding: '8px 12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const defaultSearchStyles: CSSProperties = {
    width: '100%',
    padding: '8px',
    border: 'none',
    borderBottom: '1px solid #eee',
    fontSize: '14px',
    outline: 'none',
  };

  const defaultListStyles: CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    maxHeight: '200px',
    overflowY: 'auto',
    backgroundColor: 'white',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginTop: '4px',
    zIndex: 1000,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const defaultOptionStyles: CSSProperties = {
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  };

  return (
    <div 
      ref={dropdownRef} 
      style={{ ...defaultDropdownStyles, ...styles.dropdownContainer }}
      className={classNames.dropdownContainer}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{ ...defaultButtonStyles, ...styles.dropdown }}
        className={classNames.dropdown}
      >
        <span>{value || placeholder}</span>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div 
          style={{ ...defaultListStyles, ...styles.optionsList }}
          className={classNames.optionsList}
        >
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ ...defaultSearchStyles, ...styles.searchInput }}
            className={classNames.searchInput}
            onClick={(e) => e.stopPropagation()}
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                style={{ ...defaultOptionStyles, ...styles.option }}
                className={classNames.option}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {option}
              </div>
            ))
          ) : (
            <div style={{ ...defaultOptionStyles, color: '#999' }}>
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Default styles
const defaultStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px',
    padding: '20px',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr auto',
    gap: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid #e0e0e0',
    marginBottom: '8px',
    alignItems: 'center',
  },
  headerText: {
    fontSize: '14px',
    fontWeight: '600' as const,
    color: '#333',
  },
  rowsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  mappingRow: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr auto',
    alignItems: 'center',
    gap: '20px',
  },
  arrow: {
    fontSize: '20px',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    width: '32px',
    height: '32px',
    border: 'none',
    backgroundColor: '#333',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
    flexShrink: 0,
  },
  addButton: {
    padding: '8px 16px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    alignSelf: 'flex-start',
    transition: 'background-color 0.2s',
  },
};

// Responsive styles for mobile
const mobileStyles = `
  @media (max-width: 640px) {
    .rtk-mapper-header {
      grid-template-columns: 1fr auto !important;
      grid-template-rows: auto auto;
      gap: 12px !important;
    }
    
    .rtk-mapper-header > span:nth-child(3) {
      grid-column: 1;
      grid-row: 2;
    }
    
    .rtk-mapper-header > span:nth-child(4) {
      display: none;
    }
    
    .rtk-mapper-row {
      grid-template-columns: 1fr auto !important;
      grid-template-rows: auto auto;
      gap: 12px !important;
      padding: 12px;
      background-color: #f8f9fa;
      border-radius: 8px;
      position: relative;
    }
    
    .rtk-mapper-row > *:nth-child(2) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(90deg);
      background-color: white;
      padding: 4px;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .rtk-mapper-row > *:nth-child(3) {
      grid-column: 1;
      grid-row: 2;
      margin-top: 8px;
    }
    
    .rtk-mapper-row > *:nth-child(4) {
      position: absolute;
      top: 12px;
      right: 12px;
    }
    
    .rtk-mapper-container {
      padding: 12px !important;
    }
  }
`;

// Add style tag for responsive styles
if (typeof document !== 'undefined' && !document.getElementById('rtk-mapper-styles')) {
  const styleTag = document.createElement('style');
  styleTag.id = 'rtk-mapper-styles';
  styleTag.innerHTML = mobileStyles;
  document.head.appendChild(styleTag);
}

const RTKMapper: React.FC<RTKMapperProps> = ({
  sourceOptions = [],
  targetOptions = [],
  initialMappings = {},
  minRows,
  maxRows,
  sourceLabel = 'Source',
  targetLabel = 'Destination',
  onChange,
  styles = {},
  classNames = {},
}) => {
  // Generate unique ID for each mapping
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Initialize mappings state
  const [mappings, setMappings] = useState<Mapping[]>(() => {
    const entries = Object.entries(initialMappings);
    if (entries.length > 0) {
      return entries.map(([source, target]) => ({
        id: generateId(),
        source,
        target,
      }));
    }
    // Default to minRows empty mappings if specified, otherwise 1
    const defaultRows = minRows || 1;
    return Array.from({ length: defaultRows }, () => ({
      id: generateId(),
      source: '',
      target: '',
    }));
  });

  // Update parent component when mappings change
  useEffect(() => {
    if (onChange) {
      const mappingObject = mappings.reduce((acc, mapping) => {
        if (mapping.source && mapping.target) {
          acc[mapping.source] = mapping.target;
        }
        return acc;
      }, {} as Record<string, string>);
      onChange(mappingObject);
    }
  }, [mappings, onChange]);

  // Handle source change
  const handleSourceChange = (id: string, value: string) => {
    setMappings(prev => prev.map(mapping => 
      mapping.id === id ? { ...mapping, source: value } : mapping
    ));
  };

  // Handle target change
  const handleTargetChange = (id: string, value: string) => {
    setMappings(prev => prev.map(mapping => 
      mapping.id === id ? { ...mapping, target: value } : mapping
    ));
  };

  // Get available options (excluding already selected ones)
  const getAvailableSourceOptions = (currentId: string) => {
    const selected = mappings
      .filter(m => m.id !== currentId && m.source)
      .map(m => m.source);
    return sourceOptions.filter(option => !selected.includes(option));
  };

  const getAvailableTargetOptions = (currentId: string) => {
    const selected = mappings
      .filter(m => m.id !== currentId && m.target)
      .map(m => m.target);
    return targetOptions.filter(option => !selected.includes(option));
  };

  // Add new row with empty values
  const handleAddRow = () => {
    if (!maxRows || mappings.length < maxRows) {
      setMappings(prev => [...prev, {
        id: generateId(),
        source: '',
        target: '',
      }]);
    }
  };

  // Remove row
  const handleRemoveRow = (id: string) => {
    const currentMinRows = minRows || 0;
    if (mappings.length > currentMinRows) {
      setMappings(prev => prev.filter(mapping => mapping.id !== id));
    }
  };

  // Merge styles
  const mergedStyles = {
    container: { ...defaultStyles.container, ...styles.container },
    header: { ...defaultStyles.header, ...styles.header },
    headerText: { ...defaultStyles.headerText, ...styles.headerText },
    rowsContainer: { ...defaultStyles.rowsContainer, ...styles.rowsContainer },
    mappingRow: { ...defaultStyles.mappingRow, ...styles.mappingRow },
    arrow: { ...defaultStyles.arrow, ...styles.arrow },
    deleteButton: { ...defaultStyles.deleteButton, ...styles.deleteButton },
    addButton: { ...defaultStyles.addButton, ...styles.addButton },
  };

  const dropdownStyles = {
    dropdown: styles.dropdown,
    dropdownContainer: styles.dropdownContainer,
    searchInput: styles.searchInput,
    optionsList: styles.optionsList,
    option: styles.option,
  };

  const dropdownClassNames = {
    dropdown: classNames.dropdown,
    dropdownContainer: classNames.dropdownContainer,
    searchInput: classNames.searchInput,
    optionsList: classNames.optionsList,
    option: classNames.option,
  };

  return (
    <div 
      style={mergedStyles.container} 
      className={`rtk-mapper-container ${classNames.container || ''}`}
    >
      {/* Header */}
      <div style={mergedStyles.header} className={`rtk-mapper-header ${classNames.header || ''}`}>
        <span style={mergedStyles.headerText} className={classNames.headerText}>
          {sourceLabel}
        </span>
        <span></span>
        <span style={mergedStyles.headerText} className={classNames.headerText}>
          {targetLabel}
        </span>
        <span></span>
      </div>

      {/* Mapping rows */}
      <div style={mergedStyles.rowsContainer} className={classNames.rowsContainer}>
        {mappings.map((mapping) => (
          <div 
            key={mapping.id} 
            style={mergedStyles.mappingRow}
            className={`rtk-mapper-row ${classNames.mappingRow || ''}`}
          >
            <SearchableDropdown
              value={mapping.source}
              options={getAvailableSourceOptions(mapping.id)}
              onChange={(value) => handleSourceChange(mapping.id, value)}
              placeholder={`Select ${sourceLabel}`}
              styles={dropdownStyles}
              classNames={dropdownClassNames}
            />
            
            <span style={mergedStyles.arrow} className={classNames.arrow}>
              →
            </span>
            
            <SearchableDropdown
              value={mapping.target}
              options={getAvailableTargetOptions(mapping.id)}
              onChange={(value) => handleTargetChange(mapping.id, value)}
              placeholder={`Select ${targetLabel}`}
              styles={dropdownStyles}
              classNames={dropdownClassNames}
            />
            
            <button
              onClick={() => handleRemoveRow(mapping.id)}
              style={{
                ...mergedStyles.deleteButton,
                opacity: minRows && mappings.length <= minRows ? 0.5 : 1,
                cursor: minRows && mappings.length <= minRows ? 'not-allowed' : 'pointer',
              }}
              className={classNames.deleteButton}
              disabled={minRows ? mappings.length <= minRows : false}
              title="Delete row"
            >
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Add button */}
      {(!maxRows || mappings.length < maxRows) && (
        <button
          onClick={handleAddRow}
          style={mergedStyles.addButton}
          className={classNames.addButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
          }}
        >
          <span style={{ fontSize: '18px', lineHeight: '1' }}>+</span>
          Add Row
        </button>
      )}
    </div>
  );
};


export default RTKMapper;