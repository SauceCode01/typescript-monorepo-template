import { useAnnouncementQuery } from "@/features/announcement/announcementQueries";
import { useRef, useState } from "react";
import { AnnouncementCard } from "./AnnouncementCard";

export const GetAnnouncementWidget = () => {
  const [id, setId] = useState<string | undefined>(undefined);
  const idRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError } = useAnnouncementQuery(id);

  const handleGetAnnouncement = () => {
    setId(idRef.current?.value);
  };

  return (
    <div className="flex flex-col gap-2 items-start w-full border p-4 rounded-md overflow-auto">
      <div>Get announements</div>
      <div
        className="p-2 border bg-blue-200 rounded-md"
        onClick={handleGetAnnouncement}
      >
        get announcement
      </div>
      <input
        ref={idRef}
        type="text"
        placeholder="id"
        className="p-2 border rounded-md"
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error...</div>
      ) : (
        // display announcemenet cards
        <>
          {data?.data &&
            [data?.data].map((announcement: any) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
              />
            ))}
        </>
      )}
    </div>
  );
};