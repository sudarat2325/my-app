// API Base URL - will use proxy in development, direct URL in production
const API_BASE_URL = import.meta.env.PROD ? '/api' : '/api';

export async function fetchTasks() {
  const res = await fetch(`${API_BASE_URL}/tasks`);
  if (!res.ok) throw new Error("failed to load tasks");
  return res.json();
}

export async function createTask(text) {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "failed to create task");
  }
  return res.json();
}

export async function toggleTask(id) {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}/toggle`, {
    method: "PATCH"
  });
  if (!res.ok) throw new Error("failed to toggle");
  return res.json();
}
