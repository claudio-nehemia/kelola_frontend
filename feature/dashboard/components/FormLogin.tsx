"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { InputText } from "@/feature/_global/components/InputText";
import { useState } from "react";
import z from "zod";

export function FormLogin() {
  const validationSchema = z.object({
    username: z.string().min(1, { message: "username tidak boleh kosong" }),
    password: z.string().min(1, { message: "password tidak boleh kosong" }),
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ username?: string; password?: string }>({
    username: "",
    password: "",
  });

  function handleSubmit() {
    const result = validationSchema.safeParse({ username, password });
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setError({
        username: fieldErrors.username?.[0],
        password: fieldErrors.password?.[0],
      });
    }
  }

  return (
    <Card className="xl:w-100 py-10">
      <CardContent>
        <div className="flex flex-col gap-5">
          <div>
            <InputText
              namingText="username"
              value={username}
              setValue={setUsername}
            />
            {error.username && (
              <p className="text-red-500 text-xs pl-2">{error.username}</p>
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
              <p className="text-red-500 text-xs pl-2">{error.password}</p>
            )}
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full mt-4">
          Login
        </Button>
      </CardContent>
    </Card>
  );
}
