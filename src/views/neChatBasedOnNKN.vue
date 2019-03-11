<template>
    <div class="nkn-explorer-page-use-case-chat-based-on-nkn">
        <!--<ne-internet-topology-->
                <!--class="chat-map"-->
                <!--:plots="this.$store.state.usecase_chat.plots"-->
                <!--:plots-name-list="this.$store.state.usecase_chat.plotsName"-->
                <!--:client-plots="clientNames"-->
                <!--:relay-path="relayToShow"/>-->

        <!-- chat panel -->
        <div class="chat-area">
            <ne-chat-client-panel class="client-window-a"
                                  :event-factory="eventFactory"
                                  :client-idx="'A'" />

            <ne-chat-client-panel class="client-window-b"
                                  :event-factory="eventFactory"
                                  :client-idx="'B'"/>
        </div>
    </div>
</template>

<script>
  import {neEvents} from "../js/neEvents";
  import {neNamespace} from "../js/neNamespace";
  import NeChatClientPanel from "../components/neChatClientPanel";

  function NKNMessageRecv(fromClient) {
    let baseRelay = this.$store.state.usecase_chat.relayPath
    let newRelay = []

    if('A' === fromClient) {
      this.clientNames = [this.$store.state.usecase_chat.clientPlotsName[0],this.$store.state.usecase_chat.clientPlotsName[1]]
      for(let i=0; i<baseRelay.length; i++) {
        newRelay.unshift(baseRelay[i])
      }
    } else {
      this.clientNames = [this.$store.state.usecase_chat.clientPlotsName[1],this.$store.state.usecase_chat.clientPlotsName[0]]
      for(let i=0; i<baseRelay.length; i++) {
        newRelay.unshift(baseRelay[baseRelay.length - i - 1])
      }
    }

    this.relayToShow = newRelay
  }

  export default {
    components: {
      NeChatClientPanel,
    },

    name: "ne-chat-based-on-nkn",
    data() {
      return {
        namespace: neNamespace.USECASE.CHAT,
        eventFactory: null,

        clientName: "client",
        clientAConnected: false,
        clientBConnected: false,

        relayToShow: [],
        clientNames: [],
      }
    },
    computed: {
      relayPath() {
        return  this.$store.state.usecase_chat.relayPath
      }
    },
    created() {
      this.eventFactory = new neEvents.factory(this.namespace, this.$BEEventBus.eventType.UNICAST)

      this.$BEEventBus.bus.registerEventHandler(
        neEvents.USE_CASE_CHAT_NKN_MSG,
        NKNMessageRecv,
        this,
        this.namespace
      )
    },
    mounted() {

    }
  }
</script>

<style scoped>
    .chat-map {
        margin-bottom: 20px !important;
    }

    .chat-area:after {
        content: ' ';
        display: block;
        width: 0;
        height: 0;
        margin-bottom: 50px;
        clear: both;
    }

    .client-window-a {
        float: left;
    }

    .client-window-b {
        float: right;
    }

</style>
