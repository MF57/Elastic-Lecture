import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager} from 'ng-jhipster';

import { Account, LoginModalService, Principal } from '../shared';
import {Http} from "@angular/http";

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    name = "";
    value = "Star Wars";


    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: EventManager,
        private http: Http
    ) {
        }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }


    submit() {
        console.log(this.name);
        this.http.post('api/submit', {"name": this.name, "value": this.value}).subscribe(
            result => {
                window.location.href = 'https://9gag.com/random';
            },
            err => console.log(err)
        )
        //
    }

    select(newValue: string) {
        this.value = newValue;
    }



    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
