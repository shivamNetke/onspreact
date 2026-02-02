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
