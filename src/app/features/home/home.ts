import { Component, signal } from '@angular/core';
import { HomeWithComponent } from './home-with/home-with';
import { HomeEmptyComponent } from './home-empty/home-empty';

@Component({
  selector: 'app-home',
  imports: [HomeWithComponent, HomeEmptyComponent],
  templateUrl: './home.html',
})
export class HomeComponent {
  // TODO: remover toggle de debug quando cadastro de grupos estiver implementado
  hasGroups = signal(true);

  toggleDebug() {
    this.hasGroups.update(v => !v);
  }
}
