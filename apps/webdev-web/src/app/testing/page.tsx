"use client";

import { useAuthContext } from "@/providers/AuthProvider";
import React from "react";

const TestingPage = () => {
  const authContext = useAuthContext();

  const handleApiRequest = async () => {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/announcements`
    );
    const data = await result.json();
    console.log(data);
  };

  const handlePostAnnouncement = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/announcements`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.token}`,
        },
        body: JSON.stringify({
          title: "Test Announcement",
          content: "This is a test announcement from the debug page.",
          creatorId: authContext.user?.id,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div>TestingPage</div>
      <button
        onClick={handleApiRequest}
        className="p-2 border rounded-2xl bg-blue-200"
      >
        Test API Request
      </button>
      <button
        onClick={handlePostAnnouncement}
        className="p-2 border rounded-2xl bg-blue-200"
      >
        handlePostAnnouncement
      </button>
    </>
  );
};

export default TestingPage;
