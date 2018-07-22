import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Finish Todo App Task' },
      { id: 2, name: 'Go to dentist' },
      { id: 3, name: 'Buy lunch' },
      { id: 4, name: 'Go shopping' },
      { id: 5, name: 'Eat lunch' },
      { id: 6, name: 'Go fishing' },
      { id: 7, name: 'Buy a new tux' },
      { id: 8, name: 'Go to your parents' },
      { id: 9, name: 'DO THE DISHES' },
      { id: 10, name: 'Kill some time' }
    ];
    return {heroes};
  }
}
