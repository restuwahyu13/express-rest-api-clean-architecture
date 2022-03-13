import ejs from 'ejs'
import path from 'path'
import fs from 'fs'
import { ExpressError } from '@helpers/helper.error'

export const renderTemplate = async (to: string, token: string, templateName: string): Promise<string | boolean> => {
  try {
    const url: string = process.env.URL || ''
    const dirname: string = path.resolve(__dirname, `../templates/${templateName}.ejs`)

    if (fs.existsSync(dirname)) {
      const htmlTemplate: string = await ejs.renderFile(dirname, { to, token, url }, { async: true, beautify: true })
      return htmlTemplate
    } else {
      return false
    }
  } catch (err: any) {
    return Promise.reject(new ExpressError('Render html template from ejs failed'))
  }
}
