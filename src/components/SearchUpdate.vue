<template>
  <div>
    <div class="row my-3 i-border py-3">
      <div class="col-md-5 text-left">
        <h5>{{coin.symbol}}
       <br><span class="wap">(LP : {{coin.lastPrice}})</span></h5>
      </div>
      <div class="col-md-7 mt-1 ">
        <div class="row justify-content-end pr-3">
        <div class="wrapper">
          <button class="btn btn--minus q-btn" @click="changeCounter('-1')" type="button" >
          -
          </button>
          <input class="quantity" type="text" name="name" :value="qty" @change="updateQtyy">
          <button class="btn btn--plus q-btn" @click="changeCounter('1')" type="button" >
            +
          </button>
        </div>
        <button @click="updateCoinQty(coin)" class="btn btn-primary mx-2">Update</button>
        <button @click="deleteCoin(coin.symbol)" class="btn btn-danger">Delete</button>
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
      qty:this.coin.qty,
    };
  },
  methods: {
    ...mapActions(["updateQty","deleteCoin"]),
    updateQtyy(e) {
      this.qty = e.target.value;
    },
    updateCoinQty(coin) {
     coin.qty=this.qty;
     this.updateQty(coin);
     this.$parent.$parent.refresh();
   
    },
    changeCounter(num){
				this.qty += +num
				!isNaN(this.qty) && this.qty > 0 ? this.qty : this.qty = 0;
        
            
			}
    
  },

         
};
</script>

<style scoped>
</style>