import { api } from "~/utils/api";

const JasonWangCard = () => {
  const jasonwangInfo = api.developer.jasonwang_info.useQuery().data;
  const jasonwangUpvote = api.developer.jasonwang_upvote.useMutation();

  return (
    <div className="m-4 block max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow">
      <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
        {jasonwangInfo?.name}
      </h2>
      <h3 className="text-md mb-2">Year: {jasonwangInfo?.year}</h3>
      <p>{jasonwangInfo?.introduction}</p>
      <p>
        <b>Favourite food:</b> {jasonwangInfo?.fav_food}
      </p>
      <p>
        <b>Favourite song:</b> {jasonwangInfo?.fav_song}
      </p>
      <div className="flex flex-row items-center gap-4">
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => jasonwangUpvote.mutate()}
        >
          Upvote
        </button>
        <p className="pt-2 font-bold">Upvotes: {jasonwangInfo?.upvotes}</p>
      </div>
    </div>
  );
};

export default JasonWangCard;
