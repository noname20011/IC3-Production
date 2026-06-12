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
    <div className="min-h-50 bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden md:mt-6">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mb-8 text-center z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center justify-center p-3 bg-card border border-border/50 rounded-2xl mb-4 shadow-xl">
          <div className="w-12 h-12 flex items-center justify-center text-devotion-gold">
            <LayoutDashboard size={50} />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Admin Quizzy Platform
        </h1>
        <p className="text-muted-foreground mt-2">Admin Portal</p>
      </div>

      <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border-border/50 shadow-2xl shadow-black/50 z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
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
                icon= {<User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />}
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
            <Button
              text=""
              handleSubmit={(e) => handleLogin(e)}
            >
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
      </Card>

      <div className="mt-8 text-sm text-muted-foreground z-10">
        &copy; {new Date().getFullYear()} Code Analysis Platform
      </div>
    </div>
  );
}
