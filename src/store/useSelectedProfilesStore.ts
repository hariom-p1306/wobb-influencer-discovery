import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { SelectedProfile } from "@/types";

interface SelectedProfilesState {
  selectedProfiles: SelectedProfile[];

  addProfile: (profile: SelectedProfile) => void;

  removeProfile: (
    platform: SelectedProfile["platform"],
    userId: string
  ) => void;

  clearProfiles: () => void;
}

export const useSelectedProfilesStore =
  create<SelectedProfilesState>()(
    persist(
      (set) => ({
        selectedProfiles: [],

        addProfile: (profile) =>
          set((state) => {
            const alreadyExists = state.selectedProfiles.some(
              (selectedProfile) =>
                selectedProfile.user_id === profile.user_id &&
                selectedProfile.platform === profile.platform
            );

            if (alreadyExists) {
              return {};
            }

            return {
              selectedProfiles: [
                ...state.selectedProfiles,
                profile,
              ],
            };
          }),

        removeProfile: (platform, userId) =>
          set((state) => ({
            selectedProfiles: state.selectedProfiles.filter(
              (profile) =>
                !(
                  profile.platform === platform &&
                  profile.user_id === userId
                )
            ),
          })),

        clearProfiles: () => ({
          selectedProfiles: [],
        }),
      }),
      {
        name: "wobb-selected-profiles",
      }
    )
  );