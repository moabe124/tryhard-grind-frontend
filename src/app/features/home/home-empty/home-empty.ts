import { Component, output } from '@angular/core';

@Component({
  selector: 'app-home-empty',
  templateUrl: './home-empty.html',
})
export class HomeEmptyComponent {
  openModal = output<void>();
}
