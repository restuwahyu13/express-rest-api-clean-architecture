import { Transform } from 'class-transformer'
import { IsNotEmpty, IsInt, IsString, IsOptional, IsNumberString } from 'class-validator'

export class DTORatings {
  @IsNotEmpty()
  @IsNumberString()
  rating: string

  @IsNotEmpty()
  @IsString()
  noted: string

  @IsNotEmpty()
  @IsInt()
  book_id: number

  @IsOptional()
  @IsInt()
  user_id?: number
}

export class DTORatingsByID {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  user_id: number
}
