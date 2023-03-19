import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html'
})
export class DebtComponent {
  @Input() debt!: {
    from: string,
    to: string,
    amount: number
  };
}
