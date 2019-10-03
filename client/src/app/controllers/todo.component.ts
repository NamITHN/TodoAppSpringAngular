import { Component, OnInit } from "@angular/core";
import { TodoService } from "./../models/services/todo.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormAddData } from "./../models/todo.model";

@Component({
  selector: "app-todo",
  templateUrl: "./../views/todo.component.html"
})
export class TodoComponent implements OnInit {
  formadddata: FormGroup;
  changedata: FormGroup;
  info: FormAddData[];
  checklist: number[] = [];
  tododetail: FormAddData;
  itemdata: FormAddData;
  ShowAddForm: boolean = false;
  idchange;
  showDelete: boolean = false;
  showDeleteAll: boolean = false;
  showDeleteMulti: boolean = false;
  showAddSuccess: boolean = false;
  showDelSuccess: boolean = false;
  isShow: boolean = true;
  selectid: number;
  shareID: number;
  checkBox: boolean = false;

  constructor(private fb: FormBuilder, private service: TodoService) {}

  ngOnInit() {
    this.formadddata = this.fb.group({
      todoTitle: ["", [Validators.required]],
      todoDescription: ["", [Validators.required]],
      todoTime: ["", [Validators.required]],
      todoId: ["", [Validators.required]]
    });
    this.changedata = this.fb.group({
      todoTitle: ["", [Validators.required]],
      todoDescription: ["", [Validators.required]],
      todoTime: ["", [Validators.required]],
      todoId: ["", [Validators.required]]
    });
    this.loadData();
  }
  loadData(): void {
    this.service.getdata().subscribe(data => (this.info = data));
  }

  displayForm(info: FormAddData, id: number) {
    this.isShow = !this.isShow;
    this.ShowAddForm = false;
    this.itemdata = info;
    this.idchange = info.todoId;
    this.changedata.get("todoId").setValue(this.itemdata.todoId);
    this.changedata.get("todoTitle").setValue(this.itemdata.todoTitle);
    this.changedata
      .get("todoDescription")
      .setValue(this.itemdata.todoDescription);
    this.changedata.get("todoTime").setValue(this.itemdata.todoTime);
  }
  cancel() {
    this.isShow = !this.isShow;
  }

  postForm(): void {
    const newinfo = this.formadddata.value;
    this.service.postdata(newinfo).subscribe(postdata => {
      this.info.push(newinfo);
      this.showAddSuccess = !this.showAddSuccess;
      setTimeout(() => {
        this.showAddSuccess = !this.showAddSuccess;
      }, 4000);
    });
    this.formadddata.reset();
  }

  // checkClick(id: number) {
  //   this.selectid = id;
  // }

  editData(changedata: any): void {
    const newdata = this.changedata.value;
    const danhsachid = this.idchange;
    this.service.updatedata(newdata, danhsachid).subscribe(() => {
      this.showAddSuccess = !this.showAddSuccess;
      setTimeout(() => {
        this.showAddSuccess = !this.showAddSuccess;
      }, 4000);
      this.loadData();
    });
  }
  clickDelete(): void {
    const iditem = this.shareID;
    this.service.deletedata(iditem).subscribe(() => {
      this.info = this.info.filter(td => td.todoId != iditem);
      this.showDelSuccess = !this.showDelSuccess;
      setTimeout(() => {
        this.showDelSuccess = !this.showDelSuccess;
      }, 4000);
    });
    this.showDelete = !this.showDelete;
  }

  share(id: number) {
    this.shareID = id;
    this.showDelete = !this.showDelete;
  }
  deleteAll(): void {
    this.service.deleteall().subscribe(() => {
      this.info = [];
      this.showDelSuccess = !this.showDelSuccess;
      setTimeout(() => {
        this.showDelSuccess = !this.showDelSuccess;
      }, 4000);
    });
    this.loadData();
    this.showDeleteAll = !this.showDeleteAll;
  }

  deleteSelect(): void {
    const listselected = JSON.stringify(this.checklist);
    this.service.deleteselect(this.checklist).subscribe(() => {
      this.checklist = [];
      this.loadData();
      this.showDelSuccess = !this.showDelSuccess;
      setTimeout(() => {
        this.showDelSuccess = !this.showDelSuccess;
      }, 4000);
    });
    this.showDeleteMulti = !this.showDeleteMulti;
  }
  checked(id: number): void {
    if (this.checklist.find(item => item == id) != null) {
      this.checklist = this.checklist.filter(item => item != id);
    } else {
      this.checklist.push(id);
    }
    console.log(this.checklist.length);
    if (this.checklist.length > 0) {
      console.log("true");
      this.checkBox = true;
    } else {
      console.log("false");
      this.checkBox = false;
      console.log(this.checkBox);
    }
  }
  // onselect(item: FormAddData): void {
  //   console.log(`${JSON.stringify(item)}`);
  //   this.tododetail = item;
  // }
}
