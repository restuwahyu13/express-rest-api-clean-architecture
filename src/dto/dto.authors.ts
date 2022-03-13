import { Transform, Type } from 'class-transformer'
import { IsNotEmpty, IsString, IsDate, IsInt } from 'class-validator'

export class DTOAuthors {
  @IsNotEmpty()
  @IsString()
  firstname: string

  @IsNotEmpty()
  @IsString()
  lastname: string

  @IsNotEmpty()
  @IsString()
  place_of_birth: string

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date_of_birth: Date
}

export class DTOAuthorsById {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number
}
