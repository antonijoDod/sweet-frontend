import { TPrivateUpload } from './private-upload.d';
import { TPagination } from './meta'

export type TPrivateUploads = {
    data: TPrivateUpload[]
    meta: TPagination
}