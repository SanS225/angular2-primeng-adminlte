import { Component, OnInit } from '@angular/core';
import {  trigger, state, style, transition, animate } from '@angular/animations';
import { SearchInputType, DropdownlistApi, PageType, AddDdlType, UpdateDdlType, DropdownlistType } from '../../../../api/dropdownlist1';
import { CommonService } from '../../../../shared/common.service';
import { Message, SelectItem } from 'primeng/primeng';
@Component({
  selector: 'app-dropdownlist',
  templateUrl: './dropdownlist.component.html',
  styleUrls: ['./dropdownlist.component.css'],
  providers: [DropdownlistApi],
  animations: [
    trigger('shrinkOut', [
      state('in', style({ height: '*', opacity: 1 })),
      state('out', style({ height: 0, opacity: 0, padding: 0 })),
      transition('in <=> out', animate('500ms ease-out'))
    ])
  ]
})
export class DropdownlistComponent implements OnInit {
  // 查询栏
  shrinkflg = 'in';
  queryFormData = new SearchInputType();
  msg: Message[];
  autoDesc: any[];
  filteredDescriptionsSingle: any[];
  dropdownName: SelectItem[];
  languageData: any;
  dropdowns: DropdownlistType[] = [];
  exportDdl: DropdownlistType[] = [];
  dropdown: DropdownlistType = new DropdownlistType();
  page: PageType = new PageType();
  totalRecords: number;
  cols: any[];
  columnOptions: SelectItem[];
  displayDdlDialog: boolean;
  defineDropdown: SearchInputType = new SearchInputType();
  displayUploadDialog: boolean;
  uploadExcel: string;
  uploadedFiles: any[] = [];
  isdoallvalid = false;
  displayDdlDataDialog: boolean;
  isUpdate: boolean;
  constructor(
    private dropdownlistApi: DropdownlistApi,
    private commService: CommonService
  ) { }

