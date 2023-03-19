import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Split from 'src/app/models/split';
import { AuthService } from 'src/app/services/auth.service';
import { SplitService } from 'src/app/services/split.service';

function reverseSort(array: Split[]): Split[] {
  return array.sort((a, b) => {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    return 0;
  })
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  splits: Split[] = []

  constructor(private splitService: SplitService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.splitService.getSplits().subscribe({
      next: (splits) => {
        this.splits = reverseSort(splits)
      }
    });
  }

  deleteSplit(id: string): void {
    this.splitService.deleteSplit(id).subscribe({
      next: () => {
        this.splits = this.splits.filter(s => s._id !== id);
      }
    });
  }

  addSplit(): void {
    this.splitService.createSplit().subscribe({
      next: (split) => {
        this.router.navigate(["/dashboard", split._id], );
      }
    })
  }
}
