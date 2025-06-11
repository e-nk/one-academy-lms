"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchInput() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-md"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-10 pl-10 pr-4 text-sm text-one-primary-black placeholder:text-gray-500 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm transition-all duration-200 
          focus:outline-none focus:ring-2 focus:ring-one-primary-teal focus:border-transparent focus:bg-white focus:shadow-md
          hover:bg-white hover:shadow-sm"
        />
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-colors duration-200" />
      </div>
    </form>
  );
}