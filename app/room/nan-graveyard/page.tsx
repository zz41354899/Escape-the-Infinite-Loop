"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import RoomLayout from '@/components/RoomLayout';

export default function NanGraveyardRoom() {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [solved, setSolved] = useState(false);
  
  const codeExample = `parseInt("hello") + 1`;

  const options = [
    {
      id: 'option1',
      answer: 'NaN',
      explanation: 'When a string cannot be parsed as a number, parseInt returns NaN. Any operation with NaN results in NaN.'
    },
    {
      id: 'option2',
      answer: '"hello1"',
      explanation: 'This would be the result of string concatenation, but parseInt doesn\'t work like that.'
    },
    {
      id: 'option3',
      answer: '1',
      explanation: 'This assumes parseInt("hello") returns 0, which is not the case.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // NaN is the correct answer
    setSolved(selectedOption === 'option1');
  };

  return (
    <RoomLayout
      title="NaN Graveyard"
      backgroundColor="bg-yellow-800"
    >
      <p className="text-lg mb-6">
        You've entered a graveyard of undefined numerical values. Every number here has turned into NaN...
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">What will this code return? And why?</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto mb-4">
          {codeExample}
        </pre>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="space-y-4">
          <legend className="text-lg font-medium mb-2">Select the correct answer:</legend>
          
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
                  <p className="font-mono font-medium mb-1">{option.answer}</p>
                </div>
              </label>
            </div>
          ))}
        </fieldset>
        
        <button
          type="submit"
          disabled={!selectedOption}
          className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors disabled:opacity-50"
        >
          Submit Answer
        </button>
      </form>
      
      {submitted && (
        <div className={`mt-6 p-4 rounded-md ${solved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {solved ? (
            <>
              <p className="font-medium mb-2">
                Correct! You understand NaN behavior.
              </p>
              <p>
                When <span className="font-mono">parseInt</span> tries to parse "hello", it cannot find a valid number, so it returns NaN (Not a Number).
                Any mathematical operation with NaN results in NaN, so <span className="font-mono">NaN + 1</span> is still NaN.
              </p>
              <p className="mt-2">
                You can use the <span className="font-mono">isNaN()</span> function to check if a value is NaN.
              </p>
            </>
          ) : (
            <p className="font-medium">
              Incorrect answer. Consider how JavaScript handles strings that cannot be converted to numbers.
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