// /src/routes/loading.ts
import { PATHS } from "./paths";

type LoadingOpts = {
    next: string;
    ms?: number;
};

export function toLoading({ next, ms }: LoadingOpts) {
    const params = new URLSearchParams();
    params.set("next", next);
    if (typeof ms === "number") params.set("ms", String(ms));
    return `${PATHS.loading}?${params.toString()}`;
}
