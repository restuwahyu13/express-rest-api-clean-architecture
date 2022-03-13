import { IsNotEmpty, IsEmail, MinLength, IsInt, IsOptional } from 'class-validator'

export class DTORegister {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(8)
  password: string

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  role_id?: number
}

export class DTOLogin {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty({ message: 'password is not empty' })
  @MinLength(8)
  password: string
}
