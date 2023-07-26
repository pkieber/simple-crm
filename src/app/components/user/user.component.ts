import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user = new User();
  user$!: Observable<any>;
  allUsers!: Array<any>; // Empty array to save changes.
  searchText: string = '';

  constructor(private firestore: Firestore, public dialog: MatDialog) {
    /**
     * initializes the userCollection reference to the 'users' collection,
     * ...retrieves the collection data as an observable using collectionData,
     * ... and subscribes to the observable to handle the emitted changes by updating the allUsers property.
     */
    const userCollection = collection(this.firestore, 'users');
    this.user$ = collectionData(userCollection);
    this.user$.subscribe(( changes: any ) => {
      this.allUsers = changes;
      // console.log('Received changes from DB', changes);
    });
  }


  /**
   * Opens the dialog for adding a new user.
   */
  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }


  /**
   * This search method will be called when custom event (user typing) from child-component (searchComponent) is raised.
   */
    onSearchTextEntered(searchValue: string) {
      this.searchText = searchValue;
      // console.log(this.searchText);
    }
}