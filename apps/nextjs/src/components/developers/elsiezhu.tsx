import { api } from "~/utils/api";

export const ElsieZhu = () => {
  const developerInfo = api.developer.elsiezhu_info.useQuery().data;

  const upvote = api.developer.elsiezhu_upvote.useMutation();

  return (
    <div className="m4 bg-white-400 m-4 box-border max-w-sm rounded-xl border-4 border-blue-100 p-4 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold ">{developerInfo?.name}</h2>
      <p className="text-md mb-4 font-normal ">{developerInfo?.introduction}</p>
      <p className="text-md mb-2 font-normal">
        <b>Year</b>: {developerInfo?.year}
      </p>
      <p className="text-md mb-2 font-normal">
        <b>Favorite food</b>: {developerInfo?.fav_food}
      </p>
      <p className="text-md mb-2 font-normal">
        <b>Favorite song</b>: {developerInfo?.fav_song}
      </p>
      <p className="text-md mb-3 font-normal">
        <b>Upvotes</b>: {developerInfo?.upvotes}
      </p>

      <button
        className="rounded bg-blue-400 px-4 py-2 font-semibold text-white  shadow hover:bg-blue-500"
        onClick={() => upvote.mutate()}
      >
        Upvote
      </button>
    </div>
  );
};

export default ElsieZhu;
