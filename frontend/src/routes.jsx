import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error from "./pages/Error";
import HomePage from "./pages/HomePage";
import Setup2FA from "./pages/Setup2FA";
import Verify2FA from "./pages/Verify2FA";
import PaymentPage from "./pages/PaymentPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LangingPage";
import TransactionsPage from "./pages/TransactionsPage";
import SecurityPage from "./pages/SecurityPage";
import LearnPage from "./pages/LearnPage";
import AboutPage from "./pages/AboutPage";
import FraudDetectionPage from "./pages/FraudDetectionPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />,
        errorElement: <Error />
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <Error />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/dashboard',
                element: <HomePage />,
                errorElement: <Error />
            },
            {
                path: '/setup-2fa',
                element: <Setup2FA />,
                errorElement: <Error />
            },
            {
                path: '/verify-2fa',
                element: <Verify2FA />,
                errorElement: <Error />
            },
            {
                path: '/payment',
                element: <PaymentPage />,
                errorElement: <Error />
            },
            {
                path: '/transactions',
                element: <TransactionsPage />,
                errorElement: <Error />
            },
            {
                path: '/security',
                element: <SecurityPage />,
                errorElement: <Error />
            },
            {
                path: '/fraud-detection',
                element: <FraudDetectionPage />,
                errorElement: <Error />
            },
            {
                path: '/learn',
                element: <LearnPage />,
                errorElement: <Error />
            },
            {
                path: '/about',
                element: <AboutPage />,
                errorElement: <Error />
            },
        ]
    },
])
