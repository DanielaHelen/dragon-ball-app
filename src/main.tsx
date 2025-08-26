import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";
import "./index.css";
import AppRoutes from "./routes.tsx";

createRoot(document.getElementById("root")!).render(
        <QueryClientProvider client={new QueryClient()}>
            <FavoritesProvider>
                <AppRoutes />
            </FavoritesProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
);
