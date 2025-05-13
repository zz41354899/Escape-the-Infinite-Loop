"use client";

import React, { useState } from 'react';
import RoomLayout from '@/components/RoomLayout';
import Link from 'next/link';

export default function LoopPrisonRoom() {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [solved, setSolved] = useState(false);

  const loopCode = `function escape() {
  let counter = 0;
  while(true) {
    console.log("Trapped in loop:", counter);
    counter++;
    // What's missing here?
  }
}

escape();`;

  const options = [
    {
      id: 'option1',
      answer: 'if (counter > 5) break;',
      explanation: 'This checks if the counter exceeds 5 and breaks out of the loop when it does.'
    },
    {
      id: 'option2',
      answer: 'counter = 0;',
      explanation: 'This resets the counter to 0, which would keep the loop running infinitely.'
    },
    {
      id: 'option3',
      answer: 'return counter;',
      explanation: 'This would return the counter value but wouldn\'t stop the infinite loop.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // First option is the correct answer
    setSolved(selectedOption === 'option1');
  };

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
        <fieldset className="space-y-4">
          <legend className="text-lg font-medium mb-2">Select the correct code to add at the comment line:</legend>
          
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
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          Submit Answer
        </button>
      </form>
      
      {submitted && (
        <div className={`mt-6 p-4 rounded-md ${solved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {solved ? (
            <>
              <p className="font-medium mb-2">
                Congratulations! You've escaped the infinite loop. The program executes completely.
              </p>
              <p>
                Adding a conditional break statement is the most common way to exit an infinite loop.
                The condition ensures the loop runs exactly 6 times (counter values 0-5), then breaks out.
              </p>
              <div className="mt-4">
                <Link href="/" className="hover:underline text-green-800">
                  Back to Home
                </Link>
              </div>
            </>
          ) : (
            <p className="font-medium">
              Your solution didn't work. The program is still stuck in an infinite loop. Try another approach.
            </p>
          )}
        </div>
      )}
    </RoomLayout>
  );
} 