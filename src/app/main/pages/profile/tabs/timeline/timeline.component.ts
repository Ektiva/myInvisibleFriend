import { Component, OnDestroy, OnInit, ViewEncapsulation, HostListener, ViewChild} from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { ProfileService } from '../../profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User, User1 } from 'app/_models/user';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/_services/user.service';
import { AuthService } from 'app/_services/auth.service';


@Component({
    selector     : 'profile-timeline',
    templateUrl  : './timeline.component.html',
    styleUrls    : ['./timeline.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})


export class ProfileTimelineComponent implements OnInit, OnDestroy{
    @ViewChild('editForms', {static: true}) editForms: NgForm;
    user: any;
    currUser: User;
    timeline: any;
    
    step = 0;

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any){
      if(this.editForms.dirty){
        $event.returnValue = true;
      }
    }

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ProfileService} _profileService
     */
    constructor(
        private route: ActivatedRoute, 
        private userService: UserService,
        private authService: AuthService,
        private _profileService: ProfileService
    )
    {
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
        this._profileService.timelineOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(timeline => {
                this.timeline = timeline;
            });
        this.currUser = this.authService.currentUser;
        // this.authService.getUser(this.currUser.id).subscribe(res => {
        //     this.user = res;
        // });       
        console.log(this.currUser);
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

    UpdateUser(){
        console.log(this.currUser);
        this.userService
          .updateUser(this.authService.decodedToken.nameid, this.currUser)
          .subscribe(
            next => {
            //   this.alertify.success('Profile updated successfully');
            //   this.editForm.reset(this.currUser);
        }, error => {
            console.log(error);
        });
    }
    
    setStep(index: number) {
    this.step = index;
    }

    nextStep() {
    this.step++;
    }

    prevStep() {
    this.step--;
    }
}

