import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-6 flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-3">
        {PLATFORMS.map((platform) => (
          <button
            key={platform}
            type="button"
            onClick={() => onChange(platform)}
            className={`rounded-lg px-5 py-2 font-medium transition ${
              selected === platform
                ? "bg-blue-600 text-white shadow-md"
                : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {getPlatformLabel(platform)}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by username or full name..."
        className="w-full max-w-lg rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}