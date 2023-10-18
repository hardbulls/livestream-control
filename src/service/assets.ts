import { resizeImage } from "./image-resize"
import { convertFileToBase64 } from "./file-to-base64"

const BLOB_CACHE: { [key: string]: File | Blob } = {}
const RESIZED_IMAGE_CACHE: { [key: string]: string } = {}

export const getBlob = async (path: string) => {
    if (!BLOB_CACHE[path]) {
        const response = await fetch(`${window.location.origin}/${path}`)

        BLOB_CACHE[path] = await response.blob()
    }

    return BLOB_CACHE[path]
}

export const getResizedImage = async (path: string) => {
    if (!RESIZED_IMAGE_CACHE[path]) {
        RESIZED_IMAGE_CACHE[path] = await resizeImage(100, await convertFileToBase64(await getBlob(path)))
    }

    return RESIZED_IMAGE_CACHE[path]
}
