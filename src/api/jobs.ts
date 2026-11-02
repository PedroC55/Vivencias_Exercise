import { jobs } from "../data/jobs";
import type { JobRequest } from "../types";

const LOADING_DELAY_MS = 1000;

// Simula um pedido à API. Quando houver servidor, só esta função muda.
export function fetchJobs(): Promise<JobRequest[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(jobs), LOADING_DELAY_MS);
  });
}
