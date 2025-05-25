# Channel Mapper Component

A flexible React TypeScript component for creating channel mappings with searchable dropdowns, dynamic row management, and full mobile responsiveness.

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
- [Examples](#-examples)
- [Styling](#-styling)
- [Mobile Responsiveness](#-mobile-responsiveness)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- 🔍 **Searchable Dropdowns** - Quick filtering of options with built-in search functionality
- ➕ **Dynamic Row Management** - Add or remove mapping rows on the fly
- 🚫 **Duplicate Prevention** - Automatically prevents duplicate mappings across rows
- 📱 **Mobile Responsive** - Optimized layout for all screen sizes with touch-friendly controls
- 🎨 **Fully Customizable** - Style with CSS-in-JS or CSS classes
- 🏷️ **TypeScript Support** - Full type definitions included for better DX
- ⚡ **Zero Dependencies** - Only requires React as a peer dependency
- 🔄 **Two-way Data Binding** - Initialize with data and get updates via onChange
- 🎯 **Flexible Constraints** - Optional min/max row limits
- 🏷️ **Custom Labels** - Configurable column headers

## 🎥 Demo

[Live Demo](https://channel-mapper-demo.vercel.app) 

## 📦 Installation

```bash
# Using npm
npm install @rtk/mapper

```

## 🚀 Quick Start

```tsx
import React, { useState } from 'react';
import { RTKMapper } from '@rtk/mapper';

function App() {
  const [mappings, setMappings] = useState<Record<string, string>>({});

  return (
    <div>
      <RTKMapper
        sourceOptions={['Channel A', 'Channel B', 'Channel C']}
        targetOptions={['Channel 1', 'Channel 2', 'Channel 3']}
        onChange={setMappings}
      />
      
      <pre>{JSON.stringify(mappings, null, 2)}</pre>
    </div>
  );
}
```

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sourceOptions` | `string[]` | `['Channel A', 'Channel B', 'Channel C', 'Channel D', 'Channel E']` | Array of source channel options |
| `targetOptions` | `string[]` | `['Channel 1', 'Channel 2', 'Channel 3', 'Channel 4', 'Channel 5']` | Array of target channel options |
| `initialMappings` | `Record<string, string>` | `{}` | Initial mapping configuration |
| `minRows` | `number \| undefined` | `undefined` | Minimum number of mapping rows. If undefined, users can delete all rows |
| `maxRows` | `number \| undefined` | `undefined` | Maximum number of mapping rows. If undefined, unlimited rows allowed |
| `sourceLabel` | `string` | `'Source'` | Label for the source column header |
| `targetLabel` | `string` | `'Destination'` | Label for the target column header |
| `onChange` | `(mappings: Record<string, string>) => void` | - | Callback fired when mappings change |
| `styles` | `StylesConfig` | - | Custom styles object for fine-grained styling |
| `classNames` | `ClassNamesConfig` | - | Custom CSS class names for each component part |

### Style Objects

```typescript
interface StylesConfig {
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
}
```

### Class Names

```typescript
interface ClassNamesConfig {
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
}
```

## 💡 Examples

### Basic Usage

```tsx
<RTKMapper
  onChange={(mappings) => console.log('Mappings:', mappings)}
/>
```

### With Initial Mappings

```tsx
const initialMappings = {
  'Channel A': 'Channel 1',
  'Channel B': 'Channel 3'
};

<RTKMapper
  initialMappings={initialMappings}
  onChange={handleMappingChange}
/>
```

### Custom Labels and Limits

```tsx
<RTKMapper
  sourceOptions={['Input 1', 'Input 2', 'Input 3']}
  targetOptions={['Output A', 'Output B', 'Output C']}
  sourceLabel="Input Port"
  targetLabel="Output Port"
  minRows={2}
  maxRows={5}
  onChange={handleMappingChange}
/>
```

### With Custom Styling

```tsx
const customStyles = {
  container: {
    backgroundColor: '#f8f9fa',
    border: '2px solid #dee2e6',
    borderRadius: '12px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  addButton: {
    borderColor: '#28a745',
    color: '#28a745',
  },
  searchInput: {
    borderColor: '#0066cc',
  }
};

<RTKMapper
  styles={customStyles}
  onChange={handleMappingChange}
/>
```

### With CSS Classes

```tsx
<RTKMapper
  classNames={{
    container: 'my-custom-container',
    mappingRow: 'my-mapping-row',
    dropdown: 'my-dropdown-class'
  }}
  onChange={handleMappingChange}
/>
```

### Unlimited Rows Example

```tsx
// No min or max constraints - users have full control
<RTKMapper
  sourceOptions={['Src 1', 'Src 2', 'Src 3']}
  targetOptions={['Dest A', 'Dest B', 'Dest C']}
  onChange={handleMappingChange}
/>
```

## 🎨 Styling

The component provides multiple ways to customize its appearance:

### 1. CSS-in-JS Styles

Pass a styles object to customize individual components:

```tsx
const styles = {
  container: {
    padding: '24px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  dropdown: {
    borderRadius: '8px',
    fontSize: '16px'
  },
  deleteButton: {
    backgroundColor: '#ff4757',
    '&:hover': {
      backgroundColor: '#ff3838'
    }
  }
};

<RTKMapper styles={styles} />
```

### 2. CSS Classes

Use your own CSS classes:

```css
/* styles.css */
.custom-mapper-container {
  background: linear-gradient(to right, #667eea, #764ba2);
  padding: 2rem;
}

.custom-dropdown {
  border: 2px solid #4c51bf;
  transition: all 0.3s ease;
}

.custom-dropdown:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
```

```tsx
<RTKMapper
  classNames={{
    container: 'custom-mapper-container',
    dropdown: 'custom-dropdown'
  }}
/>
```

### 3. CSS Variables

The component uses CSS classes that you can target:

```css
.rtk-mapper-container { }
.rtk-mapper-header { }
.rtk-mapper-row { }
```

## 👨‍💻 Author

**Ritik Rana**
- GitHub: [@ritikrana](https://github.com/ritikrana4/rtk-mapping)
- npm: [@ritikrana](https://www.npmjs.com/~ritikrana)

<p align="center">
  Made with ❤️ by Ritik Rana
</p>

<p align="center">
  If you found this project helpful, please ⭐ star the repository!
</p>