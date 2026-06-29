import type { Platform, UserProfileSummary } from "@/types";

import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  onProfileClick: (username: string) => void;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-lg font-semibold">
          No profiles found
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Try searching with another username or name.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      {profiles.map((profile) => (
        <ProfileCard
          key={`${platform}-${profile.user_id}`}
          profile={profile}
          platform={platform}
          searchQuery={searchQuery}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
}