import React, { useState } from 'react';
import { RTKMapper } from '../../src';

function App() {
  const [mappingResult, setMappingResult] = useState<Record<string, string>>({});

  const customStyles = {
    container: {
      backgroundColor: '#f8f9fa',
      border: '2px solid #dee2e6',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
    },
    addButton: {
      borderColor: '#28a745',
      color: '#28a745',
    },
  };

  const initialMappings = {
    'value A': 'value 1',
    'value B': 'value 3',
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1>value Mapper Component Demo</h1>
      
      <RTKMapper
        sourceOptions={['value A', 'value B', 'value C', 'value D', 'value E']}
        targetOptions={['value 1', 'value 2', 'value 3', 'value 4', 'value 5']}
        initialMappings={initialMappings}
        minRows={1}
        maxRows={8}
        onChange={setMappingResult}
        styles={customStyles}
      />
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: 'white', 
        borderRadius: '4px',
        border: '1px solid #ddd' 
      }}>
        <h3>Mapping Result:</h3>
        <pre>{JSON.stringify(mappingResult, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;