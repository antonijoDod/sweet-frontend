import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TPrivateUploads } from "@types";
import { useSession } from 'next-auth/react'

export const useGetPrivateUploads = () => {
    const { data: session, status } = useSession()

    const [jwt, setJwt] = useState<string | null>(null)

    useEffect(() => {
        if (status !== "loading" && status === "authenticated") {
            setJwt(session.jwt)
        }
    }, [status])

    const {
        data: privateUploads,
        isLoading,
        isError,
    } = useQuery<TPrivateUploads>(
        ["privateUploads"],
        async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_API}/api/private-uploads`, { headers: { "Authorization": `Bearer ${jwt}` } }
            );
            return await res.data;
        },
        { enabled: !!jwt },
    );

    return { privateUploads, isLoading, isError };
};
