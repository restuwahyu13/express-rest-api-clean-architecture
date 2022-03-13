import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm'
import { InterfaceUsers } from '@interfaces/interface.users'
import { ModelRoles } from '@models/model.roles'
import { ModelRatings } from '@models/model.ratings'
import { hashPassword } from '@libs/lib.bcrypt'

class DatabaseRelation {
  @ManyToOne(() => ModelRoles, (relation) => relation.users)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: ModelRoles

  @OneToMany(() => ModelRatings, (relation) => relation.user)
  public ratings: ModelRatings[]
}

@Entity({ name: 'users' })
export class ModelUsers extends DatabaseRelation implements InterfaceUsers {
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string

  @Column({ type: 'varchar', nullable: false })
  password: string

  @Column({ type: 'timestamp', default: new Date() })
  created_at: Date

  @Column({ type: 'timestamp', default: new Date() })
  updated_at: Date

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date

  /**
   * @description database hooks
   */

  @BeforeInsert()
  async hookBeforeInsert() {
    // default role is customer
    if (!this.role) this.role = { id: 2 } as any
    this.password = await hashPassword(this.password)
  }
}
