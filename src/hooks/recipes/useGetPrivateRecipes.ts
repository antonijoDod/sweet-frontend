import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TRecipes } from "@types";
import { useSession } from 'next-auth/react'

export const useGetPrivateRecipes = () => {
    const { data: session, status } = useSession()

    const [jwt, setJwt] = useState<string | null>(null)

    useEffect(() => {
        if (status !== "loading" && status === "authenticated") {
            setJwt(session.jwt)
        }
    }, [status])

    const {
        data: privateRecipes,
        isLoading,
        isError,
    } = useQuery<TRecipes>(
        ["privateRecipes"],
        async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_API}/api/recipes/private?sort[publishedAt]=Desc`, { headers: { "Authorization": `Bearer ${jwt}` } }
            );
            return await res.data;
        },
        { keepPreviousData: true, enabled: !!jwt },
    );

    return { privateRecipes, isLoading, isError };
};
