import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit,OnDestroy {
  
  formSubmitted : boolean = false;
  modeParamSubscription : any;
  taskID : any = '';

 constructor(
    private fb : FormBuilder,
    private router : Router,
    private route : ActivatedRoute,

  ) { }

  ngOnInit() {
   
    this.modeParamSubscription = this.route.queryParamMap.subscribe(p=>{ 
     
      this.taskID = p.get('id') 
      if(this.taskID && this.taskID!=null && this.taskID!=''){
        this.getTaskData(this.taskID);
      }     
    })    
  }
  ngOnDestroy(){
    if(this.modeParamSubscription){
      this.modeParamSubscription.unsubscribe();
    }
    localStorage.removeItem('task-data');
  }
  taskForm = this.fb.group({
    id : ['' , []],
    title : ['' , [Validators.required]],
    description : ['' , []],
    status : ['Pending' , []],
    
  });
 

  get form(){
    return this.taskForm.controls;
  }
 
  saveTask(){
    this.formSubmitted = true;
    if(this.taskForm.valid){
      var tasksObj : any = Object.assign({},this.taskForm.getRawValue());
      let taskList : any = localStorage.getItem('task_list');
     
      if(taskList){
        taskList = JSON.parse(taskList);
      }else{
        taskList = [];
      }
      if(!tasksObj['id']){
        tasksObj['id'] = new Date().getTime();
        taskList.push(tasksObj);
      }else{
        let itemIdx = taskList.findIndex((item : any)=>item['id'] == tasksObj['id']);
        if(itemIdx>-1){
          taskList[itemIdx] = tasksObj;
        }
      }
      localStorage.setItem('task_list',JSON.stringify(taskList));
      this.router.navigate(['/tasks']);
    }
  
  }
  closeTask(){
    this.router.navigate(['/tasks']);
  }
  getTaskData(id : string){
    let taskData : any = localStorage.getItem('task-data');
    if(taskData){
      taskData = JSON.parse(taskData);
      this.taskForm.patchValue(taskData);
    }
  }

}
