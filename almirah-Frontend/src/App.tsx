
import { DeskTop } from "./pages/deskTop"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { Authentication } from "./pages/authentication";
import { HomePage } from "./pages/homePage";


function App() {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/authentication" element={<Authentication />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/desktop" element={<DeskTop />} />
                </Route>
            </Routes>
        </BrowserRouter>

    </>
}

export default App
