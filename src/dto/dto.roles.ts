import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString, IsInt } from 'class-validator'

export class DTORoles {
  @IsNotEmpty()
  @IsString()
  name: string
}

export class DTORolesByID {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number
}
