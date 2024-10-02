'use client'
import AuthForm from "@/components/AuthForm/AuthForm";
import {useState} from "react";
import {dashboardRoute, loginRoute} from "@/lib/appRoutes";

export default function SignInPage() {
  const [authError, setAuthError] = useState<string | null>(null);

  async function handleSignInSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAuthError(null);
    if (!e.currentTarget) return;
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email')
    const password = formData.get('password')
    const response = await fetch(loginRoute(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    })
    const data = await response.json();
    if (response.ok) {
      await localStorage.setItem('username', data.username);
      window.location.href = dashboardRoute()
    } else {
      setAuthError(data.message)
    }
  }

  return (
  <AuthForm authError={authError} onSubmit={handleSignInSubmit}/>
  )
}