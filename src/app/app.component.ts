import { Component, OnInit,ViewChild ,AfterViewInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CRUD';
  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price', 'date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog : MatDialog,private api:ApiService){}
  ngOnInit(): void {
    this.getAllProduct();
    
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%',
      height:'40%'
    }).afterClosed().subscribe(val =>{
      if(val ==='save'){
        this.getAllProduct();
      }
    })
  }
  getAllProduct(){
    this.api.getProduct().subscribe({
      next:(res)=> {
       //alert("product added successfully!!");
       this.dataSource=new MatTableDataSource(res);
       this.dataSource.paginator=this.paginator;
       this.dataSource.sort=this.sort;
       
      },
      error:()=>{
       alert("error")
      }
     })

  }
  editProduct(row:any){
this.dialog.open(DialogComponent,{
  width:'30%',
  data:row
}).afterClosed().subscribe(val=>{
  if(val==='update'){
    this.getAllProduct()
  }
})
  }
deleteProduct(id:number){
  this.api.deleteProduct(id).subscribe({
    next:(res)=>{
      alert("delete successfully!");
      this.getAllProduct();
    }, 
    error:()=>{
      alert("error")
    }
  })
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
