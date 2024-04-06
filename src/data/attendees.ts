//Importação do Faker
import { faker } from '@faker-js/faker';

//Exportamos uma constante de um array, nesse caso com tamanho 200, que ao ser mapeado retorna um objeto com todos os tipos de valores fictícios
export const attendees = Array.from({ length: 213 }).map(() => {
  return {
    id: faker.number.int({ min: 10000, max: 99999 }), //Declarado mínimo e máximo do número
    name: faker.person.fullName(),
    email: faker.internet.email().toLocaleLowerCase(), //Deixa todos os emails em LowerCase
    createdAt: faker.date.recent({ days: 30 }), //Gera datas aleatórias a partir de 30 dias atrás
    checkedInAt: faker.date.recent({ days: 7 })
  };
});

//O arquivo não está mais vinculado a aplicação, visto que esteja feita a integração com a API.