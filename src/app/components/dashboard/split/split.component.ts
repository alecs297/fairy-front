import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SplitService } from 'src/app/services/split.service';
import User from 'src/app/models/user';
import Split from 'src/app/models/split';
import { FormControl } from '@angular/forms';

function extract(name: string): string {
  let parts = name.split(" ");
  let i = parseInt(parts[parts.length - 1])
  if (!isNaN(i)) name = parts.slice(0, -1).join(" ").trim()
  return name;
}

function getNo(name: string, hay: string[]): number {
  name = extract(name);
  if (!hay.includes(name)) return 0;
  let i: number = 1;
  while (hay.includes(`${name} ${i}`)) i++;
  return i;
}

function getOgName(name: string, users: string[]): string {
  let n: number = getNo(name, users);
  return n ? `${extract(name)} ${n}` : name.trim();
}

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html'
})
export class SplitComponent {

  user: User | null = null;
  split: Split | null = null;

  newMember: FormControl = new FormControl('')

  constructor(
    private route: ActivatedRoute,
    private AuthService: AuthService,
    private SplitService: SplitService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.user = this.AuthService.getUser();

      this.SplitService.getSplit(params.get('id') || "").subscribe({
        next: (split) => {
          this.split = split;
        }
      });
    });
  }

  save(): void {
    if (this.split) this.SplitService.updateSplit(this.split);
  }

  addMember(): void {
    let name: string = this.newMember.value;
    this.split?.users.push(getOgName(name, this.split.users))
    this.newMember.reset()
  }

  deleteMember(index: number): void {
    if (this.split && confirm("Are you sure ? This will also delete all associated transactions")) {
      let user = this.split.users[index];
      this.split.transactions = this.split.transactions.filter(transaction => transaction.payer !== user);
      this.split.users.splice(index, 1);
    }
  }

  updateTransaction(): void {
    if (this.split) {
      this.SplitService.updateSplit(this.split);
      this.save();
    }
  }

  addTransaction(): void {
    if (this.split) {
      this.split.transactions.push({
        name: `Item ${this.split.transactions.length + 1}`,
        amount: 0,
        payer: this.user?.name || ""
      })
      this.save()
    } 
  }

  deleteTransaction(index: number): void {
    if (this.split) {
      this.split.transactions.splice(index, 1);
      this.save()
    }
  }
}
