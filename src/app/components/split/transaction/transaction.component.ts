import { Component, Input } from '@angular/core';
import Transaction from 'src/app/models/transaction';

@Component({
  selector: 'app-public-transaction',
  templateUrl: './transaction.component.html'
})
export class PublicTransactionComponent {
  @Input() transaction!: Transaction;
}
