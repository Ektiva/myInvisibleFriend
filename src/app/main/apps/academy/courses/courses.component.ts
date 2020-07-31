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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogElementsExampleDialogComponent } from '../DialogElementsExampleDialog/DialogElementsExampleDialog.component';


@Component({
    selector   : 'academy-courses',
    templateUrl: './courses.component.html',
    styleUrls  : ['./courses.component.scss'],
    animations : fuseAnimations
})
export class AcademyCoursesComponent implements OnInit, OnDestroy
{
    categories: any[];
    courses: any[];
    coursesFilteredByCategory: any[];
    filteredCourses: any[];
    currentCategory: string;
    searchTerm: string;
    minAge: number;
    maxAge: number;
    j = 0;

    likes: User[];  
    likesParam: string;
    // likees: User[];

    favoriteIcon = new Map<number, string>();
    // favoriteIconMale = new Map<number, string>();
    // males:

    users: User[];
    user: User = JSON.parse(localStorage.getItem('user'));
    genderList = [
        { value: 'male', display: 'Males' },
        { value: 'female', display: 'Females' }
    ];
    orderList = [
      { value: 'lastActive', display: 'Last Active' },
      { value: 'newestMembers', display: 'newest Members' }
  ];
    userParams: any = {};
    pagination: Pagination;
    paginationLike: Pagination;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {AcademyCoursesService} _academyCoursesService
     */
    constructor(
        private _academyCoursesService: AcademyCoursesService,
        private route: ActivatedRoute, 
        private userService: UserService,
        public authService: AuthService, 
        public snackBar: MatSnackBar,
        public dialog: MatDialog
    )
    {
        // Set the defaults
        this.currentCategory = 'all';
        this.searchTerm = '';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

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
        
        this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
        this.userParams.minAge = 18;
        this.userParams.maxAge = 99;
        this.userParams.orderBy = 'lastActive';

        this.route.data.subscribe(data => {
            this.likes = data['likes'].result;
            this.paginationLike = data['likes'].pagination;
        });
        this.likesParam = 'Likees';

        for (let k = 0; k < this.users.length; k++) {
          this.favoriteIcon.set(this.users[k].id, "favorite_border"); 
        }

        for (let i = 0; i < this.likes.length; i++) {
          for (let k = 0; k < this.users.length; k++) {
            if(this.likes[i].id === this.users[k].id){
              this.favoriteIcon.set(this.users[k].id, "favorite"); 
            } 
          }          
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter courses by category
     */
    filterCoursesByCategory(): void
    {
        // Filter
        if ( this.currentCategory === 'all' )
        {
            this.coursesFilteredByCategory = this.courses;
            this.filteredCourses = this.courses;
        }
        else
        {
            this.coursesFilteredByCategory = this.courses.filter((course) => {
                return course.category === this.currentCategory;
            });

            this.filteredCourses = [...this.coursesFilteredByCategory];

        }

        // Re-filter by search term
        this.filterCoursesByTerm();
    }

    /**
     * Filter courses by term
     */
    filterCoursesByTerm(): void
    {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if ( searchTerm === '' )
        {
            this.filteredCourses = this.coursesFilteredByCategory;
        }
        else
        {
            this.filteredCourses = this.coursesFilteredByCategory.filter((course) => {
                return course.title.toLowerCase().includes(searchTerm);
            });
        }
    }

    /**
     * Filter Friends by Age
     */
    filterByAge(): void
    {
        const searchTerm = this.searchTerm.toLowerCase();

        // Search
        if ( searchTerm === '' )
        {
            this.filteredCourses = this.coursesFilteredByCategory;
        }
        else
        {
            this.filteredCourses = this.coursesFilteredByCategory.filter((course) => {
                return course.title.toLowerCase().includes(searchTerm);
            });
        }
    }

    pageChanged(event: any): void {
        this.pagination.currentPage = event.page;
        console.log(this.pagination.currentPage);
        this.loadUsers();
      }
    
     resetFilters() {
        this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
        this.userParams.minAge = 18;
        this.userParams.maxAge = 99;
        this.loadUsers();
      }
    
      loadUsers(orderBy?: string) {
        if(orderBy){
          this.userParams.orderBy = orderBy;
        }
        this.userService
          .getUsers(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            this.userParams
          )
          .subscribe(
            (res: PaginatedResult<User[]>) => {
              this.users = res.result;
              this.pagination = res.pagination;

              for (let k = 0; k < this.users.length; k++) {
                this.favoriteIcon.set(this.users[k].id, "favorite_border"); 
              }
            },
            error => {
              this.snackBar.open(error, '×', { panelClass: [error], verticalPosition: 'top', duration: 3000 });
            }
          );
          
        let usersLike;
        this.userService.getUsers(
          this.pagination.currentPage,
          this.pagination.itemsPerPage,
          this.userParams,
          'Likees')
        .subscribe(
          (res: PaginatedResult<User[]>) => {
            usersLike = res.result;
            console.log(res.result);
            // this.pagination = res.pagination;
          },
          error => {
            this.snackBar.open(error, '×', { panelClass: [error], verticalPosition: 'top', duration: 3000 });
          }
        );
        if(usersLike){
          for (let i = 0; i < usersLike.length; i++) {
            for (let k = 0; k < this.users.length; k++) {
              if(usersLike[i].id === this.users[k].id){
                this.favoriteIcon.set(this.users[k].id, "favorite"); 
              } 
            }          
          }
        }
        
      }
      

      sendLike(id: number) {
        let message, status;
        this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
          console.log(data); status = 'success';
        }, error => {
          // this.snackBar.open(error, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        });
        
        if(this.favoriteIcon.get(id) === "favorite"){
          this.favoriteIcon.set(id, "favorite_border");
           message = 'You have disliked: ' + this.user.knownAs; 
          // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
        }else {
            this.favoriteIcon.set(id, "favorite");
             message = 'You have liked: ' + this.user.knownAs; 
            // this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
        }
      }

      cancelLike(id: number) {
        this.userService.cancelLike(this.authService.decodedToken.nameid, id).subscribe(data => {
          // this.alertify.success('You have liked: ' + this.user.knownAs);
        }, error => {
          // this.alertify.error(error);
        });
      }

      loadLikes() {
        this.userService
          .getUsers(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            null,
            this.likesParam
          )
          .subscribe(
            (res: PaginatedResult<User[]>) => {
              this.likes = res.result;
              this.pagination = res.pagination;
            },
            error => {
              // this.alertify.error(error);
            }
          );
      }
    
      likePageChanged(event: any): void {
        this.pagination.currentPage = event.page;
        this.loadLikes();
      }
    
      openDialog() {
        this.dialog.open(DialogElementsExampleDialogComponent);
      }
}
