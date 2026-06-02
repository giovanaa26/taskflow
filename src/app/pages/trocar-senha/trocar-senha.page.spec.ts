import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrocarSenhaPage } from './trocar-senha.page';

describe('TrocarSenhaPage', () => {
  let component: TrocarSenhaPage;
  let fixture: ComponentFixture<TrocarSenhaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrocarSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
