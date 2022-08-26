/**
 * Created by ApolloYr on 11/17/2017.
 */
import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";

@Injectable()
export class MarketApiService extends ApiService {
    getCoinPairInfo(data): any {
        return this.get('/market/coin_pair', data);
    }

    getUserCoinPairInfo(data): any {
        return this.get('/market/user/coin_pair', data);
    }

    getChartData(coin, marketCoin, data) {
        return this.get('/market/chart_data/' + coin + '-' + marketCoin, data);
    }

    // orders
    makeBuyOrder(coin, marketCoin, data) {
        return this.post('/order/buy/' + coin + '-' + marketCoin, data);
    }

    makeSellOrder(coin, marketCoin, data) {
        return this.post('/order/sell/' + coin + '-' + marketCoin, data);
    }

    getLastOrders(coin, marketCoin, data) {
        return this.get('/order/last/' + coin + '-' + marketCoin, data);
    }
    getBuyOrders(coin, marketCoin, data) {
        return this.get('/order/buy/' + coin + '-' + marketCoin, data);
    }

    getSellOrders(coin, marketCoin, data) {
        return this.get('/order/sell/' + coin + '-' + marketCoin, data);
    }

    getUserAllPastOrders(data) {
        return this.get('/order/past/all', data);
    }

    getUserAllPendingOrders(data) {
        return this.get('/order/pending/all', data);
    }

    cancelOrder(data) {
        return this.post('/order/delete', data);
    }

}

