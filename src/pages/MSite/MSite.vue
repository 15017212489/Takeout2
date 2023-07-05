<template>
  <div class="msite">
    <HeaderTop title="Takaout">
      <span class="header_search" slot="left">
        <router-link to="/search"><i class="iconfont icon-sousuo"></i></router-link>
      </span>
      <span class="header_login" slot="right">
        <router-link to="/login"><span class="header_login_text">登录|注册</span></router-link>
      </span>
    </HeaderTop>
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="i in flag">
            <a href="#" class="link_to_food" v-for="(item,index) in arr[i]" :key="index">
              <div class="food_container">
                <img src="./imgs/Hamburger.png">
              </div>
              <span>{{item.name}}</span>
            </a>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang shop_icon"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </div>
</template>

<script>
  import ShopList from '../../components/ShopList/ShopList';
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.css';
  import axios from "axios"
  //import {mapState} from 'vuex'
  export default{
    data(){
      return {
        id: '',
        name: '',
        address: '',
        tel: '',
        infos: [],
        arr: [],
        flag:[0,1]
      }
    },
    mounted(){

      //this.$store.dispatch('getCategorys')

      //实例 Swiper对象
      new Swiper('.swiper-container',{
        loop: true, //循环
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      })
      //获取数据
      this.all();
    },
    components:{
      HeaderTop,ShopList
    },
    computed: {
      
    },
    methods:{
      all() {    //查找info表全部数据
        axios.get('http://127.0.0.1/list/all').then(res=>{
            //console.log(res.data);
            this.infos = res.data

            this.arr = [];
            const categorys = res.data;
            let minArr = [];
            categorys.forEach(category => {
              if(minArr.length === 8){
                minArr = [];
              }
              if(minArr.length === 0){
                this.arr.push(minArr);
              }
              minArr.push(category)
            })
        }).catch(err=>{
            console.log("获取数据失败" + err);
        })
      },
      del() {    //删除操作
        axios.get('http://127.0.0.1/list/del',{
          params: {
            id: this.id
          }
        }).then(res=>{
            // console.log(res.data);
            if(res.data.status == 200) {
              this.all()
            }else{
              this.$message({
              message: '删除失败',
              type: 'error'
            });
            }
        }).catch(err=>{
            console.log("操作失败" + err);
        })
      },
      get() {    //查询操作
        axios.get('http://127.0.0.1/list/get',{
          params: {
           id: this.id
          }
        }).then(res=>{
            console.log(res.data);
            //this.info = res.data
        }).catch(err=>{
            console.log("操作失败" + err);
        })
      },
      add() {   //添加操作
        axios.get('http://127.0.0.1/list/add',{
          params: {
            id: this.id,
            name: this.name,
            address: this.address,
            tel: this.tel
          }
        }).then(res=>{
            // console.log(res.data);
            if(res.data.status == 200) {
              this.all()
            }else{
              this.$message({
              message: '添加失败',
              type: 'error'
            });
            }
        }).catch(err=>{
            console.log("操作失败" + err);
        })
      },
      update() {     //修改操作
        axios.get('http://127.0.0.1/list/update',{
          params: {
            id: this.id,
            name: this.name,
            address: this.address,
            tel: this.tel
          }
        }).then(res=>{
            // console.log(res.data);
            if(res.data.status == 200) {
              this.all()
            }else{
              this.$message({
              message: '修改失败',
              type: 'error'
            });
            }
        }).catch(err=>{
            console.log("操作失败" + err);
        })
      },

    },
    watch:{
      
    }
  }
</script>

<style lang="less">
  @import "../../common/style/mixins.less";
  .msite{
    width: 100%;
    overflow: hidden;
    .msite_header{
      background-color: #51808f;
      position: fixed;
      z-index: 100;
      left: 0;
      top: 0;
      width: 100%;
      height: 45px;
      .header_search{
        position: absolute;
        left: 15px;
         top: 50%;
         transform: translateY(-50%);
         width: 10%;
         height: 50%;
         .icon-sousuo{
           font-size: 25px;
           color: #fff;
         }
      }
      .header_title{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        color: #fff;
        text-align: center;
        .header_title_text{
          font-size: 20px;
          color: #fff;
          display: block;
        }
      }
      .header_login{
        font-size: 14px;
        color: #fff;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        .header_login_text{
          color: #fff;
        }
      }
    }
    .msite_nav{
      //.bottom-border-1px(#e4e4e4);
      margin-top: 45px;
      height: 200px;
      background-color: #fff;
      .swiper-container{
        width: 100%;
        height: 100%;
        .swiper-wrapper{
          width: 100%;
          height: 100%;
          .swiper-slide{
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            .link_to_food{
              width: 25%;
              .food_container{
                display: block;
                width: 100%;
                text-align: center;
                padding-bottom: 10px;
                font-size: 0;
                img{
                  display: inline-block;
                  width: 50px;
                  height: 50px;
                  //object-fit: cover;
                }
              }
              span{
                  display: block;
                  width: 100%;
                  text-align: center;
                  font-size: 13px;
                  color: #666;
              }
            }
          }
        }
        .swiper-pagination{
          >.swiper-pagination-bullet{
            transform: translateY(10px);
          }
          >.swiper-pagination-bullet-active{
          background-color: #51808f;
          }
        }
      }
    }
    .msite_shop_list{
      .top-border-1px(#e4e4e4);
      margin-top: 10px;
      background-color: #fff;
      .shop_header{
        padding: 10px 10px 0;
        .shop_icon{
          margin-left: 5px;
          color: #999;
        }
        .shop_header_title{
          color: #999;
          font-size: 14px;
          line-height: 20px;
          margin-left: 5px;
        }
      }
    }
  }
</style>
