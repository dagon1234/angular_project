// score-list.component.ts

import { Component, OnInit } from '@angular/core';
import { ScoreService } from './score.service';
import { Score } from './score.model';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css']
})
export class ScoreListComponent implements OnInit {
  scores: Score[] = [];

  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.loadScores();
  }

  loadScores(): void {
    this.scoreService.getAllScores().subscribe((data) => {
      this.scores = data;
    });
  }
}
