import template from './myVacancies.pug';
import { View } from '../../modules/view';
import { ShortVacancyComponent } from '../../../components/ShortVacancy/ShortVacancy'


export class MyVacanciesView extends View {
  constructor (root, globalEventBus) {
    super(root, template, globalEventBus);
  }

  render (vacancies = []) {
    let data = {
      'number_of_vacancies': vacancies.length
    };

    super.render(data);

    const list = document.querySelector('.list');

    if (vacancies.length > 0) {
      vacancies.forEach(vacancy => {
        console.log(vacancy);
        vacancy['employer_mode'] = true;
        new ShortVacancyComponent({ data: { vacancy }}).appendTo(list);
      });
    }
  }
}
