export class ExpressError extends Error {
  public name: string
  public message: string

  constructor(message: string) {
    super(message)

    this.name = this.constructor.name
    this.message = message

    Error.captureStackTrace(this, this.constructor)
  }
}
