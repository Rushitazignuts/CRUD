import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
freshnessList =["New","old"];
productForm !:FormGroup;
actionBtn:string ='save'
constructor(private fb : FormBuilder,private api:ApiService,
  @Inject(MAT_DIALOG_DATA) public editData:any,
  private dialogRef:MatDialogRef<DialogComponent>){}
ngOnInit(): void {
  this.productForm=this.fb.group({
    productName :['',Validators.required],
    category :['',Validators.required],
    freshness :['',Validators.required],
    price :['',Validators.required],
    date :['',Validators.required],
  });
  //console.log(this.editData);
  if(this.editData){
this.actionBtn="Update"
  this.productForm.controls['productName'].setValue(this.editData.productName);
  this.productForm.controls['category'].setValue(this.editData.category);
  this.productForm.controls['freshness'].setValue(this.editData.freshness);
  this.productForm.controls['price'].setValue(this.editData.price);
  this.productForm.controls['date'].setValue(this.editData.date ); 
}
}
AddProduct(){

  if(!this.editData){
    if(this.productForm.valid){
  console.log(this.productForm.value);
  this.api.postProduct(this.productForm.value).subscribe({
   next:(res)=> {
    alert("product added successfully!!");
    this.productForm.reset();
    this.dialogRef.close('save');
   },
   error:()=>{
    alert("error")
   }
  })
}
}else{
   this.updateProduct()

   
}
}
updateProduct(){
this.api.putProduct(this.productForm.value,this.editData.id)
.subscribe({
  next:(res)=>{
    alert("product Update successfully!");
    this.productForm.reset();
    this.dialogRef.close("update");
  },
  error:()=>{
    alert("error");
  }
})
}
}


