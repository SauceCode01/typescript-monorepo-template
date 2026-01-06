import { useDeleteStudyJamMutation } from "@/features/studyJam/studyJam.mutation";
import { useRef } from "react";

export const DeleteStudyJamWidget = () => {
  const deleeteStudyJamMutation = useDeleteStudyJamMutation();

  const idRef = useRef<HTMLInputElement>(null);

  const handleDeleteStudyJam = () => {
    if (!idRef.current?.value) return;
    deleeteStudyJamMutation.mutate({
      studyJamId: idRef.current?.value,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2 items-start w-full border p-4 rounded-md overflow-auto">
        <div>Delete announements</div>
        <div
          className="p-2 border bg-blue-200 rounded-md"
          onClick={handleDeleteStudyJam}
        >
          delete studyJam
        </div>
        <input
          ref={idRef}
          type="text"
          placeholder="id"
          className="p-2 border rounded-md"
        />
        {deleeteStudyJamMutation.isPending ? (
          <div>Loading...</div>
        ) : deleeteStudyJamMutation.isError ? (
          <div>Error...</div>
        ) : (
          // display announcemenet cards
          <div>Idle...</div>
        )}
      </div>
    </>
  );
};
