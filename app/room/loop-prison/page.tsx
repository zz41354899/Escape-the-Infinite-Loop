"use client";

import React, { useState } from 'react';
import RoomLayout from '@/components/RoomLayout';
import Link from 'next/link';

export default function LoopPrisonRoom() {
  const [userCode, setUserCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [solved, setSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const loopCode = `function escape() {
  let counter = 0;
  while(true) {
    console.log("Trapped in loop:", counter);
    counter++;
    // What's missing here?
  }
}

escape();`;

  const solution = `if (counter > 5) break;`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    const userCodeLower = userCode.toLowerCase();
    const hasIfAndBreak = userCodeLower.includes('if') && userCodeLower.includes('break');
    
    if (hasIfAndBreak) {
      setSolved(true);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      // Auto-reveal solution after 3 incorrect attempts
      if (newAttempts >= 3) {
        setShowHint(true);
        setShowSolution(true);
      }
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
    // Hide solution when hiding hint
    if (showHint) {
      setShowSolution(false);
    }
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  const shouldShowBackToHome = solved || showSolution;

  return (
    <RoomLayout
      title="Infinite Loop Prison"
      backgroundColor="bg-purple-800"
    >
      <p className="text-lg mb-6">
        Fix the following code that results in an infinite while loop.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">The Loop Code:</h2>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
          {loopCode}
        </pre>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="solution" className="block mb-2 font-medium">
            Enter your fixed version of the loop here:
          </label>
          <textarea
            id="solution"
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md font-mono"
            placeholder="Enter your fixed version of the loop here..."
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Submit Solution
          </button>
          
          <button
            type="button"
            onClick={toggleHint}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        </div>
      </form>
      
      {showHint && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="font-medium text-lg mb-2 text-yellow-800">Hint:</h3>
          <p className="text-yellow-800 mb-3">
            Try adding a condition that stops the loop after a few iterations.
          </p>
          
          <button
            type="button"
            onClick={toggleSolution}
            className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-md hover:bg-yellow-500 transition-colors"
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
          
          {showSolution && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <h3 className="font-medium text-green-800 mb-2">Solution:</h3>
              <pre className="bg-white p-3 rounded border border-green-100 text-green-800 font-mono">
                {solution}
              </pre>
            </div>
          )}
        </div>
      )}
      
      {submitted && (
        <div className={`mt-6 p-4 rounded-md ${solved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {solved ? (
            <p className="font-medium">
              Congratulations! You've escaped the infinite loop. The program executes completely.
            </p>
          ) : (
            <p className="font-medium">
              Your solution didn't work. The program is still stuck in an infinite loop.
              {attempts >= 3 && ' Please check the hint section for the solution.'}
            </p>
          )}
           
          {shouldShowBackToHome && (
            <div className="mt-4">
              <Link href="/" className={`hover:underline ${solved ? 'text-green-800' : 'text-red-800'}`}>
                Back to Home
              </Link>
            </div>
          )}
        </div>
      )}
    </RoomLayout>
  );
} 