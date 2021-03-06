import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import {merge, Observable, of as observableOf, Subscription} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { FieldValue } from 'src/app/interfaces/field.interface';
import { Form } from 'src/app/interfaces/form.interface';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'table-api',
  templateUrl: 'table.component.html',
  styleUrls: ['table.component.css']
})
export class TableApiComponent implements AfterViewInit{
  public authority: string;
  displayedColumns: string[] = [
    'id',
    'user_id',
    'form_field_values',
    'created_at',
    'updated_at'  
  ];
  columns: string[] = ['id', 'type', 'value', 'created_at','updated_at'];
  data: Form[] = [];
  fields: FieldValue[] = [];
  mrg: Subscription;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService, private auth: AuthService, private toastr: ToastrService) {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.merge();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.merge(filterValue);
  }
  private merge(search?: string){
    this.api.getFormFields().subscribe(v=>{
      this.fields = v.data as FieldValue[];
      if (!this.mrg?.closed) this.mrg?.unsubscribe();
      this.mrg = merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.api!.getForms(
            this.paginator.pageIndex, this.paginator.pageSize,this.sort.active, this.sort.direction, search);
        }),
        map(data => {
          this.resultsLength = data.meta.total_items_count;
          return data.data as Form[];
        }),
        catchError((er) => {
          if (er.status == 401){
            this.toastr.error('not authorized')
            this.auth.refreshAuth()
          }
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
    })
  }
  getField(id: number): FieldValue{
    return this.fields.find(x=>x.id==id);
  }
}