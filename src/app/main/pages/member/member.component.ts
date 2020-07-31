import { Component, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { User } from 'app/_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/_services/auth.service';
import { UserService } from 'app/_services/user.service';

@Component({
    selector     : 'member',
    templateUrl  : './member.component.html',
    styleUrls    : ['./member.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MemberComponent
{
    user: User; 
    currentUser: User = JSON.parse(localStorage.getItem('user'));
    photoUrl: string;
    like: boolean;
    
    /**
     * Constructor
     */
    constructor(
        private route: ActivatedRoute, 
        private userService: UserService,
        public authService: AuthService, 
        private _router: Router)
    {

    }

    ngOnInit(): void
    {
        // this.user = this.authService.currentUser;
        this.route.data.subscribe(data => {
            this.user = data['user'];
        });

        this.userService.checkLike(this.currentUser.id, this.user.id).subscribe(data => {
            this.like = data;
          }, error => {
            console.log(error);
          });
    }

    sendLike(id: number) {
        let message, status;
        this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
          console.log(data); status = 'success';
          if(this.like == true){
            this.like = false;
          }else {
              
          this.like = true;
          }
        }, error => {
          // this.snackBar.open(error, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        });
      }
}
