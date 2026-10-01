import { useEffect, useState } from "react";
import type { FetchState } from "../types/github";

export function useFetch<T>(
    url: string | null
): FetchState<T> {
    const [state, setState] = useState<FetchState<T>>({
        status: "idle",
    });

    useEffect(() => {
        if (!url) {
            setState({ status: "idle" });
            return;
        }

        const controller = new AbortController();

        const fetchData = async (): Promise<void> => {
            setState({ status: "loading" });

            try {
                const response = await fetch(url, {
                    signal: controller.signal,
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error(
                            "The requested resource was not found."
                        );
                    }

                    if (response.status === 403) {
                        throw new Error(
                            "GitHub API rate limit reached or access was denied."
                        );
                    }

                    if (response.status >= 500) {
                        throw new Error(
                            "GitHub is currently having trouble. Please try again later."
                        );
                    }

                    throw new Error(
                        `Request failed with status ${response.status}`
                    );
                }

                const data: T = await response.json();

                setState({
                    status: "success",
                    data,
                });
            } catch (error: unknown) {
                if (
                    error instanceof DOMException &&
                    error.name === "AbortError"
                ) {
                    return;
                }

                const message =
                    error instanceof Error
                        ? error.message
                        : "Unable to connect to the server. Please check your internet connection.";

                setState({
                    status: "error",
                    message,
                });
            }
        };

        void fetchData();

        return () => {
            controller.abort();
        };
    }, [url]);

    return state;
}