import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedback:any;
  searchText;

  constructor(private _feedbackService:FeedbackService) {
    
   }

  ngOnInit(): void {

    this._feedbackService.getFeedback().subscribe((feedback:any) => {
      this.feedback=feedback;
    });

  }

}
