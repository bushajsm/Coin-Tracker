import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        labels: [],
        datasets: [],
        coins: [{
                symbol: "ETHBTC",
                lastPrice: "0.06839900",
                weightedAvgPrice: "0.06853822",
                qty: 5
            },
            {
                symbol: "LTCBTC",
                lastPrice: "0.00276300",
                weightedAvgPrice: "0.00275722",
                qty: 7
            },
            {
                symbol: "BNBBTC",
                lastPrice: "0.01460600",
                weightedAvgPrice: "0.01457297",
                qty: 10
            },
        ],
    },
    getters: {
        allCoins: (state) => state.coins,
        labels: (state) => state.coins.map(coin => coin.symbol),
        datasets: (state) => state.coins.map(coin => coin.qty)
    },
    actions: {
        addCoin({ commit }, coin) {
            commit("add_coin", coin);
        },
        updateQty({ commit }, coin) {
            commit("update_coin", coin);
        },
        deleteCoin({ commit }, symbol) {
            commit("delete_coin", symbol);
        },
    },
    mutations: {
        add_coin(state, coin) {
            state.coins.push(coin);
        },
        update_coin(state, coin) {
            let index = state.coins.findIndex((t) => t.symbol == coin.symbol);
            if (index != -1) {
                state.coins[index] = coin;
            }
            console.log(state.coins)
        },
        delete_coin(state, symbol) {
            state.coins = state.coins.filter((coin) => coin.symbol != symbol);
        },
    },
    modules: {},
});