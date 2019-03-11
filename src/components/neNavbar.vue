<template>
    <nav class="nkn-explorer-nav">
        <div class="nkn-explorer-nav-bar">
            <div class="nkn-explorer-nav-logo">
                <img src="../assets/img/logo.png"/>
                <span>NKN-dChat</span>
            </div>

            <div class="lang-select-panel">
                <a class="nkn-explorer-nav-link"
                   id="nkn-explorer-nav-lang-zh" @click="changeLanguage('zh')">中文</a>

                <a class="nkn-explorer-nav-link"
                   id="nkn-explorer-nav-lang-en" @click="changeLanguage('en')">English</a>
            </div>
        </div>
    </nav>
</template>

<script>
  import {neNamespace} from "../js/neNamespace"
  import localstore from "../js/neLocalStorage"

  export default {
    name: "ne-navbar",
    data() {
      return {
        allNamespace: neNamespace,
        searchInput: ""
      }
    },
    mounted() {
      let $this = $(this.$el)
      $this.find('.nkn-explorer-nav-link-selected').removeClass('nkn-explorer-nav-link-selected')
      let lang = localstore.getLang('en')
      this.changeLanguage(lang)
    },
    methods: {
      changeLanguage(lang) {
        // if(this.$i18n.locale === lang) return
        let $this = $(this.$el)
        $this.find('.nkn-explorer-nav-link-selected').removeClass('nkn-explorer-nav-link-selected')
        $(`#nkn-explorer-nav-lang-${lang}`).addClass('nkn-explorer-nav-link-selected')

        this.$i18n.locale = lang
        localstore.setLang(lang)
      },
    },
  }
</script>

<style scoped>
    .nkn-explorer-nav {
        height: 60px;
        width: 100%;
        margin-bottom: 20px;
        background: #ffffff;
        line-height: 60px;
        font-size: 0;
        box-shadow: rgba(0, 0, 0, 0.12) 0 2px 6px, rgba(0, 0, 0, 0.24) 0 1px 2px;
    }

    .nkn-explorer-nav-bar {
        height: 60px;
        width: 1320px;
        margin: 0 auto;
    }

    .nkn-explorer-nav-logo {
        float: left;
        clear: none;
        font-size: 14px;
    }

    .nkn-explorer-nav-logo > img {
        width: 35px;
    }

    .nkn-explorer-nav-logo > span {
        display: inline-block;
        margin-left: 14px;
        color: #6a9dec;
    }

    .lang-select-panel {
        float: right;
        position: relative;
    }

    a.nkn-explorer-nav-link {
        float: left;
        height: 60px;
        padding: 0 40px;
        font-size: 16px;
        color: #000;
        cursor: pointer;
    }

    a.nkn-explorer-nav-link:hover,
    a.nkn-explorer-nav-link-selected{
        color: #5693ed !important;
        border-bottom: 4px solid #5693ed;
        transition: all 0.2s;
    }

    a.nkn-explorer-nav-link:hover {
        border-bottom:0 !important;
    }

    a.nkn-explorer-nav-link.nkn-explorer-nav-link-selected:hover {
        border-bottom: 4px solid #5693ed !important;
    }

</style>

<style scoped>
    @media screen and (max-width: 768px) {
        .nkn-explorer-nav {
            position: fixed;
            top: 0;
            left: 0;
            height: 48px;
            line-height: 48px;
            z-index: 20000;
        }

        .nkn-explorer-nav-bar {
            height: 48px;
            width: 100%;
            margin: 0 auto;
        }

        .nkn-explorer-nav-logo {
            padding-left: 20px;
        }

        .nkn-explorer-nav-logo > img {
            width: 25px;
        }

        .lang-select-panel {
            padding-right: 20px;
        }

        a.nkn-explorer-nav-link {
            padding: 0 10px;
            font-size: 12px;
            cursor: pointer;
            height: 48px;
        }
    }
</style>
