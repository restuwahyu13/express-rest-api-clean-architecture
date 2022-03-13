import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ISecret } from '@interfaces/interface.secret'

@Entity({ name: 'secret' })
export class ModelSecret implements ISecret {
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number

  @Column({ type: 'integer', unsigned: true, nullable: false })
  resource_by: number

  @Column({ type: 'varchar', nullable: false })
  resource_type: string

  @Column({ type: 'text', nullable: false })
  access_token: string

  @Column({ type: 'timestamptz', nullable: false })
  expired_at: Date

  @Column({ type: 'timestamp', default: new Date() })
  created_at: Date
}
