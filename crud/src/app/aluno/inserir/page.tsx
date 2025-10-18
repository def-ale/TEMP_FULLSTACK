'use client';

import { useState } from "react";
import Link from "next/link";
import { redirect, RedirectType } from 'next/navigation'
import { insertAluno } from "../actions";
import Aluno from "@/types/Aluno";

const inserir = async (objeto: Aluno,e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const response = await insertAluno(objeto);
    if (response.ok) {
        alert('Aluno inserido com sucesso!');
        redirect('/aluno', RedirectType.push)
    } else {
        alert('Erro ao inserir aluno!');
    }
};

const AlunoInserir = () => {
    const [objeto, setObjeto] = useState<Aluno>( { id: '', matricula: 0, nome: '', email: '' } );

    return (
        <div>
            <h1 className="text-3xl mb-2">Inserindo aluno</h1>
            <form>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="matricula" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Matrícula</label>
                        <input 
                            type="text" 
                            id="matricula" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            value={objeto.matricula}
                            onChange={(e) => { setObjeto({...objeto, matricula: Number(e.target.value)}) }}
                        />
                    </div>
                    <div>
                        <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                        <input 
                            type="text" 
                            id="nome" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required 
                            value={objeto.nome} 
                            onChange={(e) => { setObjeto({...objeto, nome: e.target.value}) }}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            value={objeto.email}
                            onChange={(e) => { setObjeto({...objeto, email: e.target.value}) }}
                        />
                    </div>  
                </div>
                
                <div className="flex gap-2">
                    <button 
                        type="submit" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={e => inserir(objeto,e)}
                    >Salvar</button>
                    <Link href={'/aluno'} className="text-black bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Voltar</Link>
                </div>
            </form>

        </div>
    );
};

export default AlunoInserir;
