import Link from "next/link";

const page = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Link
          href="/api-testing/tokens"
          className="hover:underline hover:text-blue-500"
        >
          Tokens testing page "/api-testing/tokens"
        </Link> 
        <Link
          href="/api-testing/auth"
          className="hover:underline hover:text-blue-500"
        >
          Auth testing page "/api-testing/auth"
        </Link>
      </div>
    </>
  );
};

export default page;
