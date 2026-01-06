import { announcementResourceObjectType } from "@packages/api-types";

export const AnnouncementCard = ({
  announcement,
}: {
  announcement: announcementResourceObjectType;
}) => {
  return (
    <div key={announcement.id} className="border p-2 rounded-md w-full">
      <div className="font-bold text-lg">title: {announcement.attributes.title}</div>
      <div>content: {announcement.attributes.content}</div>
      <div>created at: {announcement.attributes.created_at}</div>
      <div>id: {announcement.id}</div>
      <div>type: {announcement.type}</div>
      <div>Creator: {announcement.relationships.creator.data.id}</div>
    </div>
  );
};
