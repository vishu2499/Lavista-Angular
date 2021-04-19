import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-insert-feedback',
  templateUrl: './insert-feedback.component.html',
  styleUrls: ['./insert-feedback.component.css']
})
export class InsertFeedbackComponent implements OnInit {

  feedback:any;

  constructor(private _feedbackService:FeedbackService) {
    
   }

  ngOnInit(): void {

    this._feedbackService.getFeedback().subscribe((feedback:any) => {
      this.feedback=feedback;
    });

  }

}
