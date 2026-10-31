import { useEffect, useState } from "react";

type Decision = "accepted" | "rejected";

export default function useSse({
  requestId,
}: {
  requestId: string | null;
}) {
  const [decision, setDecision] = useState<Decision | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!requestId) return;

    setDecision(null);

    const events = new EventSource(
      `/api/news/events/${encodeURIComponent(requestId)}`
    );

    events.addEventListener("connected", () => {
      setConnected(true);
    });

    events.addEventListener("decision", (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.decision !== "accepted" && data.decision !== "rejected") {
          return;
        }

        setDecision(data.decision);
        events.close();
        setConnected(false);
      } catch {
        console.error("Error procesando respuesta SSE");
      }
    });

    events.onerror = () => {
      setConnected(false);
      console.error("Error en conexión SSE");
    };

    return () => {
      events.close();
      setConnected(false);
    };
  }, [requestId]);

  return {
    decision,
    connected,
  };
}