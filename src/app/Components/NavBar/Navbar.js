'use client'
import './Navbar.css';
import { useRouter } from "next/navigation";

function Navbar(){
    const router = useRouter();
    return (
        <>
        <div className="navbar">
            <h2>If You Don't Have An Account !</h2>
            <ul>
                <li onClick={()=>{router.push("/register")}}>Register</li>        
            </ul>
            <h2>If You Have An Account !</h2>
            <ul>
                <li onClick={()=>{router.push("/login")}}>Login</li>             
            </ul>
        </div>
        </>
    )
}
export default Navbar;