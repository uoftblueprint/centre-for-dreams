import { api } from "~/utils/api";

const MinhLe = () => {
  const minh_info = api.developer.minhle_info.useQuery().data;

  const minh_upvote = api.developer.minhle_upvote.useMutation();

  return (
    <div className="max-w-sm rounded border p-4 shadow">
      <h1>{minh_info?.name}</h1>
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
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Upvote!
      </button>
    </div>
  );
};

export default MinhLe;
