import Link from "next/link";

const page = async () => {
  return (
    <>
      <div>Home page</div>
      <Link href="/policies">Go to Policies page</Link>
    </>
  );
};

export default page;
