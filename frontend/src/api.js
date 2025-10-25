export async function fetchTasks() {
    const res = await fetch("/api/tasks");
    if (!res.ok) throw new Error("failed to load tasks");
    return res.json();
  }
  
  export async function createTask(text) {
    const res = await fetch("/api/tasks", {
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
    const res = await fetch(`/api/tasks/${id}/toggle`, {
      method: "PATCH"
    });
    if (!res.ok) throw new Error("failed to toggle");
    return res.json();
  }