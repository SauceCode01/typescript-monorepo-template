import React from "react";

import { AnnouncementListWidget } from "@/components/ui/announcement/AnnouncementListWidget";
import { CreateAnnouncementWidget } from "@/components/ui/announcement/CreateAnnouncementWidget";
import { DeleteAnnouncementWidget } from "@/components/ui/announcement/DeleteAnnouncementWidget";
import { GetAnnouncementWidget } from "@/components/ui/announcement/GetAnnouncementWidget";
import { UpdateAnnouncementWidget } from "@/components/ui/announcement/UpdateAnnouncementWidget";

export const AnnouncementAdminPanel = () => {
  return (
    <div className="flex flex-row gap-2 w-full">
      <div className="flex flex-col gap-2 w-full">
        <CreateAnnouncementWidget />

        <UpdateAnnouncementWidget />

        <GetAnnouncementWidget />

        <DeleteAnnouncementWidget />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <AnnouncementListWidget />
      </div>
    </div>
  );
};
