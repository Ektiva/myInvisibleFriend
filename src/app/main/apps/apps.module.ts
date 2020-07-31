import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';
import { ChatService } from './chat/chat.service';

const routes = [
    {
        path        : 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule)
    },
    {
        path        : 'members',
        loadChildren: () => import('./academy/academy.module').then(m => m.AcademyModule)
    },
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule
    ],
    providers     : [
        ChatService
    ]
})
export class AppsModule
{
}
