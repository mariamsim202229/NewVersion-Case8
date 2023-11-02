import { Routes, Route } from 'react-router-dom';
import { TopNavigation } from "./components/TopNavigation";
import { Login } from './pages/Login';

function App() {
    return (
        <>
            <TopNavigation />
            <h1>Hello World</h1>
            <Routes>
                <Route path='/' element=''></Route>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
        </>
    )
}

export default App;