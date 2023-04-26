import { Component, Input } from '@angular/core';

import { TransformedItem } from '../list/list.component';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() item!: TransformedItem;
  showDescription = false;
}
