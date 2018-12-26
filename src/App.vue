<template>
  <div id="app">
  <div class="goods">
    <!-- <div class="nav_bar">
      <van-nav-bar title="详情" left-arrow />
    </div> -->
    <div class="banner">
      <van-swipe :autoplay="3000" :duration="1000" :touchable="touchable" class="banner_list" @change="onChange">
        <van-swipe-item v-for="(item, index) in itemImgs" :key="index">
          <img v-lazy="imgPath + item" @click="swiperImgClick(index)" />
        </van-swipe-item>
        <div class="custom-indicator" slot="indicator">
          {{ current }}/{{ currentLength }}
        </div>
      </van-swipe>
    </div>
    <div class="goods_cell">
      <van-cell-group>
        <van-cell>
          <div class="goods-title">【{{ brand }}】{{name}}</div>
          <div class="goods-price">￥{{ price | formatPrice(price) }}</div>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="goods_sales van-hairline--top-bottom">
      <div class="goods_sales_details">
        <div class="goods_sales_title">促销：</div>
        <div class="goods_sales_list van-ellipsis">
          <div class="goods_sales_item" v-for="(item, index) in promotionContents" :key="index">{{item}}</div>
        </div>
      </div>
    </div>
    <div class="goods_sales van-hairline--top-bottom">
      <div class="goods_sales_details">
        <div class="goods_sales_title">规格：</div>
        <div class="goods_sales_list van-ellipsis">
          <div class="goods_sales_item" v-for="(item, index) in skuList" :key="index">{{item.skuName}}</div>
        </div>
      </div>
    </div>
    <div class="graphic_details">
      <div class="graphic_details_title">
        图文详情
      </div>
      <div class="graphic_details_describe">
        商品描述：{{description}}
      </div>
      <div class="graphic_details_imgs">
        <img v-for="(item, index) in itemDetailImgs" v-lazy="imgPath + item" :key="index">
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import {
    ImagePreview
  } from 'vant'
  export default {
    name: 'App',
    data() {
      return {
        globKey: String,
        itemId: String,
        skuId: String,
        token: String,
        show: false,
        touchable: true,
        brand: String,
        name: String,
        price: Number,
        promotionContents: Array,
        skuList: Array,
        description: String,
        current: 1,
        currentLength: String,
        imgPath: String,
        itemImgs: Array,
        itemDetailImgs: Array
      }
    },
    created() {
      this.itemId = this.getUrlParam('itemId')
      console.log(this.itemId);
      this.skuId = this.getUrlParam('skuId')
      this.token = this.getUrlParam('token')
      this.imgPath = this.$img
      this.globKey = this.$globKey
      this.getSku()
    },
    mounted() {},
    methods: {
      getSku() {
        var sign = this.$md5(
            "itemId=" +
            this.itemId +
            "&skuId=" +
            this.skuId + "&token=" +
            this.token + "&key=" +
            this.globKey
          ),
          that = this;
        this.axios
          .post(
            "/api/user/iteminfo",
            this.qs.stringify({
              itemId: that.itemId,
              skuId: that.skuId,
              token: that.token,
              sign: sign
            })
          )
          .then(function(res) {
            console.log(res);
            console.log(res.data.data);
            that.brand = res.data.data.brand
            that.name = res.data.data.saleName
            that.price = res.data.data.price
            that.promotionContents = res.data.data.promotionContents
            that.skuList = res.data.data.skuList
            that.description = res.data.data.description
            that.itemDetailImgs = res.data.data.itemDetailImgs
            that.itemImgs = res.data.data.itemImgs
            that.currentLength = that.itemImgs.length
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      },
      onChange(index) {
        this.current = index + 1
      },
      swiperImgClick() {
        ImagePreview({
          images: this.images,
          startPosition: 0,
        });
      },
      getUrlParam(params) {
        var reg = new RegExp("(^|&)" + params + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) {
          return unescape(r[2])
        }
        return null;
      }
    },
    filters: {
      formatPrice: function(money) {
        if (money && money != null) {
          money = String(money);
          var left = money.split('.')[0],
            right = money.split('.')[1];
          right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
          var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
          return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
        } else if (money === 0) {
          return '0.00';
        } else {
          return '';
        }
      }
    }
  }
</script>

<style>
body {
  background: #f7f7f7;
}
#app {
  width: 100%;
}
.custom-indicator {
  display: block;
      position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    background: rgba(0, 0, 0, 0.1);
}
.van-nav-bar .van-icon {
    color: #111;
    vertical-align: middle;
}
.van-swipe-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.van-swipe-item>img {
  display: block;
}
 /* 进度条 */
  #nprogress .bar {
    /* background: rgb(124, 196, 118) !important; */
  }
  .spinner {
    display: none !important;
  }
   .goods {
    width: 100%;
  }

  .banner {
    width: 100%;
    height: 20rem;
    background: #fff;
  }

  .banner_list {
    width: 100%;
    height: 100%;
  }

  .banner_list>img {
    max-width: 100%;
    max-height: 100%;
  }

  img[lazy="loading"] {
    display: flex;
    /* width: 2.74rem;
    height: 2.74rem; */
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
  }

  img[lazy="error"] {
    display: flex;
    /* width: 2.74rem;
    height: 2.74rem; */
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
  }

  .goods-price {
    color: #f44;
  }

  .goods_sales {
    background: #fff;
  }

  .goods_sales .goods_sales_details {
    padding: .422rem .822rem;
    /* border-bottom: 1px solid #ebedf0; */
    color: #323233;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .goods_sales_title {
    width: 150px;
    display: flex;
    /* justify-content: center;
                align-items: center; */
    color: rgb(153, 153, 153);
  }

  .goods_sales_details .goods_sales_list {
    display: flex;
    flex-direction: row;
    width: 790px;
    flex-wrap: wrap;
  }

  .goods_sales_details .goods_sales_list .goods_sales_item {
    margin-right: 10px;
    margin-bottom: 5px;
  }

  .graphic_details {
    margin-top: 15px;
    background: #fff;
    padding: 0px 15px;
  }

  .graphic_details_title {
    width: 100%;
    display: flex;
    padding: 10px 0px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #f7f7f7;
    color: rgb(51, 51, 51);
    font-size: 16px;
  }

  .graphic_details_describe {
    color: rgb(102, 102, 102);
    font-size: 15px;
    line-height: 22px;
    padding: 15px 0px;
  }

  .graphic_details_imgs {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .graphic_details_imgs img {
    max-width: 100%;
    padding: 5px 0px;
  }

  .graphic_details_imgs>img[lazy="loading"] {
    /* max-width: 2.74rem;
    max-height: 2.74rem; */
    max-width: 100%;
    max-height: 100%;
    display: block;
  }

  .graphic_details_imgs>img[lazy="error"] {
    /* max-width: 2.74rem; */
    /* max-height: 2.74rem; */
    max-width: 100%;
    max-height: 100%;
    display: block;
  }
</style>
