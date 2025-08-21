import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import React, { Suspense } from "react";
import Loader from "./components/loader/loader";

const CharactersList = React.lazy(() => import("./pages/characters-list/characters-list"));
const CharacterDetails = React.lazy(() => import("./pages/character-detail/character-details"));
const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Suspense fallback={<Loader isLoading={true} />}>
                <Routes>
                    <Route path="/" element={<CharactersList />} />
                    <Route path='/detail/:id' element={<CharacterDetails />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};
export default AppRoutes;
