import { api } from "~/utils/api";

const Nolawi = () => {
    const nolawiInfo = api.developer.nolawi_info.useQuery().data;
    const mutation = api.developer.nolawi_upvote.useMutation();
    return (
        <div className="m-4 block max-w-sm rounded-lg border-2 border-blue-500 bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-800">
                {nolawiInfo?.name}
            </h2>
            <h3 className="text-lg mb-4 text-gray-600">Year: {nolawiInfo?.year}</h3>
            <p className="mb-4 text-gray-700">{nolawiInfo?.introduction}</p>
            <p className="mb-2 text-gray-700">
                <b>Favourite food:</b> {nolawiInfo?.fav_food}
            </p>
            <p className="mb-4 text-gray-700">
                <b>Favourite song:</b> {nolawiInfo?.fav_song}
            </p>
            <div className="flex flex-row items-center gap-4">
                <button
                    className="mt-4 rounded bg-blue-600 px-5 py-2 font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => mutation.mutate()}
                >
                    Upvote
                </button>
                <p className="pt-2 font-semibold text-gray-800">Upvotes: {nolawiInfo?.upvotes}</p>
            </div>
        </div>
    );
};

export default Nolawi;