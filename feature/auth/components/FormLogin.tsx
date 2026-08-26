"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputText } from "@/feature/_global/components/InputText";
import { useState } from "react";
import z from "zod";
import { useActionLogin } from "../action/useActionLogin";
import { toast } from "sonner";

export function FormLogin() {
  const { mutate: actionLogin, isPending } = useActionLogin();

  const validationSchema = z.object({
    username: z.string().min(1, { message: "Username tidak boleh kosong" }),
    password: z.string().min(1, { message: "Password tidak boleh kosong" }),
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});

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

    actionLogin(
      { username, password },
      {
        onSuccess: () => {
          toast.success("Login berhasil!");
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message ||
            "Login gagal, silahkan cek kembali username dan password anda";
          setError({ general: msg });
          toast.error(msg);
        },
      },
    );
  }

  return (
    <Card className="xl:w-100 py-10 shadow-lg border border-gray-200">
      <CardContent>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Kelola POS - Login
        </h2>

        <div className="flex flex-col gap-5">
          <div>
            <InputText
              namingText="Username"
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
              namingText="Password"
              value={password}
              setValue={setPassword}
            />
            {error.password && (
              <p className="text-red-500 text-xs pl-2 mt-1">{error.password}</p>
            )}
          </div>
        </div>

        {error.general && (
          <p className="text-red-500 text-xs text-center mt-3 font-semibold">
            {error.general}
          </p>
        )}

        <Button
          onClick={handleSubmit}
          className="w-full mt-6 py-5 font-semibold"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </CardContent>
    </Card>
  );
}
