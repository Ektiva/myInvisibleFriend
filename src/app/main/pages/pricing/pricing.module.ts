import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { FuseSharedModule } from '@fuse/shared.module';

import { PricingStyle3Component } from 'app/main/pages/pricing/style-3/style-3.component';

const routes = [
    
    {
        path     : 'pricing/style-3',
        component: PricingStyle3Component
    }
];

@NgModule({
    declarations: [
        PricingStyle3Component
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatDividerModule,

        FuseSharedModule
    ]
})
export class PricingModule
{
}
