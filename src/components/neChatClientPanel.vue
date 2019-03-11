<template>
    <div class="chat-client-panel nkn-explorer-card-shadow" :class="clientIdx">
        <div v-if="showLogin" class="chat-login-panel">
            <div class="chat-title">
                <img v-if="'A' === this.clientIdx" class="chat-title-img" src="../assets/img/chat/chat_a.png"/>
                <img v-else class="chat-title-img" src="../assets/img/chat/chat_b.png"/>
            </div>
            <div class="chat-login-desc">
                <div class="desc-line">{{$t("chat.descLine1")}}</div>
                <div class="desc-line">{{$t("chat.descLine2")}}</div>
            </div>
            <div class="username-input">
                <input v-model="userName" class="user-nam" :placeholder="$t('chat.input.usernamePH')" type="text" maxlength="20"/>
            </div>

            <div class="login-button">
                <div @click="login">{{$t("chat.btn.connect")}}</div>
            </div>
        </div>

        <div v-else class="chat-dlg">
            <div class="chat-dlg-title">
                <div v-if="!connected" class="title-waiting">{{$t("chat.dialog.titleConnecting")}}</div>
                <div v-else class="title-connected">{{userName}}</div>
            </div>

            <div class="to-address input-group"
                 data-trigger="manual"
                 data-toggle="tooltip"
                 data-placement="bottom"
                 title="Please input a nkn address."
                 :class="connected ? 'to-address-show':'to-address-hide'">
                <div class="input-group-prepend to-address-title">
                    <span class="input-group-text" >{{$t("chat.dialog.to")}}</span>
                </div>
                <input type="text" class="form-control to-address-input"
                       v-model="toAddress"
                       maxlength="100"
                       @focus="toAddressFocused"
                       @blur="toAddressBlured"/>

                <div class="input-group-append to-address-clear">
                    <span class="input-group-text" >
                        <img src="./../assets/img/chat/clearAddress.png"
                                @click="clearAddress"/>
                    </span>
                </div>
            </div>

            <ne-chat-address-list v-show="showAddressList"
                    class="chat-address-list"
                :addresses="addresses"
                :event-factory="addressEventFactory"/>

            <div class="chat-dlg-area">
                <div v-for="(msg, idx) in chatTextList" :key="idx" :data-index="idx" class="msg-box-row">
                    <div :class="msg.fromFriend ? 'friend-row row-head':'row-head'"
                         @click="replyTo(msg.address)"
                    >{{msg.nickname}}</div>
                    <div :class="msg.fromFriend ? 'friend-row row-text':'row-text'">
                        <div v-show="msg.fromFriend" class="friend-msg-address"
                             @click="replyTo(msg.address)">[{{$t("chat.dialog.from")}} {{msg.address}}]</div>
                        <span>{{msg.text}}</span>
                    </div>
                </div>
            </div>
            <div class="chat-dlg-input input-group">
                <input v-if="connected" type="text" class="msg-input form-control"
                       maxlength="100"
                       :placeholder="$t('chat.input.connectedPH')"
                       :aria-label="$t('chat.input.connectedLabel')"
                       @keyup.enter="sendMsg">

                <input v-else type="text" class="msg-input form-control"
                       disabled="disabled"
                       maxlength="100"
                       :placeholder="$t('chat.input.unConnectedPH')"
                       :aria-label="$t('chat.input.unConnectedLabel')">
                <div class="input-group-append">
                    <button class="msg-send-button" type="button" @click="sendMsg">{{$t('chat.btn.send')}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import {neEvents} from "../js/neEvents";

  //todo: not for main testnet!
  // import nkn from "nkn-client"
  import NeChatAddressList from "./neChatAddressList";

  const CLIENT_STATE = {
    INIT: 0,
    CONNECTING: 1,
    CONNECTED: 2,
  }

  export default {
    components: {NeChatAddressList},
    name: "ne-chat-client-panel",
    props: ['clientIdx', 'eventFactory'],
    data() {
      return {
        nknAddress: "",
        toAddress: "",
        toAddressInputFocused: false,
        addresses:[],
        chatTextList: [],
        nknClient: null,
        clientState: CLIENT_STATE.INIT,
        userName: "",
        userhead: "",
        addressSelectedEventHandler: null,
        addressShownEventHandler: null,
        addressEventFactory: null,
        addressShownEventFactory: null

      }
    },
    created() {
      let addressSelectedEventNamespace = this.eventFactory.namespace + "." + this.clientIdx
      this.addressEventFactory = neEvents.factory(addressSelectedEventNamespace, this.$BEEventBus.eventType.UNICAST)
      this.addressShownEventFactory = neEvents.factory(this.eventFactory.namespace, this.$BEEventBus.eventType.MULTICAST)

      this.addressSelectedEventHandler = this.$BEEventBus.bus.registerEventHandler(
        neEvents.USE_CASE_CHAT_NKN_ADDRESS_SELECTED,
        function (address) {
            this.toAddress = address
        },
        this, addressSelectedEventNamespace
      )

      this.addressShownEventHandler = this.$BEEventBus.bus.registerEventHandler(
        neEvents.USE_CASE_CHAT_NKN_NEW_ADDRESS_SHOWN,
        function (address) {
          if(address !== this.nknAddress) {
            this.addAddressToList(address)
          }
        },
        this, this.eventFactory.namespace
      )
    },
    destroyed() {
      this.$BEEventBus.bus.deregisterEventHandler(this.addressSelectedEventHandler)
      this.$BEEventBus.bus.deregisterEventHandler(this.addressShownEventHandler)
    },
    computed: {
      showAddressList() {
        return this.toAddressInputFocused && this.connected && 0 !== this.addresses.length
      },
      showLogin() {
        return CLIENT_STATE.INIT === this.clientState
      },
      connected() {
        return CLIENT_STATE.CONNECTED === this.clientState
      }
    },
    methods: {
      login() {
        this.clientState = CLIENT_STATE.CONNECTING
        this.userName = this.userName.trim()
        if("" === this.userName) {
          this.userName = this.clientIdx
        }
        this.userhead = this.userName.substr(0, 1)
        let clientName = this.userName

        this.nknClient = nkn({
          identifier: clientName,
          seedRpcServerAddr: testnetConfig.nknNode,
        })


        this.nknClient.on('connect', () => {
          this.nknAddress = this.nknClient.addr

          this.$BEEventBus.bus.post(
            this.addressShownEventFactory.newEvent(neEvents.USE_CASE_CHAT_NKN_NEW_ADDRESS_SHOWN, this.nknAddress)
          )

          this.clientState = CLIENT_STATE.CONNECTED
          this.chatTextList.push({
            fromFriend: false,
            nickname: this.userhead,
            text: this.$t('chat.chatText') + this.nknClient.addr
          })
        })

        this.nknClient.on('simpleFile', (src, payload) => {

          let $img = $('<img/>')

          $('body').append($img)

          $img.get(0).src = window.URL.createObjectURL(payload)
        })

        this.nknClient.on('message', (src, payload) => {
          this.addAddressToList(src)
          let nickname = src.substr(0, 1)
          this.chatTextList.push({
            fromFriend: true,
            nickname: nickname,
            text: payload,
            address: src
          })
        })
      },
      sendMsg() {
        let toAddress = this.toAddress.trim()
        if(!this.connected) {
          return
        }

        if(!toAddress) {

          let $this = $(this.$el)
          let $addrInput = $this.find(".to-address")

          $addrInput.tooltip("show")

          return
        }

        let $this = $(this.$el)
        let $input = $this.find('.msg-input')

        let msg = $input.val().trim()

        if("" === msg) {
          $input.val("")
          return
        }

        this.nknClient.send(toAddress, msg)
        $input.val("")
        this.toAddress = ""

        this.chatTextList.push({
          fromFriend: false,
          nickname: this.userhead,
          text: msg
        })
      },
      addAddressToList(address) {
        let isNewAddr = true
        for(let i=0; i<this.addresses.length; i++) {
          if(address === this.addresses[i]) {
            isNewAddr = false
            break
          }
        }

        if(isNewAddr) {
          this.addresses.push(address)
        }
      },
      clearAddress() {
        this.toAddress = ""
      },
      toAddressFocused() {
        this.toAddressInputFocused = true
        let $this = $(this.$el)
        let $addrInput = $this.find(".to-address")
        $addrInput.tooltip("hide")
      },
      toAddressBlured() {
        let _this = this
        setTimeout(function () {
          _this.toAddressInputFocused = false
        }, 100)

        let $this = $(this.$el)
        let $addrInput = $this.find(".to-address")
        $addrInput.tooltip("hide")
      },
      replyTo(address) {
        if(address) {
          this.toAddress = address
        }
      }
    },
    watch: {
      chatTextList() {
        let $this = $(this.$el)
        let $dlgPanel = $this.find(".chat-dlg-area")

        this.$nextTick(function () {
          $dlgPanel.scrollTop($dlgPanel.prop('scrollHeight') - $dlgPanel.outerHeight())
        })
      }
    }
  }
</script>

<style scoped>

    .chat-client-panel {
        position: relative;
        width: 650px;
        height: 600px;
        margin-bottom: 4px;
        background: #ffffff;
    }

    .chat-client-panel  .chat-login-panel .chat-title {
        width: 100%;
        height: 60px;
        line-height: 60px;
        margin-top: 105px;
        font-size: 0;
        text-align: center;
    }

    .chat-client-panel .chat-login-panel .chat-title .chat-title-img {
        height: 60px;
    }

    .chat-client-panel .chat-login-panel .chat-login-desc {
        margin-top: 30px;
        width: 100%;
        font-size: 14px;
        line-height: 14px;
        color: #5693ed;
        text-align: center;
    }

    .chat-client-panel .chat-login-panel .chat-login-desc .desc-line {
        width: 100%;
        margin-bottom: 8px;
    }

    .chat-client-panel .chat-login-panel .chat-login-desc .desc-line:last-child {
        margin-bottom: 0;
    }

    .chat-client-panel .chat-login-panel .username-input {
        margin-top: 66px;
        width: 100%;
        height: 60px;
        line-height: 60px;
    }

    .chat-client-panel .chat-login-panel .username-input > input {
        display: block;
        width: 375px;
        padding-left: 6px;
        margin: 0 auto;
        font-size: 18px;
        color: #5693ed;
        border: 0;
        border-bottom: 1px solid #5693ed;
        font-weight: 300;
    }

    .chat-client-panel .chat-login-panel .username-input > input::placeholder {
        color: #d7e5fa;
        font-weight: 400;
    }

    .chat-client-panel .chat-login-panel .username-input > input:focus {
        outline: none;
    }

    .chat-client-panel .chat-login-panel .login-button {
        width: 100%;
        margin-top: 50px;
    }

    .chat-client-panel .chat-login-panel .login-button > div {
        width: 323px;
        height: 70px;
        margin: 0 auto;
        font-size: 24px;
        line-height: 70px;
        text-align: center;
        color: #ffffff;
        background-color: #5693ed;
        border-radius: 35px;
        cursor: pointer;
        user-select: none;
        transition: box-shadow 0.3s, transform 0.3s;
    }

    .chat-client-panel .chat-login-panel .login-button  > div:hover {
        transition: box-shadow 0.2s, transform 0.2s;
        box-shadow: 0 4px 20px 0 rgba(86, 147, 237, 0.8);
    }

    .chat-client-panel .chat-login-panel .login-button  > div:active {
        transition: box-shadow 0.2s, transform 0.2s;
        box-shadow: 0 4px 5px 0 rgba(86, 147, 237, 0.2)
    }

    .chat-client-panel.chat-client-b .chat-login-panel .login-button > div {
        background-color: #7a93d4;
    }

    .chat-client-panel.chat-client-b .chat-login-panel .login-button  > div:hover {
        transition: box-shadow 0.2s, transform 0.2s;
        box-shadow: 0 4px 20px 0 rgba(122, 147, 212, 0.8);
    }

    .chat-client-panel.chat-client-b .chat-login-panel .login-button  > div:active {
        transition: box-shadow 0.2s, transform 0.2s;
        box-shadow: 0 4px 5px 0 rgba(122, 147, 212, 0.2)
    }

    .chat-client-panel .chat-dlg .chat-dlg-title {
        width: 100%;
        height: 55px;
        line-height: 55px;
        text-align: center;
        border-bottom: 1px solid #f0f0f0;
    }

    .chat-client-panel .chat-dlg .chat-dlg-title .title-waiting {
        width: 100%;
        font-size: 18px;
        color: #989898;
        background-color: #f0f0f0;
    }

    .chat-client-panel .chat-dlg .chat-dlg-title .title-connected {
        font-size: 24px;
        background-color: #ffffff;
        color: #000000;
    }

    .to-address {
        height: 50px;
        font-size: 12px;
        border-top: 1px solid #d8d8d8;
    }

    .to-address-show {
        visibility: visible;
    }

    .to-address-hide {
        visibility: hidden;
    }

    .to-address .to-address-title > span {
        border-radius: 0;
        border: 0;
        background: #f5f5f5;
        font-size: 12px;
    }

    .to-address .to-address-input {
        border-radius: 0;
        border: 0;
        background: #f5f5f5;
        font-size: 12px;
    }

    .to-address .to-address-input:focus,
    .to-address .to-address-input:active {
        box-shadow: none;
        outline: 0 none;
    }

    .to-address .to-address-clear > span {
        border-radius: 0;
        border: 0;
        background: #f5f5f5;
        width: 60px;

    }

    .to-address .to-address-clear > span > img {
        width: 20px;
        cursor: pointer;
    }

    .chat-address-list {
        position: absolute;
        top: 105px;
        left: 30px;
        z-index: 1000;
        background-color: #ffffff;
    }

    .chat-client-panel .chat-dlg .chat-dlg-area {
        width: 100%;
        height: 440px;
        border-bottom: 1px solid #f0f0f0;
        overflow-y: scroll;
    }

    .chat-client-panel .chat-dlg .chat-dlg-input {
        height: 55px;
    }

    .chat-client-panel .chat-dlg .chat-dlg-input .msg-input {
        height: 100%;
        font-size: 14px;
        color: #989898;
        border: 0;
        border-radius: 0;
    }

    .chat-client-panel .chat-dlg .chat-dlg-input .msg-input::placeholder {
        color: #989898;
    }

    .chat-client-panel .chat-dlg .chat-dlg-input .msg-input:focus {
        box-shadow: none;
        outline: 0 none;
    }

    .chat-client-panel .chat-dlg .chat-dlg-input .msg-send-button {
        height: 55px;
        width: 102px;
        font-size: 14px;
        color: #fff;
        background: #5693ed;
        border: 0;
        border-radius: 0;
    }

    .chat-client-panel .chat-dlg .chat-dlg-input .msg-send-button:focus,
    .chat-client-panel .chat-dlg .chat-dlg-input .msg-send-button:active {
        box-shadow: none;
        outline: 0 none;
    }

    .chat-client-panel .chat-dlg .chat-dlg-input .msg-send-button:active {
        background: rgba(86, 147, 237, 0.8);
    }

    .msg-box-row {
        margin: 20px 0;
        position: relative;
        width: 100%;
        padding: 0 20px;
        font-weight: 300;
    }

    .msg-box-row .friend-msg-address {
        display: block;
        max-width: 200px;
        padding-bottom: 10px;
        font-size: 16px;
        white-space:nowrap;
        word-break: keep-all;
        overflow: hidden;
        text-overflow: ellipsis;
        text-decoration: underline;
    }

    .msg-box-row .friend-msg-address:hover {
        font-weight: bolder;
    }


    .msg-box-row .friend-row.row-head {
        float: right;
        font-size: 24px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 50%;
        background-color: #ff8747;
        color: #ffffff;
        opacity: 1;
        text-align: center;
        transition: opacity 0.2s;
        cursor: pointer;
    }

    .msg-box-row .friend-row.row-head:hover {
        opacity: 0.9;
        transition: opacity 0.2s;
    }

    .msg-box-row .friend-row.row-head:active {
        opacity: 0.8;
        transition: opacity 0.2s;
    }

    .msg-box-row .friend-row.row-text {
        float: right;
        max-width: 360px;
        margin-right: 20px;
        padding: 20px;
        background: #5693ed;
        border-radius: 10px;
        color: #ffffff;
    }

    .msg-box-row .row-head {
        float: left;
        font-size: 24px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 50%;
        background-color: #00aafe;
        color: #ffffff;
        text-align: center;
    }

    .msg-box-row .row-text {
        float: left;
        max-width: 360px;
        margin-left: 20px;
        padding: 20px;
        background: #f4f5f9;
        font-size: 14px;
        border-radius: 10px;
        color: #333333;
        word-wrap: break-word;
    }

    .msg-box-row:after {
        content: ' ';
        display: block;
        width: 0;
        height: 0;
        clear: both;
    }
</style>


<style scoped>
    @media screen and (max-width: 768px) {
        .chat-client-panel {
            width: 100%;
            height: 420px;
            margin-bottom: 20px;
        }

        .chat-client-panel  .chat-login-panel {
            padding: 0 20px;
        }

        .chat-client-panel  .chat-login-panel .chat-title {
            margin-top: 45px;
            /*padding: 0;*/
        }

        .chat-client-panel .chat-login-panel .chat-title .chat-title-img {
            height: 40px;
        }


        .chat-client-panel .chat-login-panel .username-input > input {
            width: 100%;
        }

        .chat-client-panel .chat-login-panel .chat-login-desc {
            width: 100%;
            font-size: 12px;
            text-align: center;
        }

        .chat-client-panel .chat-login-panel .login-button > div {
            width: 80%;
            height: 50px;
            margin: 0 auto;
            font-size: 16px;
            line-height: 50px;
            background-color: #5693ed;
            border-radius: 25px;
        }

        .chat-client-panel .chat-dlg .chat-dlg-area {
            width: 100%;
            height: 260px;
        }

        .msg-box-row {
            margin: 10px 0;
            padding: 0 10px;
        }

        .msg-box-row .friend-row.row-text,
        .msg-box-row .row-text {
            max-width: 260px;
            margin-left: 10px;
            padding: 10px;
            font-size: 12px;
            border-radius: 4px;
        }

        .msg-box-row .row-head {
            font-size: 16px;
            width: 30px;
            height: 30px;
            line-height: 30px;
        }

        .msg-box-row .friend-row.row-head {
            font-size: 16px;
            width: 30px;
            height: 30px;
            line-height: 30px;
        }

    }
</style>
