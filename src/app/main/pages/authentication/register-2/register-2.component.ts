import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, AsyncValidatorFn } from '@angular/forms';
import { Subject, timer, of } from 'rxjs';
import { takeUntil, switchMap, map } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/_services/auth.service';
import { User, User1 } from 'app/_models/user';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetOverviewExampleSheetComponent } from '../../profile/tabs/bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';

@Component({
    selector     : 'register-2',
    templateUrl  : './register-2.component.html',
    styleUrls    : ['./register-2.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class Register2Component implements OnInit, OnDestroy
{
    isLinear = false;
    registerForm: FormGroup;
    personalDataFormGroup: FormGroup;
    aboutFormGroup: FormGroup;
    addressFormGroup: FormGroup;
    contactFormGroup: FormGroup;

    formGroup: FormGroup;

    // registerForm: FormGroup;

    user: any;
    avatar = 'my avatar';

    registers: any;
    personalData: any;
    about: any;
    address: any;
    contact: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _bottomSheet: MatBottomSheet,
        private _fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService, 
        private router: Router
    )
    {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };

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
        this.registerForm = this._formBuilder.group({
            name           : ['Tom', Validators.required],
            email          : ['tom@myemail.cm', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
            [this.validateEmailNotTaken()]],
            password       : ['qwertyu', 
              [Validators.required,
              Validators.minLength(7),
              Validators.maxLength(11)]
            ],
            passwordConfirm: ['qwertyu', [Validators.required, confirmPasswordValidator]]
        });
        this.personalDataFormGroup = this._formBuilder.group({
          knowAs: [this.registerForm.get('name').value, Validators.required],
          lastname: [''],
          gender: ['female', Validators.required],
          dateOfBirth: ['', Validators.required],
          feet: ['5', Validators.required],
          inch: ['00', Validators.required],
          pound: ['61', Validators.required]
        });
        this.aboutFormGroup = this._formBuilder.group({
          introduction: [
            // tslint:disable-next-line: max-line-length
            'Grew up in the Portland, Oregon area. Survived middle school by becoming a skater kid (still haven’t grown out of it). Now I’m trying to pay my rent, play my music, and make my way.', 
            [Validators.required,
            Validators.minLength(100),]],
          lookingFor: [''],
          interests: [''],
          smoke: ['never', Validators.required],
          drink: ['rarely', Validators.required]
        });
        this.addressFormGroup = this._formBuilder.group({
          city: ['New York', Validators.required],
          country: ['USA', Validators.required],
          address: ['Cameroon', Validators.required]
        });
        this.contactFormGroup = this._formBuilder.group({
          phone: ['+1234567890'],
          company: ['MEGATECH'],
          jobTitle: ['Architech', Validators.required],
          avatar: ['', Validators.required]
        });

        // Update the validity of the 'passwordConfirm' field
        // when the 'password' field changes
        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
        });

        this.formGroup = this._formBuilder.group({
          formArray: this._formBuilder.array([
            this._formBuilder.group({
              firstNameFormCtrl: ['', Validators.required],
              lastNameFormCtrl: ['', Validators.required],
            }),
            this._formBuilder.group({
              emailFormCtrl: ['', Validators.email]
            }),
          ])
        });

        this._authService.currentAvatar.subscribe(avatar => this.avatar = avatar);
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

    validateEmailNotTaken(): AsyncValidatorFn {
      return control => {
        return timer(500).pipe(
          switchMap(() => {
            if (!control.value) {
              return of(null);
            }
            return this._authService.checkEmailExists(control.value).pipe(
              map(res => {
                return res ? { emailExists: true } : null;
              })
            );
          })
        );
      };
    }

    register() {
      this._authService.currentAvatar.subscribe(avatar => this.avatar = avatar);
      this.mapregisterUser();
      this._authService.register(this.user).subscribe(
        () => {
          console.log('Registration succesful');
        },
        error => {
          console.log(error);
        },
        () => {
          this._authService.login(this.user).subscribe(() => {
            this.router.navigate(['apps/members/ifriends/']);
          });
        }
      );
    }

    mapregisterUser() {
      if (this.registerForm.valid) {
        this.registers = Object.assign({}, this.registerForm.value);
      }
      if (this.personalDataFormGroup.valid) {
        this.personalData = Object.assign({}, this.personalDataFormGroup.value);
      }
      if (this.aboutFormGroup.valid) {
        this.about = Object.assign({}, this.aboutFormGroup.value);
      }
      if (this.addressFormGroup.valid) {
        this.address = Object.assign({}, this.addressFormGroup.value);
      }
      if (this.contactFormGroup.valid) {
        this.contact = Object.assign({}, this.contactFormGroup.value);
      }
      
      this.user = {
        username: this.registers.name,
        knownAs: this.personalData.knowAs,
        dateOfBirth: new Date(this.personalData.dateOfBirth).toISOString().slice(0, -1),
        gender: this.personalData.gender,
        city: this.address.city,
        country: this.address.country,
        interests: this.about.interests,
        introduction: this.about.introduction,
        lookingFor: this.about.lookingFor,
        lastname: this.personalData.lastname,
        company: this.contact.company,
        jobtitle: this.contact.jobTitle,
        email: this.registers.email,
        phone: this.contact.phone,
        address: this.address.address,
        size: this.personalData.inch,
        pound: this.personalData.pound,
        feet: this.personalData.feet,
        password: this.registers.password,
        smoke: this.about.smoke,
        drink: this.about.drink,
        avatar: this.avatar
      }
      // console.log(this.user);
    }

    openBottomSheet(): void {
      this._bottomSheet.open(BottomSheetOverviewExampleSheetComponent, {
          data: { 
            gender: [this.personalDataFormGroup.get('gender').value],
            caller: 'register' },
        });
  }
}



/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if ( !control.parent || !control )
    {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if ( !password || !passwordConfirm )
    {
        return null;
    }

    if ( passwordConfirm.value === '' )
    {
        return null;
    }

    if ( password.value === passwordConfirm.value )
    {
        return null;
    }

    return {passwordsNotMatching: true};
};
