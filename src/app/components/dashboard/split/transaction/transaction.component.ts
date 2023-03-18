import { Component, Input } from '@angular/core';
import Transaction from 'src/app/models/transaction';
import { AuthService } from 'src/app/services/auth.service';
import User from 'src/app/models/user';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html'
})
export class TransactionComponent {
  @Input() transaction: Transaction | null = null;
  @Input() users: string[] = [
    'User 1',
    'User 2',
    'User 3',
    'User 4',
    'User 5',
  ];

  user: User | null = null;
  
  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
}
