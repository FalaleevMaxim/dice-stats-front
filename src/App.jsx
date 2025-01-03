import {Route, Routes} from 'react-router-dom';
import RollPage from "./pages/roll/RollPage.jsx";
import CharactersPage from "./pages/characters/CharactersPage.jsx";
import DicePage from "./pages/table/DicePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Header from "./components/header/Header.jsx";
import './App.css'

const App = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<RollPage/>}/>
                <Route path="/characters" element={<CharactersPage/>}/>
                <Route path="/dice" element={<DicePage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
};

export default App;