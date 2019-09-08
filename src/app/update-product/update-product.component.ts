import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import{Router} from '@angular/router';
//import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';  

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id:number;
  data:object={};
  exist=false;
  Products=[];
  ProductObj:object={};

  private headers=new Headers({'Content-Type': 'application/json'});

  constructor(private router:Router, private route:ActivatedRoute, private http: Http) { }

  updateProduct(Product){
    this.ProductObj={
    "name":Product.name,
    "color":Product.color
    };
    const url=`${"http://localhost:5555/products"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.ProductObj),{headers: this.headers})
    .toPromise()
    .then(()=>{
      this.router.navigate(['/']);

    })
  

  }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      this.id=+params['id'];
    });

    this.http.get("http://localhost:5555/products").subscribe(
      (res: Response) => {
        this.Products=res.json();

        for(var i=0; i<this.Products.length;i++){
          if(parseInt(this.Products[i].id)==this.id){
            this.exist=true;
            this.data=this.Products[i];
            break;
          }
          else{
            this.exist=false;
          }
        }
    }
  )
}
}