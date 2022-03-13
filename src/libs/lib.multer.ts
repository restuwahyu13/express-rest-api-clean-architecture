import fs from 'fs'
import multer, { FileFilterCallback } from 'multer'
import { Request, Express } from 'express'
import { extensionSupport } from '@helpers/helper.extension'
import { ExpressError } from '@helpers/helper.error'

export const upload = multer({
  storage: multer.diskStorage({
    destination(_: Request, file: Express.Multer.File, done: any) {
      let linux: string = '/tmp'
      let window: string = process.env.TEMP || ''

      if (!file) {
        done(new ExpressError('Uploading file failed'), null)
      } else {
        if (process.platform === 'win32') {
          if (fs.existsSync(window)) {
            done(null, window)
          } else {
            done(new ExpressError('No such file directory').message, null)
          }
        } else {
          if (fs.existsSync(linux)) {
            done(null, linux)
          } else {
            done(new ExpressError('No such file directory').message, null)
          }
        }
      }
    },
    filename(_req: Request, file: Express.Multer.File, done: any) {
      if (!file) done(new ExpressError('Get file upload failed'), null)
      done(null, `${Date.now()}_${file.originalname}`)
    }
  }),
  fileFilter(_req: Request, file: Express.Multer.File, done: FileFilterCallback) {
    if (!extensionSupport(file.mimetype) || !file) {
      throw Promise.reject(new ExpressError('File format not supported'))
    }
    done(null, true)
  },
  limits: { fileSize: 2000000 }
}) as multer.Multer
