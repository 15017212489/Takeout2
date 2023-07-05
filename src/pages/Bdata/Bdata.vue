<template>
    <div class="backgroud">
        <HeaderTop title="后台数据管理"></HeaderTop>
        <div class="Bdata">
            <div class="Bdata_select">
                <div class="Bdata_title">
                    <a href="#" :class="{on: data == 1}" @click="data = 1">info表</a>
                    <a href="#" :class="{on: data == 2}" @click="data = 2">business表</a>
                    <a href="#" :class="{on: data == 3}" @click="data = 3">account表</a>
                </div>
            </div>
            <div class="Bdata_content">
                <form>
                    <div :class="{on: data == 1}">
                        <table class="infotable">
                            <tr class="table-header">
                                <th class="table-cell">ID</th>
                                <th class="table-cell">名称</th>
                            </tr>
                            <tr v-for="(item, index) in info"  v-bind:key="index" class="table-row">
                                <td class="table-cell">{{item.id}}</td>
                                <td class="table-cell">{{item.name}}</td>
                            </tr>
                        </table>
                    </div>
                    <div :class="{on: data == 2}">
                        <table class="businesstable">
                            <tr class="table-header">
                                <th class="table-cell">ID</th>
                                <th class="table-cell">名称</th>
                                <th class="table-cell">星星</th>
                                <th class="table-cell">月售</th>
                                <th class="table-cell">起送费</th>
                                <th class="table-cell">配送费</th>
                            </tr>
                            <tr v-for="(item, index) in business"  v-bind:key="index" class="table-row">
                                <td class="table-cell">{{item.id}}</td>
                                <td class="table-cell">{{item.name}}</td>
                                <td class="table-cell">{{item.star}}</td>
                                <td class="table-cell">{{item.sale}}</td>
                                <td class="table-cell">{{item.price}}</td>
                                <td class="table-cell">{{item.delivery}}</td>
                            </tr>
                        </table>
                    </div>
                    <div :class="{on: data == 3}">
                        <table class="accounttable">
                            <tr class="table-header">
                                <th class="table-cell">ID</th>
                                <th class="table-cell">账号</th>
                                <th class="table-cell">密码</th>
                            </tr>
                            <tr v-for="(item, index) in account"  v-bind:key="index" class="table-row">
                                <td class="table-cell">{{item.id}}</td>
                                <td class="table-cell">{{item.username}}</td>
                                <td class="table-cell">{{item.password}}</td>
                            </tr>
                        </table>
                    </div>
                </form>
            </div>
            <div class="Bdata_update">
                <div :class="{on: data == 1}">
                    <div class="top">
                        <input type="text" v-model="id1" placeholder="请输入id" class="rounded-input"><br>
                        <button @click="del" class="rounded-button del">删除</button>
                    </div>
                    <div class="bottom">
                        <input type="text" v-model="id1" placeholder="请输入id" class="rounded-input"><br>
                        <input type="text" v-model="name1" placeholder="请输入名称" class="rounded-input"><br>
                        <button @click="add" class="rounded-button">添加</button>
                        <button @click="update" class="rounded-button">修改</button>
                    </div>
                </div>

                <div :class="{on: data == 2}">
                    <div class="top">
                        <input type="text" v-model="id2" placeholder="请输入id" class="rounded-input"><br>
                        <button @click="del2" class="rounded-button del">删除</button>
                    </div>
                    <div class="bottom">
                        <input type="text" v-model="id2" placeholder="请输入id" class="rounded-input"><br>
                        <input type="text" v-model="name2" placeholder="请输入名称" class="rounded-input"><br>
                        <input type="text" v-model="star" placeholder="请输入星星" class="rounded-input"><br>
                        <input type="text" v-model="sale" placeholder="请输入月售" class="rounded-input"><br>
                        <input type="text" v-model="price" placeholder="请输入起送费" class="rounded-input"><br>
                        <input type="text" v-model="delivery" placeholder="请输入配送费" class="rounded-input"><br>
                        <button @click="add2" class="rounded-button">添加</button>
                        <button @click="update2" class="rounded-button">修改</button>
                    </div>
                </div>

                <div :class="{on: data == 3}">
                    <div class="top">
                        <input type="text" v-model="id3" placeholder="请输入id" class="rounded-input"><br>
                        <button @click="del3" class="rounded-button del">删除</button>
                    </div>
                    <div class="bottom">
                        <input type="text" v-model="id3" placeholder="请输入id" class="rounded-input"><br>
                        <input type="text" v-model="username" placeholder="请输入账号" class="rounded-input"><br>
                        <input type="text" v-model="password" placeholder="请输入密码" class="rounded-input"><br>
                        <button @click="add3" class="rounded-button">添加</button>
                        <button @click="update3" class="rounded-button">修改</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

  
