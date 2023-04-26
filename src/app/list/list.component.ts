import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

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
}

@Component({
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {
  subs: Subscription | undefined;
  items: TransformedItem[] | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.subs = this.http.get<Item[]>('https://content-cache.watchcorridor.com/v6/interview')
      .subscribe(items => {
        this.items = items.map(item => {
          const images = item.images ? item.images.reduce((transformedImages, image) => {
            transformedImages[image.type] = image.url;

            return transformedImages;
          }, {} as TransformedImages) : {};

          return { ...item, images };
        });
      });
  }

  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }
}
