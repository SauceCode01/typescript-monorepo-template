"use client"; 
import {
  useClaimTokenMutation,
  useCreateTokenMutation,
  useVoidTokenMutation,
} from "@/features/tokens/mutations";
import {
  useInfiniteTokenQuery,
  useTokenQuery,
} from "@/features/tokens/queries";
import { CreateTokenDTO } from "@/features/tokens/types";
import { useAuthStore } from "@/stores/authStore";
import React from "react";

const page = () => {
  return (
    <>
      <TokensList />

      <GetTokenForm />

      <CreateTokenForm />

      <VoidTokenForm />

      <ClaimTokenForm />
    </>
  );
};

const TokensList = () => {
  const { data: tokens, isLoading } = useInfiniteTokenQuery();
  return (
    <div className="w-full p-4 border-2 bg-white shadow-md">
      <div className="text-2xl">LIST TOKENS</div>
      <div className="w-full flex flex-col gap-2">
        {tokens?.map((token) => (
          <pre
            key={token.id}
            className="bg-gray-300 shadow-sm flex flex-col gap-2"
          >
            {JSON.stringify(token, null, 2)}
          </pre>
        ))}
      </div>
    </div>
  );
};

const GetTokenForm = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [queryTokenId, setQueryTokenId] = React.useState<string | undefined>();
  const handleGetToken = async () => {
    setQueryTokenId(inputRef.current?.value);
  };
  const { data: token } = useTokenQuery(queryTokenId);

  return (
    <div className="w-full p-4 border-2 bg-white shadow-md">
      <div className="text-2xl">GET TOKEN</div>
      <input ref={inputRef} type="text" placeholder="token id" />
      <button onClick={handleGetToken}>GET</button>
      <div className="w-full flex flex-col gap-2">
        {token ? (
          <pre className="bg-gray-300 shadow-sm flex flex-col gap-2">
            {JSON.stringify(token, null, 2)}
          </pre>
        ) : (
          <div>no token</div>
        )}
      </div>
    </div>
  );
};

const CreateTokenForm = () => {
  const createTokenMutation = useCreateTokenMutation();
  const { token } = useAuthStore();

  const handleOnCreateToken = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      console.log("no token");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData);

    const expirationDateString = formEntries.expirationDate as string;
    const expirationDate = new Date(expirationDateString).getTime();

    const createTokenDTO: CreateTokenDTO = {
      value: Number(formEntries.value),
      maxUses: Number(formEntries.maxUses),
      expirationDate, // now a number
    };

    console.log("createTokenDTO", createTokenDTO);

    await createTokenMutation.mutateAsync({
      createTokenDTO,
      authToken: token,
    });
  };

  return (
    <>
      <div className="w-full p-4 border-2 bg-white shadow-md">
        <div className="text-2xl">CREATE TOKEN</div>
        <form
          onSubmit={handleOnCreateToken}
          className="flex flex-col gap-2 items-start"
        >
          <input name="value" type="number" placeholder="value" />
          <input name="maxUses" type="number" placeholder="maxUses" />
          <input
            name="expirationDate"
            type="date"
            placeholder="expirationDate"
          />
          <button type="submit" className="p-2 border">
            create token
          </button>
        </form>
      </div>
    </>
  );
};

const VoidTokenForm = () => {
  const voidTokenMutation = useVoidTokenMutation();
  const { token } = useAuthStore();

  const handleOnVoidToken = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      console.log("no token");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData);

    const tokenId = formEntries.tokenId as string;

    const result = await voidTokenMutation.mutateAsync({
      authToken: token,
      tokenId,
    });

    console.log("successfully voided token", result);
  };

  return (
    <>
      <div className="w-full p-4 border-2 bg-white shadow-md">
        <div className="text-2xl">VOID TOKEN</div>
        <form
          onSubmit={handleOnVoidToken}
          className="flex flex-col gap-2 items-start"
        >
          <input type="text" name="tokenId" placeholder="token id" />
          <button type="submit" className="p-2 border">
            void token
          </button>
        </form>
      </div>
    </>
  );
};

const ClaimTokenForm = () => {
  const claimTokenMutation = useClaimTokenMutation();
  const { token: authToken } = useAuthStore();

  const handleOnVoidToken = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authToken) {
      console.log("no auth token");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData);

    const tokenId = formEntries.tokenId as string;

    const result = await claimTokenMutation.mutateAsync({
      authToken,
      tokenId,
    });

    console.log("successfully claimed token", result);
  };

  return (
    <>
      <div className="w-full p-4 border-2 bg-white shadow-md">
        <div className="text-2xl">CLAIM TOKEN</div>
        <form
          onSubmit={handleOnVoidToken}
          className="flex flex-col gap-2 items-start"
        >
          <input type="text" name="tokenId" placeholder="token id" />
          <button type="submit" className="p-2 border">
            claim token
          </button>
        </form>
      </div>
    </>
  );
};

export default page;
