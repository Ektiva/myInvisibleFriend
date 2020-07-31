import { Component, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';
import { User } from 'app/_models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/_services/auth.service';
import { UserService } from 'app/_services/user.service';

@Component({
    selector     : 'profile',
    templateUrl  : './profile.component.html',
    styleUrls    : ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileComponent
{
    user: User; 
    photoUrl: string;
    
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
        this.user = this.authService.currentUser;
        this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }
}
