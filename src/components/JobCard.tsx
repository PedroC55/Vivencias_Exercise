import { formatDateTime, formatDuration, formatPrice } from "../format";
import type { JobRequest } from "../types";

type Props = {
  job: JobRequest;
  onAccept: (id: string) => void;
};

export default function JobCard({ job, onAccept }: Props) {
  return (
    <li className={job.urgent ? "card card-urgent" : "card"}>
      <div className="card-info">
        <h2>
          {job.service}
          {job.urgent && <span className="badge">Urgente</span>}
        </h2>
        <p>{job.city}</p>
        <p>
          <time dateTime={job.startsAt}>{formatDateTime(job.startsAt)}</time>
          {" · "}
          {formatDuration(job.durationMin)}
        </p>
      </div>
      <div className="card-action">
        <strong className="price">{formatPrice(job.priceCents)}</strong>
        <button
          onClick={() => onAccept(job.id)}
          aria-label={`Aceitar ${job.service} em ${job.city}`}
        >
          Aceitar
        </button>
      </div>
    </li>
  );
}
