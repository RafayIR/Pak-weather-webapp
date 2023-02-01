import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Weather from './components/Weather'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={localStorage.getItem('token')?.length ? <Weather /> : <SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
