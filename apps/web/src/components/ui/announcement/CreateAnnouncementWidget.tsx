import { useCreateAnnouncementMutation } from "@/features/announcement/announcementMutations";
import { useRef } from "react";

export const CreateAnnouncementWidget = () => {
  const createAnnouncementMutation = useCreateAnnouncementMutation();

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleCreateAnnouncement = () => {
    createAnnouncementMutation.mutate({
      dto: {
        title: titleRef.current?.value ?? "New Announcement",
        content:
          contentRef.current?.value ??
          "This is the content of the new announcement.",
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 items-start w-full border p-4 rounded-md overflow-auto">
      <div>Create announements</div>
      <div
        className="p-2 border bg-blue-200 rounded-md"
        onClick={handleCreateAnnouncement}
      >
        create announcement
      </div>
      <input
        ref={titleRef}
        type="text"
        placeholder="title"
        className="p-2 border rounded-md"
      />
      <textarea
        ref={contentRef}
        placeholder="content"
        className="p-2 border rounded-md"
      />
      {createAnnouncementMutation.isPending ? (
        <div>Loading...</div>
      ) : createAnnouncementMutation.isError ? (
        <div>Error...</div>
      ) : (
        <pre className="">idle</pre>
      )}
    </div>
  );
};