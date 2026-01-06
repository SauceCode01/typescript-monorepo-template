import { useCreateStudyJamMutation } from "@/features/studyJam/studyJam.mutation";
import { useRef } from "react";

export const CreateStudyJamWidget = () => {
  const createStudyJamMutation = useCreateStudyJamMutation();

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleCreateStudyJam = () => {
    createStudyJamMutation.mutate({
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
      <div>Create studyJams</div>
      <div
        className="p-2 border bg-blue-200 rounded-md"
        onClick={handleCreateStudyJam}
      >
        create studyJam
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
      {createStudyJamMutation.isPending ? (
        <div>Loading...</div>
      ) : createStudyJamMutation.isError ? (
        <div>Error...</div>
      ) : (
        <pre className="">idle</pre>
      )}
    </div>
  );
};