<template>
  <div id="app"  >
    <div class="container">
      <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="h-header">
                   <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        <span v-if="!allCoins.length">Add Stock</span><span v-else>Add/Update</span>
        </button>
        <button type="button" class="btn btn-primary" @click="refresh()" >
          Refresh ⟳
        </button>
          </div>
   
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel"><span v-if="!allCoins.length">Add Stock</span><span v-else>Add / Update</span></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <v-select 
                  label="symbol"
                  :options="paginated"
                  :filterable="false"
                  @open="onOpen"
                  @close="onClose"
                  @search="(query) => (search = query)" 
                  :selectable="(option) => false"
                >
                <template #list-header>
                  <li style="text-align: center">Search for coins from the list below!</li>
                </template>
                <template  slot="option" slot-scope="option">
                  <SearchUpdate v-if="allCoins.filter(e => e.symbol === option.symbol).length > 0" :coin="allCoins.find(e => e.symbol === option.symbol)"/>
                  <SearchAdd v-else  :coin="option"/>
                </template>
                <template #list-footer>
                <li v-show="hasNextPage" ref="load" class="loader">
                  Loading more options...
                </li>
              </template>
              </v-select>
              </div>
            </div>
          </div>
        </div>
    </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="cart">
        <CoinList :key="componentKey"/>
      </div>
      </div>
      <div class="col-md-6">
        <div class="cart " style="padding-top:50px">
        <WalletChart :key="componentKey"/>
        </div>
      </div>
    </div>
    </div>

  </div>
</template>

<script>
//import components
import CoinList from "@/components/CoinList";
import WalletChart from "@/components/WalletChart";
import SearchAdd from "@/components/SearchAdd";
import SearchUpdate from "@/components/SearchUpdate";
//import libraries
import axios from 'axios'
import { mapGetters } from "vuex";
export default {
  name: "App",
    components: {
    CoinList,
    WalletChart,
    SearchAdd,
    SearchUpdate,
    },
  data() {
      return {
        componentKey: 0,
        timer: null,
        observer: new IntersectionObserver(this.infiniteScroll),
        limit: 10,
        search: '',
        options: [],
        };
   },
  methods: {
    refresh() {
      this.componentKey += 1;
      console.log('refreshed')
    },
    async onOpen() { if (this.hasNextPage) { await this.$nextTick()
        this.observer.observe(this.$refs.load)
      }
    },
    onClose() { this.observer.disconnect() },
    async infiniteScroll([{ isIntersecting, target }]) {
      if (isIntersecting) {
        const ul = target.offsetParent
        const scrollTop = target.offsetParent.scrollTop
        this.limit += 10
        await this.$nextTick()
        ul.scrollTop = scrollTop
          }
        },
      },
      mounted: function () {
      this.timer = setInterval(() => {
        this.forceRerender()
      }, 1200000)
      },
      beforeDestroy() { clearInterval(this.timer)  },
  created() {
            axios.get(`https://api2.binance.com/api/v3/ticker/24hr`)
            .then((response) => {
            response.data.forEach(item => {
            this.options.push({
            symbol: item.symbol,
            lastPrice: item.lastPrice,
            weightedAvgPrice: item.weightedAvgPrice,
            qty: 1
            });
            });})
            .catch((e) => { console.log(e); });
              },
  computed: {
       ...mapGetters(["allCoins"]),
          //infinite scroll functions
          filtered() {  return this.options.filter((option) => (option.symbol.toLowerCase()).includes(this.search)||(option.symbol).includes(this.search)) },paginated() { return this.filtered.slice(0, this.limit) },
          hasNextPage() { return this.paginated.length < this.filtered.length},
        },
};
</script>
