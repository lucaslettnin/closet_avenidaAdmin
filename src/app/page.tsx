"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

type Inputs = {
  email: string;
  senha: string;
};

export default function Home() {
  const { register, handleSubmit, setFocus } = useForm<Inputs>();
  const router = useRouter();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  async function verificaLogin(data: Inputs) {
     
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        const admin = await response.json();
        Cookies.set("admin_logado_id", admin.id);
        Cookies.set("admin_logado_nome", admin.nome);
        Cookies.set("admin_logado_token", admin.token);
        router.push("/principal");
      } else if (response.status === 400) {
        toast.error("Erro: Login ou senha incorretos");
      }
       else {
        toast.error("Erro: Algo deu errado. Tente novamente.");
      }
      
  }

  return (
    <form
      onSubmit={handleSubmit(verificaLogin)}
      className="max-w-sm mx-auto bg-white shadow-md p-6 rounded-lg"
    >
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
          placeholder="name@example.com"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="senha"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Senha
        </label>
        <input
          type="password"
          id="senha"
          {...register("senha", { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
          placeholder="********"
        />
      </div>
      <div className="flex items-center mb-5">
        <input
          id="remember"
          type="checkbox"
          className="w-4 h-4 border border-gray-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="remember"
          className="ml-2 text-sm font-medium text-gray-900"
        >
          Lembrar-me
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white text-sm font-medium rounded-lg py-2.5 px-5 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
      >
        Entrar
      </button>
    </form>
  );
}
