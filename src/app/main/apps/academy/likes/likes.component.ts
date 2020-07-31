import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';

import { AcademyCoursesService } from 'app/main/apps/academy/courses.service';
import { User } from 'app/_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/_services/user.service';
import { AuthService } from 'app/_services/auth.service';
import { Pagination, PaginatedResult } from 'app/_models/pagination';


@Component({
    selector   : 'academy-likes',
    templateUrl: './likes.component.html',
    styleUrls  : ['./likes.component.scss'],
    animations : fuseAnimations
})
export class AcademyLikesComponent implements OnInit
{
    users: User[];
    pagination: Pagination;
    likesParam: string;
    likesParams = new Map<number, string>();
    likees = []; 
    likers = [];

    constructor(
        private route: ActivatedRoute, 
        private userService: UserService,
        public authService: AuthService    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
       
        this.route.data.subscribe(data => {
            this.users = data['users'].result;
            this.pagination = data['users'].pagination;
        });
        this.likesParam = 'Likees';

        for (let k = 0; k < this.users.length; k++) {
          this.likesParams.set(this.users[k].id, 'favorite'); 
        }      

        for (let k = 0; k < this.users.length; k++) {
          this.likees[k] = this.users[k].id;
        }
        // console.log('likesContacts');
        // console.log(this.users);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // pageChanged(event: any): void {
    //     this.pagination.currentPage = event.page;
    //     this.loadUsers();
    //   }
    
      loadUsers(likess: string) {
        this.likesParam = likess;
        this.userService
          .getUsers(
            1,
            50,
            null,
            likess
          )
          .subscribe(
            (res: PaginatedResult<User[]>) => {
              this.users = res.result;
              this.pagination = res.pagination;
              if(likess === 'Likees'){
                for (let k = 0; k < this.users.length; k++){
                  this.likees[k] = this.users[k].id;
                }
              }else{
                for (let k = 0; k < this.users.length; k++){
                  this.likers[k] = this.users[k].id;
                } 
              }
              for (let k = 0; k < this.users.length; k++) {
                if(likess === 'Likers'){
                  let index = this.likees.indexOf(this.users[k].id); 
                  if(index !== -1){
                    this.likesParams.set(this.users[k].id, 'favorite'); 
                  }else{
                    this.likesParams.set(this.users[k].id, 'favorite_border');
                  } 
                }else{
                  this.likesParams.set(this.users[k].id, 'favorite'); 
                }
              }
            },
            error => {
              // this.alertify.error(error);
            }
          );
      }

      sendLike(id: number) {
        let index = this.likees.indexOf(id); 
        this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
          // this.alertify.success('You have liked: ' + this.user.knownAs);
        }, error => {
          // this.alertify.error(error);
        });
        if(this.likesParams.get(id) === "favorite"){
            this.likesParams.set(id, "favorite_border");       
        }else {
            this.likesParams.set(id, "favorite");
        }
      }

}
