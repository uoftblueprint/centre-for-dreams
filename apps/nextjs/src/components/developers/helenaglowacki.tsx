import { api } from "~/utils/api";

const HelenaGlowacki = () => {
    const developerInfo = api.developer.helenaglowacki_info.useQuery().data

    const upvote = api.developer.helenaglowacki_upvote.useMutation()

   return(
    <div className="m-4 max-w-sm box-border p-4 border-4 border-indigo-100 m4 bg-white-400 shadow-sm">
        <h2 className="mb-4 text-2xl font-extrabold ">
            {developerInfo?.name}
        </h2>
        <p className="mb-4 text-md font-normal ">
            {developerInfo?.introduction}
        </p>
        <p className = "mb-2 text-md text-gray-600 font-normal"> 
            Year: {developerInfo?.year}
            </p>
        <p className="mb-2 text-md text-gray-600 font-normal">
            Favorite food: {developerInfo?.fav_food}
            </p>
        <p className="mb-2 text-md text-gray-600 font-normal">
            Favorite song: {developerInfo?.fav_song}
            </p>

        <p className="mb-3 text-md text-gray-600 font-normal">
        Upvotes: {developerInfo?.upvotes}
            </p>
        <button 
            className="bg-indigo-400 hover:bg-indigo-500 text-white font-semibold py-2 px-4  rounded shadow" 
             onClick = {() => upvote.mutate()}>
                Upvote!
        </button>
    </div>
   )   
}

export default HelenaGlowacki;