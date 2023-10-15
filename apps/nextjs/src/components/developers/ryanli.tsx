import { api } from "~/utils/api";

export default function RyanLi() {
  const info = api.ryanli.info.useQuery().data;
  const upvote = api.ryanli.upvote.useMutation();

  return (
    <div className="container mx-auto my-5">
      <div className="text-xl font-medium text-black">{info?.name}</div>
      <p className="text-slate-500">Introduction: {info?.introduction}</p>
      <p className="text-slate-500">Year: {info?.year} </p>
      <p className="text-slate-500">Favourite Food: {info?.fav_food}</p>
      <p className="text-slate-500">Favourite Song: {info?.fav_song}</p>
      <div className="text-lg font-medium text-blue-500">
        Upvotes: {info?.upvotes}
      </div>
      <button onClick={() => upvote.mutate()}>Upvote</button>
    </div>
  );
}
