import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import { TRecipeAttributes } from '@types'

export const useCreateRecipe = () => {
    const queryClient = useQueryClient();
    const { data: session, status } = useSession()

    const [jwt, setJwt] = useState<string | null>(null)

    useEffect(() => {
        if (status !== "loading" && status === "authenticated") {
            setJwt(session.jwt)
        }
    }, [status])

    const postRecipe = async (postData: TRecipeAttributes) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/api/recipes`, { data: { ...postData } }, { headers: { "Authorization": `Bearer ${jwt}` } })
        return response.data
    }


    const { mutate: createRecipe, isLoading, isError } = useMutation(postRecipe, {
        onSuccess: () => queryClient.invalidateQueries(["privateRecipes"]),
    })

    return { createRecipe, isLoading, isError }

}