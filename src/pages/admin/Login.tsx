import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useLogin } from "@workspace/api-client-react";
import { Button } from "@/components/core/buttons/Button";
import Input from "@/components/core/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/core/Card";
import { useToast } from "../../hooks/use-toast";
import { LayoutDashboard, Loader2, User } from "lucide-react";
import InputForm from "@/components/core/InputPassword";
import { motion } from "motion/react";

interface FormData {
  username: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = true;

  const handleLogin = (e?: React.FormEvent) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    if (!formData.username || !formData.password) return;

    // loginMutation.mutate(
    //   { data: { username, password } },
    //   {
    //     onSuccess: (data) => {
    //       if (data.success) {
    //         toast({ title: "Welcome back", description: `Logged in as ${data.user.username}` });
    //         navigate("/admin/create-password");
    //       } else {
    //         toast({ variant: "destructive", title: "Login failed", description: "Invalid credentials" });
    //       }
    //     },
    //     onError: (err) => {
    //       toast({ variant: "destructive", title: "Login failed", description: err.error?.error || "Unknown error" });
    //     }
    //   }
    // );
  };

  return (
    <div className="min-h-50 shadow-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mb-4 text-center z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center justify-center p-3 bg-card border border-border/50 rounded-2xl mb-4 shadow-xl">
          <div className="w-12 h-12 flex items-center justify-center text-devotion-gold">
            <LayoutDashboard size={50} />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Admin Portal
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-[calc(100vh-180px)] flex items-center justify-center p-6"
      >
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 glass-card overflow-hidden shadow-2xl shadow-devotion-gold/10">
          {/* Left Side: Visual */}
          <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-devotion-bg to-slate-900 p-8">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-devotion-gold blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-devotion-purple blur-[120px]" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 glass-card flex items-center justify-center text-devotion-gold">
                  <LayoutDashboard size={28} />
                </div>
                <h1 className="font-display font-bold text-2xl tracking-tight">
                  QUIZZY PLATFORM
                </h1>
              </div>

              <div className="space-y-6">
                <h2 className="text-5xl font-display font-bold leading-tight">
                  Manage Your <br />
                  <span className="gold-gradient-text">Database.</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-md">
                  Join thousands of students and educators in the most immersive
                  assessment experience ever crafted.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://picsum.photos/seed/face${i}/100/100`}
                      className="w-10 h-10 rounded-full border-2 border-slate-900"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-500 font-medium">
                  Had by 50k+ students worldwide
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="p-2 lg:p-8 space-y-8 bg-white/5 backdrop-blur-md">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl text-center font-bold tracking-tight">
                Sign in
              </CardTitle>
              <CardDescription className="text-center">
                Enter your admin credentials to continue
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {/* username Field */}
                  <Input
                    label="Username"
                    placeholder="username"
                    value={formData.username}
                    onChange={(value) =>
                      setFormData({ ...formData, username: value })
                    }
                    icon={
                      <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                        size={18}
                      />
                    }
                  />
                </div>
                <div className="space-y-2">
                  {/* Password Field */}
                  <InputForm
                    label="Password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(value) =>
                      setFormData({ ...formData, password: value })
                    }
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-2 pb-6">
                <Button text="" onClick={(e) => handleLogin(e)}>
                  {!loginMutation ? (
                    <div className="flex justify-center">
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Authenticating...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </CardFooter>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
