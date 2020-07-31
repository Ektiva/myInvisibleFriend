import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';

import { ProfileService } from 'app/main/pages/profile/profile.service';
import { ProfileComponent } from 'app/main/pages/profile/profile.component';
import { ProfileTimelineComponent } from 'app/main/pages/profile/tabs/timeline/timeline.component';
import { ProfileAboutComponent } from 'app/main/pages/profile/tabs/about/about.component';
import { ProfilePhotosVideosComponent } from 'app/main/pages/profile/tabs/photos-videos/photos-videos.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { TimeAgoExtendsPipe } from 'app/TimeAgoExtendsPipe.pipe';
import { PreventUnsavedChanges } from 'app/_guards/prevent-unsaved-changes.guard';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberEditResolver } from 'app/_resolvers/member-edit.resolver';
import { MatListModule } from '@angular/material/list';
import { MatBottomSheet, MatBottomSheetRef, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { BottomSheetOverviewExampleSheetComponent } from './tabs/bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';
import {MatGridListModule} from '@angular/material/grid-list';

const routes = [
    {
        path     : 'profile',
        component: ProfileComponent,
        resolve  : {
            profile: ProfileService
        }
        // canDeactivate: [PreventUnsavedChanges]
    },
    {
        path     : 'members/:id',
        component: MemberDetailComponent,
        resolve  : {
            user: MemberEditResolver
        }
    }
];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileTimelineComponent,
        ProfileAboutComponent,
        ProfilePhotosVideosComponent,
        BottomSheetOverviewExampleSheetComponent,
        TimeAgoExtendsPipe
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatCardModule,
        FuseSharedModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatRadioModule,
        MatListModule,
        MatGridListModule,
        MatBottomSheetModule
    ],
    exports   : [
        MatCardModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatRadioModule,
        MatListModule,
        MatGridListModule,
        MatBottomSheetModule
    ],
    providers   : [
        ProfileService
        // MatBottomSheet, 
        // MatBottomSheetRef

    ]
})
export class ProfileModule
{
}
