import React, { useState, ChangeEvent, ReactElement } from "react";
import { useCreatePrivateUpload } from "@hooks/private-uploads";
import FormData from "form-data";
import { TPrivateUpload } from "@types";
import EmptyImage from "./EmptyImage";
import ImageExist from "./ImageExist";
import { Alert, AlertTitle } from "@chakra-ui/react";

type TAddImageProps = {
    onChange: (event: number) => void;
};

const AddImage = ({ onChange }: TAddImageProps): ReactElement => {
    const { uploadImage, isLoading, isError } = useCreatePrivateUpload();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

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
                    onChange(data.data.attributes.media.data.id);
                },
            });
        }
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
        <ImageExist imageUrl={imageUrl} />
    );
};

export default AddImage;
