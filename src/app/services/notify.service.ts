/**
 * Created by ApolloYr on 11/18/2017.
 */

import {Injectable} from '@angular/core';

declare const $: any;

@Injectable()
export class NotifyService {
    constructor() {

    }
    showSuccess(message: any) {
        // const type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];
        //
        $.toast({
            heading: 'Success',
            text: message,
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'success',
            hideAfter: 3000,
            stack: 6
        });
    }

    showWarning(message: any) {
        $.toast({
            heading: 'Warning',
            text: message,
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'warning',
            hideAfter: 3000,
            stack: 6
        });
    }

    showError(message: any) {
        $.toast({
            heading: 'Error',
            text: message,
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'error',
            hideAfter: 3000,
            stack: 6
        });
    }

    showInfo(message: any) {
        $.toast({
            heading: 'Notice',
            text: message,
            position: 'top-right',
            loaderBg: '#ff6849',
            icon: 'info',
            hideAfter: 3000,
            stack: 6
        });
    }
}
