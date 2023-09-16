// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component'; // Import UserComponent
import { QuizComponentAdmin } from './admin/admin.component'; // Import AdminComponent

const routes: Routes = [
  { path: 'user', component: QuizComponent }, // User route
  { path: 'admin', component: QuizComponentAdmin }, // Admin route
  { path: '', redirectTo: '/user', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
