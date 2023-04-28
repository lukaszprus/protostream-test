import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type ImageType = 'channel-badge' | 'thumbnail' | 'packshot' | 'hero-web' | 'hero-mobile';

interface Image {
  type: ImageType;
  url: string;
}

interface Item {
  id: number;
  title: string;
  description: string;
  duration: string;
  releaseDate: string;
  images?: Image[];
}

type TransformedImages = { [T in ImageType]?: string; };

export type TransformedItem = Omit<Item, "images"> & {
  images: TransformedImages;
};

@Component({
  templateUrl: './list.component.html'
})
export class ListComponent {
  items$: Observable<TransformedItem[]>;

  constructor(http: HttpClient) {
    this.items$ = http.get<Item[]>('https://content-cache.watchcorridor.com/v6/interview').pipe(
      map(items => items.map(item => {
        const images = item.images ? item.images.reduce((transformedImages, image) => {
          transformedImages[image.type] = image.url;

          return transformedImages;
        }, {} as TransformedImages) : {};

        return { ...item, images };
      }))
    );
  }
}
