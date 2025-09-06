// Props
type PostProps = {
    avatar: string,
    titulo: string,
    resumo: string,
    imagem: string
}

export default function Post({avatar, titulo, resumo, imagem}: PostProps) {
    
    return (
      <div className="flex flex-col justify-between h-full max-w-sm rounded overflow-hidden shadow-lg transition duration-300 hover:bg-gray-900 hover:text-white">
        <div className="flex flex-col flex-grow py-4 px-8">
          <img
            src={avatar}
            className="rounded-full w-12 h-12 mb-4 object-cover"
            alt="Avatar"
          />
          <a href="#">
            <h4 className="text-lg mb-3 font-semibold">{titulo}</h4>
          </a>
          <p className="mb-2 text-sm text-gray-600">{resumo}</p>
  
          <img
            src={imagem}
            className="w-full h-48 object-cover mt-auto"
            alt="Imagem aleatória"
          />
  
          <hr className="mt-4" />
          <span className="text-xs">ARTICLE</span>
          <span className="text-xs text-gray-500 ml-1">PROCESS</span>
        </div>
      </div>
    );
  }
