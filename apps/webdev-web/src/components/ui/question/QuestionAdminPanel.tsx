import React from "react";

import { QuestionListWidget } from "@/components/ui/question/QuestionListWidget";
import { CreateQuestionWidget } from "@/components/ui/question/CreateQuestionWidget";
import { DeleteQuestionWidget } from "@/components/ui/question/DeleteQuestionWidget";
import { GetQuestionWidget } from "@/components/ui/question/GetQuestionWidget";
import { UpdateQuestionWidget } from "@/components/ui/question/UpdateQuestionWidget";

export const QuestionAdminPanel = () => {
  return (
    <div className="flex flex-row gap-2 w-full">
      <div className="flex flex-col gap-2 w-full">
        <CreateQuestionWidget />

        <UpdateQuestionWidget />

        <GetQuestionWidget />

        <DeleteQuestionWidget />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <QuestionListWidget />
      </div>
    </div>
  );
};
