import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';

export const useDeleteRecipe = () => {
    const queryClient = useQueryClient();
    const { data: session, status } = useSession()

    const [jwt, setJwt] = useState<string | null>(null)

    useEffect(() => {
        if (status !== "loading" && status === "authenticated") {
            setJwt(session.jwt)
        }
    }, [status])

    const postRecipe = async (recipeId: number) => {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_API}/api/recipes/${recipeId}`, { headers: { "Authorization": `Bearer ${jwt}` } })
        return response.data
    }


    const deleteRecipe = useMutation(postRecipe, {
        onSuccess: () => queryClient.invalidateQueries(["privateRecipes"]),
    })

    return deleteRecipe

}