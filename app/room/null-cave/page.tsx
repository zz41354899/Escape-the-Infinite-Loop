"use client";

import React, { useState } from 'react';
import RoomLayout from '@/components/RoomLayout';
import Link from 'next/link';

export default function NullCaveRoom() {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [solved, setSolved] = useState(false);
  
  const nullCode = `function processData(data) {
  // The function should return the length of data, if data exists
  return data.length;
}

// Sometimes data is null from the API
const result = processData(null);
console.log(result); // Throws error: Cannot read property 'length' of null`;

  const options = [
    {
      id: 'option1',
      code: `function processData(data) {
  // Option 1
  return data.length;
}`,
      explanation: 'Keep it as is'
    },
    {
      id: 'option2',
      code: `function processData(data) {
  // Option 2
  return data?.length;
}`,
      explanation: 'Use optional chaining'
    },
    {
      id: 'option3',
      code: `function processData(data) {
  // Option 3
  if (data === null) return 0;
  return data.length;
}`,
      explanation: 'Check for null explicitly'
    },
    {
      id: 'option4',
      code: `function processData(data) {
  // Option 4
  try {
    return data.length;
  } catch (e) {
    return 0;
  }
}`,
      explanation: 'Use try-catch'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Options 2 and 3 are correct solutions
    setSolved(['option2', 'option3'].includes(selectedOption));
  };

  return (
    <RoomLayout
      title="Null Cave"
      backgroundColor="bg-blue-800"
    >
      <p className="text-lg mb-6">
        You've entered a cave where all variables are <span className="font-mono">null</span>. 
        You need to handle it properly to proceed.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">The Problematic Code:</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
          {nullCode}
        </pre>
        <p className="mt-2 text-gray-600">Error: Cannot read property 'length' of null</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="space-y-4">
          <legend className="text-lg font-medium mb-2">Select the best way to fix this:</legend>
          
          {options.map(option => (
            <div key={option.id} className="p-4 border rounded-md hover:bg-gray-50">
              <label className="flex items-start cursor-pointer">
                <input
                  type="radio"
                  name="solution"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => setSelectedOption(option.id)}
                  className="mt-1"
                />
                <div className="ml-3">
                  <pre className="bg-gray-100 p-2 mb-2 rounded text-sm">{option.code}</pre>
                  <p className="text-gray-800">{option.explanation}</p>
                </div>
              </label>
            </div>
          ))}
        </fieldset>
        
        <button
          type="submit"
          disabled={!selectedOption}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          Submit Solution
        </button>
      </form>
      
      {submitted && (
        <div className={`mt-6 p-4 rounded-md ${solved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {solved ? (
            <p className="font-medium">
              Great job! Your solution handles the null values correctly. You can proceed safely.
            </p>
          ) : (
            <p className="font-medium">
              That approach won't work in the Null Cave. Try another solution.
            </p>
          )}
          
          <div className="mt-4">
            <Link href="/" className={`hover:underline ${solved ? 'text-green-800' : 'text-red-800'}`}>
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </RoomLayout>
  );
} 