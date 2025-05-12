"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import RoomLayout from '@/components/RoomLayout';

export default function TypeTunnelRoom() {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [solved, setSolved] = useState(false);
  
  const codeExample = `console.log(1 + "2" + 3);`;

  const options = [
    {
      id: 'option1',
      answer: '6',
      explanation: 'This would be correct if JavaScript performed numeric addition for all values, but string concatenation occurs when a string is involved.'
    },
    {
      id: 'option2',
      answer: '"123"',
      explanation: 'Correct. When adding a number and a string, JavaScript converts the number to a string and performs concatenation.'
    },
    {
      id: 'option3',
      answer: '"33"',
      explanation: 'This would happen if 1 + "2" was evaluated as 3, and then concatenated with 3, but that\'s not how type coercion works here.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Option 2 is correct - string concatenation occurs
    setSolved(selectedOption === 'option2');
  };

  return (
    <RoomLayout
      title="Type Coercion Tunnel"
      backgroundColor="bg-blue-800"
    >
      <div className="w-full mx-auto px-4 space-y-6">
        <p className="text-lg mb-6">
          You step into a tunnel where values turn into something else...
        </p>

        <div className="mb-8 space-y-3">
          <h2 className="text-xl font-semibold">Code:</h2>
          <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
            <code className="text-green-400 font-mono whitespace-pre-wrap break-words">
              {codeExample}
            </code>
          </div>
          <p className="font-medium">What will be printed in the console?</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="space-y-4">
            <legend className="text-lg font-medium mb-2">Select your answer:</legend>
            
            {options.map(option => (
              <label 
                key={option.id} 
                htmlFor={option.id}
                className="flex items-start gap-2 p-4 border rounded-md hover:bg-gray-50 w-full cursor-pointer"
              >
                <input
                  id={option.id}
                  type="radio"
                  name="solution"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => setSelectedOption(option.id)}
                  className="mt-1"
                />
                <span className="flex-1 min-w-0 text-sm break-words whitespace-pre-wrap">
                  <strong className="block mb-1">{option.answer}</strong>
                  <span className="text-gray-600">{option.explanation}</span>
                </span>
              </label>
            ))}
          </fieldset>
          
          <div className="flex mt-4">
            <button
              type="submit"
              disabled={!selectedOption}
              className="sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Submit Answer
            </button>
          </div>
        </form>
        
        {submitted && (
          <div className={`mt-6 p-4 rounded-md space-y-3 ${solved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {solved ? (
              <>
                <p className="font-medium mb-2">
                  Correct! You understand JavaScript type coercion.
                </p>
                <p className="break-words">
                  In JavaScript, when you use the <code className="font-mono bg-gray-100 px-1 rounded">+</code> operator with a string and any other type, 
                  JavaScript converts the other type to a string and performs concatenation rather than addition.
                </p>
                <p className="mt-2 break-words">
                  Here's the step-by-step evaluation:
                </p>
                <ol className="list-decimal pl-5 mt-1 space-y-1">
                  <li className="break-words">First, <code className="font-mono bg-gray-100 px-1 rounded">1 + "2"</code> is evaluated as <code className="font-mono bg-gray-100 px-1 rounded">"12"</code> (number 1 is converted to string)</li>
                  <li className="break-words">Then, <code className="font-mono bg-gray-100 px-1 rounded">"12" + 3</code> is evaluated as <code className="font-mono bg-gray-100 px-1 rounded">"123"</code> (number 3 is converted to string)</li>
                </ol>
              </>
            ) : (
              <p className="font-medium">
                That's not correct. Consider how JavaScript handles type coercion when strings are involved in addition operations.
              </p>
            )}
            
            <div className="mt-4 pt-2 border-t border-gray-200">
              <Link href="/" className={`hover:underline block text-center sm:text-left ${solved ? 'text-green-800' : 'text-red-800'}`}>
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </RoomLayout>
  );
} 