'use client';

import Image from 'next/image';

export default function Architecture() {
  return (
    <div className="flex items-center justify-center my-10 lg:min-h-screen bg-white px-4">
      <div className="w-full max-w-5xl aspect-[16/9] relative rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <Image
          src="/Architecture.jpg"
          alt="Architecture"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