  ngOnInit() {
    this.uploadExcel = this.dropdownlistApi.getUploadUrl();
    this.languageData = this.commService.localGet('languageData');
    this.getDownlistName();
    this.getDesc();
    this.initTableHeader();
  }
  cancelUpload() {
    this.displayUploadDialog = false;
  }
  showUpload() {
    this.displayUploadDialog = true;
  }
  onUpload(event) {
    this.uploadedFiles = [];
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(event);
  }
  cancelDdl() {
    this.displayDdlDialog = false;
    this.isdoallvalid = false;
  }
  saveDdl(ngform: any, e: any) {
  if (e.type === 'keyup' && e.code !== 'Enter') {
      return;
  }
  this.isdoallvalid = true;
  if (!ngform.form.valid) {
      return;
  }
   this.defineDropdown.ddDdlName = this.defineDropdown.ddDdlName.toUpperCase();
   this.defineDropdown.ddDdlDescription = this.defineDropdown.ddDdlDescription.toUpperCase();
   if (this.defineDropdown.ddDdlName) {
    for (let i = 0; i < this.dropdownName.length; i++) {
      if (this.dropdownName[i]['value'] === this.defineDropdown.ddDdlName) {
        this.commService.showInfo('warn', this.languageData.Common.WarnMessage, this.languageData.Common.SYS_E_0100);
      }
    }
  }
  if (this.defineDropdown.ddDdlDescription) {
    for (let i = 0; i < this.autoDesc.length; i++) {
      if (this.autoDesc[i]['ddDdlDescription'] === this.defineDropdown.ddDdlDescription) {
        this.commService.showInfo('warn', this.languageData.Common.WarnMessage, this.languageData.Common.SYS_E_0100);
      }
    }
  }
   this.dropdownName.push({ label: this.defineDropdown.ddDdlName, value: this.defineDropdown.ddDdlName });
   this.autoDesc.push({ ddDdlDescription: this.defineDropdown.ddDdlDescription });
   this.commService.showInfo('success', this.languageData.Common.SuccessMessage, this.languageData.Common.SaveSuccess);
   this.displayDdlDialog = false;
  //  console.log(this.defineDropdown);
  }
  showNewDdl() {
    this.displayDdlDialog = true;
    this.defineDropdown = new SearchInputType();
  }
  initTableHeader() {
    this.cols = [
      { field: 'ddDdlValue', header: this.languageData.SYS.DropDownList.Value },
      { field: 'ddDdlValueDescription', header: this.languageData.SYS.DropDownList.Description },
      { field: 'ddDdlValueAltDescription', header: this.languageData.SYS.DropDownList.AlternateDescription },
      { field: 'ddDdlGroup', header: this.languageData.SYS.DropDownList.Group },
      { field: 'ddDdlTag', header: this.languageData.SYS.DropDownList.Tag },
      { field: 'ddDdlValueStartDate', header: this.languageData.SYS.DropDownList.ESD },
      { field: 'ddDdlValueEndDate', header: this.languageData.SYS.DropDownList.EED },
      { field: 'ddDdlValueInactiveFlag', header: this.languageData.SYS.DropDownList.InactiveFlag },
      { field: 'ddDdlDescription', header: this.languageData.SYS.DropDownList.Description },
      { field: 'ddDdlName', header: this.languageData.SYS.DropDownList.Name },
    ];
    this.columnOptions = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
    }
  }
  ddlExportCSV(dt) {
    this.dropdownlistApi.search(this.queryFormData).subscribe(
      res => {
        this.exportDdl = res.data;
        setTimeout( () => {
          dt.exportCSV();
          // this.commService.showInfo();
        }, 500);
      },
      error => {
        window.alert(error);
      }
    );
  }
    // 分页
  paginate(event) {
    // console.log(event);
    this.page.startRow = event.first;
    this.page.pageSize = event.rows;
    // this.page.pageNumber = event.page;
    this.page.totalCount = event.pageCount;
    if (typeof(this.page.pageSize) === 'undefined') {
      this.page.pageSize = 10;
    }
    this.ddlSearch();
  }
  // ddl datatable
  showDialogToAdd() {
    this.displayDdlDataDialog = true;
    this.isUpdate = false;
    this.dropdown = new DropdownlistType();
    this.dropdown.ddDdlValueInactiveFlag = 'N';
  }
  cancel() {
    this.displayDdlDataDialog = false;
    this.isdoallvalid = false;
  }
  save(ngform: any, e: any) {
    if (e.type === 'keyup' && e.code !== 'Enter') {
      return;
    }
    this.isdoallvalid = true;
    if (!ngform.form.valid) {
        return;
    }
    if (this.dropdown.ddDdlDescription) {
      this.dropdown.ddDdlDescription = this.dropdown.ddDdlDescription.ddDdlDescription;
    }
    if (this.dropdown.ddDdlGroup) {
      this.dropdown.ddDdlGroup = this.dropdown.ddDdlGroup.toUpperCase();
    }
    if (this.dropdown.ddDdlValueStartDate) {
      // startTime = this.dropdown.ddDdlValueStartDate.replace(/-/g, '/');
      this.dropdown.ddDdlValueStartDate = this.commService.format('yyyy-M-d hh:mm:ss', this.dropdown.ddDdlValueStartDate);
      // this.dropdown.ddDdlValueStartDate = new Date(startDate);
    }
    if (this.dropdown.ddDdlValueEndDate) {
      // console.log(this.dropdown.ddDdlValueEndDate);
      this.dropdown.ddDdlValueEndDate = this.commService.format('yyyy-M-d hh:mm:ss', this.dropdown.ddDdlValueEndDate);
      // this.dropdown.ddDdlValueEndDate = new Date(endDate);
    }
    // console.log(this.dropdown);
    this.dropdown.ddDdlName = this.dropdown.ddDdlName.toUpperCase();
    this.dropdown.ddDdlValue = this.dropdown.ddDdlValue.toUpperCase();

    this.dropdownlistApi.add(this.dropdown).subscribe(
      res => {
        this.displayDdlDataDialog = false;
        this.ddlSearch();
        this.commService.showInfo('success', this.languageData.Common.SuccessMessage, this.languageData.Common.SaveSuccess);
      },
      error => {
        window.alert(error);
        // window.alert(error);
        // this.msg = this.commService.showInfo('error', 'Error Message', error);
      }
    );
  }
  delete() {
    this.dropdownlistApi.delete(this.dropdown.ddDdlId).subscribe(
      res => {
        this.msg = this.commService.showInfo('success', this.languageData.Common.SuccessMessage, this.languageData.Common.DeleteSuccess);
        this.displayDdlDataDialog = false;
        this.ddlSearch();
      },
      error => {
        window.alert(error);
      }
    );
  }
  update(ngform: any, e: any) {
    if (e.type === 'keyup' && e.code !== 'Enter') {
      return;
    }
    this.isdoallvalid = true;
    if (!ngform.form.valid) {
        return;
    }
    this.dropdown.ddDdlDescription = this.dropdown.ddDdlDescription.ddDdlDescription;
    if (this.dropdown.ddDdlGroup) {
      this.dropdown.ddDdlGroup = this.dropdown.ddDdlGroup.toUpperCase();
    }
    if (this.dropdown.ddDdlValueStartDate) {
      // startTime = this.dropdown.ddDdlValueStartDate.replace(/-/g, '/');
      this.dropdown.ddDdlValueStartDate = this.commService.format('yyyy-M-d hh:mm:ss', this.dropdown.ddDdlValueStartDate);
      // this.dropdown.ddDdlValueStartDate = new Date(startDate);
    }
    if (this.dropdown.ddDdlValueEndDate) {
      // console.log(this.dropdown.ddDdlValueEndDate);
      this.dropdown.ddDdlValueEndDate = this.commService.format('yyyy-M-d hh:mm:ss', this.dropdown.ddDdlValueEndDate);
      // this.dropdown.ddDdlValueEndDate = new Date(endDate);
    }
    // console.log(this.dropdown);
    // if (!this.dropdown.ddDdlValueStartDate) {
    //   this.comService.showInfo(this.languageData.SYS.DropDownList.NotEmpty);
    //   return;
    // }
    this.dropdownlistApi.update(this.dropdown).subscribe(
      res => {
        this.commService.showInfo('success', this.languageData.Common.SuccessMessage, this.languageData.Common.UpdateSuccess);
        this.displayDdlDataDialog = false;
        this.ddlSearch();
      },
      error => {
        window.alert(error);
      }
    );
  }
  resetPageStart() {
    this.page.startRow = 0;
  }
  ddlSearch() {
    this.queryFormData.ddDdlDescription = this.queryFormData.ddDdlDescription ? this.queryFormData.ddDdlDescription.ddDdlDescription : '';
    this.queryFormData.page = this.page;
    console.log(this.queryFormData);
    // this.totalRecords = 2;
    // this.dropdowns = [
    //   {
    //     ddDdlId: '223',
    //     ddDdlName: 'bingo',
    //     ddDdlDescription: 'super man',
    //     ddDdlValue: 'fly',
    //     ddDdlValueDescription: 'i will go sky',
    //     ddDdlValueAltDescription: 'i will be back',
    //     ddDdlGroup: 'family',
    //     ddDdlTag: 'strong',
    //     ddDdlValueInactiveFlag: 'Y',
    //     ddDdlValueStartDate: '2017-10-20 08:23:10',
    //     ddDdlValueEndDate: '2017-10-20 08:23:10'
    //   },
    //   {
    //     ddDdlId: '343',
    //     ddDdlName: 'bingort',
    //     ddDdlDescription: 'super manrt',
    //     ddDdlValue: 'fly',
    //     ddDdlValueDescription: 'i will go sky',
    //     ddDdlValueAltDescription: 'i will be back',
    //     ddDdlGroup: 'family',
    //     ddDdlTag: 'strong',
    //     ddDdlValueInactiveFlag: 'Y',
    //     ddDdlValueStartDate: '2017-10-20 08:23:10',
    //     ddDdlValueEndDate: '2017-10-20 08:23:10'
    //   },
    // ];
    this.dropdownlistApi.search(this.queryFormData).subscribe(
      codes => {
        this.totalRecords = codes.page.totalCount;
        // this.dropdowns = codes.data;
        for (let i = 0; i < codes.data.length; i++) {
            if (codes.data[i].ddDdlValueStartDate) {
              codes.data[i].ddDdlValueStartDate = codes.data[i].ddDdlValueStartDate.substring(0, 10);
            }
            if (codes.data[i].ddDdlValueEndDate) {
              codes.data[i].ddDdlValueEndDate = codes.data[i].ddDdlValueEndDate.substring(0, 10);
            }
        }
        this.dropdowns = codes.data;
      },
      error => {
        console.log(error);
      }
    );
    // console.log(this.queryFormData);
  }
  onRowSelect(event) {
    console.log(event);
    let startTime: string;
    let endTime: string;
    this.isUpdate = true;
    this.displayDdlDataDialog = true;
    this.dropdown = event.data;
    this.dropdown.ddDdlDescription = { ddDdlDescription: event.data.ddDdlDescription };
    if (event.data.ddDdlValueStartDate) {
      startTime = event.data.ddDdlValueStartDate.replace(/-/g, '/');
      this.dropdown.ddDdlValueStartDate = new Date(startTime);
    }
    if (event.data.ddDdlValueEndDate) {
      endTime = event.data.ddDdlValueEndDate.replace(/-/g, '/');
      this.dropdown.ddDdlValueEndDate = new Date(endTime);
    }
  }
  reset(form: any) {
    form.reset();
  }
  autoComplete(event) {
    const query = event.query;
    this.filteredDescriptionsSingle = this.filterDesc(query, this.autoDesc);
  }
  filterDesc(query, descs: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < descs.length; i++) {
      const desc = descs[i];
      let descStr: string;
      let queryStr: string;
      descStr = desc.ddDdlDescription;
      queryStr = query;
      if (descStr.toLowerCase().indexOf(queryStr.toLowerCase()) === 0) {
        filtered.push(descs[i]);
      }
    }
    return filtered;
  }
  getDownlistName() {
    this.dropdownName = [{label: '--please choose--', value: '' }];
    this.dropdownlistApi.getName().subscribe(
      res => {
        for (let i = 0; i < res.data.length; i++) {
          this.dropdownName.push({ label: res.data[i].ddDdlName, value: res.data[i].ddDdlName });
        }
      },
      error => {
        window.alert(error);
      }
    );
  }
  getDesc() {
    this.dropdownlistApi.getDescription().subscribe(
      res => {
        this.autoDesc = res.data;
      },
      error => {
        window.alert(error);
      }
    );
  }
  // form 交互
  isValidate(element: any) {
    return !(element.valid || (element.pristine && !this.isdoallvalid));
  }
}
