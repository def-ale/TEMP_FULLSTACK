import Link from "next/link";
import { getAlunos } from "./actions";

const AlunoListar = async () => {
    const objetos = await getAlunos();

    return (
        <div className="flex flex-col">
            <h1 className="text-3xl mb-3">Alunos</h1>
            <Link href="/aluno/inserir" className="flex text-white justify-center w-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Inserir</Link>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="h-7 text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th>Matrícula</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        objetos.map(x => {
                            return (
                                <tr key={x.id}>
                                    <td>{x.matricula}</td>
                                    <td>{x.nome}</td>
                                    <td className="flex">
                                        <Link className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:focus:ring-yellow-900" href={`/aluno/alterar/${x.id}`}>Alterar</Link>
                                        <Link className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" href={`/aluno/excluir/${x.id}`}>Excluir</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

// const objetos = [
//     { id: 1, matricula: 123, nome: 'Ana', email: 'ana@email.com' },
//     { id: 2, matricula: 125, nome: 'Bruno', email: 'bruno@email.com' },
//     { id: 3, matricula: 127, nome: 'Carlos', email: 'carlos@email.com' },
// ];

export default AlunoListar;
