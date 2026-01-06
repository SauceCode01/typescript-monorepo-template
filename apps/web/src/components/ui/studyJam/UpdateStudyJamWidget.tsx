import { useUpdateStudyJamMutation } from "@/features/studyJam/studyJam.mutation";
import { useRef } from "react";

export const UpdateStudyJamWidget = () => {
  const updateStudyJamMutation = useUpdateStudyJamMutation();

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const idRef = useRef<HTMLInputElement>(null);

  const handleUpdateStudyJam = () => {
    updateStudyJamMutation.mutate({
      id: idRef.current?.value ?? "",
      dto: {
        title: titleRef.current?.value ?? "New StudyJam",
        description:
          contentRef.current?.value ??
          "This is the content of the new studyJam.",
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 items-start w-full border p-4 rounded-md overflow-auto">
      <div>Update announement</div>
      <div
        className="p-2 border bg-blue-200 rounded-md"
        onClick={handleUpdateStudyJam}
      >
        update studyJam
      </div>
      <input
        ref={idRef}
        type="text"
        placeholder="id"
        className="p-2 border rounded-md"
      />
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
      {updateStudyJamMutation.isPending ? (
        <div>Loading...</div>
      ) : updateStudyJamMutation.isError ? (
        <div>Error...</div>
      ) : (
        <pre className="">idle</pre>
      )}
    </div>
  );
};