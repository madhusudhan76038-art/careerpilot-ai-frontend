/**
 * Frontend API service layer.
 *
 * UI components NEVER call fetch directly — they go through hooks,
 * and hooks call these functions. That keeps the swap to the real
 * FastAPI backend a one-file change.
 *
 * Backend contract (future):
 *   BASE_URL = import.meta.env.VITE_API_URL   (Next.js equivalent: NEXT_PUBLIC_API_URL)
 *   POST   /api/v1/resume/upload        -> uploadResume()
 *   GET    /api/v1/resume/analysis      -> getResumeAnalysis()
 *   GET    /api/v1/profile              -> getProfile()
 *   PATCH  /api/v1/profile              -> updateProfile()
 *   GET    /api/v1/career/suggestions   -> getCareerSuggestions()
 *
 * Auth (future): a Supabase session access token is attached as
 * `Authorization: Bearer <token>` in `authHeaders()`.
 */

import {
  mockCareerSuggestions,
  mockDashboardStats,
  mockProfile,
  mockResumeAnalysis,
  type CareerProfile,
  type CareerSuggestion,
  type ResumeAnalysis,
} from "@/lib/mock-data";

/** Flip to false once the FastAPI backend is live. */
export const USE_MOCK_DATA = true;

export const API_BASE_URL =
  (import.meta.env["VITE_API_URL"] as string | undefined) ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** FUTURE: read the Supabase session token here. */
function authHeaders(): Record<string, string> {
  return {};
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...authHeaders(), ...(init.headers ?? {}) },
  });
  if (!res.ok) throw new ApiError(`Request failed: ${path}`, res.status);
  return (await res.json()) as T;
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------------------------------------------ */
/* Resume                                                              */
/* ------------------------------------------------------------------ */

export type UploadStage = "idle" | "uploading" | "analyzing" | "complete" | "error";

export type UploadResumeOptions = {
  onProgress?: (percent: number, stage: UploadStage) => void;
  signal?: AbortSignal;
};

export async function uploadResume(file: File, options: UploadResumeOptions = {}) {
  const { onProgress } = options;
  if (USE_MOCK_DATA) {
    for (let p = 0; p <= 100; p += 10) {
      await delay(90);
      onProgress?.(p, "uploading");
    }
    onProgress?.(100, "analyzing");
    await delay(1600);
    onProgress?.(100, "complete");
    return { resumeId: "resume-demo-001", fileName: file.name };
  }
  // FUTURE: multipart POST to FastAPI /api/v1/resume/upload
  const body = new FormData();
  body.append("file", file);
  const res = await fetch(`${API_BASE_URL}/api/v1/resume/upload`, {
    method: "POST",
    headers: authHeaders(),
    body,
    signal: options.signal ?? null,
  });
  if (!res.ok) throw new ApiError("Resume upload failed", res.status);
  return (await res.json()) as { resumeId: string; fileName: string };
}

export async function getResumeAnalysis(): Promise<ResumeAnalysis> {
  if (USE_MOCK_DATA) {
    await delay(650);
    return mockResumeAnalysis;
  }
  return request<ResumeAnalysis>("/api/v1/resume/analysis");
}

/* ------------------------------------------------------------------ */
/* Profile                                                             */
/* ------------------------------------------------------------------ */

export async function getProfile(): Promise<CareerProfile> {
  if (USE_MOCK_DATA) {
    await delay(500);
    return mockProfile;
  }
  return request<CareerProfile>("/api/v1/profile");
}

export async function updateProfile(patch: Partial<CareerProfile>): Promise<CareerProfile> {
  if (USE_MOCK_DATA) {
    await delay(450);
    return { ...mockProfile, ...patch };
  }
  return request<CareerProfile>("/api/v1/profile", { method: "PATCH", body: JSON.stringify(patch) });
}

/* ------------------------------------------------------------------ */
/* Career                                                              */
/* ------------------------------------------------------------------ */

export async function getCareerSuggestions(): Promise<CareerSuggestion[]> {
  if (USE_MOCK_DATA) {
    await delay(500);
    return mockCareerSuggestions;
  }
  return request<CareerSuggestion[]>("/api/v1/career/suggestions");
}

export async function getDashboardStats() {
  if (USE_MOCK_DATA) {
    await delay(350);
    return mockDashboardStats;
  }
  return request<typeof mockDashboardStats>("/api/v1/dashboard/stats");
}

/* ------------------------------------------------------------------ */
/* Auth placeholders — wired to Supabase Auth later                    */
/* ------------------------------------------------------------------ */

export async function signUp(_input: { fullName: string; email: string; password: string }) {
  await delay(700);
  // FUTURE: supabase.auth.signUp({ email, password, options: { data: { full_name } } })
  return { ok: true as const };
}

export async function logIn(_input: { email: string; password: string }) {
  await delay(700);
  // FUTURE: supabase.auth.signInWithPassword({ email, password })
  return { ok: true as const };
}

export async function logOut() {
  await delay(200);
  // FUTURE: supabase.auth.signOut()
  return { ok: true as const };
}
