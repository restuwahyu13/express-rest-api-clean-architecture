import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm'
import { InterfaceRatings } from '@interfaces/interface.ratings'
import { ModelBooks } from '@models/model.books'
import { ModelUsers } from '@models/model.users'

class DatabaseRelation {
  @ManyToOne(() => ModelBooks, (relation) => relation.ratings)
  @JoinColumn({ name: 'book_id', referencedColumnName: 'id' })
  book: ModelBooks

  @ManyToOne(() => ModelUsers, (relation) => relation.ratings)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: ModelUsers
}

@Entity({ name: 'ratings' })
export class ModelRatings extends DatabaseRelation implements InterfaceRatings {
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number

  @Column({ type: 'varchar', nullable: false })
  rating: string

  @Column({ type: 'text', nullable: true })
  noted: string

  @Column({ type: 'timestamp', default: new Date() })
  created_at: Date
}
