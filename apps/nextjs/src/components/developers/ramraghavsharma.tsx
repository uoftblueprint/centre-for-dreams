import { api } from "~/utils/api";

export default function RamRaghavSharma() {
  const info = api.developer.ramraghavsharma_info.useQuery().data;
  const upvote = api.developer.ramraghavsharma_upvote.useMutation();

  return (
    <div>
      <div>{info?.name}</div>
      <p>Introduction: {info?.introduction}</p>
      <p>Year: {info?.year} </p>
      <p>Favourite Food: {info?.fav_food}</p>
      <p>Favourite Song: {info?.fav_song}</p>
      <div>Upvotes: {info?.upvotes}</div>
      <button onClick={() => upvote.mutate()}>Upvote</button>
    </div>
  );
}
