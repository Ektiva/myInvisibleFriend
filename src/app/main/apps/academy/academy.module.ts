import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FuseSharedModule } from '@fuse/shared.module';

import { AcademyCoursesComponent } from 'app/main/apps/academy/courses/courses.component';
import { AcademyCourseComponent } from 'app/main/apps/academy/course/course.component';
import { AcademyCoursesService } from 'app/main/apps/academy/courses.service';
import { AcademyCourseService } from 'app/main/apps/academy/course.service';
import { FuseSidebarModule } from '@fuse/components';
import { MemberListResolver } from 'app/_resolvers/member-list.resolver';
import { AuthGuard } from 'app/_guards/auth.guard';
import { ListsResolver } from 'app/_resolvers/lists.resolver';
import { AcademyLikesComponent } from './likes/likes.component';
import { LikesResolver } from 'app/_resolvers/likes.resolver';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { TimesAgosPipe } from 'app/TimesAgosPipe.pipe';
import { DialogElementsExampleDialogComponent } from './DialogElementsExampleDialog/DialogElementsExampleDialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';


const routes = [
    {
        path     : 'ifriends',
        component: AcademyCoursesComponent,
        canActivate: [AuthGuard], 
        resolve  : {
            // academy: AcademyCoursesService
            users: MemberListResolver,
            likes: ListsResolver
        }
    },
    {
        path     : 'likes',
        component: AcademyLikesComponent,
        canActivate: [AuthGuard], 
        resolve  : {
            users: LikesResolver
        }
    },
    {
        path     : 'courses/:courseId/:courseSlug',
        component: AcademyCourseComponent,
        resolve  : {
            academy: AcademyCourseService
        }
    },
    {
        path      : '**',
        redirectTo: 'ifriends'
    }
];

@NgModule({
    declarations: [
        AcademyCoursesComponent,
        AcademyLikesComponent,
        AcademyCourseComponent,
        DialogElementsExampleDialogComponent,
        TimesAgosPipe
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatGridListModule
    ],
    exports   : [
        MatSnackBarModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatGridListModule
    ],
    providers   : [
        AcademyCoursesService,
        AcademyCourseService
    ]
})
export class AcademyModule
{
}
