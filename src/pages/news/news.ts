import {Component, OnInit} from '@angular/core';
import { NavController} from 'ionic-angular';
import { Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {NewsService} from "../../app/news.service";
import {DetailPage} from "../detail/detail";

@Component({
  selector: 'page-about',
  templateUrl: 'news.html'
})
export class NewsPage implements OnInit{
  initTopNews: any;
  banner_slides: any;
  allnews: {}[];
  news: {}[];
  ngOnInit(): void {
    this.getData();
  }

  constructor(public navCtrl: NavController, public http: Http,private ns: NewsService) {


    }
    getData(){
      return this.http.get('http://localhost:3000/users')
        .toPromise()
        .then(res => {
          var data = res.json().data;
          this.allnews = data;
          var endlength = this.allnews.length;
          this.banner_slides = this.allnews.slice(0,2);
          this.news = this.allnews.slice(3,endlength);
        }).catch(this.handleError)
    }
    handleError(error) {
      return Promise.reject(error.message || error);
    }
  goDetail(slide){
    this.navCtrl.push(DetailPage,slide);
  }
}
