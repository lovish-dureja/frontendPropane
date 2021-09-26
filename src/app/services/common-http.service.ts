import { Injectable } from '@angular/core';
import { HttpConfigInterceptor } from '../services/http-interceptor';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {
  baseUrl: String = 'http://localhost:8080/api/';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  /**
     * get a specific object.
     *
     * @param  {Object|Integer} args - $resource.get arguments, or { id: args } if numeric.
     * @param  {Function} callback - $resource.get callback function if any.
     * @return {Promise} Promise
     */
   get(url, args = {}) {
    let ctrl = this;
    let requestUrl = ctrl.baseUrl + url;
    
    //console.log(requestUrl)
    //this.reloadHeader(true)
    //console.log('headers', ctrl.headers)
    return ctrl.http.get(requestUrl);
};


/**
 * posting form data.
 * @param  {string} url
 * @param  {Object} form data
 * @return {Object} Observable
 */
post(url, args) {
    //this.reloadHeader()
    return this.http.post(this.baseUrl + url, JSON.stringify(args));
};

// reloadHeader(cache: boolean = false) {
//   const token = window.localStorage.getItem(DM_PREFIX + TOKEN_NAME);
//   if (token) {
//       if (!this.headers.has(TOKEN_HEADER_KEY)) {
//           this.headers.append(TOKEN_HEADER_KEY, `${AUTH_PREFIX} ${token}`);
//       } else {
//           // overwrite new header
//           this.headers.set(TOKEN_HEADER_KEY, `${AUTH_PREFIX} ${token}`)
//       }
//   }
//   //console.log(this.headers)
//   if (cache == true) {
//       this.headers.set('Cache-Control', 'no-cache')
//       this.headers.set('Pragma', 'no-cache')
//     } else {

//     }
// }
}
