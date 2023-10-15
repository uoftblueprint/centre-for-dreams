import { api } from "~/utils/api";

export default function RyanLi() {
  const info = api.ryanli.count.useQuery().data;
  return (
    <div className="container mx-auto my-5">
      <div className="text-xl font-medium text-black">{info?.name}</div>
      <p className="text-slate-500">Introduction: {info?.introduction}</p>
      <p className="text-slate-500">Year: {info?.year} </p>
      <p className="text-slate-500">Favourite Food: {info?.fav_food}</p>
      <p className="text-slate-500">Favourite Song: {info?.fav_song}</p>
    </div>
  );
}
