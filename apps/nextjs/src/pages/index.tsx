import Head from "next/head";
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import HelenaGlowacki from "~/components/developers/helenaglowacki";
import HelenZhao from "~/components/developers/helenzhao";
import JasonWangCard from "~/components/developers/jasonwang";
import MinhLe from "~/components/developers/minhle";
import RamRaghavSharma from "~/components/developers/ramraghavsharma";
import RyanLi from "~/components/developers/ryanli";
import SarinaLi from "~/components/developers/sarinali";
import { api } from "~/utils/api";

export default function Home() {
  const developerCount = api.developer.count.useQuery();
  const { isSignedIn } = useAuth();
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
        <SarinaLi />
        <JasonWangCard />
        <HelenZhao />
        <HelenaGlowacki />
        <RamRaghavSharma />
        <MinhLe />
        <div>
          {isSignedIn ? "" : <SignInButton />}
          <UserButton afterSignOutUrl="/" />
        </div>
      </main>
    </>
  );
}
