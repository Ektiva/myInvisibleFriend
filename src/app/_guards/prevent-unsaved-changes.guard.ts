import {Injectable} from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProfileTimelineComponent } from 'app/main/pages/profile/tabs/timeline/timeline.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<ProfileTimelineComponent> {
    canDeactivate(component: ProfileTimelineComponent) {
        if (component.editForms.dirty) {
            return confirm('Are you sure you want to continue?  Any unsaved changes will be lost');
        }
        return true;
    }
}