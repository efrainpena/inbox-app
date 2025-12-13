import api from "./client";

// TIPOS (solo para TypeScript)
export interface Thread {
  id: number;
  subject: string;
  messages_count?: number;
  created_at: string;
  updated_at: string;
}

export interface MessageSender {
  id: number;
  name: string;
  email: string;
}

export interface Message {
  id: number;
  thread_id: number;
  sender_id: number;
  body: string;
  created_at: string;
  updated_at: string;
  sender: MessageSender;
}

export interface ThreadDetail {
  id: number;
  subject: string;
  created_at: string;
  updated_at: string;
  messages: Message[];
}

// FUNCIONES (estas sí existen en runtime)

// Lista de hilos (GET /api/threads)
export async function getThreads() {
  const { data } = await api.get("/threads");
  // si usas paginate(), Laravel regresa { data: [...] }
  return data.data ?? data;
}

// Detalle de hilo (GET /api/threads/{id})
export async function getThread(threadId: number) {
  const { data } = await api.get<ThreadDetail>(`/threads/${threadId}`);
  return data;
}

// Crear hilo nuevo (POST /api/threads)
export async function createThread(subject: string, body: string) {
  const { data } = await api.post("/threads", { subject, body });
  return data;
}

// Enviar mensaje en un hilo (POST /api/threads/{id}/messages)
export async function sendMessage(threadId: number, body: string) {
  const { data } = await api.post(`/threads/${threadId}/messages`, { body });
  return data;
}
