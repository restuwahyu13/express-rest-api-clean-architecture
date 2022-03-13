import { Connection } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'

import { ModelBooks } from '@models/model.books'

export default class CreateBooks implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.getRepository(ModelBooks).insert([
      {
        name: "Xenophon's Imperial Fiction",
        isbn: parseInt('0691606668'),
        price: 90000,
        description: 'If you inquire into the origins of the novel long enough, writes James Tatum in the preface to this work',
        release_date: '2016-04-19',
        pages: 322,
        publisher: 'Amazon',
        language: 'English',
        images: ['https://images-na.ssl-images-amazon.com/images/I/31tN5vewBML._SX313_BO1,204,203,200_.jpg'],
        author: { id: 1 }
      },
      {
        name: 'Statistical Field Theory for Neural Networks',
        isbn: parseInt('3030464431'),
        price: 150000,
        description:
          'This book presents a self-contained introduction to techniques from field theory applied to stochastic and collective dynamics in neuronal networks. These powerful analytical techniques, which are well established in other fields of physics, are the basis of current developments and offer solutions to pressing open problems in theoretical neuroscience and also machine learning. They enable a systematic and quantitative understanding of the dynamics in recurrent and stochastic neuronal networks.',
        release_date: '2020-08-20',
        pages: 280,
        publisher: 'Amazon',
        language: 'English',
        images: ['https://images-na.ssl-images-amazon.com/images/I/41f-Iy+XRDL._SX328_BO1,204,203,200_.jpg'],
        author: { id: 2 }
      },
      {
        name: 'Christ on the Cross',
        isbn: parseInt('2503579671'),
        price: 100000,
        description:
          "The work of a lifetime, from one of the world's most influential thinkers, about the heart of the Christian faith. I could never myself believe in God, if it were not for the cross",
        release_date: '2006-08-31',
        pages: 380,
        publisher: 'Amazon',
        language: 'English',
        images: ['https://images-na.ssl-images-amazon.com/images/I/51uq5FvX2qL._SX326_BO1,204,203,200_.jpg'],
        author: { id: 3 }
      }
    ])
  }
}
