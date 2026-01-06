"use client";

import { AnnouncementAdminPanel } from "@/components/ui/announcement/AnnouncementAdminPanel";
import { QuestionAdminPanel } from "@/components/ui/question/QuestionAdminPanel";
import { StudyJamAdminPanel } from "@/components/ui/studyJam/StudyJamAdminPanel";
import { cn } from "@/utils/tailwind.utils";
import { useState } from "react";

const PANELS = ["announcement", "study-jam", "question"];

const AdminPage = () => {
  const [panel, setPanel] = useState<string>("announcement");

  return (
    <>
      <div className="flex flex-col gap-4">
        <div>AdminPage</div>

        <div className="flex flex-col gap-2 mx-auto p-2 w-full max-w-7xl  ">
          <div className="flex flex-wrap gap-2 flex-row p-2">
            {PANELS.map((p) => (
              <button
                key={p}
                className={cn(
                  "p-2 border bg-blue-200 cursor-pointer",
                  panel === p ? "  border-blue-600 bg-yellow-300" : ""
                )}
                onClick={() => setPanel(p)}
              >
                {p}
              </button>
            ))}
          </div>
          {panel === "announcement" ? (
            <AnnouncementAdminPanel />
          ) : panel === "study-jam" ? (
            <StudyJamAdminPanel />
          ) : panel === "question" ? (
            <QuestionAdminPanel />
          ) : (
            <div>no panel</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
