/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from '../context/UserDetails'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { getUserDetails } = useUserContext()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(
        "https://movieapi-rook.onrender.com/auth/login",
        {
          email,
          password,
        }
      )

      if (response.status >= 200 || response.status<=300) {
        localStorage.setItem("authToken", response.data.token)
        toast.success("Login successful!")
        getUserDetails()
        navigate("/")
      }
    } catch (err: any) {
      console.error(err)
      toast.error(
        err.response?.data?.message ||
          "An unexpected error occurred. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-[100vw] h-full", className)} {...props}>
      <Card className="w-full max-w-md shadow-lg bg-white rounded-lg overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white ">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="mt-2 text-lg">
            Login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <a
                    href="/forgetpassword"
                    className="text-sm text-indigo-500 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-gray-300 focus:ring-indigo-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-indigo-500 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => toast.info("Login with Google coming soon!")}
              >
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-indigo-500 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  )
}
