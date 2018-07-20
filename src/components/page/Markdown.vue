<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>markdown编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                mavonEditor：基于Vue的markdown编辑器。
                访问地址：<a href="https://github.com/hinesboy/mavonEditor" target="_blank">mavonEditor</a>
            </div>
            <el-input v-model="blogtitle" class="blogtitle" placeholder="请输入文章标题"></el-input>
            <mavon-editor v-model="content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import axios from 'axios';
    var headers = { headers: {} }
    const req = axios.create();
    export default {
        data: function(){
            return {
                content:'',
                html:'',
                blogtitle:'',
                configs: {
                }
            }
        },
        components: {
            mavonEditor
        },
        methods: {
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                var formdata = new FormData();
                formdata.append('file', $file);
                // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
                this.$axios({
                    url: '/common/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((url) => {
                    this.$refs.md.$img2Url(pos, url);
                })
            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
            },
            submit(){
                console.log(this.html);
                var url = '/api/article/add';
                headers.headers = {
                  'Content-Type': 'application/json; charset=utf-8',
                }
                var now = Date.now();
                var params = {
                  "title" : this.blogtitle,
                  "created" : now,
                  "content" : this.html,
                  "description" : this.content.substring(0,50),
                  "status" : 1,
                  "clicknum" : 2
                }
                params = JSON.stringify(params);
                req.post(url, params, headers)
                  .then(res => {
                    this.$message.success('提交成功！');
                    this.blogtitle="";
                    this.content="";
                    this.html="";
                  })
                  .catch(e => {
                      if (e.response) {
                          console.log('/addarticle :', e.response.status, e.response.statusText)
                      } else {
                          console.log('error /addarticle');
                      }
                  })

            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
    .blogtitle{
      box-shadow: 0 0px 4px rgba(0,0,0,0.157), 0 0px 4px rgba(0,0,0,0.227);
      margin-bottom: 20px;
    }
</style>
