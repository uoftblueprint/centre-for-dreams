import { api } from "~/utils/api";

const LeventOzayCard = () => {
  const leventozayInfo = api.developer.leventozay_info.useQuery().data;
  const leventozayUpvote = api.developer.leventozay_upvote.useMutation();

  return (
    <div>
        <h1>Levent Ozay</h1>
        {leventozayInfo ? (
            <div>
                <p>My Name: {leventozayInfo.name}</p>
                <p>Introduction: {leventozayInfo.introduction}</p>
                <p>Year : {leventozayInfo.year}</p>
                <p>My Favorite Food: {leventozayInfo.fav_food}</p>
                <p>My Favorite Song: {leventozayInfo.fav_song}</p>
                <p>Upvotes: {leventozayInfo.upvotes}</p>
            </div>    
        ) : (
            <p>Loading Levent Ozay's Information...</p>
        )}
        <button onClick={() => leventozayUpvote.mutate()}>Upvote</button>
    </div>
    );
}

export default LeventOzayCard;
