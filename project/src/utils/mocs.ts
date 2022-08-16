import {faker} from '@faker-js/faker';
import {Comments, UserComment} from '../types/comments';
import {Film, Films, UpdateFilm} from '../types/films';

const createFakeFilm = (): Film => ({
  name: faker.lorem.sentence(5),
  posterImage: faker.image.avatar(),
  previewImage: faker.image.avatar(),
  backgroundImage: faker.image.avatar(),
  backgroundColor: faker.color.rgb({ format: 'hex', casing: 'lower' }),
  description: faker.lorem.sentence(10),
  rating: +faker.finance.amount(0, 10, 1),
  scoresCount: +faker.random.numeric(3),
  director: faker.name.fullName(),
  starring: new Array(3).fill(null).map(() => faker.name.fullName()),
  runTime: +faker.random.numeric(2),
  genre: faker.word.noun(),
  released: +faker.finance.amount(1995, 2015, 0),
  id: +faker.random.numeric(),
  isFavorite: faker.datatype.boolean(),
  videoLink: faker.internet.url(),
  previewVideoLink: faker.internet.url()
});

const createFakeFilms = (): Films => new Array(8).fill(null).map(() => createFakeFilm());

const createFakeComments = (amount: number): Comments => new Array(amount).fill(null).map(() => ({
  comment: faker.lorem.sentence(5),
  date: new Date().toString(),
  id: +faker.unique(faker.random.numeric),
  rating: +faker.finance.amount(0, 10, 1),
  user: {
    id: +faker.random.numeric(),
    name: faker.name.fullName()
  }
}));

const createFakeUserComment = (): UserComment => ({
  comment: faker.lorem.sentence(5),
  rating: +faker.finance.amount(0, 10, 1),
  filmId: +faker.random.numeric(2),
});

const createFakeUpdatedFilm = (): UpdateFilm => ({
  filmId: +faker.random.numeric(),
  status: +faker.finance.amount(0, 1, 0),
});

export {createFakeFilm, createFakeFilms, createFakeComments, createFakeUpdatedFilm, createFakeUserComment};
