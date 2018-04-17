<template>
  <div id="Login">
    <header class="login-nav">
      <div class="container">
        <div class="nav-left">
          <img src="../assets/favicon.png" alt="">
          <a @click="goTopPage">Fourdollar's World</a>
        </div>
        <div class="nav-right">
          <ul class="nav-list">
            <li @click="showregister"><a v-show="lore">Register</a><a v-show="!lore">Login</a></li>
            <li @click="goTopPage"><a>HomePage</a></li>
          </ul>
        </div>
      </div>
    </header>
    <div class="login-fullpage">
      <div class="login-content">
        <div class="container">
          <div class="row">
            <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
              <form class="login-form" action="#" method="#" v-if="loginVisible">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Login</h3>
                  </div>
                  <div class="card-content">
                    <div class="form-group">
                      <label>Email address</label>
                      <input type="email" placeholder="Enter email" class="form-control input-no-border">
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input type="password" placeholder="Password" class="form-control input-no-border">
                    </div>
                  </div>
                  <div class="card-footer text-center">
                      <button type="submit" class="btn btn-fill btn-wd ">Let's go</button>
                      <div class="forgot">
                          <a href="#" style="color: #68B3C8;">Forgot your password?</a>
                      </div>
                  </div>
                </div>
              </form>
              <form class="register-form" action="#" method="#" v-if="registerVisible">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Register</h3>
                  </div>
                  <div class="card-content">
                    <div class="form-group">
                      <label>ID</label>
                      <input type="text" placeholder="Nick name" class="form-control input-no-border">
                    </div>
                    <div class="form-group">
                      <label>Email address</label>
                      <input type="email" placeholder="Enter email" class="form-control input-no-border">
                    </div>
                    <div class="form-group">
                      <label>Password</label>
                      <input type="password" placeholder="Password" class="form-control input-no-border">
                    </div>
                    <div class="form-group">
                      <label>Password-Comfirm</label>
                      <input type="password" placeholder="Password Confirmation" class="form-control input-no-border">
                    </div>
                  </div>
                  <div class="card-footer text-center">
                      <button type="submit" class="btn btn-fill btn-wd ">Let's go</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer footer-transparent">
          <div class="container">
              <div class="copyright">
                  © 2018, made with <i class="fa fa-heart heart"></i> by <a href="http://www.creative-tim.com">SIYUAN FENG</a>
              </div>
          </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Login Page',
      lore: true,
      loginVisible: true,
      registerVisible: false
    }
  },
  methods: {
    goTopPage () {
      this.$router.push({
        path: '/'
      })
    },
    showregister(){
      this.loginVisible = !this.loginVisible
      this.registerVisible = !this.registerVisible
      this.lore = !this.lore
    }
  }
}
</script>

<style>
#Login {
  font-family:'Muli', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100%;
}
#Login a {
  color: #FFFFFF;
}
#Login a:hover{
  color: #e5e5e5;
}

.login-nav{
  position: absolute;
  width: 100%;
  z-index: 1030;
  min-height: 75px;
  padding-top: 15px;
  background-color: transparent;
  border-bottom: 1px solid transparent;
  border: 0;
  border-radius: 0;
  font-size: 18px;
  margin-bottom: 15px;
}

.login-nav .nav-left img {
  width: 46px;
  -webkit-border-radius: 23px;
}

.nav-left{
  float:left;
  font-size: 22px;
  margin: 12px 0px;
  padding: 15px 15px;
}

.nav-right{
  float:right;
  margin: 12px 0px;
  padding: 15px 15px;
}
.nav-right ul li{
  display: inline-block;
  margin-left: 36px;
  margin-top:10px;
}

.login-fullpage {
  min-height: 100vh;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-image: url(../assets/huangshan.jpg);
  background-repeat:no-repeat;
  background-size:cover;
  opacity:0.9;

}

.login-content{
  padding-top:20vh;
  min-height: calc(100vh - 70px);
}

.card {
  border-radius: 6px;
  box-shadow: 0 3px 3px rgba(204, 197, 185, 0.6);
  background-color: #FFFFFF;
  color: #252422;
  margin-bottom: 20px;
  position: relative;
  text-align: left;
}

.card .card-header {
  padding: 20px 15px 0px;
  position: relative;
  border-radius: 3px 3px 0 0;
  z-index: 3;
}
.card .card-title {
  margin: 0;
  color: #252422;
  font-weight: 300;
}

.card .card-content {
  padding: 15px 15px 10px 15px;
}

.form-group {
  margin-bottom: 15px;
}
.form-control.input-no-border {
    border: 0 none;
}

.form-control {
  background-color: #F3F2EE;
  border: 1px solid #e8e7e3;
  border-radius: 4px;
  color: #66615b;
  font-size: 14px;
  padding: 7px 18px;
  height: 40px;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.form-control:focus {
  background-color: #FFFFFF;
  box-shadow: none;
  outline: 0 !important;
}

.card .card-footer{
  padding: 0 15px 15px;
}

.btn.btn-fill{
  color: #FFFFFF;
  background-color: #4c4944;
  opacity: 1;
  min-width: 140px;
  border-radius: 20px;
  box-sizing: border-box;
  border-width: 2px;
  font-size: 14px;
  font-weight: 600;
  padding: 7px 18px;
  border-color: #4c4944;
}

.footer-transparent{
  background-color: transparent;
}

</style>
