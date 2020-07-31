import { NgModule } from '@angular/core';

import { Login2Module } from 'app/main/pages/authentication/login-2/login-2.module';
import { Register2Module } from 'app/main/pages/authentication/register-2/register-2.module';
import { ForgotPassword2Module } from 'app/main/pages/authentication/forgot-password-2/forgot-password-2.module';
import { ResetPassword2Module } from 'app/main/pages/authentication/reset-password-2/reset-password-2.module';
import { LockModule } from 'app/main/pages/authentication/lock/lock.module';
import { ComingSoonModule } from 'app/main/pages/coming-soon/coming-soon.module';
import { Error404Module } from 'app/main/pages/errors/404/error-404.module';
import { Error500Module } from 'app/main/pages/errors/500/error-500.module';
import { MaintenanceModule } from 'app/main/pages/maintenance/maintenence.module';
import { PricingModule } from 'app/main/pages/pricing/pricing.module';
import { ProfileModule } from 'app/main/pages/profile/profile.module';
import { KnowledgeBaseModule } from 'app/main/pages/knowledge-base/knowledge-base.module';
import { MemberModule } from './member/member.module';

@NgModule({
    imports: [
        // Authentication
        Login2Module,
        Register2Module,
        ForgotPassword2Module,
        ResetPassword2Module,
        LockModule,

        // Coming-soon
        ComingSoonModule,

        // Errors
        Error404Module,
        Error500Module,

        // Maintenance
        MaintenanceModule,

        // Pricing
        PricingModule,

        // Profile
        ProfileModule,

        // Member
        MemberModule,

        // Knowledge base
        KnowledgeBaseModule
    ]
})
export class PagesModule
{

}
