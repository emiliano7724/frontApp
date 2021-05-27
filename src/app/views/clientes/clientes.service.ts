import { ICliente } from './../../interfaces/clientesInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, Subject,of } from 'rxjs';

import { SortColumn, SortDirection } from './sortable.directive';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { DecimalPipe } from '@angular/common';
import { ClientesComponent } from './clientes.component';
interface SearchResult {
  clientes: ICliente[];
  total: number;
}
interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}
const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(clientes: ICliente[], column: SortColumn, direction: string): ICliente[] {
  if (direction === '' || column === '') {
    return clientes;
  } else {
    return [...clientes].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}
function matches(cliente: ICliente, term: string, pipe: PipeTransform) {
  return cliente.nombre.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(cliente.direccion).includes(term)
    || pipe.transform(cliente.telefono).includes(term);
}

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  public _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  public _clientes$ = new BehaviorSubject<ICliente[]>([]);
  public _total$ = new BehaviorSubject<number>(0);
  public _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private http:HttpClient,private pipe: DecimalPipe) {

    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
     // this._clientes$.next(result.clientes);
     // this._total$.next(result.total);
    });

    this._search$.next();

  }

getClientes(): Observable<ICliente[]>{

  //const headers = { 'Access-Control-Allow-Origin':  'http://127.0.0.1:3000', 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Headers': 'Content-Type','x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7fSwiaWF0IjoxNjIwOTQwNTU4LCJleHAiOjE2MjM1MzI1NTh9.XDYyJ_nEdPWOHlA-Jo9dPMzlIHEUxJCqC5S21ljUmzQ' }
  const headers=new HttpHeaders({
    'content-type':'application/json',
    'x-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7fSwiaWF0IjoxNjIwOTQwNTU4LCJleHAiOjE2MjM1MzI1NTh9.XDYyJ_nEdPWOHlA-Jo9dPMzlIHEUxJCqC5S21ljUmzQ'

  })

  return this.http.get<ICliente[]>("http://localhost:3000/clientes/index",{headers:headers})
}

get countries$() { return this._clientes$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }



private _search(): Observable<SearchResult> {
  const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

  // 1. sort
  let 
  
  clientes = sort(clientes, sortColumn, sortDirection);

  // 2. filter
  clientes = clientes.filter(country => matches(country, searchTerm, this.pipe));
  const total = clientes.length;

  // 3. paginate
  clientes = clientes.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
  return of({clientes, total});
}


}
