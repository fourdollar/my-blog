<template>
  <div id="Main">
    <el-row>
      <el-col :span="9">
        <div class="grid-content lefthead">
          <div class="userinfo">
            <img src="../assets/favicon.png" alt="">
            <a href="#"><h1>冯思源的博客</h1><h2>fourdollar's blog</h2></a>
          </div>
          <div class="switchboard">
            <ul>
              <li title="回到主页"><a href="#"><i class="fa fa-home" aria-hidden="true"></i></a></li>
              <li title="地图" @click="goto('map')"><a><i class="fa fa-map-marker" aria-hidden="true"></i></a></li>
              <li title="登录" @click="goto('login')"><a><i class="fa fa-sign-in" aria-hidden="true"></i></a></li>
              <li title="github"><a href="https://github.com/fourdollar"><i class="fa fa-github" aria-hidden="true"></i></a></li>
              <li title="留言板" @click="goto('dashboard')"> <a><i class="fa fa-weixin" aria-hidden="true"></i></a></li>
            </ul>
          </div>
          <div class="selfintro">
            <p>30岁的半路出家程序员，爱好吃饭。17年开始学习前端，从JS d3 vue node到python。这里是一个把学习的东西运用的地方。
              本博客使用了vue+nodejs+mysql</p>
          </div>
          <Chatbot></Chatbot>
        </div>
      </el-col>

      <el-col :span="15">
        <div class="grid-content bg-purple-light scroll">
          <div class="blogcontent">
            <div class="oneblog" v-for="blog in blogcontents">
              <div class="oneblog-header">
                <a><h2>{{blog.title}}</h2></a>
                <p>{{blog.content}}</p>
                <span>{{blog.date | formatDate}}前发布 | {{blog.comment_n}} 评论</span>
              </div>
              <div class="oneblog-image">
                <img :src="blog.image" alt="No Image">
              </div>
            </div>
            <el-button class="nextbtn">下一页</el-button>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>

</template>

<script>
import Chatbot from '@/components/common/Chatbot'
import axios from 'axios';
const req = axios.create();

export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      haslogin:false,
      userID:localStorage.getItem("ms_username"),
      blogcontents:[
        // {
        //   "title" : "啦啦啦",
        //   "date" : "2017-09-03T02:46:54.000Z",
        //   "content" : "作为 iOS 11 重磅功能之一的 ARKit 在发布之初就引起了我强烈的兴趣，那段时间我正好也对著名的游戏引擎 Unity 很感兴趣，不满足于制作小游戏的我便开始琢磨如何将 ARKit 和 Unity 结合在一起来实现 AR 效果。",
        //   "comment_n" : 0,
        //   "image":"./static/img/1.jpg"
        // },
        // {
        //   "title" : "hello world",
        //   "date" : "2017-10-25T06:01:29.000Z",
        //   "content" : "作为 iOS 11 重磅功能之一的 ARKit 在发布之初就引起了我强烈的兴趣，那段时间我正好也对著名的游戏引擎 Unity 很感兴趣，不满足于制作小游戏的我便开始琢磨如何将 ARKit 和 Unity 结合在一起来实现 AR 效果。",
        //   "comment_n" : 0,
        //   "image":"./static/img/1.jpg"
        // },{
        //   "title" : "hello world",
        //   "date" : "2016-04-25T06:01:29.000Z",
        //   "content" : "作为 iOS 11 重磅功能之一的 ARKit 在发布之初就引起了我强烈的兴趣，那段时间我正好也对著名的游戏引擎 Unity 很感兴趣，不满足于制作小游戏的我便开始琢磨如何将 ARKit 和 Unity 结合在一起来实现 AR 效果。",
        //   "comment_n" : 0,
        //   "image":"./static/img/1.jpg"
        // },{
        //   "title" : "hello world",
        //   "date" : "2018-04-08T06:01:29.000Z",
        //   "content" : "作为 iOS 11 重磅功能之一的 ARKit 在发布之初就引起了我强烈的兴趣，那段时间我正好也对著名的游戏引擎 Unity 很感兴趣，不满足于制作小游戏的我便开始琢磨如何将 ARKit 和 Unity 结合在一起来实现 AR 效果。",
        //   "comment_n" : 0,
        //   "image":"./static/img/1.jpg"
        // }
      ],
        blogcontent:[]
    }
  },
  methods: {
    goto(where){
      this.$router.push({
        path: '/'+where
      })
    }
  },
  filters:{
    //过滤发布时间
    formatDate(time){
      var date = new Date(time);
      var now = new Date();
      var dateDiff = (now-date)/(60 * 60 * 1000);
      dateDiff = Math.floor(dateDiff);
      if (dateDiff < 24) {
        return dateDiff+"小时";
      }else if (dateDiff>=24 && dateDiff<720) {
        dateDiff = Math.floor(dateDiff/24);
        return dateDiff+"天";
      }else if (dateDiff>=720 && dateDiff<8640) {
        dateDiff = Math.floor(dateDiff/(24*30));
        return dateDiff+"个月";
      }else {
        dateDiff = Math.floor(dateDiff/(24*30*12));
        return dateDiff+"年";
      }
    }
  },
  created:function () {
    // if (this.userID) {
    //     this.haslogin=true
    // }

  },
  mounted(){
    var url = '/api/article/get';
    req.get(url)
    .then(res => {
      for (var i = 0; i < res.data.length; i++) {
        this.blogcontents.push({
          "title" : res.data[i].title,
          "date" : res.data[i].created,
          "content" : res.data[i].description,
          "comment_n" : res.data[i].clicknum,
          "image":res.data[i].image
        })
      }

      console.log(this.blogcontent);
    })
    .catch(e => {
        if (e.response) {
            console.log('/getarticle :', e.response.status, e.response.statusText)
        } else {
            console.log('error /getarticle');
        }
    })
  },
  components: {
    Chatbot
  }
}
</script>

