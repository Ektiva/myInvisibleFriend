import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { ProfileService } from 'app/main/pages/profile/profile.service';
import { AuthService } from 'app/_services/auth.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'app/_services/user.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { BottomSheetOverviewExampleSheetComponent } from '../bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';

@Component({
    selector     : 'profile-about',
    templateUrl  : './about.component.html',
    styleUrls    : ['./about.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ProfileAboutComponent implements OnInit, OnDestroy{
    @ViewChild('editForm', {static: true}) editForm: NgForm;
    about: any;
    user: any;

    step = 0;

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any){
      if(this.editForm.dirty){
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
        private _bottomSheet: MatBottomSheet,
        private userService: UserService,
        public authService: AuthService,
        private _profileService: ProfileService
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    openBottomSheet(): void {
        this._bottomSheet.open(BottomSheetOverviewExampleSheetComponent, {
            data: { gender: [this.user.gender] },
          });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._profileService.aboutOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(about => {
                this.about = about;
            });
        this.user = this.authService.currentUser;
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
        this.userService
          .updateUser(this.authService.decodedToken.nameid, this.user)
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
