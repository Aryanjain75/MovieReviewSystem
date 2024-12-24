/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

  try {
  const res = await axios.post('https://movieapi-rook.onrender.com/auth/signup', {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  });
  toast.success(res.data.message);
  navigate('/login');
} catch (err: any) {
  const errorMessage = err.response?.data?.message || 'Signup failed';
  console.error('Error occurred during signup:', err); // Debugging
  toast.error(errorMessage);
} finally {
  setLoading(false);
}
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-4">
      <Card className="w-full max-w-md bg-gray-800 border border-gray-700 p-5">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-100">Sign Up</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
            {/* Name Input */}
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-gray-200">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-gray-700 text-gray-200 placeholder-gray-400"
              />
            </div>

            {/* Email Input */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-gray-700 text-gray-200 placeholder-gray-400"
              />
            </div>

            {/* Password Input */}
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Your Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-gray-700 text-gray-200 placeholder-gray-400"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword" className="text-gray-200">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
                className="bg-gray-700 text-gray-200 placeholder-gray-400"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>

          {/* Already Have Account */}
          <div className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <a
              href="/login"
              className="underline underline-offset-4 text-blue-400 hover:text-blue-500"
            >
              Log in here
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;
