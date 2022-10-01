<template>
  <div>
    <div class="row my-3 i-border py-3">
      <div class="col-md-5 text-left">
        <h5>{{coin.symbol}}
        <br><span class="wap">(LP : {{coin.lastPrice}})</span></h5>
      </div>
      <div class="col-md-7 mt-1 text-right">
        <div class="row justify-content-end pr-3">
        <div class="wrapper">
          <button class="btn btn--minus q-btn" @click="changeCounter('-1')" type="button" disabled>
          -
          </button>
          <input class="quantity" type="text" name="name" :value="coin.qty">
          <button class="btn btn--plus q-btn" @click="changeCounter('1')" type="button" disabled>
            +
          </button>
        </div>
        <button @click="addNewCoin(coin)" class="btn btn-success mx-2">Add</button>
      </div>
      </div>
      
    
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    coin: {}
  },
  data() {
    return {
      qty:1
    };
  },
  methods: {
    ...mapActions(["addCoin"]),
    addNewCoin(coin) {
      this.addCoin({
        symbol: coin.symbol,
        lastPrice: coin.lastPrice,
        weightedAvgPrice: coin.weightedAvgPrice,
        qty: coin.qty
      });
    },
    
  }
};
</script>
