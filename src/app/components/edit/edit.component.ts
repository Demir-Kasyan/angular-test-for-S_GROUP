import {Component, AfterViewInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Form } from 'src/app/interfaces/form.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css']
})
export class EditComponent{
  public authority: string;
  columns: string[] = ['id', 'value', 'created_at','updated_at','update'];
  data: Form;
  id: number;
  newDatafield: string | number | Date;
  constructor(private api: ApiService, private toastr: ToastrService) {}
  findForm() {
    this.data = undefined;
    this.api.getForm(this.id).subscribe(data=>{
        this.data = data.data as Form;
    },error=>{
        if (error.status == 404){
            this.toastr.error("Invalid id",'404');
        }
        else if (error.status == 403){
            this.toastr.error("forbidden",'403');
        }
    });
  }
  updateForm(){
    this.api.updateForm(this.id,{
        form_field_values:  this.data.form_field_values
    }).subscribe(data=>{
        this.data = data.data as Form;
    },error=>{
        if (error.status == 404){
            this.toastr.error("Invalid id",'404');
        }
        else if (error.status == 403){
            this.toastr.error("forbidden",'403');
        }
    });
  }
  deleteForm(){
    this.api.deleteForm(this.id).subscribe(data=>{
        this.data = undefined;
        this.id = undefined;
        this.newDatafield = undefined;
        this.toastr.success("success delete",'204');
    },error=>{
        if (error.status == 404){
            this.toastr.error("Invalid id",'404');
        }
        else if (error.status == 403){
            this.toastr.error("forbidden",'403');
        }
    });
  }
  createForm(){
      this.api.createForm(
          {
            form_field_values: [
                {
                  form_field_id: 1,
                  value: this.newDatafield
                }
              ]
          }
      ).subscribe(value=>{
        this.data = value.data;
        this.id = this.data.id;
        this.newDatafield = undefined;
        this.toastr.success("success create",'201');
      },error=>{
        if (error.status == 404){
            this.toastr.error("Invalid id",'404');
        }
        else if (error.status == 403){
            this.toastr.error("forbidden",'403');
        }
      })
  }
}