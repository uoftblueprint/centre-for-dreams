import { api } from "~/utils/api";

const HelenZhao = () => {
  const helenInfo = api.developer.helenzhao_info.useQuery().data;
  const helenUpvote = api.developer.helenzhao_upvote.useMutation();
  return (
    <div>
      <h2>{helenInfo?.name}</h2>
      <p>
        <b>Year:</b> {helenInfo?.year}
      </p>
      <p>
        <b>Introduction:</b> {helenInfo?.introduction}
      </p>
      <p>
        <b>Favourite Food:</b> {helenInfo?.fav_food}
      </p>
      <p>
        <b>Favourite Song:</b> {helenInfo?.fav_song}
      </p>
      <p>
        <b>Upvotes:</b> {helenInfo?.upvotes}
      </p>

      <button onClick={() => helenUpvote.mutate()}>Upvote!</button>
    </div>
  );
};

export default HelenZhao;
