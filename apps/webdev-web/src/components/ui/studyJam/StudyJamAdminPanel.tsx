import React from "react";

import { StudyJamListWidget } from "@/components/ui/studyJam/StudyJamListWidget";
import { DeleteStudyJamWidget } from "@/components/ui/studyJam/DeleteStudyJamWidget";
import { GetStudyJamWidget } from "@/components/ui/studyJam/GetStudyJamWidget";
import { UpdateStudyJamWidget } from "@/components/ui/studyJam/UpdateStudyJamWidget";
import { CreateStudyJamWidget } from "./CreateStudyJamWidget";

export const StudyJamAdminPanel = () => {
  return (
    <div className="flex flex-row gap-2 w-full">
      <div className="flex flex-col gap-2 w-full">
        <CreateStudyJamWidget />

        <UpdateStudyJamWidget />

        <GetStudyJamWidget />

        <DeleteStudyJamWidget />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <StudyJamListWidget />
      </div>
    </div>
  );
};
