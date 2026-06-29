import { useNavigate } from "react-router-dom";

import type { Platform, UserProfileSummary } from "@/types";
import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";

import { VerifiedBadge } from "./VerifiedBadge";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

function formatFollowers(count: number): string {
  return `${new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count)} followers`;
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();

  const selectedProfiles = useSelectedProfilesStore(
    (state) => state.selectedProfiles
  );

  const addProfile = useSelectedProfilesStore(
    (state) => state.addProfile
  );

  const isSelected = selectedProfiles.some(
    (selectedProfile) =>
      selectedProfile.user_id === profile.user_id &&
      selectedProfile.platform === platform
  );

  const handleProfileClick = () => {
    onProfileClick?.(profile.username);

    navigate(
      `/profile/${encodeURIComponent(
        profile.username
      )}?platform=${platform}`
    );
  };

  const handleAddToList = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    if (isSelected) {
      return;
    }

    addProfile({
      ...profile,
      platform,
    });
  };

  return (
    <article
      onClick={handleProfileClick}
      className="mb-3 flex w-full max-w-3xl cursor-pointer items-center gap-4 rounded-xl border border-gray-300 p-4 transition hover:bg-gray-50"
      data-search={searchQuery}
    >
      <img
        src={profile.picture}
        alt={`${profile.fullname} profile`}
        loading="lazy"
        className="h-14 w-14 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1 text-left">
        <div className="flex items-center gap-1 font-bold">
          <span className="truncate">@{profile.username}</span>

          <VerifiedBadge verified={profile.is_verified} />
        </div>

        <p className="truncate text-sm text-gray-600">
          {profile.fullname}
        </p>

        <p className="text-sm">
          {formatFollowers(profile.followers)}
        </p>
      </div>

      <button
        type="button"
        disabled={isSelected}
        onClick={handleAddToList}
        className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${
          isSelected
            ? "cursor-default bg-green-100 text-green-700"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isSelected ? "Added" : "Add to List"}
      </button>
    </article>
  );
}