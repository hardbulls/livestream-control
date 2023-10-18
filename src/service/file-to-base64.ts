import { arrayBufferToString } from "./array-buffer-to-string"

export const convertFileToBase64 = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = () => {
            if (reader.result) {
                resolve(arrayBufferToString(reader.result))

                return
            }

            reject(new Error("Cannot load file."))
        }
        reader.onerror = (error) => {
            reject(error)
        }
    })
}
