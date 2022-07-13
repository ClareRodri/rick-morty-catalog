import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { LoaderService } from "../services/loader.services";
import { isNullOrUndefined } from "util";
import { catchError, finalize } from "rxjs/operators";

@Injectable()
export class HttpInterceptorRickMorty implements HttpInterceptor {

  constructor(private loadingScreenService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let displayLoadingScreen = false;
    let requestUrl = request.url;
    const httpRequest = request.clone({
      url: requestUrl
    });

    displayLoadingScreen = !(isNullOrUndefined(httpRequest));

    if (displayLoadingScreen) {
      this.loadingScreenService.startLoading();
    }
    
    return next.handle(httpRequest).pipe(
      finalize(() => {
        if (displayLoadingScreen) {
           setTimeout(() => {
             this.loadingScreenService.stopLoading();
           }, 300);
        }
      })
    )
  }
}