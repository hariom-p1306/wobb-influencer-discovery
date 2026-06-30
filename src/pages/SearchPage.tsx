import { useState } from "react";
import type { Platform } from "@/types";

import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { SelectedProfiles } from "@/components/SelectedProfiles";

import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = extractProfiles(platform);
  const filteredProfiles = filterProfiles(allProfiles, searchQuery);

  const handleProfileClick = (username: string) => {
    console.log("Opening profile:", username);
  };

  return (
    <Layout title="Find Influencers">
      <div className="space-y-6">
        <p className="text-gray-500">
          Browse top creators across social platforms.
        </p>

        <PlatformFilter
          selected={platform}
          onChange={(selectedPlatform) => {
            setPlatform(selectedPlatform);
            setSearchQuery("");
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <SelectedProfiles />

        <p className="text-sm text-gray-500">
          Showing {filteredProfiles.length} of {allProfiles.length} creators on{" "}
          <span className="font-semibold capitalize">{platform}</span>
        </p>

        <ProfileList
          profiles={filteredProfiles}
          platform={platform}
          searchQuery={searchQuery}
          onProfileClick={handleProfileClick}
        />
      </div>
    </Layout>
  );
}