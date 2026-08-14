"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputText } from "@/feature/_global/components/InputText";
import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import z from "zod";

export function FormLogin() {
  const router = useRouter();
  const loginMutation = useLogin();

  const validationSchema = z.object({
    username: z.string().min(1, { message: "username tidak boleh kosong" }),
    password: z.string().min(1, { message: "password tidak boleh kosong" }),
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ username?: string; password?: string; general?: string }>({});

  async function handleSubmit() {
    setError({});
    const result = validationSchema.safeParse({ username, password });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError({
        username: fieldErrors.username?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    try {
      await loginMutation.mutateAsync({ username, password });
      router.push("/dashboard");
    } catch (err: any) {
      setError({
        general: err?.response?.data?.message || "Login gagal. Periksa username & password.",
      });
    }
  }

  return (
    <Card className="xl:w-100 py-10 shadow-lg">
      <CardContent>
        <h2 className="text-xl font-bold text-center mb-6">Kelola POS - Login</h2>

        <div className="flex flex-col gap-5">
          <div>
            <InputText
              namingText="username"
              value={username}
              setValue={setUsername}
            />
            {error.username && (
              <p className="text-red-500 text-xs pl-2 mt-1">{error.username}</p>
            )}
          </div>

          <div>
            <InputText
              type="password"
              namingText="password"
              value={password}
              setValue={setPassword}
            />
            {error.password && (
              <p className="text-red-500 text-xs pl-2 mt-1">{error.password}</p>
            )}
          </div>
        </div>

        {error.general && (
          <p className="text-red-500 text-xs text-center mt-3 font-semibold">{error.general}</p>
        )}

        <Button
          onClick={handleSubmit}
          className="w-full mt-6"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </CardContent>
    </Card>
  );
}
