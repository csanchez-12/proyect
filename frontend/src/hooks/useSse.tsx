import { useEffect, useState } from "react";

export default function useSse({ requestId }: { requestId: string }) {
    const [decision, setDecision] = useState<string | null>(null);

    useEffect(() => {
        const events = new EventSource(
            `/api/news/events/${requestId}`
        );

        events.addEventListener("decision", (event) => {
            const data = JSON.parse(event.data);

            setDecision(data.decision);
            events.close();
        });

        events.onerror = () => {
            console.error("Error en conexión SSE");
        };

        return () => events.close();
    }, [requestId]);

    return {
        decision
    };
}