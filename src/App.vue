<template>
  <div id="app">
    <ne-navbar/>
    <div id="nkn-explorer-page">
      <ne-chat-based-on-nkn/>
    </div>
    <div id="nkn-explorer-page-footer">
      <div class="nkn-explorer-copyright">{{$t("footer.copyright")}}</div>
      <div class="nkn-explorer-attention">{{$t("footer.attention")}}</div>
    </div>
  </div>
</template>

<script>
  import NeChatBasedOnNkn from "./views/neChatBasedOnNKN";
  import NeNavbar from "./components/neNavbar";

  export default {
    components: {
      NeNavbar,
      NeChatBasedOnNkn},
  }
</script>
<style>
  html {
    min-width: 1440px;
  }

  body {
    width: 100%;
    margin: 0 auto;
    background: #f7f7f7;
  }

  #nkn-explorer-page {
    width: 1440px !important;
    padding: 0 60px !important;
    margin: 0 auto;
  }

  #nkn-explorer-page > .nkn-explorer-page-cointainer {
    width: 100%;
  }

  .nkn-explorer-card-shadow {
    box-shadow: rgba(0, 0, 0, 0.12) 0 2px 6px, rgba(0, 0, 0, 0.24) 0 1px 2px;
  }

  .nkn-after-clear::after {
    width: 0;
    height: 0;
    content: ' ';
    visibility: hidden;
    display: block;
    clear: both;
  }

  #nkn-explorer-page-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 80px;
    width: 100%;
    margin-bottom: 0;
    background: #ffffff;
    line-height: 80px;
    text-align: center;
    border-top: 1px solid #eeeeee;
  }

  #nkn-explorer-page-footer .nkn-explorer-copyright {
    color: #aaaaaa;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    font-weight: 100;
  }

  #nkn-explorer-page-footer .nkn-explorer-attention {
    color: #aaaaaa;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 20px;
    font-size: 12px;
    font-weight: 100;
  }
</style>

<style>
  @media screen and (max-width: 768px) {
    html {
      min-width: auto;
    }

    body {
      padding-top: 70px;
    }

    #nkn-explorer-page {
      width: 100% !important;
      padding: 0 10px !important;
      margin-bottom: 40px;
    }

    #nkn-explorer-page-footer {
      height: 60px;
      width: 100%;
    }

    #nkn-explorer-page-footer .nkn-explorer-copyright {
      color: #aaaaaa;
      bottom: 0;
      left: 0;
      /*right: 0;*/
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      font-weight: 100;
    }
  }
</style>
