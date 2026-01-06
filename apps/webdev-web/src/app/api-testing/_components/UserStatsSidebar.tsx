import {
  useAllUserStatsQuery,
  useAllUserStreaksQuery,
  useAllUserWalletsQuery,
  useUserStatsQuery,
} from "@/features/userStats/queries";
import { useAuthStore } from "@/stores/authStore";
import React from "react";

export const UserStatsSidebar = () => {
  const [tab, setTab] = React.useState("stats");

  return (
    <>
      <div className="w-full flex flex-col gap-2 bg-white border shadow-md">
        <div className="w-full flex flex-row gap-2 justify-around">
          <div
            className="p-2 border cursor-pointer hover:bg-gray-200 "
            onClick={() => setTab("myStats")}
          >
            myStats
          </div>
          <div
            className="p-2 border cursor-pointer hover:bg-gray-200 "
            onClick={() => setTab("statsQuery")}
          >
            statsQuery
          </div>
          <div
            className="p-2 border cursor-pointer hover:bg-gray-200 "
            onClick={() => setTab("stats")}
          >
            stats
          </div>
          <div
            className="p-2 border cursor-pointer hover:bg-gray-200 "
            onClick={() => setTab("wallets")}
          >
            wallets
          </div>
          <div
            className="p-2 border cursor-pointer hover:bg-gray-200 "
            onClick={() => setTab("streaks")}
          >
            streaks
          </div>
        </div>
        {tab === "myStats" && <MyStatsTab />}
        {tab === "statsQuery" && <StatsQueryTab />}
        {tab === "stats" && <StatsTab />}
        {tab === "wallets" && <WalletsTab />}
        {tab === "streaks" && <StreaksTab />}
      </div>
    </>
  );
};

const MyStatsTab = () => {
  const { user } = useAuthStore();
  const { data: userStats } = useUserStatsQuery(user?.uid);
  return (
    <div className="w-full p-4 border-2 bg-white shadow-md flex flex-col items-start">
      <div className="w-full flex flex-col gap-2">
        {userStats ? (
          <pre className="bg-gray-300 shadow-sm flex flex-col gap-2">
            {JSON.stringify(userStats, null, 2)}
          </pre>
        ) : (
          <div>No stats</div>
        )}
      </div>
    </div>
  );
};

const StatsQueryTab = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uid, setUid] = React.useState<string | undefined>();
  const handleGetToken = async () => {
    setUid(inputRef.current?.value);
  };
  const { data: userStats } = useUserStatsQuery(uid);

  return (
    <div className="w-full p-4 border-2 bg-white shadow-md flex flex-col items-start">
      <input ref={inputRef} type="text" placeholder="user id" />
      <button onClick={handleGetToken} className="border p-2">
        GET
      </button>
      <div className="w-full flex flex-col gap-2">
        {userStats ? (
          <pre className="bg-gray-300 shadow-sm flex flex-col gap-2">
            {JSON.stringify(userStats, null, 2)}
          </pre>
        ) : (
          <div>no uid provided</div>
        )}
      </div>
    </div>
  );
};
const StatsTab = () => {
  const { data: allUserStats, isLoading } = useAllUserStatsQuery();
  return (
    <>
      <div className="flex flex-col gap-4">
        {allUserStats?.map((userStat) => (
          <pre
            key={userStat.id}
            className="bg-gray-300 shadow-sm flex flex-col gap-2 hover:bg-gray-200"
          >
            {JSON.stringify(userStat, null, 2)}
          </pre>
        ))}
      </div>
    </>
  );
};
const WalletsTab = () => {
  const { data: allUserWallets, isLoading: userWalletsLoading } =
    useAllUserWalletsQuery();
  return (
    <>
      <div className="flex flex-col gap-4">
        {allUserWallets?.map((userWallet) => (
          <pre
            key={userWallet.id}
            className="bg-gray-300 shadow-sm flex flex-col gap-2 hover:bg-gray-200"
          >
            {JSON.stringify(userWallet, null, 2)}
          </pre>
        ))}
      </div>
    </>
  );
};
const StreaksTab = () => {
  const { data: allUserStreaks, isLoading: userStreaksLoading } =
    useAllUserStreaksQuery();
  return (
    <>
      <div className="flex flex-col gap-4">
        {allUserStreaks?.map((userWallet) => (
          <pre
            key={userWallet.id}
            className="bg-gray-300 shadow-sm flex flex-col gap-2 hover:bg-gray-200"
          >
            {JSON.stringify(userWallet, null, 2)}
          </pre>
        ))}
      </div>
    </>
  );
};
