<template>
    <div class="chat-address-list nkn-explorer-card-shadow">
        <div v-for="(address, idx) in this.addresses"
             class="chat-address-item"
             :key="idx"
             @click="addressSelect(idx)"
        >
            <span>{{address}}</span>
        </div>
    </div>
</template>

<script>
  import {neEvents} from "../js/neEvents";

  export default {
    name: "ne-chat-address-list",
    props: ["addresses", "eventFactory"],
    methods: {
      addressSelect(idx) {
        this.$BEEventBus.bus.post(
          this.eventFactory.newEvent(neEvents.USE_CASE_CHAT_NKN_ADDRESS_SELECTED, this.addresses[idx])
            )
      }
    }
  }
</script>

<style scoped>
    .chat-address-list {
        margin: 0 auto;
        width: 580px;
        max-height: 136px;
        border-top: 1px solid #e6e6e6;
        overflow-y: scroll;
    }

    .chat-address-list > .chat-address-item {
        width: 100%;
        height: 45px;
        padding: 0 20px;
        color: #8c8c8c;
        border-bottom: 1px solid #e6e6e6;
        line-height: 45px;
        transition: background-color 0.3s;
        cursor: pointer;
    }

    .chat-address-list > .chat-address-item > span {
        display: inline-block;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        overflow: hidden;
    }

    .chat-address-list > .chat-address-item:hover {
        background: #e6e6e6;
        transition: background-color 0.3s;
    }
</style>

<style scoped>
    @media screen and (max-width: 768px) {
        .chat-address-list {
            width: 300px;
            overflow-y: hidden;
        }
    }
</style>