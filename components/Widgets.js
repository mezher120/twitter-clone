import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import News from "./News";


export default function Widgets({news}) {

    const [moreNews, setMoreNews] = useState(4);

  return (
    <div className="hidden md:w-[400px] xl:w-[750px] md:inline space-y-5">
        <div className="sticky top-0 z-20 w-[90%]">
        <div className="relative p-3">
        <div className="flex absolute inset-y-0 left-0 items-center pl-6 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input 
        type="search" 
        id="search" 
        className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-full border border-gray-300" 
        placeholder="Search Twitter..." required />
        </div>
        </div>

        <div className="text-gray-700 space-y-5 bg-gray-100 rounded-xl p-5 m-5">
            <h4 className="font-bold text-xl px-4">What's Happening</h4>
        {news && news.slice(0,moreNews).map(newo =>
            <News key={newo.title} article={newo}></News>
        )}
        <button onClick={() => setMoreNews(moreNews + 3)} className="text-blue-300 pl-4 pb-3 hover:text-blue-500">Show More</button>
        </div>
 

    </div>
  )
}
