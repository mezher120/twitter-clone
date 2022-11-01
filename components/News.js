
export default function News({article}) {
  return (
    <a 
    href={article.url}
    target="_blank">

    <div className="flex hover:bg-gray-300 hover:rounded-lg p-1 cursor-pointer ">
        <div className="w-[75%]">
            <h5 className="font-bold text-sm">{article.title}</h5>
            <p className="text-sm text-gray-500">{article.source.name}</p>
        </div>
        <div className="flex items-center rounded-xl pl-2">
            <img className="h-14 rounded-xl" src={article.urlToImage} alt=''></img>
        </div>
        
    </div>
    </a>
  )
}
