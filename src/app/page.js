import { lazy } from "react";

const Navbar=lazy(() => import('./Components/NavBar/Navbar.js'));
export default function Home() {
  return (
    <>
    <div className="homePage">
        <Navbar/>
    </div>
    </>
  );
}
