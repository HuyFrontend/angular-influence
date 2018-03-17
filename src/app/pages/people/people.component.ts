import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from "rxjs/Observable";
// import { PEOPLE_ACCTIONS }  from '../../store/reducers/people.reducer';
@Component({
  selector: 'app-people',
  // templateUrl: './people.component.html',
  template: `
    <h3>Party Planner</h3>
    <filter-select
      (updateFilter)="updateFilter($event)"
    >
    </filter-select>

    <person-input
      (addPerson)="addPerson($event)"
    >
    </person-input>

    <person-list
      [people]="people | async"
      (addGuest)="addGuest($event)"
      (removeGuest)="removeGuest($event)"
      (removePerson)="removePerson($event)"
      (toggleAttending)="toggleAttending($event)"
    >
    </person-list>
  `,
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  public people;
  private id = 0;

  constructor(private _store : Store<any>) {
    console.log('Store', _store);
    this.people = Observable.combineLatest(

      _store.select('people'),

      _store.select('filter'),

      (people : any[], filter) => {
        return people.filter(filter);
      }
    )
  }
  ngOnInit() {

  }

  public addPerson(name) {
    // this._store.dispatch({type: PEOPLE_ACCTIONS[PEOPLE_ACCTIONS.ADD_PERSON], payload: {
    //   id: ++this.id,
    //   name,
    //   guests: 0,
    //   attending: false
    // }})
  };

  public addGuest( person ) {
    console.log(person.id);
    // this._store.dispatch({type: PEOPLE_ACCTIONS[PEOPLE_ACCTIONS.ADD_GUESTS], payload: person.id });
  };
  /**
   * @method remove a person in list
   * @param person.id, it equal to {id}
   */
  removeGuest( {id} ) {
    // this._store.dispatch({type: PEOPLE_ACCTIONS[PEOPLE_ACCTIONS.REMOVE_GUESTS], payload: id});
  }

  removePerson( {id} ) {
    // this._store.dispatch({type: PEOPLE_ACCTIONS[PEOPLE_ACCTIONS.REMOVE_PERSON], payload: id});
  }


  toggleAttending( {id} ) {
    // this._store.dispatch({type: PEOPLE_ACCTIONS[PEOPLE_ACCTIONS.TOGGLE_ATTENDING], payload: id});
  }

  updateFilter(filter) {
    console.log('fi', filter);
    this._store.dispatch({type: filter});
  }

}
