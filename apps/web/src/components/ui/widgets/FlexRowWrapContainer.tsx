import React from "react";

export const FlexRowWrapContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex flex-row flex-wrap gap-2">{children}</div>;
};
