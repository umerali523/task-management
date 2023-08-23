import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';

const routes: Routes = [
  {path : '',component : AppLayoutComponent,children:[
    {path:'',component : TaskListComponent},
    {path:'tasks',component : TaskListComponent},
    {path:'add-task',component : AddTaskComponent},
    {path:'edit-task',component : AddTaskComponent},
    { path:'**',redirectTo:'tasks',pathMatch:'full'}, 
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
