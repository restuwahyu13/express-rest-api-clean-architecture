import { Column, Entity, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn } from 'typeorm'
import { InterfaceRoles } from '@interfaces/interface.roles'
import { ModelUsers } from '@models/model.users'

class DatabaseRelation {
  @OneToMany(() => ModelUsers, (relation) => relation.role)
  public users: ModelUsers[]
}

@Entity({ name: 'roles' })
export class ModelRoles extends DatabaseRelation implements InterfaceRoles {
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string

  @Column({ type: 'timestamp', default: new Date() })
  created_at: Date

  @Column({ type: 'timestamp', default: new Date() })
  updated_at: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date
}
