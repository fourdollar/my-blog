<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-message"></i> 所有博客</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`已发博客(${existblog.length})`" name="first">
                    <el-table :data="existblog" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="date" width="180"></el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="deleteblog(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary">这个按钮还没有用</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="`草稿(${draft.length})`" name="second">
                    <template v-if="message === 'second'">
                        <el-table :data="draft" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
                    <template v-if="message === 'third'">
                        <el-table :data="recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    var headers = { headers: {} }
    const req = axios.create();
    export default {
        data() {
            return {
                message: 'first',
                showHeader: false,
                existblog: [],
                draft: [{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
                }],
                recycle: [{
                    date: '2018-04-19 20:00:00',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
                }]
            }
        },
        methods: {
            deleteblog(index) {
                var url = '/api/article/delete';
                var params = {
                  "id":this.existblog[index].id
                }
                req.put(url,params)
                .then(res => {
                  this.$message.success('删除成功！');
                })
                .catch(e => {
                    if (e.response) {
                        console.log('article/delete :', e.response.status, e.response.statusText)
                    } else {
                        console.log('error article/delete');
                    }
                })

                const item = this.existblog.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            handleDel(index) {
                const item = this.draft.splice(index, 1);
                this.recycle = item.concat(this.recycle);
            },
            handleRestore(index) {
                const item = this.recycle.splice(index, 1);
                this.existblog = item.concat(this.existblog);
            },
            formatDate(adate) {
              var date = new Date(adate);
              var Y = date.getFullYear() + '-';
              var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
              var D = date.getDate() + ' ';
              var h = date.getHours() + ':';
              var m = date.getMinutes();
              // var s = date.getSeconds();
              return Y+M+D+h+m;
            }
        },
        computed: {
            unreadNum(){
                return this.existblog.length;
            }
        },
        mounted(){
          var url = '/api/article/get';
          req.get(url)
          .then(res => {
            for (var i = 0; i < res.data.length; i++) {
              var createdate = this.formatDate(res.data[i].created);
              this.existblog.push({
                "id" : res.data[i].id,
                "title" : res.data[i].title,
                "date" : createdate
              })
            }
          })
          .catch(e => {
              if (e.response) {
                  console.log('article/get :', e.response.status, e.response.statusText)
              } else {
                  console.log('error article/get');
              }
          })
        }
    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>
