"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import RoomLayout from '@/components/RoomLayout';

export default function CallbackDungeonRoom() {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [solved, setSolved] = useState(false);
  
  const codeExample = `console.log("Start");
fetchData((result) => {
  console.log("Got:", result);
});
console.log("End");

// fetchData is an asynchronous function that executes the callback when data is retrieved`;

  const options = [
    {
      id: 'option1',
      answer: 'Start → Got → End',
      explanation: 'This assumes fetchData executes synchronously'
    },
    {
      id: 'option2',
      answer: 'Start → End → Got',
      explanation: 'Asynchronous callbacks execute after the main thread code completes'
    },
    {
      id: 'option3',
      answer: 'Got → Start → End',
      explanation: 'This violates JavaScript execution order'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Start → End → Got is the correct answer
    setSolved(selectedOption === 'option2');
  };

  return (
    <RoomLayout
      title="Callback Dungeon"
      backgroundColor="bg-indigo-800"
    >
      <p className="text-lg mb-6">
        You find yourself trapped in a dungeon full of asynchronous loops. To escape, you must understand JavaScript's event loop...
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Select the correct console log order:</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto mb-4">
          {codeExample}
        </pre>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="space-y-4">
          <legend className="text-lg font-medium mb-2">Output order is:</legend>
          
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
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          Submit Answer
        </button>
      </form>
      
      {submitted && (
        <div className={`mt-6 p-4 rounded-md ${solved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {solved ? (
            <>
              <p className="font-medium mb-2">
                Correct! You understand JavaScript's asynchronous execution model.
              </p>
              <p>
                JavaScript's execution model is single-threaded, with code executing sequentially. When encountering asynchronous operations (like AJAX requests, setTimeout, etc.),
                the callback functions are placed in a task queue, waiting for the main thread's synchronous code to complete before they execute.
              </p>
              <p className="mt-2">
                Therefore, "Start" is output first, then fetchData initiates but doesn't wait for results, then "End" is output, and finally "Got" is displayed when the data returns.
              </p>
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-blue-800">
                  <span className="font-semibold">Actual output:</span><br />
                  Start<br />
                  End<br />
                  Got: [data]
                </p>
              </div>
            </>
          ) : (
            <p className="font-medium">
              Incorrect answer. Think about how JavaScript handles asynchronous operations and how the event loop works.
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