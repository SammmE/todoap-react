import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Lists } from "./Lists/Lists";
import { ViewList } from "./ViewList/ViewList";
import { CreateList } from "./CreateList/CreateList.js";
import { AddListItem } from "./AddListItem/AddListItem";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Lists />}></Route>
                <Route path="/view/:id" element={<ViewList />}></Route>
                <Route path="/create" element={<CreateList />}></Route>
                <Route path="/add/:id" element={<AddListItem />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
