"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { getAluno, deleteAluno } from "../../actions";
import Aluno from "@/types/Aluno";

const excluir = async (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  e.preventDefault();
  const response = await deleteAluno(id);
  if (response.ok) {
    alert('Aluno excluído com sucesso!');
    redirect('/aluno', RedirectType.push);
  } else {
    alert('Erro ao excluir aluno!');
  }
};

const AlunoExcluir = (props: PageProps<"/aluno/alterar/[id]">) => {
  const { id } = use(props.params);
  const [objeto, setObjeto] = useState<Aluno | null>(null);

    useEffect(() => {
        getAluno(id).then(data => setObjeto(data))
    }, [id])

    if (!objeto) {
        return <div>Carregando...</div>;
    }

  return (
    <div>
      <h1 className="text-3xl mb-2">Excluindo aluno</h1>
      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="matricula"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Matrícula
            </label>
            <input
              type="text"
              id="matricula"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
              value={objeto.matricula}
              onChange={() => {}}
            />
          </div>
          <div>
            <label
              htmlFor="nome"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
              value={objeto.nome}
              onChange={() => {}}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              disabled
              value={objeto.email}
              onChange={() => {}}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => excluir(objeto.id, e)}
          >
            Excluir
          </button>
          <Link
            href={"/aluno"}
            className="text-black bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AlunoExcluir;
