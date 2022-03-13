import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString, IsInt, IsOptional, IsDate } from 'class-validator'

export class DTOBooks {
  @Transform(({ value }) => String(value), { toClassOnly: true })
  @IsNotEmpty()
  @IsString()
  name: string

  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsNotEmpty()
  @IsInt()
  isbn: number

  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsNotEmpty()
  @IsInt()
  price: number

  @Transform(({ value }) => String(value), { toClassOnly: true })
  @IsNotEmpty()
  description: string

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsNotEmpty()
  @IsDate()
  release_date: Date

  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsNotEmpty()
  @IsInt()
  pages: number

  @Transform(({ value }) => String(value), { toClassOnly: true })
  @IsNotEmpty()
  @IsString()
  publisher: string

  @Transform(({ value }) => String(value), { toClassOnly: true })
  @IsNotEmpty()
  @IsString()
  language: string

  @IsOptional()
  @IsString({ each: true })
  images?: string[]

  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsNotEmpty()
  @IsInt()
  author_id: number
}

export class DTOBooksByID {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number
}
