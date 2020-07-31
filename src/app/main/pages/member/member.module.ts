import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FuseSharedModule } from '@fuse/shared.module';


import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { PreventUnsavedChanges } from 'app/_guards/prevent-unsaved-changes.guard';
import { MemberEditResolver } from 'app/_resolvers/member-edit.resolver';
import { MemberService } from 'app/main/pages/member/member.service';
import { MemberComponent } from 'app/main/pages/member/member.component';
import { MemberTimelineComponent } from 'app/main/pages/member/tabs/timeline/timeline.component';
import { MemberAboutComponent } from 'app/main/pages/member/tabs/about/about.component';
import { TimesAgoPipe } from 'app/TimesAgoPipe.pipe';
import { MemberDetailResolver } from 'app/_resolvers/member-detail.resolver';

const routes = [
    {
        path     : 'member/:id',
        component: MemberComponent,
        resolve  : {
            member: MemberService,
            user: MemberDetailResolver
        }
        // canDeactivate: [PreventUnsavedChanges]
    }
];

@NgModule({
    declarations: [
        MemberComponent,
        MemberTimelineComponent,
        MemberAboutComponent,
        TimesAgoPipe
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
        MatRadioModule
    ],
    exports   : [
        MatCardModule,
        MatButtonToggleModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatRadioModule
    ],
    providers   : [
        MemberService
    ]
})
export class MemberModule
{
}
