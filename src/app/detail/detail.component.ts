import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  template: '<div class="container text-center">{{ id }}</div>'
})
export class DetailComponent {
  id: any;

  constructor(route: ActivatedRoute) {
    this.id = route.snapshot.params.id;
  }
}
