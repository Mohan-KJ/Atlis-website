import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Pilot from "./pages/Pilot";
import ContentPage from "./pages/ContentPage";
import { useLocation } from "wouter";

const contentRoutes = new Set(["/trust", "/insurers", "/compare", "/resources", "/contact", "/privacy", "/terms", "/cookies", "/grievance", "/responsible-ai"]);
function Router() { const [location] = useLocation(); if (location === "/") return <Home />; if (location === "/product") return <Product />; if (location === "/pilot") return <Pilot />; if (contentRoutes.has(location)) return <ContentPage path={location} />; return <ContentPage path="/contact" />; }
export default function App() { return <ErrorBoundary><Router /></ErrorBoundary>; }
