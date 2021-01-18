import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IssueListComponent } from './issues/issue-list.component';
import { ConvertToIsoDatePipe } from './pipes/convert-to-iso-date-pipe';

const route = [
    { path: 'issues', component: IssueListComponent },
    { path: '', redirectTo: 'issues', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        IssueListComponent,
        ConvertToIsoDatePipe
    ],
    exports: [RouterModule, CommonModule],
    imports: [CommonModule, RouterModule.forRoot(route)],
})
export class AppRoutingModule { }
