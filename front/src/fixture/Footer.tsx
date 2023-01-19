import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteMap } from "./SiteMap";
function Footer(){
    return(
        <>
        <BrowserRouter>
            <SiteMap />
            {/* <Route path="/gifthub" element={<GiftHubPage />} /> */}
        </BrowserRouter>
        </>
    )
}