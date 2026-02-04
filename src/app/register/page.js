"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import '../globals.css'
export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    countryCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("mobile", form.mobile);
      formData.append("password", form.password);
      formData.append("password_confirmation", form.password);
      formData.append("mobile_country_code", form.countryCode);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const token = res.data.data.token;
      localStorage.setItem("token", token);

      router.push("/verify");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <h2 > Welcom To Register Page</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Phone Number started with +20"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="countryCode"
          placeholder="Country Code (e.g. 971)"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <h5>If You Have An Account <span onClick={()=>router.push("/login")} style={{color:"blue",cursor:"pointer"}}>Login</span></h5>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
