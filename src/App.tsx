import { useEffect, useMemo, useState } from "react";
import { fetchJobs } from "./api/jobs";
import JobCard from "./components/JobCard";
import type { JobRequest } from "./types";

const ALL_CITIES = "";

export default function App() {
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [city, setCity] = useState(ALL_CITIES);
  const [acceptedIds, setAcceptedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    fetchJobs()
      .then((data) => {
        if (!cancelled) setJobs(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Cidades derivadas dos dados: novas cidades aparecem sem mexer no código.
  const cities = useMemo(
    () => [...new Set(jobs.map((j) => j.city))].sort((a, b) => a.localeCompare(b, "pt")),
    [jobs],
  );

  const visibleJobs = useMemo(
    () =>
      jobs
        .filter((j) => !acceptedIds.has(j.id))
        .filter((j) => city === ALL_CITIES || j.city === city)
        .sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
    [jobs, acceptedIds, city],
  );

  function acceptJob(id: string) {
    setAcceptedIds((prev) => new Set(prev).add(id));
  }

  function renderContent() {
    if (loading) {
      return (
        <p role="status" className="message">
          <span className="spinner" aria-hidden="true" />
          A carregar pedidos…
        </p>
      );
    }
    if (error) {
      return (
        <p role="alert" className="message">
          Não foi possível carregar os pedidos.
        </p>
      );
    }
    if (visibleJobs.length === 0) {
      return (
        <p role="status" className="message">
          {city === ALL_CITIES
            ? "Não há pedidos disponíveis neste momento."
            : `Não há pedidos disponíveis em ${city}.`}
        </p>
      );
    }
    return (
      <ul className="list">
        {visibleJobs.map((job) => (
          <JobCard key={job.id} job={job} onAccept={acceptJob} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <header className="site-header">
        <div className="container">
          <p className="brand">Vivência's</p>
          <p className="brand-sub">Serviços de Geriatria · Gondomar</p>
        </div>
      </header>

      <main className="container">
        <h1>Pedidos de reparação disponíveis</h1>
        <p className="intro">
          Escolha os pedidos que pode realizar e aceite-os para os reservar.
        </p>

        <div className="toolbar">
          <label className="filter">
            Cidade
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
            >
              <option value={ALL_CITIES}>Todas</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          {!loading && !error && (
            <span className="count">
              {visibleJobs.length === 1
                ? "1 pedido"
                : `${visibleJobs.length} pedidos`}
            </span>
          )}
        </div>

        {renderContent()}
      </main>
    </>
  );
}
