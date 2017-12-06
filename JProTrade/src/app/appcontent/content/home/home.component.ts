import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { HomeApi, SharesType } from '../../../api/home';
import { CommonService } from '../../../shared/common.service';
import { AutoCompleteModule, DropdownModule, SelectItem, ButtonModule, LazyLoadEvent, Message, DialogModule } from 'primeng/primeng';
import { log } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeApi]
})
export class HomeComponent implements OnInit {
  shares: SharesType = new SharesType();
  gupiao: SharesType[] = [];
  selectedValue: SharesType;
  dropdownName: SelectItem[];
  text: string;
  results: string[];
  cities: any;
  selectedCity: any;
  code: any[] = [];
  private upLoadUrl =  "sys/form/upLoad";
  displayDialog: boolean;

  car: PrimeCar = new PrimeCar();

  selectedCar: PrimeCar;

  newCar: boolean;

  cars: PrimeCar[];
  constructor(
    private HomeApi: HomeApi,
    private commService: CommonService,
    private router: Router,
    private http: Http) {
    this.dropdownName = [{ label: '--请选择--', value: '' }];
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  ngOnInit() {
    this.HomeApi.getdata().subscribe(
      res => {
        for (let i = 0; i < res.data.length; i++) {
          var arr1 = res.data[i].split('|');
          // for (let j = 0; j < 2; j++) {
          this.gupiao.push({
            GId: arr1[0],
            GAllName: arr1[1],
            Gcode: arr1[2],
            Gname: arr1[3],
            Glevel: arr1[4],
            Gdate: arr1[5],
            Recommender: arr1[6],
            Gfile: arr1[7],
          })
          this.code.push(arr1[2])
          this.dropdownName.push({ label: arr1[3], value: arr1[3] });
          // }
        }
        console.log(this.dropdownName)
      },
      error => {
        console.log(error);
      }
    );
  }
  searchPage() { }
  search(event) {
  }
  save() {
    this.displayDialog = false;
  }

  delete() {
    this.displayDialog = false;
  }
  filterFmFormNameSingle(event) {
    let query = event.query;
    this.results = this.filterFmFormName(query, this.code);
  }
  filterFmFormName(query, countries: any[]): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      console.log(country)
      if (country.toLowerCase().indexOf(query.toLowerCase())> 0) {
        filtered.push(country);
      }
    }
    return filtered;
  }
  showDialogToAdd() {
    this.newCar = true;
    this.shares = new SharesType();
    this.selectedValue = new SharesType();
    this.displayDialog = true;
  }
  onRowSelect(event) {
    this.newCar = false;
    this.selectedValue = event.data;
    // this.car = this.cloneCar(event.data);
    this.displayDialog = true;
  }
  Reset() {
    this.shares = new SharesType();
  }
  onUpload(e){}
}
class PrimeCar {

  constructor(public vin?, public year?, public brand?, public color?) { }
}