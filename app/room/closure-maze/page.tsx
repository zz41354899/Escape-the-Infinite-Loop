"use client";

import React, { useState } from 'react';
import RoomLayout from '@/components/RoomLayout';
import Link from 'next/link';

export default function ClosureMazeRoom() {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [solved, setSolved] = useState(false);
  
  const closureCode = `function createMaze() {
  const paths = [];
  
  for (var i = 0; i < 3; i++) {
    paths.push(function() {
      console.log("You took path #" + i);
    });
  }
  
  return paths;
}

const maze = createMaze();

// What will be logged?
maze[0](); // ?
maze[1](); // ?
maze[2](); // ?`;

  const options = [
    {
      id: 'option1',
      answer: 'Path #0, Path #1, Path #2',
      explanation: 'Each function captures its own value of i'
    },
    {
      id: 'option2',
      answer: 'Path #3, Path #3, Path #3',
      explanation: 'All functions capture the same variable i, which becomes 3 after the loop'
    },
    {
      id: 'option3',
      answer: 'Path #undefined, Path #undefined, Path #undefined',
      explanation: 'The variable i is not accessible outside the function scope'
    },
    {
      id: 'option4',
      answer: 'Error: i is not defined',
      explanation: 'The variable i is completely out of scope'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Option 2 is correct - closure captures the variable reference, not its value
    setSolved(selectedOption === 'option2');
  };

  return (
    <RoomLayout
      title="Closure Maze"
      backgroundColor="bg-green-800"
    >
      <p className="text-lg mb-6">
        You've entered a maze where variables seem to remember things... but not what you expect.
        To escape, you need to understand closures and variable scope.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">The Maze Code:</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
          {closureCode}
        </pre>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="space-y-4">
          <legend className="text-lg font-medium mb-2">What will be logged when running this code?</legend>
          
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
                  <p className="text-gray-700">{option.explanation}</p>
                </div>
              </label>
            </div>
          ))}
        </fieldset>
        
        <button
          type="submit"
          disabled={!selectedOption}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          Submit Answer
        </button>
      </form>
      
      {submitted && (
        <div className={`mt-6 p-4 rounded-md ${solved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {solved ? (
            <>
              <p className="font-medium mb-2">
                Correct! You understand closures.
              </p>
              <p>
                When using <span className="font-mono">var</span>, the variable is function-scoped.
                Each function in the array captures a reference to the same variable <span className="font-mono">i</span>,
                not its value at the time the function was created. When the loop finishes, <span className="font-mono">i</span> is 3,
                so all functions log "Path #3".
              </p>
              <p className="mt-2">
                To fix this, you could use <span className="font-mono">let</span> instead of <span className="font-mono">var</span>,
                which creates a new binding for each loop iteration.
              </p>
            </>
          ) : (
            <p className="font-medium">
              That's not correct. Consider how closures capture variables in JavaScript.
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