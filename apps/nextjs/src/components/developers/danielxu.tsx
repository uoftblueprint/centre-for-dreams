import { api } from "~/utils/api";

const DanielXu = () => {
  const facts = api.developer.danielxu_info.useQuery().data;
  const upvote = api.developer.danielxu_update.useMutation();
  return (
    <div className="m-4 flex max-w-sm flex-col gap-4 rounded-md border-2 border-green-500 bg-[#22272E] p-4 text-[#ADBAC7]">
      <h2 className="text-2xl font-bold">{facts?.name}</h2>
      <hr></hr>
      <div className="flex flex-col gap-2 font-mono text-sm">
        <p>{facts?.introduction}</p>
        <p>Year: {facts?.year}</p>
        <p>fav_food: {facts?.fav_food}</p>
        <p>fav_song: {facts?.fav_song}</p>
      </div>
      <button
        className="w-full rounded-md bg-green-500 p-2 text-white active:scale-95"
        onClick={() => upvote.mutate()}
      >
        Upvote: {facts?.upvotes}
      </button>
    </div>
  );
};

export default DanielXu;
