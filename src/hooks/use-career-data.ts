import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCareerSuggestions,
  getDashboardStats,
  getProfile,
  getResumeAnalysis,
  updateProfile,
} from "@/services/api";
import type { CareerProfile } from "@/lib/mock-data";

/** Data hooks: the only bridge between components and the API service layer. */

export const profileQueryOptions = {
  queryKey: ["profile"] as const,
  queryFn: getProfile,
};

export function useProfile() {
  return useQuery(profileQueryOptions);
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<CareerProfile>) => updateProfile(patch),
    onSuccess: (data) => qc.setQueryData(profileQueryOptions.queryKey, data),
  });
}

export function useResumeAnalysis() {
  return useQuery({ queryKey: ["resume-analysis"], queryFn: getResumeAnalysis });
}

export function useCareerSuggestions() {
  return useQuery({ queryKey: ["career-suggestions"], queryFn: getCareerSuggestions });
}

export function useDashboardStats() {
  return useQuery({ queryKey: ["dashboard-stats"], queryFn: getDashboardStats });
}
