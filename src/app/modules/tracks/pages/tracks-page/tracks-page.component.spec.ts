import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@shared/shared.module';

import { TracksPageComponent  } from './tracks-page.component';

describe('TracksPageComponent ', () => {
  let component: TracksPageComponent ;
  let fixture: ComponentFixture<TracksPageComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      declarations: [ TracksPageComponent  ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksPageComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
