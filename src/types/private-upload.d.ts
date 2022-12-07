import { TImage } from './image'

export type TPrivateUploadAttributes = {
    name: string
    description: string | null
    createdAt: string
    updatedAt: string
    media: {
        data: TImage
    }
}

export type TPrivateUpload = {
    id: number,
    attributes: TPrivateUploadAttributes
}