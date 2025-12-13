import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getThreads, createThread } from "../api/threads";
import type { Thread } from "../api/threads";
import { useAuth } from "../context/AuthContext";

export default function InboxPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  useEffect(() => {
    loadThreads();
  }, []);

  function loadThreads() {
    setLoading(true);
    getThreads()
      .then((ts) => setThreads(ts))
      .catch(() => setError("No se pudieron cargar los hilos."))
      .finally(() => setLoading(false));
  }

  async function handleCreateThread(e: FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;

    setCreating(true);
    setError("");

    try {
      await createThread(subject, body);
      setSubject("");
      setBody("");
      loadThreads();
    } catch {
      setError("No se pudo crear el hilo.");
    } finally {
      setCreating(false);
    }
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase() ?? "U";

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <div className="app-title">
            Inbox
            <span className="app-title-pill">Beta</span>
          </div>
          <div className="app-user">
            <div className="app-user-avatar">{initials}</div>
            <div className="app-user-name">{user?.name}</div>
            <button className="btn btn-outline" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </header>

        <div className="inbox-layout">
          {/* Panel izquierdo: nuevo hilo */}
          <section className="card">
            <div className="inbox-section-title">Nuevo hilo</div>
            <form onSubmit={handleCreateThread}>
              <div className="form-group">
                <label className="form-label">Asunto</label>
                <input
                  className="form-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ej. Solicitud de soporte, Proyecto X, etc."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mensaje inicial</label>
                <textarea
                  className="form-textarea"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Describe el contexto o el problema..."
                />
              </div>

              {error && <div className="form-error">{error}</div>}

              <button className="btn btn-primary" type="submit" disabled={creating}>
                {creating ? "Creando..." : "Crear hilo"}
              </button>
            </form>
          </section>

          {/* Panel derecho: lista de hilos */}
          <section className="card">
            <div className="inbox-section-title">Hilos existentes</div>
            {loading && <p>Cargando hilos...</p>}
            {!loading && threads.length === 0 && (
              <p className="badge-empty">Aún no hay hilos.</p>
            )}

            {!loading && threads.length > 0 && (
              <ul className="thread-list">
                {threads.map((t) => (
                  <li
                    key={t.id}
                    className="thread-item"
                    onClick={() => navigate(`/threads/${t.id}`)}
                  >
                    <span className="thread-subject">{t.subject}</span>
                    <span className="thread-meta">
                      {(t.messages_count ?? 0) + " mensajes · "}
                      {new Date(t.updated_at).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
