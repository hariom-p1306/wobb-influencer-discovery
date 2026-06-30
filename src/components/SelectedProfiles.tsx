import { useSelectedProfilesStore } from "@/store/useSelectedProfilesStore";

export function SelectedProfiles() {
  const {
    selectedProfiles,
    removeProfile,
    clearProfiles,
  } = useSelectedProfilesStore();

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Selected Profiles
          </h2>

          <p className="text-sm text-gray-500">
            {selectedProfiles.length} profile
            {selectedProfiles.length !== 1 ? "s" : ""} selected
          </p>
        </div>

        {selectedProfiles.length > 0 && (
          <button
            onClick={clearProfiles}
            className="rounded-md px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700"
          >
            Clear All
          </button>
        )}
      </div>

      {selectedProfiles.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 py-8 text-center">
          <p className="text-gray-500">
            No profiles selected yet.
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Click <strong>Add to List</strong> to save influencers here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {selectedProfiles.map((profile) => (
            <div
              key={`${profile.platform}-${profile.user_id}`}
              className="flex items-center justify-between rounded-xl border border-gray-200 p-3 transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <img
                  src={profile.picture}
                  alt={profile.fullname}
                  className="h-12 w-12 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {profile.fullname}
                  </h3>

                  <p className="text-sm text-gray-500">
                    @{profile.username}
                  </p>

                  <span className="inline-block mt-1 rounded bg-blue-100 px-2 py-1 text-xs font-medium capitalize text-blue-700">
                    {profile.platform}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  removeProfile(profile.platform, profile.user_id)
                }
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}