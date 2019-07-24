import { Response } from '@angular/http';
//import { Observable } from 'rxjs';
//import { AngularFireList, AngularFireObject } from 'angularfire2/database';

const extractError = (error: Response | any): string => {
    let errMsg: string;
    if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);

    return errMsg;
}

export abstract class BaseService {

   

}