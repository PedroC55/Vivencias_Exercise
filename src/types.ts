export type JobRequest = {
  id: string;
  service: string;
  city: string;
  startsAt: string; // ISO 8601
  durationMin: number;
  priceCents: number;
  urgent: boolean;
};
