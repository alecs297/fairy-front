import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Split from 'src/app/models/split';

@Component({
  selector: 'app-split',
  templateUrl: './split.component.html'
})
export class SplitComponent {

  splitId: string | null = null;
  split: Split | null = null;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.splitId = params.get('id');
    });
  }
}
