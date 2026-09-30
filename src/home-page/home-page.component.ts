import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Collection } from '../app/collection';
import { IService } from '../interfaces/IService';
import { IOption } from '../interfaces/IOption';
import { ITourDirection } from '../interfaces/ITourDirection';
import { IBlogPost } from '../interfaces/IBlogPost';
import { MessageService } from '../app/services/message.service';
import { LoaderService } from '../app/services/loader.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faStar,
  faCalendar,
  faAngleDown,
  faAngleRight,
  faTag,
  faPlay,
  faBookOpen,
  faShieldHalved,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, FaIconComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  
  calendarIcon: IconDefinition = faCalendar;
  starIcon: IconDefinition = faStar;
  angleDownIcon: IconDefinition = faAngleDown;
  angleRightIcon: IconDefinition = faAngleRight;
  tagIcon: IconDefinition = faTag;
  loaderService: LoaderService = inject(LoaderService);
  messageService: MessageService = inject(MessageService);
  selectedPerson!: string;
  selectedTourDate!: string;
  selectedTourLocation!: string;
  selectedServiceId!: number;
  liveInputValue!: string;

  readonly shieldIcon: IconDefinition = faShieldHalved;
  readonly guideIcon: IconDefinition = faBookOpen;
  readonly priceTagIcon: IconDefinition = faTag;
  readonly playIcon: IconDefinition = faPlay;
  productCollection: Collection<string> = new Collection<string>([
    'banana',
    'bread',
    'milk',
  ]);

  numbersCollection: Collection<number> = new Collection<number>([
    1, 2, 3, 4, 5,
  ]);

  cities: IOption<string>[] = [
    { value: 'moscow', label: 'Москва' },
    { value: 'petersburg', label: 'Санкт-Петербург' },
    { value: 'samara', label: 'Самара' },
    { value: 'kazan', label: 'Казань' },
    { value: 'ufa', label: 'Уфа' },
  ];

  persons: IOption<string>[] = [
    { value: 'jorno', label: 'Джорно' },
    { value: 'jotaro', label: 'Джотаро' },
    { value: 'josef', label: 'Джозеф' },
    { value: 'josuke', label: 'Джоске' },
    { value: 'jonatan', label: 'Джонатан' },
    { value: 'jolin', label: 'Джолин' },
  ];

  offers: IService[] = [
    {
      id: 1,
      icon: this.guideIcon,
      bgColor: '#E5EEEB',
      name: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 2,
      icon: this.shieldIcon,
      bgColor: '#E3E6EE',
      name: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
    {
      id: 3,
      icon: this.tagIcon,
      bgColor: '#F3F1E1',
      name: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
    },
  ];

  tours: ITourDirection[] = [
    {
      id: 1,
      title: 'Озеро возле гор',
      subtitle: 'романтическое приключение',
      price: 480,
      rating: 4.9,
      image: 'italy-dolomites-lake-braies',
    },
    {
      id: 2,
      title: 'Ночь в горах',
      subtitle: 'в компании друзей',
      price: 500,
      rating: 4.5,
      image: 'night-sky-mountains-milky-way',
    },
    {
      id: 3,
      title: 'Йога в горах',
      subtitle: 'для тех, кто забоится о себе',
      price: 230,
      rating: 5,
      image: 'yoga-mountain-sunrise-balance',
    },
  ];

  blogPosts: IBlogPost[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      information:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      image: 'italy-manarola-cinque-terre',
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      information:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      date: '01/04/2023',
      image: 'airplane-wing-sunset',
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку?',
      information:
        'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      image: 'solo-traveler-narrow-street',
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      information: 'Для современного мира базовый.',
      date: '01/04/2023',
      image: 'india-taj-mahal-agra',
    },
  ];

  selectOffer(itemId: number): void {
    this.selectedServiceId = itemId;
  }

}
