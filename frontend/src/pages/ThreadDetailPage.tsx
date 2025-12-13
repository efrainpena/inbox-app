import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getThread, sendMessage } from "../api/threads";
import type { ThreadDetail, Message } from "../api/threads";
import { useAuth } from "../context/AuthContext";

export default function ThreadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const threadId = Number(id);
  const [thread, setThread] = useState<ThreadDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!threadId) return;
    setLoading(true);
    getThread(threadId)
      .then((t) => setThread(t))
      .catch(() => setError("No se pudo cargar el hilo."))
      .finally(() => setLoading(false));
  }, [threadId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setSending(true);
    setError("");
    try {
      const message = (await sendMessage(threadId, newMessage)) as Message;
      setNewMessage("");
      setThread((prev) =>
        prev
          ? {
              ...prev,
              messages: [...prev.messages, message],
            }
          : prev
      );
    } catch {
      setError("No se pudo enviar el mensaje.");
    } finally {
      setSending(false);
    }
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase() ?? "U";

  if (loading) {
    return (
      <div className="app-shell">
        <div className="app-container">
          <p>Cargando hilo...</p>
        </div>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="app-shell">
        <div className="app-container">
          <p>Hilo no encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <div className="app-title">
            <button className="btn btn-outline" onClick={() => navigate("/inbox")}>
              ← Regresar
            </button>
            <span>{thread.subject}</span>
          </div>
          <div className="app-user">
            <div className="app-user-avatar">{initials}</div>
            <div className="app-user-name">{user?.name}</div>
            <button className="btn btn-outline" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </header>

        <div className="card">
          <div className="thread-header">
            <div className="thread-header-title">Conversación</div>
            <div className="thread-meta">
              {thread.messages.length} mensaje(s)
            </div>
          </div>

          <div className="thread-messages-panel">
            {thread.messages.length === 0 && (
              <span className="badge-empty">No hay mensajes aún en este hilo.</span>
            )}

            {thread.messages.map((m) => (
              <div key={m.id} className="message-item">
                <div className="message-header">
                  <span className="message-sender">
                    {m.sender?.name ?? "Sin nombre"}
                  </span>
                  <span className="message-date">
                    {new Date(m.created_at).toLocaleString()}
                  </span>
                </div>
                <div className="message-body">{m.body}</div>
              </div>
            ))}
          </div>

          <div className="reply-card">
            <h3 className="inbox-section-title">Responder</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <textarea
                  className="form-textarea"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                />
              </div>
              {error && <div className="form-error">{error}</div>}
              <button className="btn btn-primary" type="submit" disabled={sending}>
                {sending ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
