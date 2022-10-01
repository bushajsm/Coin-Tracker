<template>
  <div>
    <div v-if="allCoins.length > 0">
    <div v-for="coin in allCoins" :key="coin.symbol">
      <CoinItem :coin="coin" :key="componentKey"/>
    </div>
  </div>
  <div v-else class="no-data">No Data To Display</div>
  </div>
</template>

<script>
import CoinItem from "@/components/CoinItem";
import { mapGetters } from "vuex";

export default {
  components: {
    CoinItem
  },
  data(){
    return{
      componentKey:0
    }
    
  },
  computed: {
    ...mapGetters(["allCoins"])
  },
    methods:{
      rerender() {
      this.componentKey += 1;
    }
    }
};
</script>

<style scoped>
</style>