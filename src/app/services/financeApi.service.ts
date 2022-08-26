/**
 * Created by ApolloYr on 11/17/2017.
 */

import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable()
export class FinanceApiService extends ApiService {
    // tl
    financeDeposit(currency, data) {
        return this.post('/' + currency + '/deposit', data);
    }
    financeWithdraw(currency, data) {
        return this.post('/' + currency + '/withdraw', data);
    }
    getFinanceTransaction(currency, data) {
        return this.get('/' + currency + '/transaction', data);
    }
    cancelFinanceTransaction(data) {
        return this.post('/transaction/cancel', data);
    }

    // epay
    getEpayReceiveInfo(data) {
        return this.post('/epay/receive/info', data);
    }
}

