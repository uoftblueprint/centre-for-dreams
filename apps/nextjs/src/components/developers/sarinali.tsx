// sarina component

import { api } from "~/utils/api";

const SarinaLi = () => {
  const sarinaliInfo = api.developer.sarinali_info.useQuery().data;
  const mutation = api.developer.sarinali_upvote.useMutation();
  return (
    <div>
      <h1>sarinaliInfo from API:</h1>
      {sarinaliInfo ? (
        <div>
          <p>Name: {sarinaliInfo.name}</p>
          <p>Year: {sarinaliInfo.year}</p>
          <p>Introduction: {sarinaliInfo.introduction}</p>
          <p>Favorite Food: {sarinaliInfo.fav_food}</p>
          <p>Favorite Song: {sarinaliInfo.fav_song}</p>
          <p>Upvotes: {sarinaliInfo.upvotes}</p>
        </div>
      ) : (
        <p>Loading sarinaliInfo...</p>
      )}
      <button
        onClick={() => {
          mutation.mutate();
        }}
      >
        Increase Upvote
      </button>
    </div>
  );
};

export default SarinaLi;
