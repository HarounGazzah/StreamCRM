import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent{

  holidays = [{
    'date': '2019-01-01',
    'start': '2018-12-31T23:00:00.000Z',
    'end': '2019-01-01T23:00:00.000Z',
    'name': 'Nouvel An',
    'type': 'public',
    'public': true,
    'country': 'FR'
  }, {
    'date': '2019-04-22',
    'start': '2019-04-21T22:00:00.000Z',
    'end': '2019-04-22T22:00:00.000Z',
    'name': 'Lundi de Pâques',
    'type': 'public',
    'public': true,
    'country': 'FR'
  }, {
    'date': '2019-05-01',
    'start': '2019-04-30T22:00:00.000Z',
    'end': '2019-05-01T22:00:00.000Z',
    'name': 'Fête du travail',
    'type': 'public',
    'public': true,
    'country': 'FR'
  }, {
    'date': '2019-05-08',
    'start': '2019-05-07T22:00:00.000Z',
    'end': '2019-05-08T22:00:00.000Z',
    'name': 'Fête de la Victoire 1945',
    'type': 'public',
    'public': true,
    'country': 'FR'
  }, {
    'date': '2019-05-26',
    'start': '2019-05-25T22:00:00.000Z',
    'end': '2019-05-26T22:00:00.000Z',
    'name': 'Fête des Mères',
    'type': 'observance',
    'public': false,
    'country': 'FR'
  }, {
    'date': '2019-05-30',
    'start': '2019-05-29T22:00:00.000Z',
    'end': '2019-05-30T22:00:00.000Z',
    'name': 'Ascension',
    'type': 'public',
    'public': true,
    'country': 'FR'
  }, {
    'date': '2019-06-09',
    'start': '2019-06-08T22:00:00.000Z',
    'end': '2019-06-09T22:00:00.000Z',
    'name': 'Pentecôte',
    'type': 'public',
    'public': true,
    'country': 'FR'
  }, {
    'date': '2019-06-10',
    'start': '2019-06-09T22:00:00.000Z',
    'end': '2019-06-10T22:00:00.000Z',
    'name': 'Lundi de Pentecôte',
    'type': 'public',
    'public': true,
    'country': 'FR'
  }, {
    'date': '2019-07-14',
    'start': '2019-07-13T22:00:00.000Z',
    'end': '2019-07-14T22:00:00.000Z',
    'name': 'Fête Nationale de la France',
    'type': 'public',
    'public': true,
    'country': 'FR'
  }, {
    'date': '2019-08-15',
    'start': '2019-08-14T22:00:00.000Z',
    'end': '2019-08-15T22:00:00.000Z',
    'name': 'Assomption',
    'type': 'public',
    'public': true,
    'country': 'FR'
  }, {
    'date': '2019-11-01',
    'start': '2019-10-31T23:00:00.000Z',
    'end': '2019-11-01T23:00:00.000Z',
    'name': 'Toussaint',
    'type': 'public',
    'public': true,
    'country': 'FR'
  }, {
    'date': '2019-11-11',
    'start': '2019-11-10T23:00:00.000Z',
    'end': '2019-11-11T23:00:00.000Z',
    'name': 'Armistice 1918',
    'type': 'public',
    'public': true,
    'country': 'FR'
  }, {
    'date': '2019-12-25',
    'start': '2019-12-24T23:00:00.000Z',
    'end': '2019-12-25T23:00:00.000Z',
    'name': 'Noël',
    'type': 'public',
    'public': true,
    'country': 'FR'
  }];

  constructor() { }

  isEqual(date1: Date, date) {
    const date2 = new Date(date);
    return (date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear());
  }

  isHoliday(date: Date) {
  let i = 0;
  while (i < this.holidays.length && !this.isEqual(date, this.holidays[i].date)) {
    i++;
  }

  return i < this.holidays.length;
  }
}
