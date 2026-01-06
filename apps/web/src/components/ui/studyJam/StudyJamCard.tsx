import { studyJamResourceObjectType } from "@packages/api-types";

export const StudyJamCard = ({
  studyJam,
}: {
  studyJam: studyJamResourceObjectType;
}) => {
  return (
    <div key={studyJam.id} className="border p-2 rounded-md w-full">
      <div className="font-bold text-lg">title: {studyJam.attributes.title}</div>
      <div>description: {studyJam.attributes.description}</div>
      <div>created at: {studyJam.attributes.created_at}</div>
      <div>id: {studyJam.id}</div>
      <div>type: {studyJam.type}</div>
      <div>Creator: {studyJam.relationships.creator.data.id}</div>
    </div>
  );
};
