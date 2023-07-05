<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">X外卖</h2>
        <div class="login_header_title">
          <a href="javascript:" :class="{on: loginWay}" @click="loginWay = true">账号登录</a>
          <a href="javascript:" :class="{on: !loginWay}" @click="loginWay = false">账号注册</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="text" placeholder="账号" v-model="username">
            </section>
            <section class="login_verification">
              <input type="password" placeholder="密码" v-model="password">
            </section>
            <section class="login_hint">
              温馨提示：登录X外卖帐号即代表已同意
              <a href="#">《用户服务协议》</a>
            </section>
            <button class="login_submit" @click="login">登录</button>
          </div>
          <div :class="{on: !loginWay}">
            <section class="register_message">
              <input type="text" placeholder="账号" v-model="username2">
            </section>
            <section class="register_verification">
              <input type="password" placeholder="密码" v-model="password2">
            </section>
            <button class="register_submit" @click="add">注册</button>
          </div>
          
        </form>
        <a href="javascript:" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-xiangzuojiantou"></i>
      </a>
    </div>
  </div>
</template>

<script>
import axios, { all } from "axios"
  export default{
    data(){
        return{
          loginWay: true,
          username: '',
          password: '', 
          id: 1,
          username2: '',
          password2: '',
          account:[],
          flag: false
        }
    },
    mounted(){
      
    },
    methods: {
      all() {    //查找account表全部数据
        axios.get('http://127.0.0.1/account/all').then(res=>{
            this.account = res.data
        }).catch(err=>{
            console.log("获取数据失败" + err);
        })
      },
      add() {   //添加操作
        if( this.username2 == '' ){
          alert('账号不得为空')
        }else if( this.password2 == ''){
          alert('密码不得为空')
        }else if( this.username2.length < 4 ){
          alert('账号过短')
        }else if( this.password2.length < 6 ){
          alert('密码过短')
        }else{
          axios.get('http://127.0.0.1/account/all').then(res=>{
            for(var i=0;i<res.data.length;i++){
              if( res.data[i].username == this.username2 ){
                alert('账号重复')
              }else{
                for(var j=0;j<res.data.length;j++){
                  if( this.id < res.data[j].id ){
                    this.id = res.data[j].id
                  }
                }
                this.account = res.data
                axios.get('http://127.0.0.1/account/add',{
                  params: {
                    id: parseInt(this.id) + 1,
                    username: this.username2,
                    password: this.password2,
                  }
                }).then(res=>{
                  if(res.data.status == 200) {
                    this.all()
                    alert('注册成功')
                   this.loginWay = true
                   this.username = this.username2
                   this.password = this.password2
                  }else{
                    // this.$message({
                    // message: '添加失败',
                    // type: 'error'
                    // });
                  }
                }).catch(err=>{
                  console.log("操作失败" + err);
                })
              }
            }
          }).catch(err=>{
            console.log("获取数据失败" + err);
          })
        }
      },
      clean(){
        this.username = '',
        this.username2 = '',
        this.password = '',
        this.password2 = ''
      },
      login(){
        axios.get('http://127.0.0.1/account/all').then(res=>{
            this.account = res.data

          for( var i=0;i<this.account.length;i++ ){
            if( this.username === this.account[i].username && this.password === this.account[i].password ){
              alert('登录成功')
              localStorage.setItem("token", this.username);
              this.$router.push({
                path:'profile'
              });
              this.flag = true;
              break;
            }
          }
          if(!this.flag){
            alert('账号或密码错误')
          }
        }).catch(err=>{
            console.log("获取数据失败" + err);
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../common/style/mixins.less";
  .loginContainer{
    width: 100%;
    height: 100%;
    background: #fff;
    .loginInner{
      padding-top: 60px;
      width: 80%;
      margin: 0 auto;
      .login_header{
        .login_logo{
          font-size: 40px;
          font-weight: bold;
          color: #51808f;
          text-align: center;
        }
        .login_header_title{
          padding-top: 40px;
          text-align: center;
          >a{
            color: #333;
            font-size: 14px;
            padding-bottom: 4px;
            &:first-child{
              margin-right: 40px;
            }
            &.on{
              color: #51808f;
              font-weight: 700;
              border-bottom: 2px solid #51808f;
            }
          }
        }
      }
      .login_content{
        >form{
          >div{
            display: none;
            &.on{
              display: block;
            }
            input{
              width: 100%;
              height: 100%;
              padding-left: 10px;
              box-sizing: border-box;
              border: 1px solid #ddd;
              border-radius: 4px;
              outline: 0;
              font: 400 14px Arial;
              &:focus{
                border: 1px solid #51808f;
              }
            }
            .login_message,.register_message{
              position: relative;
              margin-top: 16px;
              height: 48px;
              font-size: 14px;
              background: #fff;
              .get_verification{
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                border: 0;
                color: #ccc;
                font-size: 14px;
                background: transparent;
                &.showBlack{
                  color: black;
                }
              }
            }
            .login_verification,.register_verification{
              position: relative;
              margin-top: 16px;
              height: 48px;
              font-size: 14px;
              background: #fff;
              .switch_button{
                font-size: 12px;
                border: 1px solid #ddd;
                border-radius: 8px;
                transition: background-color .3s,border-color .3s;
                padding: 0 6px;
                width: 30px;
                height: 16px;
                line-height: 16px;
                color: #fff;
                position: absolute;
                top: 50%;
                right: 10px;
                transform: translateY(-50%);
                &.off{
                  background: #fff;
                  .switch_text{
                    float: right;
                    color: #ddd;
                  }
                }
                &.on{
                  background: #51808f;
                }
                >.switch_circle{
                  //transform translateX(27px);
                  position: absolute;
                  top: -1px;
                  left: -1px;
                  width: 16px;
                  height: 16px;
                  border: 1px solid #ddd;
                  border-radius: 50%;
                  background: #fff;
                  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
                  transition: transform .3s;
                  &.right{
                    transform: translateX(31px);
                  }
                }
              }
            }
            .login_hint{
              margin-top: 12px;
              color: #999;
              font-size: 14px;
              line-height: 20px;
              >a{
                color: #51808f;
              }
            }
          }
          .login_submit,.register_submit{
            display: block;
            width: 100%;
            height: 42px;
            margin-top: 30px;
            border-radius: 4px;
            background: #51808f;
            color: #fff;
            text-align: center;
            font-size: 16px;
            line-height: 42px;
            border: 0;
          }
        }
        .about_us{
          display: block;
          font-size: 12px;
          margin-top: 20px;
          text-align: center;
          color: #999;
        }
      }
      .go_back{
        position: absolute;
        top: 5px;
        left: 5px;
        width: 30px;
        height: 30px;
        .icon-xiangzuojiantou{
          line-height: 30px;
          margin-left: 5px;
        }
      }
    }
  }
</style>
