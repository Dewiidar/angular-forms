import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Employee} from '../employee';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FormPosterService {

    constructor(private http: HttpClient) {
    }

    private extractData(res: Response) {
        const body = res; // gets body from the response
        console.log(body);
        return body || {};
    }

    private handleError(error: any) {
        console.error('error: ', error);
        return throwError(error.statusText);
    }

    postEmployeeForm(employee: Employee): Observable<any> {
        const url = 'http://localhost:3100/postemployee';
        const body = JSON.stringify(employee);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        return this.http.post(url, body, httpOptions)
            .pipe(
                map(this.extractData),
                catchError(this.handleError)
            );
    }

    getLanguages(): Observable<any> {
        return this.http.get('http://localhost:3100/get-languages')
            .pipe(
                map(this.extractLanguages),
                catchError(this.handleError)
            );
    }

    private extractLanguages(res: Response) {
        const body = res; // gets body from the response
        console.log(body);
        return body || {};
    }
}
