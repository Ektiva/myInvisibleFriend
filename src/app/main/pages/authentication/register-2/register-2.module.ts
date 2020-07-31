import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';

import { Register2Component } from 'app/main/pages/authentication/register-2/register-2.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

const routes = [
    {
        path     : 'auth/register-2',
        component: Register2Component
    }
];

@NgModule({
    declarations: [
        Register2Component
    ],
    imports     : [
        RouterModule.forChild(routes),
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatStepperModule,
        FuseSharedModule,
        MatDatepickerModule,
        MatDividerModule
    ], exports:[
        MatCardModule,
        MatStepperModule,
        MatDatepickerModule,
        MatDividerModule
    ]
})
export class Register2Module
{
}
