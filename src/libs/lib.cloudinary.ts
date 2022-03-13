import cloudinary, { UploadApiResponse } from 'cloudinary'
import { ExpressError } from '@helpers/helper.error'

export { UploadApiResponse }
export const cloudinaryStorage = async (filename: string): Promise<UploadApiResponse> => {
  try {
    const cloudStorage: typeof cloudinary.v2 = cloudinary.v2
    cloudStorage.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
      shorten: true,
      secure: true,
      ssl_detected: true
    })
    const res = (await cloudStorage.uploader.upload(filename, { resource_type: 'auto' })) as UploadApiResponse
    return res
  } catch (e: any) {
    return Promise.reject(new ExpressError(`Uploading file error: ${e.message}`))
  }
}
