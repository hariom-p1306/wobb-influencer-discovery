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

  const { selectedProfiles, addProfile } = useSelectedProfilesStore();

  const isSelected = selectedProfiles.some(
    (item) =>
      item.user_id === profile.user_id &&
      item.platform === platform
  );

  const handleProfileClick = () => {
    onProfileClick?.(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleAddToList = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    if (!isSelected) {
      addProfile({
        ...profile,
        platform,
      });
    }
  };

  return (
    <article
      onClick={handleProfileClick}
      data-search={searchQuery}
      className="mb-3 flex w-full max-w-3xl cursor-pointer items-center gap-4 rounded-xl border border-gray-300 p-4 transition hover:bg-gray-50"
    >
      <img
        src={profile.picture}
        alt={profile.fullname}
        loading="lazy"
        className="h-14 w-14 rounded-full object-cover"
      />

      <div className="flex-1 min-w-0 text-left">
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
        onClick={handleAddToList}
        className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition cursor-pointer ${
          isSelected
            ? "bg-green-100 text-green-700 hover:bg-green-200"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isSelected ? "Added" : "Add to List"}
      </button>
    </article>
  );
}