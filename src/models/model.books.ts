import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, DeleteDateColumn } from 'typeorm'
import { InterfaceBooks } from '@interfaces/interface.books'
import { ModelAuthors } from '@models/model.authors'
import { ModelRatings } from '@models/model.ratings'

class DatabaseRelation {
  @ManyToOne(() => ModelAuthors, (relation) => relation.books)
  @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
  author: ModelAuthors

  @OneToMany(() => ModelRatings, (relation) => relation.book)
  public ratings: ModelRatings[]
}

@Entity({ name: 'books' })
export class ModelBooks extends DatabaseRelation implements InterfaceBooks {
  @PrimaryGeneratedColumn({ type: 'integer', unsigned: true })
  id: number

  @Column({ type: 'varchar', nullable: false })
  name: string

  @Column({ type: 'bigint', unique: true, unsigned: true, nullable: false })
  isbn: number

  @Column({ type: 'integer', unsigned: true, nullable: false })
  price: number

  @Column({ type: 'text', nullable: false })
  description: string

  @Column({ type: 'date', nullable: false })
  release_date: Date

  @Column({ type: 'integer', unsigned: true, nullable: false })
  pages: number

  @Column({ type: 'varchar', nullable: false })
  publisher: string

  @Column({ type: 'varchar', nullable: false })
  language: string

  @Column({ type: 'jsonb', nullable: false })
  images: string[]

  @Column({ type: 'timestamp', default: new Date() })
  created_at: Date

  @Column({ type: 'timestamp', default: new Date() })
  updated_at: Date

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date
}
