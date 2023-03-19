import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  user!: User;
  split!: Split;

  newMember: FormControl = new FormControl('')

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private splitService: SplitService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let currentUser = this.authService.getUser();
      if (!currentUser) {
        this.router.navigate(['/login']);
      } else {
        this.user = currentUser;

        this.splitService.getSplit(params.get('id') || "").subscribe({
          next: (split) => {
            if (split) this.split = split;
            else this.router.navigate(['/dashboard']);
          }
        });
      }
    });
  }

  save(): void {
    if (this.split) this.splitService.updateSplit(this.split).subscribe(
      (split) => {
        this.split = split;
      },
    );
  }

  addMember(): void {
    let name: string = getOgName(this.newMember.value, this.split.users);
    if (name === "") return;
    this.split?.users.push(name)
    this.newMember.reset()
    this.save();
  }

  deleteMember(index: number): void {
    if (this.split && confirm("Are you sure ? This will also delete all associated transactions")) {
      let user = this.split.users[index];
      this.split.transactions = this.split.transactions.filter(transaction => transaction.payer !== user);
      this.split.users.splice(index, 1);
      this.save();
    }
  }

  updateTransaction(): void {
    this.save();
  }

  addTransaction(): void {
    if (this.split) {
      if (!this.split.users.length) return alert("You need to add at least one member first");
      this.split.transactions.push({
        name: `Item ${this.split.transactions.length + 1}`,
        amount: 0,
        payer: this.split.users[0]
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
