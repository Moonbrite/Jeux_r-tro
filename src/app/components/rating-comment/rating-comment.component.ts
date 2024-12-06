import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {CommentService} from '../../services/comment';
import {MatIcon} from '@angular/material/icon';
import {Comment} from '../../models/comment';

@Component({
  selector: 'app-rating-comment',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatButton,
    MatError,
    MatCardTitle,
    MatLabel,
    NgForOf,
    MatIcon,
    DatePipe
  ],
  templateUrl: './rating-comment.component.html',
  standalone: true,
  styleUrl: './rating-comment.component.scss'
})
export class RatingCommentComponent implements OnInit {

  commentForm: FormGroup;
  rating: number = 0;

  constructor(
    private gameService: GameService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {
    this.commentForm = this.formBuilder.group({
      author: ['', [Validators.required]],
      comment: ['', [Validators.required, Validators.maxLength(500)]],
      rating: [this.rating, [Validators.min(0), Validators.max(5)]]
    });
  }

  gameId: string | null = null;
  game?: any;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.gameId = this.route.snapshot.paramMap.get('id');
    if (this.gameId) {
      this.gameService.get(this.gameId).subscribe({
        next: data => {
          this.game = data
        },
        error: error => {
          console.log(error)
        }
      })
    }
  }

  setRating(star: number): void {
    this.rating = star;
    this.commentForm.get('rating')?.setValue(this.rating);
  }

  submitComment(): void {
    if (this.commentForm.valid && this.gameId) {
      const commentData = this.commentForm.value;

      const comment = new Comment(
        commentData.author,
        commentData.comment,
        Date.now(),
        this.gameId,
        this.rating
      );


      this.commentService.post(comment).subscribe({
        next: data => {

          if (!this.game.comments) {
            this.game.comments = [];
          }

          this.game.comments.push(data);
          this.game.rating = this.calculateAverageRating(this.game.comments);

          this.gameService.updateGame(this.game).subscribe({
            next: data => {this.router.navigate([''])},
            error: error => {console.log(error)}
          })
        },
        error: error => {console.log(error)},
        });
    }
  }

  calculateAverageRating(comments: Comment[]): number {
    const totalRatings = comments.reduce((sum, comment) => sum + comment.rating, 0);
    console.log(comments.length,totalRatings);
    return comments.length > 0 ? totalRatings / comments.length : this.rating;
  }

}
