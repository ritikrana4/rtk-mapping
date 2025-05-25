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
    'Channel A': 'Channel 1',
    'Channel B': 'Channel 3',
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1>Channel Mapper Component Demo</h1>
      
      <RTKMapper
        sourceOptions={['Channel A', 'Channel B', 'Channel C', 'Channel D', 'Channel E']}
        targetOptions={['Channel 1', 'Channel 2', 'Channel 3', 'Channel 4', 'Channel 5']}
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