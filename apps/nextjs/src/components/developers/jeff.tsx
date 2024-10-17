import { api } from "~/utils/api";

const Jeff = () => {
  const jeff_info = api.developer.jeff_info.useQuery().data;
  const mutation = api.developer.jeff_upvote.useMutation();
  return (
<div className="m-4 block max-w-sm border-4 border-black p-4">
  <h2 className="mb-2 text-2xl font-bold tracking-tight text-black">
    {jeff_info?.name}
  </h2>
  <h3 className="text-lg mb-2 font-medium text-black">Year: {jeff_info?.year}</h3>
  <p className="text-black mb-2">{jeff_info?.introduction}</p>
  <p className="text-black">
    <b>Favourite food:</b> {jeff_info?.fav_food}
  </p>
  <p className="text-black">
    <b>Favourite song:</b> {jeff_info?.fav_song}
  </p>
  <div className="flex flex-row items-center gap-4">
    <button
      className="mt-4 border-4 border-black bg-black px-10 py-2 font-bold text-white hover:bg-white hover:text-black active:bg-black focus:outline-none"
      onClick={() => mutation.mutate()}
    >
      Upvote
    </button>
    <p className="pt-2 font-bold text-black">Upvotes: {jeff_info?.upvotes}</p>
  </div>
</div>
  );
};

export default Jeff;