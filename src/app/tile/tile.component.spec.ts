import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TransformedItem } from '../list/list.component';
import { TileComponent } from './tile.component';

const item: TransformedItem = {
  "id": 2593,
  "title": "Who's ACTUALLY the biggest Corridor fan in the Crew?",
  "description": "This video wasn't supposed to happen...but it was too good to pass up.",
  "duration": "8:16",
  "releaseDate": "2023-04-26T12:00:00",
  "images": {
    "thumbnail": "https://images.watchcorridor.com/i/508037fb-c9ad-430f-ab71-5fe0ebd31ad9.jpg",
    "hero-web": "https://images.watchcorridor.com/i/70ba4985-9cab-4d75-b35a-5807ff113421.jpg"
  }
};

const itemWithoutThumbnail: TransformedItem = {
  "id": 2593,
  "title": "Who's ACTUALLY the biggest Corridor fan in the Crew?",
  "description": "This video wasn't supposed to happen...but it was too good to pass up.",
  "duration": "8:16",
  "releaseDate": "2023-04-26T12:00:00",
  "images": {
    "hero-web": "https://images.watchcorridor.com/i/70ba4985-9cab-4d75-b35a-5807ff113421.jpg"
  }
};

describe('TileComponent', () => {
  let comp: TileComponent;
  let fixture: ComponentFixture<TileComponent>;
  let wrapperDe: DebugElement;
  let wrapperEl: HTMLElement;
  let imgEl: HTMLImageElement;

  beforeEach(waitForAsync(() => {
    TestBed
        .configureTestingModule({declarations: [TileComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileComponent);
    comp = fixture.componentInstance;

    wrapperDe = fixture.debugElement.query(By.css('.wrapper'));
    wrapperEl = wrapperDe.nativeElement;

    imgEl = wrapperDe.query(By.css('img')).nativeElement;
  });

  it('displays item title, duration and thumbnail', () => {
    comp.item = item;

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(item.title);
    expect(fixture.nativeElement.textContent).toContain(item.duration);
    expect(imgEl.src).toContain(item.images.thumbnail!);
  });

  it('displays placeholder if item has no thumbnail', () => {
    comp.item = itemWithoutThumbnail;

    fixture.detectChanges();

    expect(imgEl.src).toContain(comp.imagePlaceholder);
  });

  it('shows description on mouseenter and hides it on mouseleave', () => {
    comp.item = item;

    fixture.detectChanges();

    expect(wrapperEl.textContent).not.toContain(item.description);

    wrapperDe.triggerEventHandler('mouseenter', null);

    fixture.detectChanges();

    expect(wrapperEl.textContent).toContain(item.description);

    wrapperDe.triggerEventHandler('mouseleave', null);

    fixture.detectChanges();

    expect(wrapperEl.textContent).not.toContain(item.description);
  });
});
