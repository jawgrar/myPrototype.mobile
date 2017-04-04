import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';
import { ItemCreatePage } from '../item-create/item-create';

import { Items } from '../../providers/providers';
import { Item } from '../../models/item';
import { UserActions } from "../../actions/user.actions";
import { AuthHttp } from "angular2-jwt";
import { User } from "../../providers/user";

@Component({
    selector: 'page-list-master',
    templateUrl: 'list-master.html'
})
export class ListMasterPage {
    currentItems: Item[];

    constructor(public navCtrl: NavController,
                public items: Items,
                public modalCtrl: ModalController,
                private _auth: AuthHttp,
                private _userActions: UserActions,
                private _user: User) {
        this.currentItems = this.items.query();
    }

    /**
     * The view loaded, let's query our items for the list
     */
    ionViewDidLoad() {

    }

    doLogout() {
        this._userActions.logout();
    }

    testSecureRequest() {
        // test call api
        this._auth.get(UserActions.API_URL + "api/me")
            .subscribe(
                result => {
                    alert(result.text());
                },
                error => {
                    alert("AUTH REQUEST ERROR! Can't load private controller method!");
                }
            );
    }

    /**
     * Prompt the user to add a new item. This shows our ItemCreatePage in a
     * modal and then adds the new item to our data source if the user created one.
     */
    addItem() {
        let addModal = this.modalCtrl.create(ItemCreatePage);
        addModal.onDidDismiss(item => {
            if (item) {
                this.items.add(item);
            }
        });
        addModal.present();
    }

    /**
     * Delete an item from the list of items.
     */
    deleteItem(item) {
        this.items.delete(item);
    }

    /**
     * Navigate to the detail page for this item.
     */
    openItem(item: Item) {
        this.navCtrl.push(ItemDetailPage, {
            item: item
        });
    }
}