<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue';
    import axios from "axios"
    export default{
        data(){
            return{
                data: 1,
                //info表
                info: [],
                id1: '',
                name1: '',
                //business表
                business: [],
                id2: '',
                name2: '',
                star: '',
                sale: '',
                price: '',
                delivery: '',
                //account表
                account: [],
                id3: '',
                username: '',
                password: ''
            }
        },
        mounted(){
            this.all()
        },
        methods:{
            all() {    
                //查找info表全部数据
                axios.get('http://127.0.0.1/list/all').then(res=>{
                    this.info = res.data
                }).catch(err=>{
                    console.log("获取数据失败" + err);
                })
                //查找business表全部数据
                axios.get('http://127.0.0.1/business_list/all').then(res=>{
                    this.business = res.data
                }).catch(err=>{
                    console.log("获取数据失败" + err);
                })
                //查找account表全部数据
                axios.get('http://127.0.0.1/account/all').then(res=>{
                    this.account = res.data
                }).catch(err=>{
                    console.log("获取数据失败" + err);
                })
            },
            del() {
                //删除
                axios.get('http://127.0.0.1/list/del',{
                    params: {
                        id: this.id1
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
            del2() {
                //删除
                axios.get('http://127.0.0.1/business_list/del',{
                    params: {
                        id: this.id2
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
            del3() {
                //删除
                axios.get('http://127.0.0.1/account/del',{
                    params: {
                        id: this.id3
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
            add() {
                //添加
                axios.get('http://127.0.0.1/list/add',{
                    params: {
                        id: this.id1,
                        name: this.name1,
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
            add2() {
                //添加
                axios.get('http://127.0.0.1/business_list/add',{
                    params: {
                        id: this.id2,
                        name: this.name2,
                        star: this.star,
                        sale: this.sale,
                        price: this.price,
                        delivery: this.delivery
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
            add3() {
                //添加
                axios.get('http://127.0.0.1/account/add',{
                    params: {
                        id: this.id3,
                        username: this.username,
                        password: this.password
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
            update() {
                //修改
                axios.get('http://127.0.0.1/list/update',{
                    params: {
                    id: this.id1,
                    name: this.name1,
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
            update2() {
                //修改
                axios.get('http://127.0.0.1/business_list/update',{
                    params: {
                        id: this.id2,
                        name: this.name2,
                        star: this.star,
                        sale: this.sale,
                        price: this.price,
                        delivery: this.delivery
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
            update3() {
                //修改
                axios.get('http://127.0.0.1/account/update',{
                    params: {
                        id: this.id3,
                        username: this.username,
                        password: this.password
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
        components:{
            HeaderTop
        }
    }
</script>

<style lang="less">
    @import "../../common/style/mixins.less";
    .Bdata{
        margin-top: 45px;
        margin-bottom: 50px;
        .Bdata_select{
            .Bdata_title{
                padding-top: 40px;
                text-align: center;
                >a{
                    color: #333;
                    font-size: 14px;
                    padding-bottom: 4px;
                    margin-left: 40px;
                    &:first-child{
                        margin-left: 0;
                    }
                    &.on{
                        color: #51808f;
                        font-weight: bold;
                        border-bottom: 2px solid #51808f;
                    }
                }
            }
        }
        .Bdata_content{
            margin-top: 30px;
            >form{
                >div{
                    display: none;
                    &.on{
                        display: block;
                    }
                }
            }
            table{
                width: 100%;
                border-collapse: collapse;
                .table-row{
                    background-color: #f2f2f2;
                    &:nth-child(even){
                        background-color: #ffffff;
                    }
                }
                .table-header{
                    font-weight: bold;
                    background-color: #82a5b1;
                    color: white;
                    text-align: center;
                    padding: 10px;
                    border-bottom: 1px solid #cccccc;
                }
                .table-cell{
                    padding: 10px;
                    border-bottom: 1px solid #dddddd;
                    text-align: center;
                    &:first-child{
                        border-left: 1px solid #dddddd;
                        &:last-child{
                            border: none;
                        }
                    }
                    &:last-child{
                        border-right: 1px solid #dddddd;
                    }
                }
            }
        }
        .Bdata_update{
            margin-top: 10px;
            text-align: center;
            >div{
                display: none;
                &.on{
                    display: block;
                }
            }
            .top,.bottom{
                margin-top: 5px;
                border: 3px #c7c7c7 dotted;
            }
            .rounded-input {
                margin-top: 5px;
                width: 80%;
                border-radius: 10px;
                border: 1px solid #ccc;
                padding: 8px 12px;
                font-size: 18px;
            }
            .rounded-button{
                width: 20% + 10px;
                margin-top: 5px;
                margin-bottom: 5px;
                background-color: #82a5b1;
                color: white;
                border: 2px solid #cccccc;
                border-radius: 15px;
                padding: 8px 24px;
                font-size: 18px;
                cursor: pointer;
            }
            .del{
                background-color: #c54747;
            }
        }
    }
</style>
