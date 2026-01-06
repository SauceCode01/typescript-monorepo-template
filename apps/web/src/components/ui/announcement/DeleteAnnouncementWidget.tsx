import { useDeleteAnnouncementMutation } from "@/features/announcement/announcementMutations";
import { useRef } from "react";

export const DeleteAnnouncementWidget = () => {
  const deleeteAnnouncementMutation = useDeleteAnnouncementMutation();

  const idRef = useRef<HTMLInputElement>(null);

  const handleDeleteAnnouncement = () => {
    if (!idRef.current?.value) return;
    deleeteAnnouncementMutation.mutate({
      announcementId: idRef.current?.value,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2 items-start w-full border p-4 rounded-md overflow-auto">
        <div>Delete announements</div>
        <div
          className="p-2 border bg-blue-200 rounded-md"
          onClick={handleDeleteAnnouncement}
        >
          delete announcement
        </div>
        <input
          ref={idRef}
          type="text"
          placeholder="id"
          className="p-2 border rounded-md"
        />
        {deleeteAnnouncementMutation.isPending ? (
          <div>Loading...</div>
        ) : deleeteAnnouncementMutation.isError ? (
          <div>Error...</div>
        ) : (
          // display announcemenet cards
          <div>Idle...</div>
        )}
      </div>
    </>
  );
};
