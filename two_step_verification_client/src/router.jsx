import { createBrowserRouter } from "react-router-dom";
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import Setup2FA from './pages/Setup2FA'
import Verify2FA from './pages/Verify2FA'
import ProtectedRoute from './components/ProtectedRoute'
import Error from './pages/Error'

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <Error />
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <Error />
            },
            {
                path: "/setup2FA",
                element: <Setup2FA />,
                errorElement: <Error />
            },
            {
                path: "/verify2FA",
                element: <Verify2FA />,
                errorElement: <Error />
            },

        ]
    },
    {
        path: "*",
        element: <Error />
    }

]);

export default router;