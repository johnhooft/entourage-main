"use client"

import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/authState';
import Link from 'next/link';
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Password must be at least 4 characters long" }),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Login: React.FC = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const loginContentRef = useRef<HTMLDivElement>(null);
  const signupContentRef = useRef<HTMLDivElement>(null);
  const { user, loading, logout } = useAuth();

  useEffect(() => {
      if (!loading && user) {
        router.push('/dashboard');
      }
  }, [user, loading, router]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onLogin = async (formdata: LoginFormValues) => {
    setError('');
    const { email, password } = formdata
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      // Handle successful login (e.g., redirect to dashboard)
      console.log('Logged in successfully:', data);
      router.push('/dashboard')
    } catch (err: any) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <Card className="w-[350px] bg-entourage-black text-entourage-orange border-entourage-orange">
      <CardHeader>
        <CardTitle>Entourage</CardTitle>
        <CardDescription className='text-entourage-blue'>Login or create a new website to signup</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
          <TabsList className="grid w-full grid-cols-2 bg-entourage-black border-[1px] border-white">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={loginForm.handleSubmit(onLogin)}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    {...loginForm.register("email")}
                    className="mt-1 bg-entourage-black border-[1px] border-white text-white shadow-entourage-black"
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-red-500 mt-1">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    {...loginForm.register("password")}
                    className="mt-1 bg-entourage-black border-[1px] border-white text-white"
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-red-500 mt-1">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full bg-entourage-black border-[1px] text-entourage-blue border-white hover:border-entourage-orange hover:bg-entourage-black">Login</Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <div className='w-full h-[208px] flex justify-center items-center'>
              <Link href='/questionnaire'>
                <button 
                    className="max-w-fit sm:w-auto inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#FF5E1C,45%,#ff9d75,55%,#FF5E1C)] bg-[length:200%_100%] px-6 font-medium text-entourage-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    Generate Site to Sign Up
                </button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  )
}

export default Login;