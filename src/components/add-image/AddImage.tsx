import React, { useState, ChangeEvent, ReactElement } from "react";
import {
    useCreatePrivateUpload,
    useDeletePrivateUpload,
} from "@hooks/private-uploads";
import FormData from "form-data";
import { TPrivateUpload } from "@types";
import EmptyImage from "./EmptyImage";
import ImageExist from "./ImageExist";
import { Alert, AlertTitle } from "@chakra-ui/react";

type TAddImageProps = {
    onChange: (event: number | null) => void;
};

const AddImage = ({ onChange }: TAddImageProps): ReactElement => {
    const { uploadImage, isLoading, isError } = useCreatePrivateUpload();
    const { mutateDeleteImage, isDeleteImageLoading, isDeleteImageError } =
        useDeletePrivateUpload();

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageId, setImageId] = useState<number | null>(null);

    const handleUploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const files = event.target.files;
        if (files) {
            const data = { file: "media", name: "my-image" };
            let formData = new FormData();

            formData.append("files.media", files[0]);

            formData.append("data", JSON.stringify(data));

            await uploadImage(formData, {
                onSuccess: (data: { data: TPrivateUpload }) => {
                    setImageUrl(
                        data.data.attributes.media.data.attributes.formats
                            .thumbnail.url
                    );
                    setImageId(data.data.attributes.media.data.id);
                    onChange(data.data.attributes.media.data.id);
                },
            });
        }
    };

    const handleDeleteImage = async (imageId: number) => {
        await mutateDeleteImage(imageId, {
            onSuccess: () => {
                setImageUrl(null);
                setImageId(null);
                onChange(null);
            },
        });
    };

    if (isError)
        return (
            <Alert status="error">
                <AlertTitle>Something went wrong</AlertTitle>
            </Alert>
        );

    return !imageUrl ? (
        <EmptyImage
            onImageChange={(event) => handleUploadImage(event)}
            isLoading={isLoading}
        />
    ) : (
        <ImageExist
            id={imageId!}
            imageUrl={imageUrl}
            onClickDeleteImage={(imageId) => handleDeleteImage(imageId)}
        />
    );
};

export default AddImage;
