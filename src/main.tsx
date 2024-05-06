import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import queryClient from "./utils/queryClient";
import {QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient()}>
        <BrowserRouter>
    <App />
        </BrowserRouter>
    </QueryClientProvider>
)
