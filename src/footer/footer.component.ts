import { Component } from '@angular/core';
import { ILink } from '../interfaces/ILink';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  
  footerServicesLinks: ILink[] = [
    {
      title: 'Прогулки в горы летом',
      path: '/example'
    },
    {
      title: 'Зимние походы в горы',
      path: '/example'
    },
    {
      title: 'Посещение храмов в горах',
      path: '/example'
    },
    {
      title: 'Экстремальные виды туризма',
      path: '/example'
    },
    {
      title: 'Походы в джунглях Амазонии',
      path: '/example'
    },
    {
      title: 'Поездка в Африку',
      path: '/example'
    },
  ];
  
  footerImportantInfoLinks: ILink[] = [
    {
      title: 'Если вы врач - загляните сюда',
      path: '/example'
    },
    {
      title: 'Медицинская страховка, гарантии безопасности',
      path: '/example'
    },
    {
      title: 'Жизненно важные предметы для похода',
      path: '/example'
    },
    {
      title: 'Как собрать в долгий поход?',
      path: '/example'
    }
  ];
  
}
