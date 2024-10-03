import { api } from "~/utils/api";

const EmilyZhou = () => {
  const developerInfo = api.developer.emilyzhou_info.useQuery().data;

  const upvote = api.developer.emilyzhou_update.useMutation();

  return (
    <div className="m4 bg-white-400 m-4 box-border max-w-sm border-4 border-indigo-100 p-4 shadow-sm">
      <h2 className="mb-4 text-2xl font-extrabold ">{developerInfo?.name}</h2>
      <p className="text-md mb-4 font-normal ">{developerInfo?.introduction}</p>
      <p className="text-md mb-2 font-normal text-gray-600">
        Year: {developerInfo?.year}
      </p>
      <p className="text-md mb-2 font-normal text-gray-600">
        Favorite food: {developerInfo?.fav_food}
      </p>
      <p className="text-md mb-2 font-normal text-gray-600">
        Favorite song: {developerInfo?.fav_song}
      </p>

      <p className="text-md mb-3 font-normal text-gray-600">
        Upvotes: {developerInfo?.upvotes}
      </p>
      <button
        className="rounded bg-indigo-400 px-4 py-2 font-semibold text-white  shadow hover:bg-indigo-500"
        onClick={() => upvote.mutate()}
      >
        Upvote!
      </button>
    </div>
  );
};

export default EmilyZhou;
