import AboutUS from "./Componets/AboutUS";
import NavBar from "./Componets/Navbar";
import ProfileSection from "./Componets/ProfileSection";
function App() {
  return (
    <div className="gradient-bg-welcome pt-24">
      <NavBar />
      <ProfileSection />
      <AboutUS />
    </div>
  );
}

export default App;
