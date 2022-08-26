/**
 * Created by ApolloYr on 11/17/2017.
 */

import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable()
export class CoinApiService extends ApiService {
    // coin
    getCoin(data) {
        return this.get('/coins', data);
    }
    // Coin Address
    getCoinAddress(data) {
        return this.get('/coin/address', data);
    }
    // wallet
    getBalance(coin, data): any {
        return this.get('/' + coin + '/balance', data);
    }

    createWallet(coin, data) {
        return this.post('/' + coin + '/create/wallet', data);
    }

    requestWithdraw(coin, data) {
        return this.post('/' + coin + '/withdraw/request', data);
    }

    cancelWithdraw(coin, data) {
        return this.post('/' + coin + '/withdraw/cancel', data);
    }

    // get Transaction History
    getTxHistory(coin, data) {
        return this.get('/' + coin + '/tx/history', data);
    }

    // get Deposit History
    getDepositHistory(coin, data) {
        return this.get('/' + coin + '/deposit/history', data);
    }
    // get Withdraw History
    getWithdrawHistory(coin, data) {
        return this.get('/' + coin + '/withdraw/history', data);
    }

    // XIN public Key
    getXINPublicKey(data): any {
        return this.get('/XIN/publicKey', data);
    }

    // XRP Main Wallet
    getXRPMainWallet(data): any {
        return this.get('/XRP/main_wallet', data);
    }
}

