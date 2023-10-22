import { api } from "~/utils/api";

const MinhLe = () => {
  const minh_info = api.developer.minhle_info.useQuery().data;

  const minh_upvote = api.developer.minhle_upvote.useMutation();

  return (
    <div className="border p-4 rounded shadow max-w-sm">
        <h1>
            {minh_info?.name}
        </h1>
        <p>
            <b>Year:</b> {minh_info?.year}
        </p>
        <p>
            <b>Introduction:</b> {minh_info?.introduction}
        </p>
        <p>
            <b>Favourite Food:</b> {minh_info?.fav_food}
        </p>
        <p>
            <b>Favourite Song:</b> {minh_info?.fav_song}
        </p>
        <p>
            <b>Upvotes:</b> {minh_info?.upvotes}
        </p>

        <button 
            onClick={() => minh_upvote.mutate()}  
            className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">

            Upvote!
        </button>
    </div>
  );
};

export default MinhLe;
