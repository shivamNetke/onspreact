// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Loan from "./pages/Loan";
import Locker from "./pages/Locker";
import OurTeam from "./pages/OurTeam";
import OurValues from "./pages/OurValues";
import OurVentures from "./pages/OurVentures";
import LoanCalculator from "./pages/LoanCalculator";
import OurVision from "./pages/OurVision";
import Recurring from "./pages/Recurring";
import TermDeposit from "./pages/TermDepositDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loancalculator" element={<LoanCalculator />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/locker" element={<Locker />} />
        <Route path="/ourteam" element={<OurTeam />} />
        <Route path="/ourvision" element={<OurVision/>} />
        <Route path="/recurring" element={<Recurring/>} />
        <Route path="/termdepositedetails" element={<TermDeposit/>} />

        <Route path="/ourvalues" element={<OurValues />} />
        <Route path="/ourventures" element={<OurVentures />} />
      </Routes>
    </>
  );
}

export default App;