<style>
#Main{
  font-family:'Muli', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}
#Main .el-row {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  &:last-child {
    margin-bottom: 0;
  }
}
#Main a{
  color: #333;
}
/* ==========================左边栏========================== */
.el-col-9 {
  position: absolute;
  top: 0;
  bottom: 0;
}
.lefthead{
  background-image: url(../assets/huangshan.jpg);
  background-repeat:no-repeat;
  background-size:cover;
  text-align: center;
  opacity: 1;
  overflow-y: hidden;
  transition: opacity 1s;
  color: rgba(255, 255, 255, 0.8);
}
.lefthead img{
    max-width: 100px;
    margin-top: 5px;
    margin-bottom: 10px;
    border-radius: 100%;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5), 0px 2px 20px 3px rgba(0, 0, 0, 0.25);
}
.userinfo{
  margin-top: 5em;
}
.userinfo a h1{
  font-size: 2rem;
  margin-top: 0.75em;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}
.userinfo a h2{
  font-size: 1.8rem;
  margin-top: 0.375em;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

.switchboard{
  margin-top: 1.75em;
  margin-bottom: -0.75em;
}
.switchboard ul{
  -webkit-padding-start: 0px;
}
.switchboard ul li{
  position: relative;
  display: inline-block;
  border: 1px solid;
  border-color: rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.45) rgba(255, 255, 255, 0.55);
  border-radius: 100%;
  padding: 5px 7px;
  margin: 0 0.25em;
  font-size: 1.2rem;
  letter-spacing: .5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 3px 18px rgba(0, 0, 0, 0.2);
  transition: .2s;
  cursor: pointer;
}
.switchboard ul li:hover{
  background-color: rgba(255, 255, 255, 0.35);
}
.switchboard ul li a{
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  color: white !important;
}

.selfintro{
  padding: 0 6.5em;
  margin-top: 2.5em;
  height: 10%;
  text-align: left;
}

/* ==========================左边栏========================== */
.el-col-15 {
  position: absolute;
  left: 37.5%;
  top: 0;
  bottom: 0;

}
/* ==========================blog========================== */
.blogcontent{
  padding: 4em;
  text-align: left;
}
.scroll{
  overflow: scroll;
}
.oneblog{
  padding-top: 2em;
  padding-bottom: 3.5em;
  text-align: left;
  overflow: auto;
}
.oneblog .oneblog-header{
  display: inline-block;
  width: 66.6%;
}

.oneblog .oneblog-image{
  padding-left: 30px;
  display: inline-block;
  width: 33.3%;
  height: 176px;
  float: right;
}

.oneblog-image img{
  height: 176px;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 25, 0.1), 0 5px 75px 1px rgba(0, 0, 50, 0.2);
}

.oneblog a h2{
  font-size:26px;
  font-weight:bold;
  line-height: 1.35;
  margin-bottom: 0.25em;
  margin-top: 0;
}

.oneblog p{
  font-size:1.85rem;
  line-height: 1.625;
  letter-spacing: 0.35px;
  margin-bottom: 1em;
}

.oneblog span{
  color: #888;
  font-size: 1.4rem;
}

.blogcontent .nextbtn{

}

/* ==========================blog========================== */
.grid-content {
  height: 100%;
  width: 100%;
  position: relative;
  top: 0;
  bottom: 0;
  background-color: #fafbff;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
