'use client'

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [pendentes, setPendentes] = useState([{id: '1', tarefa: 'Estudar Typescript'}, {id: '2', tarefa: 'Estudar NextJS'}]);
  const [concluidos, setConcluidos] = useState([{id: '3', tarefa: 'Jogar CS'}]);

  const getNovoId = () : string => {
    return uuidv4();
  }

  const adicionarTarefa = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const tarefa = { id: getNovoId(), tarefa: novaTarefa };

    setPendentes([...pendentes, tarefa]);
    setNovaTarefa('');
  };

  const concluirTarefa = (tarefa: { id: string, tarefa: string }, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    
    setPendentes([...pendentes.filter(x => x.id !== tarefa.id)]);
    setConcluidos([...concluidos, tarefa]);
  };

  const voltarParaPendente = (tarefa: { id: string, tarefa: string }, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    
    setConcluidos([...concluidos.filter(x => x.id !== tarefa.id)]);
    setPendentes([...pendentes, tarefa]);
  };

  return (    
    <form className="max-w-sm mx-auto mt-5"> 
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tarefa:</label>
      
      <div className="relative">
        <input 
          type="text" 
          value={novaTarefa}
          onChange={e => setNovaTarefa(e.target.value)}
          className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

        />
        <button type="submit" onClick={adicionarTarefa} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">+</button>
      </div>

      <ul className="mt-2">
        {
          pendentes.map(x => {
            return (<li key={x.id} className="flex">
              <svg onClick={e => concluirTarefa(x, e)} className="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              <span className="ml-2">{x.tarefa}</span>
            </li>);
          })
        }
        {
          concluidos.map(x => {
            return (
              <li key={x.id} className="flex">
                <svg onClick={e => voltarParaPendente(x, e)} className="w-6 h-6 text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clipRule="evenodd"/>
                </svg>
                <span className="ml-2">{x.tarefa}</span>
              </li>
            );
          })
        }
      </ul>
    </form>
  );
}
