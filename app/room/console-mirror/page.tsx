"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import RoomLayout from '@/components/RoomLayout';

export default function ConsoleMirrorRoom() {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [solved, setSolved] = useState(false);
  
  const errorMessage = `TypeError: Cannot read properties of undefined (reading 'length')
    at App.js:12:15`;

  const options = [
    {
      id: 'option1',
      code: 'const name = undefined; console.log(name.length);',
      explanation: 'Attempting to read the length property of undefined results in a TypeError'
    },
    {
      id: 'option2',
      code: 'const name = "test"; console.log(name.length);',
      explanation: 'Strings have a length property, this code will work without errors'
    },
    {
      id: 'option3',
      code: 'let name; name = "hello"; console.log(name.length);',
      explanation: 'The variable is assigned a string value, which has a valid length property'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // First option is correct - it will produce the error
    setSolved(selectedOption === 'option1');
  };

  return (
    <RoomLayout
      title="Console Mirror Room"
      backgroundColor="bg-red-800"
    >
      <div className="w-full  mx-auto px-4 space-y-6">
        <p className="text-lg mb-6">
          You stand before a magical mirror that reflects console errors. To pass through this room, you must understand the source of the error message...
        </p>

        <div className="mb-8 space-y-3">
          <h2 className="text-xl font-semibold">Error message:</h2>
          <div className="bg-gray-900 text-red-400 p-4 rounded-md font-mono overflow-x-auto whitespace-pre-line break-words">
            {errorMessage}
          </div>
          <p className="font-medium">Which code would produce this error?</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="space-y-4">
            <legend className="text-lg font-medium mb-2">Select the code that would cause the error:</legend>
            
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
                <span className="text-sm break-words whitespace-pre-wrap">
                  <code className="font-mono bg-gray-100 p-2 rounded block mb-2 break-words whitespace-pre-wrap">
                    {option.code}
                  </code>
                  <span className="text-gray-600">{option.explanation}</span>
                </span>
              </label>
            ))}
          </fieldset>
          
          <div className="flex mt-4">
            <button
              type="submit"
              disabled={!selectedOption}
              className=" sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
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
                  Correct! You've identified the source of the error.
                </p>
                <p className="break-words">
                  The error message <span className="font-mono overflow-x-auto whitespace-pre-wrap">TypeError: Cannot read properties of undefined (reading 'length')</span> indicates
                  that the code is trying to read a property of an <span className="font-mono">undefined</span> value.
                </p>
                <p className="mt-2 break-words">
                  In <span className="font-mono overflow-x-auto whitespace-pre-wrap">const name = undefined; console.log(name.length);</span>,
                  the variable <span className="font-mono">name</span> is explicitly set to <span className="font-mono">undefined</span>,
                  then the code attempts to read its <span className="font-mono">length</span> property, which is an impossible operation.
                </p>
                <p className="mt-2">
                  Ways to fix this type of error include:
                </p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li className="break-words">Using optional chaining: <span className="font-mono overflow-x-auto whitespace-pre-wrap">console.log(name?.length)</span></li>
                  <li className="break-words">Adding a conditional check: <span className="font-mono overflow-x-auto whitespace-pre-wrap">if (name) console.log(name.length)</span></li>
                  <li className="break-words">Using nullish coalescing: <span className="font-mono overflow-x-auto whitespace-pre-wrap">console.log((name || '').length)</span></li>
                </ul>
              </>
            ) : (
              <p className="font-medium">
                This code would not produce the displayed error. Please read the error message carefully and identify the root cause.
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