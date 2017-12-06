import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-side',
    templateUrl: './side.component.html',
    styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
        $(".side li").click(function (event) {
            $("li").removeClass("active")
            this.classList.add("active")
        });
    }


}



