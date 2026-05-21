import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Shield, User, Mail, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { api, saveUser } from "../services/api";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (/^\d+$/.test(username)) return setError("Username не должен состоять только из цифр");
    try {
      const user = await api.register(username, email, password);
      saveUser(user);
      navigate("/app");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-[#111827]/90 border-[#7B61FF]/30 text-white shadow-[0_0_40px_rgba(123,97,255,0.18)]">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 w-14 h-14 rounded-2xl bg-[#7B61FF]/10 flex items-center justify-center">
            <Shield className="text-[#7B61FF]" />
          </div>
          <CardTitle className="text-3xl">Регистрация</CardTitle>
          <p className="text-gray-400">Создай аккаунт игрока</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-2"><span className="text-sm text-gray-300">Username</span><div className="relative"><User className="absolute left-3 top-3 w-4 h-4 text-gray-400" /><Input className="pl-10 bg-[#0B0F1A] border-[#7B61FF]/40" value={username} onChange={e => setUsername(e.target.value)} minLength={3} required /></div></label>
            <label className="block space-y-2"><span className="text-sm text-gray-300">Email</span><div className="relative"><Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" /><Input className="pl-10 bg-[#0B0F1A] border-[#7B61FF]/40" type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div></label>
            <label className="block space-y-2"><span className="text-sm text-gray-300">Пароль</span><div className="relative"><Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" /><Input className="pl-10 bg-[#0B0F1A] border-[#7B61FF]/40" type="password" value={password} onChange={e => setPassword(e.target.value)} minLength={6} required /></div></label>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button className="w-full bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] text-white" type="submit">Создать аккаунт</Button>
          </form>
          <p className="text-center text-gray-400 mt-5">Уже есть аккаунт? <Link className="text-[#00F5FF]" to="/login">Войти</Link></p>
        </CardContent>
      </Card>
    </div>
  );
}
