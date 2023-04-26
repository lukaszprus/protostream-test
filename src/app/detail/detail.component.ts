import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  template: '<p>{{ id }}</p>'
})
export class DetailComponent {
  id: any;

  constructor(route: ActivatedRoute) {
    this.id = route.snapshot.params.id;
  }
}
