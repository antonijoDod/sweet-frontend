import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

export const useDeletePrivateUpload = () => {
    const queryClient = useQueryClient();
    const { data: session, status } = useSession()

    const [jwt, setJwt] = useState<string | null>(null)

    useEffect(() => {
        if (status !== "loading" && status === "authenticated") {
            setJwt(session.jwt)
        }
    }, [status])

    const deletePrivateUpload = async (privateUploadId: number) => {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_API}/api/private-uploads/${privateUploadId}`, { headers: { "Authorization": `Bearer ${jwt}` } })
        return response.data
    }


    const {
        mutate: mutateDeleteImage,
        isLoading: isDeleteImageLoading,
        isError: isDeleteImageError
    } = useMutation(deletePrivateUpload, {
        onSuccess: () => {
            queryClient.invalidateQueries(["privateImages"]),
                toast.success('Slika je uspješno obrisana!', {
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

    return { mutateDeleteImage, isDeleteImageLoading, isDeleteImageError }

}