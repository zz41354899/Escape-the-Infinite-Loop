"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import RoomLayout from '@/components/RoomLayout';
import RoomLoader from '@/components/RoomLoader';

export default function ShadowLabRoom() {
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [solved, setSolved] = useState(false);
  
  const codeExample = `let x = 5;
function test() {
  let x = 10;
  console.log(x);
}
test();`;

  const options = [
    {
      id: 'option1',
      answer: 'It logs 5.',
      explanation: 'This would be correct if the function was accessing the outer variable, but it has its own local variable.'
    },
    {
      id: 'option2',
      answer: 'It logs 10.',
      explanation: 'Correct. The inner variable x "shadows" the outer variable with the same name.'
    },
    {
      id: 'option3',
      answer: 'It throws a ReferenceError.',
      explanation: 'This would happen if x was not defined, but it is defined both globally and locally.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Option 2 is correct - the inner variable shadows the outer one
    setSolved(selectedOption === 'option2');
  };

  return (
    <RoomLoader roomName="Shadow Variable Lab">
      <RoomLayout
        title="Shadow Variable Lab"
        backgroundColor="bg-purple-800"
      >
        <div className="w-full mx-auto px-4 space-y-6">
          <p className="text-lg mb-6">
            You're in a lab where your variables are being redefined without you noticing...
          </p>

          <div className="mb-8 space-y-3">
            <h2 className="text-xl font-semibold">Code:</h2>
            <div className="bg-gray-900 p-4 rounded-md overflow-x-auto">
              <code className="text-green-400 font-mono whitespace-pre-wrap break-words">
                {codeExample}
              </code>
            </div>
            <p className="font-medium">Which statement is correct about the above code?</p>
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
                className="sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
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
                    Correct! You understand variable shadowing.
                  </p>
                  <p className="break-words">
                    When you declare a variable inside a function with the same name as an outer variable, 
                    the inner variable "shadows" or hides the outer one within that function's scope.
                  </p>
                  <p className="mt-2 break-words">
                    In this example, the <code className="font-mono bg-gray-100 px-1 rounded">x</code> inside the function is completely 
                    separate from the outer <code className="font-mono bg-gray-100 px-1 rounded">x</code>, so 
                    it logs <code className="font-mono bg-gray-100 px-1 rounded">10</code>.
                  </p>
                </>
              ) : (
                <p className="font-medium">
                  That's not correct. Think about variable scope and shadowing in JavaScript.
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
    </RoomLoader>
  );
} 