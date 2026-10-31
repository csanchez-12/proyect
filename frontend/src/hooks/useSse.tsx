
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
    if (!requestId) {
      setConnected(false);
      return;
    }

    setDecision(null);
    setConnected(false);

    // console.log("Iniciando conexión SSE:", requestId);

    const events = new EventSource(
      `/api/news/events/${encodeURIComponent(requestId)}`
    );

    events.addEventListener("connected", () => {
      setConnected(true);
    });

    events.addEventListener("decision", (event) => {
      try {
        const data = JSON.parse(event.data);

        if (
          data.decision === "accepted" ||
          data.decision === "rejected"
        ) {
          setDecision(data.decision);
          events.close();
          setConnected(false);
        }
      } catch (error) {
        console.error("Error procesando respuesta SSE:", error);
      }
    });

    events.onerror = () => {
      console.error("Error en conexión SSE:", {
        requestId,
        readyState: events.readyState,
      });

      setConnected(false);
    };

    return () => {
      events.close();
      setConnected(false);
    };
  }, [requestId]);

  return { decision, connected };
}