import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(
    private router : Router
  ) { }

  ngOnInit(): void {
    this.taskList = localStorage.getItem('task_list');
    if(this.taskList){
      this.taskList = JSON.parse(this.taskList);
    }else{
      this.taskList = [];
    }
  }
  btnQuickLinksStatus = false;
  taskList : any = [];
  selectedIndex = -1;
  filter = 'all';
  addTask(){
    this.router.navigate(['/add-task'])
  }
  removeItem(task : any){
    let list : any = localStorage.getItem('task_list');
    if(list){
      list = JSON.parse(list);
      let itemIdx = list.findIndex((item : any)=>item['id'] == task['id']);
      if(itemIdx>-1){
        list.splice(itemIdx,1);
        if(list.length>0){
          localStorage.setItem('task_list',JSON.stringify(list));
        }else{
          this.taskList = [];
          localStorage.removeItem('task_list');
        }
      }
    }else{
      this.taskList = [];
    }
    this.onChangeFilter();
  }
  editTask(task:any){
    localStorage.setItem('task-data',JSON.stringify(task));
    this.router.navigate(['/edit-task'],{queryParams:{id : task['id']}});
  }
  markTaskCompleted(task:any){
    let list : any = localStorage.getItem('task_list');
    if(list){
      list = JSON.parse(list);
      let itemIdx = list.findIndex((item : any)=>item['id'] == task['id']);
      if(itemIdx>-1){
        list[itemIdx]['status'] = 'Completed';
        localStorage.setItem('task_list',JSON.stringify(list));
        this.onChangeFilter();
      }
    }
  }
  onChangeFilter(){
    console.log(this.filter);
    let list : any = localStorage.getItem('task_list');
    if(list){
      list = JSON.parse(list);
      if(this.filter == 'all'){
        this.taskList = list;
      }else{
        this.taskList = list.filter((item:any)=>item['status'] == this.filter);
      }
    }
  }
}
