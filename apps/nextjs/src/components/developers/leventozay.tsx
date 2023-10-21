import { api } from "~/utils/api";

const LeventOzay = () => {
  const leventozayInfo = api.developer.levnetozay_info.useQuery().data;
  const mutation = api.developer.leventozay_upvote.useMutation();
  return (
    <div>
        <h1>Levent Ozay</h1>
        {leventozayInfo ? (
        <div>
            <p>Introduction: {leventozayInfo.introduction}</p>
            <p>My Name: {leventozayInfo.name}</p>
            <p>Year: {leventozayInfo.year}</p>
            <p>Favorite Food: {leventozayInfo.fav_food}</p>
            <p>Favorite Song: {leventozayInfo.fav_song}</p>
            <p>Upvotes: {leventozayInfo.upvotes}</p>
        </div>
      ) : (
        <p>Loading Levent Ozay's Information...</p>
      )}
      <button onClick={() => {mutation.mutate();}}>
        Upvote
      </button>
    </div>
  );
};

export default LeventOzay;