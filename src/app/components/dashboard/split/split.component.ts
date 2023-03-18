import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SplitService } from 'src/app/services/split.service';
import User from 'src/app/models/user';
import Split from 'src/app/models/split';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html'
})
export class SplitComponent {

  splitId: string | null = null;
  user: User | null = null;
  // split: Split | null = null;

  split: Split | null = {
    id: "1",
    name: 'Split 1',
    url: 'https://www.google.com',
    date: new Date(),
    transactions: [
      {
        name: "bière",
        amount: 10,
        payer: "@moi"
      },
      {
        name: "bière",
        amount: 10,
        payer: "@moi"
      },
      {
        name: "bière",
        amount: 10,
        payer: "@moi"
      },
      {
        name: "bière",
        amount: 10,
        payer: "@moi"
      }
    ],
    users: [
      "Alex",
      "Connard 2",
      "Connard 3"
    ]
  }


  constructor(
    private route: ActivatedRoute,
    private AuthService: AuthService,
    private SplitService: SplitService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.splitId = params.get('id');
      this.user = this.AuthService.getUser();

      this.SplitService.getSplit(this.splitId || "").subscribe({
        next: (split) => {
          this.split = split;
        }
      });
    });
  }
}
