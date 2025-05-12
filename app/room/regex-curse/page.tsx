"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import RoomLayout from '@/components/RoomLayout';

type OptionId = 'option1' | 'option2' | 'option3';

export default function RegexCurseRoom() {
  const [selectedOption, setSelectedOption] = useState<OptionId | ''>('');
  const [submitted, setSubmitted] = useState(false);
  const [solved, setSolved] = useState(false);
  
  const targetString = 'abc123xyz';

  const options = [
    {
      id: 'option1' as const,
      regex: '/[a-z]+/',
      explanation: 'Matches one or more lowercase letters'
    },
    {
      id: 'option2' as const,
      regex: '/\\d+/',
      explanation: 'Matches one or more digits'
    },
    {
      id: 'option3' as const,
      regex: '/xyz/',
      explanation: 'Matches the "xyz" string'
    }
  ];

  // Calculate match results for display
  const matchResults: Record<OptionId, RegExpMatchArray | null> = {
    'option1': targetString.match(/[a-z]+/g),
    'option2': targetString.match(/\d+/g),
    'option3': targetString.match(/xyz/g)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // The regex that finds digits is the correct answer
    setSolved(selectedOption === 'option2');
  };

  return (
    <RoomLayout
      title="Regex Curse Room"
      backgroundColor="bg-purple-900"
    >
      <p className="text-lg mb-6">
        You've entered a room cursed with regular expressions. The walls are covered with mysterious pattern matching symbols, and you must solve the correct pattern to leave.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Target string:</h2>
        <div className="bg-gray-900 text-white p-4 rounded-md font-mono text-center text-xl mb-4">
          {targetString}
        </div>
        <p className="font-medium">Choose the regex that correctly captures the numbers:</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="space-y-4">
          <legend className="text-lg font-medium mb-2">Select a regular expression:</legend>
          
          {options.map(option => (
            <div key={option.id} className="p-4 border rounded-md hover:bg-gray-50">
              <label className="flex items-start cursor-pointer">
                <input
                  type="radio"
                  name="solution"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => setSelectedOption(option.id as OptionId)}
                  className="mt-1"
                />
                <div className="ml-3 w-full">
                  <div className="flex justify-between">
                    <p className="font-mono font-medium">{option.regex}</p>
                    <p className="text-gray-600 text-sm">{option.explanation}</p>
                  </div>
                  
                  {selectedOption === option.id && (
                    <div className="mt-2 bg-gray-100 p-2 rounded-md">
                      <p className="text-sm">
                        Match result: {
                          selectedOption ? (matchResults[selectedOption]?.join(', ') || 'No match') : 'No match'
                        }
                      </p>
                    </div>
                  )}
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
                Correct! You successfully found the regex that matches numbers.
              </p>
              <p>
                <span className="font-mono">/\\d+/</span> means "match one or more digit characters".
                In JavaScript, <span className="font-mono">\\d</span> is equivalent to <span className="font-mono">[0-9]</span>,
                and <span className="font-mono">+</span> means "match the preceding pattern one or more times".
              </p>
              <p className="mt-2">
                Using the <span className="font-mono">String.match(regex)</span> method, you can find all strings that match the pattern,
                which in this example is <span className="font-mono">123</span>.
              </p>
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="font-mono text-blue-800">
                  'abc123xyz'.match(/\\d+/g) // returns ["123"]
                </p>
              </div>
            </>
          ) : (
            <p className="font-medium">
              This regex doesn't correctly match the numbers. Reconsider which pattern can match the digits in the string.
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