import { Component } from '@angular/core';
import Split from 'src/app/models/split';
import { SplitService } from 'src/app/services/split.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  splits: Split[] = []

  constructor(private SplitService: SplitService) {}

  ngOnInit(): void {
    this.SplitService.getSplits().subscribe({
      next: (splits) => {
        this.splits = splits;
      }
    });
  }

  deleteSplit(id: string): void {
    this.SplitService.deleteSplit(id).subscribe({
      next: () => {
        this.splits = this.splits.filter(s => s.id !== id);
      }
    });
  }
}
