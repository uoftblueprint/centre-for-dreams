import { api } from "~/utils/api";

const EricLu = () => {
  const ericluInfo = api.developer.ericlu_info.useQuery().data;
  const mutation = api.developer.ericlu_upvote.useMutation();
  return (
    <div className="m-4 block max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow">
      <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
        {ericluInfo?.name}
      </h2>
      <h3 className="text-md mb-2">Year: {ericluInfo?.year}</h3>
      <p>{ericluInfo?.introduction}</p>
      <p>
        <b>Favourite food:</b> {ericluInfo?.fav_food}
      </p>
      <p>
        <b>Favourite song:</b> {ericluInfo?.fav_song}
      </p>
      <div className="flex flex-row items-center gap-4">
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => mutation.mutate()}
        >
          Upvote
        </button>
        <p className="pt-2 font-bold">Upvotes: {ericluInfo?.upvotes}</p>
      </div>
    </div>
  );
};

export default EricLu;
