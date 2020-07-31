import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { FakeDbService } from 'app/fake-db/fake-db.service';
import { AppComponent } from 'app/app.component';
import { AppStoreModule } from 'app/store/store.module';
import { LayoutModule } from 'app/layout/layout.module';
import { AuthGuard } from './_guards/auth.guard';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { JwtModule } from '@auth0/angular-jwt';
import { ListsResolver } from './_resolvers/lists.resolver';
import { LikesResolver } from './_resolvers/likes.resolver';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { ChatService } from './main/apps/chat/chat.service';
// import { TimeAgoExtendsPipe } from './TimeAgoExtendsPipe.pipe';
// import { DialogElementsExampleDialogComponent } from './DialogElementsExampleDialog/DialogElementsExampleDialog.component';

export function tokenGetter() {
    return localStorage.getItem('token');
  }

const appRoutes: Routes = [
    {
        path        : 'apps',
        loadChildren: () => import('./main/apps/apps.module').then(m => m.AppsModule)
    },
    {
        path        : 'pages',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path        : 'ui',
        loadChildren: () => import('./main/ui/ui.module').then(m => m.UIModule)
    },
    {
        path      : '**',
        // redirectTo: 'apps/dashboards/analytics'
        redirectTo: '/pages/auth/login-2'
    }
];

@NgModule({
   declarations: [
      AppComponent
      //TimeAgoExtendsPipe,
    //   DialogElementsExampleDialogComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes),
      TranslateModule.forRoot(),
      InMemoryWebApiModule.forRoot(FakeDbService, { 
          delay: 0,
          passThruUnknownUrl: true
      }),
        MatSnackBarModule,
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule,

        JwtModule.forRoot({
            config: {
              tokenGetter,
              whitelistedDomains: ['localhost:44382'],
              blacklistedRoutes: ['localhost:44382/api/auth']
            }
        })
    ],
    exports   : [
        MatSnackBarModule
    ],
    providers: [
        AuthGuard,
        MemberListResolver,
        ListsResolver,
        LikesResolver,
        PreventUnsavedChanges,
        MemberDetailResolver,
        ChatService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
