import { Component, EventEmitter, Input, Output } from '@angular/core';
import Transaction from 'src/app/models/transaction';
import { AuthService } from 'src/app/services/auth.service';
import User from 'src/app/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html'
})
export class TransactionComponent {
  @Input() index!: number;
  @Input() transaction!: Transaction;
  @Input() users!: string[];

  @Output() update = new EventEmitter<void>()
  @Output() delete = new EventEmitter<number>()

  user: User | null = null;
  transactionForm: FormGroup = new FormGroup({
    payer: new FormControl(''),
    amount: new FormControl('', [Validators.pattern('^-?\\d*\\.?\\d+$')]),
    name: new FormControl('')
  });
  
  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  updateTransaction(): void {
    if (!this.transactionForm.get("amount")?.valid) return this.transactionForm.get("amount")?.setValue(this.transaction.amount)
    this.update.emit()
  }

  deleteTransaction(): void {
    this.delete.emit(this.index)
  }
}
