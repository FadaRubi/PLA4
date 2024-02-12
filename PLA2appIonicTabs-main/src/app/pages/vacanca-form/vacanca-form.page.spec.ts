import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VacancaFormPage } from './vacanca-form.page';

describe('VacancaFormPage', () => {
  let component: VacancaFormPage;
  let fixture: ComponentFixture<VacancaFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VacancaFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
