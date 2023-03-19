import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SplitService } from 'src/app/services/split.service';

import Split from 'src/app/models/split';

import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

function calculateDebt(split: Split): { from: string, to: string, amount: number }[] {
  const debts: { [key: string]: number } = {};

  // compute individual debts between each user
  split.transactions.forEach(transaction => {
    const amountPerUser = transaction.amount / split.users.length;
    split.users.forEach(user => {
      if (user !== transaction.payer) {
        const key = JSON.stringify({ from: transaction.payer, to: user }); // use a JSON object as a key to keep track of debts between specific users
        debts[key] = (debts[key] || 0) + amountPerUser;
      }
    });
  });

  // simplify debts between pairs of users in both directions
  Object.entries(debts).forEach(([key, value]) => {
    const { from, to } = JSON.parse(key);
    const reverseKey = JSON.stringify({ from: to, to: from });
    if (value > 0 && debts[reverseKey] && debts[reverseKey] >= value) {
      debts[reverseKey] -= value;
      delete debts[key];
    }
  });

  // convert debts object into result array
  const result: { from: string, to: string, amount: number }[] = [];
  Object.entries(debts).forEach(([key, value]) => {
    const { from, to } = JSON.parse(key);
    if (value > 0) {
      // reverse
      result.push({ from:to, to:from, amount: value });
    }
  });

  return result;
}


function getTotalDebt(debt: { from: string, to: string, amount: number }[]): { [key: string]: number } {
  const totalDebt: { [key: string]: number } = {};

  debt.forEach(({ from, to, amount }) => {
    if (totalDebt[from]) {
      totalDebt[from] -= amount;
    } else {
      totalDebt[from] = -amount;
    }

    if (totalDebt[to]) {
      totalDebt[to] += amount;
    } else {
      totalDebt[to] = amount;
    }
  });

  return totalDebt;
}




@Component({
  selector: 'app-public-split',
  templateUrl: './split.component.html'
})

export class PublicSplitComponent {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private splitService: SplitService, private route: ActivatedRoute) {}

  split: Split | null = null;
  total: number = 0;
  debts: {
    from: string,
    to: string,
    amount: number
  }[] = [];

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      y: {
        ticks: {
          font: {
            size: 16,
            weight: "bold"
          },
        }
      },
      x: {
        display: false,
        suggestedMin: -10,
        suggestedMax: 10
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false
      },
      datalabels: {
        borderRadius: 5,
        borderColor: "black",
        borderWidth: 1,
        backgroundColor: "white",
        padding: {
          top: 2,
          bottom: 2,
          left: 3.5,
          right: 3.5
        },
        font: {
          size: 16,
          weight: "bold"
        },
        formatter: (value) => {
          return parseFloat(value).toFixed(2) + " €"
        }
      }
    }
  };
  chartType: ChartType = 'bar';
  chartData: ChartData<'bar'> = {
    datasets: []
  };
  chartPlugins = [
    DataLabelsPlugin
  ];

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.splitService.getSplit(params.get('id') || "").subscribe({
        next: (split) => {
          this.split = split;
          this.debts = calculateDebt(split);
          this.total = this.split.transactions.reduce((total, transition) => total + transition.amount, 0);

          let totalDebt: { [key: string]: number } = getTotalDebt(this.debts)

          this.chartData = {
            labels: split.users,
            datasets: [
              {
                data: [...split.users, ].map(user => {
                  return totalDebt[user] || 0;
                }),
                backgroundColor: (ctx) => {
                  return totalDebt[split.users[ctx.dataIndex]] > 0 ? "#834694" : "#fd4929";
                }
              }
            ]
          }
        }
      });
    });
  }
}
