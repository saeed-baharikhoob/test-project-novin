import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, Outlet } from "react-router-dom";

const Login = lazy(() => import("./pages/Login"));
const UserList = lazy(() => import("./pages/List"));
const ShowUser = lazy(() => import("./pages/ShowUser"))
const Router = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const isLogged = JSON.parse(localStorage.getItem("token"));
        console.log('isLogged',isLogged)
        if (isLogged && pathname === '/login') navigate("/list");
        if (!isLogged) navigate("/login");
    }, [pathname]);


    const SuspenseFallback = () => {
        return (
            <div className='d-flex align-items-center justify-content-center'>
               loading ...
             </div>
        );
    };

    const SuspenseWrapper = () => {
        return (
            <Suspense fallback={<SuspenseFallback />}>
                <Outlet />
            </Suspense>
        );
    };

    return (
        <Suspense fallback={<SuspenseFallback />}>
            <Routes>
                <Route path='/' element={<Navigate to='/login' replace />} />
                <Route element={<SuspenseWrapper />}>
                    <Route path='/login' element={<Login />} />
                    <Route path='/list' element={<UserList />} />
                    <Route path='/show-user/:id' element={<ShowUser />} />

                </Route>
            </Routes>
        </Suspense>
    );
};

export default Router;
