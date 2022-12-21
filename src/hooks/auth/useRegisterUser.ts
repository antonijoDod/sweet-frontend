import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios';

type TRegisterUser = {
    username: string,
    email: string,
    password: string
}

type TAxiosResponse = {
    data: {
        jwt: string;
        user: {
            id: number;
            email: string;
            username: string;
        };
    };
};

type TCreateUserError = {
    response: {
        data: {
            error: {
                status: number;
                name: string;
                message: string;
                details: {
                    errors: { message: string, name: string, path: string[] }[]
                }
            };
        };
    };
};

export const useRegisterUser = () => {

    const postRecipe = async (userData: TRegisterUser) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_API}/api/auth/local/register`, { ...userData })
        return response.data
    }

    const registerUser = useMutation<TAxiosResponse, TCreateUserError, TRegisterUser>(postRecipe, {
        onSuccess: () => { }
    })

    return registerUser

}