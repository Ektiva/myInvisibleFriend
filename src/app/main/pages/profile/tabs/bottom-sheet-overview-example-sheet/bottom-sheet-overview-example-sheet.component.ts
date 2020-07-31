import { Component, OnInit, Inject } from '@angular/core';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { AuthService } from 'app/_services/auth.service';
import { UserService } from 'app/_services/user.service';

@Component({
  selector: 'app-bottom-sheet-overview-example-sheet',
  templateUrl: './bottom-sheet-overview-example-sheet.component.html',
  styleUrls: ['./bottom-sheet-overview-example-sheet.component.scss'],
  // template: 'passed in {{ data.names }}'
})
export class BottomSheetOverviewExampleSheetComponent implements OnInit {
  // @Input: User;
  user: any;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    public authService: AuthService,
    private userService: UserService,
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheetComponent>) {}

  openLink(event: MouseEvent, url: string): void {  

    if(this.data.caller === 'register'){
      this.authService.chooseAvatar(url);
    }else{
      this.user.avatar = url;
      this.UpdateUser();
    }
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  UpdateUser(){
    console.log(this.user);
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

  ngOnInit() {
    this.user = this.authService.currentUser;
  }

}
