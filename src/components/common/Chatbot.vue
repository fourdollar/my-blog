<template lang="html">
  <div class="chatbot">
    <div id="chat-column-holder" class="responsive-column content-column">
      <div class="chat-column">
        <div id="scrollingChat">
          <div class="segments load" v-for="(message,index) in chatcontent">
            <div :class="[message.from , index === chatcontent.length-1 ? 'latest' : '' ,index === chatcontent.length-1 ? 'latestuser' : '' ]">
              <div class="message-inner">
                <p>{{message.text}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-area">
          <input type="text" id="textinput" v-model="inputText" placeholder="Type something" @keyup.enter="inputKeyDown()">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var headers = { headers: {} }
import axios from 'axios';
const req = axios.create()

export default {
  name:'Chatbot',
  data () {
    return {
      inputText:"",
      chatnum:0,
      requestPayload: {},
      responsePayload: {},
      settings:{
        selectors: {
          chatBox: '#scrollingChat',
          fromUser: '.from-user',
          fromWatson: '.from-watson',
          latest: '.latest'
        },
        authorTypes: {
          user: 'user',
          watson: 'watson'
        }
      },
      chatcontent:[]
    }
  },
  methods:{
    init() {
      this.sendRequest( '',null );
    },
    // 发送请求给watson
    sendRequest(text,context) {
      // Build request payload
      var payloadToWatson = {};
      var messageEndpoint = '/api/chat/message';
      if (text) {
        payloadToWatson.input = {
          text: text
        };
      }
      if (context) {
        payloadToWatson.context = context;
      }

      headers.headers = {
        'Content-Type': 'application/json; charset=utf-8',
      }
      var params = JSON.stringify(payloadToWatson);
      if (Object.getOwnPropertyNames(payloadToWatson).length !== 0) {
        this.requestPayload = JSON.parse(params);
      }
      // Send request
      req.post(messageEndpoint, params, headers)
      .then(res => {
        this.responsePayload = res.data;
        this.chatcontent.push({
          from:"from-watson",
          text:res.data.output.text[0]
        })
        var self=this;
        setTimeout(function () {
            self.scrollToChatBottom("watson");
        }, 200);
      })
    },
    // Checks if the given typeValue matches with the user "name", the Watson "name", or neither
    // Returns true if user, false if Watson, and null if neither
    isUserMessage(typeValue) {
      if (typeValue === this.settings.authorTypes.user) {
        return true;
      } else if (typeValue === this.settings.authorTypes.watson) {
        return false;
      }
      return null;
    },
    // Scroll to the bottom of the chat window
    scrollToChatBottom(fromwhere) {
      var scrollingChat = document.querySelector('#scrollingChat');
      if (fromwhere=="watson") {
        // Scroll to the latest message sent by the user
        var scrollEl = scrollingChat.querySelector(".from-watson.latest");
        if (scrollEl) {
          scrollingChat.scrollTop = scrollEl.offsetTop;
        }
      }
      if(fromwhere=="user"){
        var scrollEl = scrollingChat.querySelector(".from-user.latestuser");
        if (scrollEl) {
          scrollingChat.scrollTop = scrollEl.offsetTop;
        }
      }

    },
    // Handles the submission of input
    inputKeyDown() {
      // Submit on enter key, dis-allowing blank messages
      if (this.inputText) {
        var context;
        var latestResponse = this.responsePayload;
        if (latestResponse) {
          context = latestResponse.context;
        }
        // Send the user message
        this.chatcontent.push({
          from:"from-user",
          text:this.inputText
        })
        var self=this;
        setTimeout(function () {
          self.scrollToChatBottom("user");
        }, 500);
        this.sendRequest(this.inputText,context);
        // Clear input box for further messages
        this.inputText = '';
      }
    },
    buildDomElement(domJson) {
      // Create a DOM element with the given tag name
      var element = document.createElement(domJson.tagName);

      // Fill the "content" of the element
      if (domJson.text) {
        element.innerHTML = domJson.text;
      } else if (domJson.html) {
        element.insertAdjacentHTML('beforeend', domJson.html);
      }

      // Add classes to the element
      if (domJson.classNames) {
        for (var i = 0; i < domJson.classNames.length; i++) {
          element.classList.add(domJson.classNames[i]);
        }
      }
      // Add attributes to the element
      if (domJson.attributes) {
        for (var j = 0; j < domJson.attributes.length; j++) {
          var currentAttribute = domJson.attributes[j];
          element.setAttribute(currentAttribute.name, currentAttribute.value);
        }
      }
      // Add children elements to the element
      if (domJson.children) {
        for (var k = 0; k < domJson.children.length; k++) {
          var currentChild = domJson.children[k];
          element.appendChild(this.buildDomElement(currentChild));
        }
      }
      return element;
    },
    listForEach(list, callback) {
      for (var i = 0; i < list.length; i++) {
        callback.call(null, list[i]);
      }
    }
  },
  mounted(){
    this.init();
  },
  computed:{

  }
}
</script>

<style lang="css">
.chatbot{
  height:49%;
  padding: 20px 40px;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  -ms-display: flex;
  -ms-flex-direction: row;
}

.responsive-column {
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

#chat-column-holder {
  text-align: center;
}

.chat-column {
  height: 95%;
  padding: 0.9375rem 0 0.625rem 0;
  margin: auto;
  text-align: left;
  max-width: 35rem;
  min-width: 9.375rem;
}

#scrollingChat {
  margin: 0.75rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100% - 4rem);
  /* height: 40%; */
}

