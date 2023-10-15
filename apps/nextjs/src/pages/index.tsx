import Head from "next/head";

import { api } from "~/utils/api";
import RyanLi from "../components/developers/ryanli";

export default function Home() {
  const developerCount = api.developer.count.useQuery();
  return (
    <>
      <Head>
        <title>Centre for Dreams</title>
        <meta name="description" content="Centre for Dreams" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div> Centre for Dreams Home Page </div>
        <div> We have {developerCount.data} awesome devs on our team! </div>
        <RyanLi />
      </main>
    </>
  );
}
