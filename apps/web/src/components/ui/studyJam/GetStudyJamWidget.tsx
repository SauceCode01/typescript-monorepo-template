import { useStudyJamQuery } from "@/features/studyJam/studyjam.query";
import { useRef, useState } from "react";
import { StudyJamCard } from "./StudyJamCard";

export const GetStudyJamWidget = () => {
  const [id, setId] = useState<string | undefined>(undefined);
  const idRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError } = useStudyJamQuery(id);

  const handleGetStudyJam = () => {
    setId(idRef.current?.value);
  };

  return (
    <div className="flex flex-col gap-2 items-start w-full border p-4 rounded-md overflow-auto">
      <div>Get announements</div>
      <div
        className="p-2 border bg-blue-200 rounded-md"
        onClick={handleGetStudyJam}
      >
        get studyJam
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
            [data?.data].map((studyJam: any) => (
              <StudyJamCard
                key={studyJam.id}
                studyJam={studyJam}
              />
            ))}
        </>
      )}
    </div>
  );
};