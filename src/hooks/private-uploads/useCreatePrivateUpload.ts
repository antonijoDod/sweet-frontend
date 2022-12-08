import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export const useCreatePrivateUpload = () => {
    const queryClient = useQueryClient();
    const { data: session, status } = useSession()

    const [jwt, setJwt] = useState<string | null>(null)

    useEffect(() => {
        if (status !== "loading" && status === "authenticated") {
            setJwt(session.jwt)
        }
    }, [status])

    const postPrivateUpload = async (formData) => {
        console.log("🚀 ~ file: useCreatePrivateUpload.ts:20 ~ postPrivateUpload ~ file", formData)
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/api/private-uploads`, formData, { headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${jwt}` } })
        return response.data
    }


    const { mutate: uploadImage, isLoading, isError } = useMutation(postPrivateUpload, {
        onSuccess: () => {
            queryClient.invalidateQueries(["privateImages"]),
                toast.success('Slika je uspješno spremljena!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
        },
        onError: () => {
            toast.error('Dogodila se pogreška!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        }
    })

    return { uploadImage, isLoading, isError }

}