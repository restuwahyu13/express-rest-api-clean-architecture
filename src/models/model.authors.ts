import { Column, Entity, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn } from 'typeorm'
import { InterfaceAuthors } from '@interfaces/interface.authors'
import { ModelBooks } from '@models/model.books'

class DatabaseRelation {
  @OneToMany(() => ModelBooks, (relation) => relation.author)
  public books: ModelBooks[]
}

@Entity({ name: 'authors' })
export class ModelAuthors extends DatabaseRelation implements InterfaceAuthors {
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number

  @Column({ type: 'varchar', nullable: false })
  firstname: string

  @Column({ type: 'varchar', nullable: false })
  lastname: string

  @Column({ type: 'varchar', nullable: false })
  place_of_birth: string

  @Column({ type: 'date', nullable: false })
  date_of_birth: Date

  @Column({ type: 'timestamp', default: new Date() })
  created_at: Date

  @Column({ type: 'timestamp', default: new Date() })
  updated_at: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date
}