.message-inner {
  opacity: 0;
  margin-top: 0.9375rem;
  -webkit-transition-property: opacity, margin-top;
  -webkit-transition-duration: 0.75s;
  -webkit-transition-timing-function: ease-in;
  -moz-transition-property: opacity, margin-top;
  -moz-transition-duration: 0.75s;
  -moz-transition-timing-function: ease-in;
  -o-transition-property: opacity, margin-top;
  -o-transition-duration: 0.75s;
  -o-transition-timing-function: ease-in;
  -ms-transition-property: opacity, margin-top;
  -ms-transition-duration: 0.75s;
  -ms-transition-timing-function: ease-in;
  transition-property: opacity, margin-top;
  transition-duration: 0.75s;
  transition-timing-function: ease-in;
}

.load .message-inner {
  opacity: 1;
  margin-top: 0.3125rem;
}

.from-user {
  text-align: right;
}

.from-user .message-inner {
  position: relative;
  font-size: 1.2rem;
  color: #fff;
  letter-spacing: 0.015rem;
  line-height: 1.3125rem;
  background: #19b955;
  border-radius: 1.25rem;
  border-bottom-right-radius: 0;
  text-align: left;
  display: inline-block;
  margin-left: 2.5rem;
  min-width: 2.5rem;
  padding: 6px 18px;
  margin: 0.5em 0em;
}

.from-user .message-inner p {
  margin: 0.3125rem;
}

.from-user .message-inner:before, .from-user .message-inner:after {
  content: "";
  position: absolute;
}


.from-user .message-inner:before {
  z-index: -2;
  bottom: -0.375rem;
  right: 0;
  height: 0.375rem;
  width: 0.5rem;
  background: #1cb3a0;
}

.from-user .message-inner:after {
  z-index: -1;
  bottom: -0.5rem;
  right: 0;
  height: 0.5rem;
  width: 0.5rem;
  background: #fff;
  border-top-right-radius: 1.25rem;
}

.from-watson .message-inner {
  position: relative;
  border-radius: 1.5625rem;
  padding: 6px 18px;
  font-size: 1.2rem;
  color: #B5B5B5;
  letter-spacing: 0.015rem;
  line-height: 1.3125rem;
  background: #f1f1f1;
  margin: 0.5em 0em;
}

.from-watson.latest .message-inner {
  color: #323232;
}

.from-watson p {
  margin: 0.3125rem;
  padding: 0;
}

.from-watson.latest.top p:before {
  content: ".";
  color: #9855D4;
  background-image: url("../../../static/img/marker_image.png");
  background-size: 0.3125rem 1.3125rem;
  position: absolute;
  z-index: 2;
  left: 0.4375rem;
  width: 0.3125rem;
  height: 1.3125rem;
  line-height: 1.3125rem;
}

.footer-area {
  background-color: #F2F2F2;
  height: 4.5em;
  padding-top: 1em;
  padding-bottom: 1em;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 37.5%;
  z-index: 1;
  justify-content: center;
}
#textinput {
  display: block;
  width: 80%;
  padding: 5px 15px;
  margin: 0 auto;
  font-size: 15px;
  line-height: 1.42857143;
  color: #2c3e50;
  background-color: #ffffff;
  background-image: none;
  border: 1px solid #bdbcbc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgb(219, 238, 244, 0.75);
  box-shadow: inset 0 1px 1px rgb(219, 238, 244, 0.75);
  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

/* #textInput {
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #323232;
  letter-spacing: 0.015rem;
  line-height: 1.3125rem;
  height: 2.5rem;
  max-width: 100%;
  padding-left: 0.125rem;
  margin-bottom: -0.125rem;
  font-family: Helvetica Neue for IBM, Helvetica Neue, Helvetica, Arial, sans-serif;

}

#textInput.underline {
  border-bottom: 2px solid #00B4A0;
}

::-webkit-input-placeholder {
  color: #B5B5B5;
}

::-moz-placeholder {
  color: #B5B5B5;
  opacity:  1;
}

input:-moz-placeholder {
  color: #B5B5B5;
  opacity:  1;
}

:-ms-input-placeholder {
  color: #B5B5B5;
} */

::-ms-clear {
  display: none;
}

.inputOutline {
  display: block;
  border-bottom: 0.0625rem solid #aeaeae;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

#textInputDummy {
  position:absolute;
  white-space:pre;
  top: 0;
  left: -1000%;
  opacity: 0;
}
</style>
