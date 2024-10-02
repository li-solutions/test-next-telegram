import React from 'react';

export default function Home() {
  return (
  <div className="bg-white min-h-screen">
    <div className="grid auto-rows-[150px] grid-cols-4 gap-4 mx-auto max-w-[900px]">
      <div className="col-span-2 row-span-2 bg-red-500 rounded-xl p-8 text-white">
        <h1 className="text-2xl">My awesome bento grid</h1>
      </div>
      <div className="col-span-2 bg-blue-500 rounded-xl "></div>
      <div className="bg-pink-400 rounded-xl col-span-2 sm:col-span-1"></div>
      <div className="bg-yellow-400 rounded-xl col-span-4 sm:col-span-1 sm:row-span-2"></div>
      <div className="col-span-4 sm:col-span-3 bg-green-400 rounded-xl "></div>
    </div>
  </div>
  );
}
