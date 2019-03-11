'use strict'
const merge = require('webpack-merge')
const base = require('./base')

module.exports = merge(base, {
  header: {
    langSel: '语言',
    title: 'NKN 测试网',
    navHome: '主页',
    navBlocks: '区块',
    navTransactions: '交易',
    navSignchain: '签名链',
    navWallet: '钱包',
    searchLabel: '区块高度 / 交易哈希 / 地址'
  },
  footer: {
    copyright: 'Copyright © 2017-2019 NKN | 版权所有',
    attention: '该Web应用仅用于NKN测试'
  },
  network: {
    title: {
      rank: '排名',
      country: '国家',
      nodes: '节点数',
    },
    totalCount: '当前NKN总节点数：',
    updatetime: '更新时间：{updatetime}',
  },
  node: {
    title: '节点 {ip} 信息概览：',
    version: '版本：<span>{version}</span>',
    syncStatus: '状态：<span>{status}</span>',
    blockHeight: '节点区块高度：<span>{height}</span>',
    relayCount: '传输消息计数：<span>{relayCount}</span>',
    error: '从您的节点 <span>{ip}</span> 获取信息失败。您的节点或许没有正常运行。',

    nodeStatus:{
      syncing: '同步中',
      persisting: '同步完成',
      mining: '挖矿中'
    },
  },
  blocks: {
    table: {
      title: '区块',
      col1: '区块高度',
      col2: '创建时间',
      col3: '交易数量',
      col4: '矿工地址',
      col5: '大小'
    }
  },
  transactions: {
    table: {
      title: '交易',
      col1: '类型',
      col2: '哈希',
      col3: '区块高度',
      col4: '时间'
    }
  },
  sigChain: {
    panel: {
      title: '最新的奖励签名链',
      table: {
        col1: '交易哈希',
        col2: '区块高度',
        col3: '创建时间'
      }
    },
    table: {
      title: '签名链',
      col1: '类型',
      col2: '交易哈希',
      col3: '区块高度',
      col4: '创建时间'
    }
  },
  wallet: {
    create: {
      title: '创建钱包',
      input:  {
        name: '名称',
        namePH: '请输入8-20个字符作为钱包名称，默认为我的钱包',
        pass: '密码',
        passPH: '请输入8-20位密码',
        passErr: '您输入的密码有误！',
        confirmPass: '请再次输入密码',
        confirmPassPH: '请输入至少8位字符密码',
        confirmPassErr: '两次输入的密码不一致！'
      },
      btn: {
        create: '创建',
        open: '打开钱包',
        restore: '用私钥还原钱包'
      }
    },
    open: {
      title: '打开钱包',
      input: {
        file: '上传文件',
        filePH: '请选择要上传的钱包文件',
        fileErr: '请选择要上传的钱包文件！',
        pass: '密码',
        passPH: '请输入对应的钱包密码！'
      },
      btn: {
        create: '创建钱包',
        open: '打开',
        restore: '用私钥还原钱包'
      }
    },
    restore: {
      title: '还原钱包',
      input: {
        name: '名称',
        namePH: '请输入8-20个字符作为钱包名称，默认为我的钱包',
        pkey: '私钥',
        pkeyPH: '请输入钱包私钥',
        pkeyErr: '您输入的私钥有误！',
        pass: '密码',
        passPH: '请输入8-20位密码',
        passErr: '您输入的密码有误！',
        confirmPass: '请再次输入密码',
        confirmPassPH: '请输入8-20位密码',
        cpErr: '两次输入的密码不一致！'
      },
      btn: {
        create: '创建钱包',
        open: '打开钱包',
        restore: '还原'
      }
    },
    show: {
      title: '请保存私钥并下载钱包',
      note: '注意：请妥善保管您的私钥，任何拥有该私钥的用户都可以还原该钱包！',
      ypk: '钱包私钥',
      yaddress: '钱包地址',
      btn: {
        ok: '知道了',
        download: '下载'
      }
    },
    main: {
      walletBlock: {
        title: 'NKN 网络钱包',
        address: '地址：',
        copy: '复制',
        blance: '余额：',
        loading: '查询中 ... ',
        btn: {
          close: '关闭',
          download: '下载',
          showpk: '查看私钥',
          transfer: '转账'
        }
      },
      recordBlock: {
        title: '转账记录',
        refresh: '刷新',
        loading: '加载中 ... ',
        table: {
          col1: '区块高度',
          col2: '转账地址',
          col3: '目标地址',
          col4: '转账数量',
          col5: '转账时间'
        }
      },
      transferDialog: {
        input: {
          to: '目标地址',
          toPH: '请输入想要转账的目标地址',
          toErr: '您输入的地址有误！',
          amount: '转账数量',
          amountPH: '请输入转账数量',
          amountErr: '您没有足够的余额进行交易！',
          pass: '钱包密码',
          passPH: '请输入您的钱包密码',
          passErr: '您输入的密码有误！'
        },
        btn: {
          cancel: '取消',
          transfer: '转账'
        },
        success: '转账成功！请等待区块确认。'
      },
      pkDialog: {
        input: {
          pass: '查看您的钱包私钥',
          passPH: '请输入您的钱包密码',
          ifshow: '您的钱包私钥如下'
        },
        btn: {
          cancel: '取消',
          show: '查看'
        }
      }
    }
  },
  detail: {
    address: {
      header: '地址',
      content: {
        header: '交易哈希及挖矿记录：',
        summary: {
          block: '区块高度',
          transaction: '交易哈希',
          time: '时间'
        },
        detail: {
          addrnull: '挖矿奖励',
          addrnotnull: '',
          to: '发送至'
        }
      },
      page: '页数',
      err: '没有找到地址为 {i} 的地址'
    },
    block: {
      header: '区块信息',
      content: {
        summary1: {
          height: '高度',
          size: '大小',
          time: '时间',
          miner: '矿工地址'
        },
        summary2: {
          hash: '交易哈希：',
          txroot: '交易源：',
        },
        txdetail: {
          header:'交易在当前区块上',
          typeSuffix: '交易哈希：',
          miningSuffix: '奖励发送至',
          transferDesc: '转账数量为 {i} NKN  来自于',
          sigChain: {
            sent: '客户端地址 {i} 发送的数据',
            relay: '节点地址 {i} 转发的数据',
            receive: '客户端地址 {i} 接收的数据'
          }
        }
      },
      err: '没有找到对应区块高度的信息'
    },
    transactions: {
      header: '交易哈希详情',
      content: {
        typeSuffix: '交易哈希：',
        summary: {
          height: '高度',
          time: '时间'
        },
        mining: '奖励发送至',
        transfer: '转账数量为 {i} NKN  来自于',
        sigChain: {
          sent: '客户端地址 {i} 发送的数据',
          relay: '节点地址 {i} 转发的数据',
          receive: '客户端地址 {i} 接收的数据'
        }
      },
      notfound: '没有找到该交易哈希 {i} '
    }
  },
  txTypeNames: {
    x00: '挖矿奖励',
    x01: '转账支付',
    x10: '转账',
    x11: '资产清册',
    x12: '资产发行',
    x40: '预付',
    x42: '签名链'
  },
  chat: {
    descLine1: '你可以在两个界面上建立联系',
    descLine2: '并查看发送和接受的信息。',
    dialog: {
      titleConnecting: '连接中 ...',
      to: '发送给：',
      from: '信息来自于：'
    },
    input: {
      usernamePH: '请输入您的用户名',
      connectedPH: '输入一条信息 ...',
      connectedLabel: '输入一条信息 ...',
      unConnectedPH: '等待中 ...',
      unConnectedLabel: '等待中 ...'
    },
    btn: {
      connect: '连 接',
      send: '发 送'
    },
    chatText: '您的 NKN 地址是： '
  },
  topology: {
    title: '网络拓扑图'
  },
  index: {
    blockTable: {
      title: '区块',
      view: '查看全部',
      th: {
        col1: '高度',
        col2: '创建时间',
        col3: '交易哈希'
      }
    },
    dhtTopology: {
      title: 'DHT 映射拓扑图',
      nodeType: {
        offline: '离线客户端',
        online: '在线客户端',
        relay: '转发节点',
        relayp: '转发进程'
      },
    },
    marketPanel: {
      title: '市场',
      change: '24小时 浮动',
      vol: '24小时 交易量',
      cap: '市场总值',
      lastUpdate: '最近一次更新：{i} 之前'
    }
  },
  imageTransfer: {
    unLoadedWallet: {
      title: '你需要上传一个钱包来支付传输费用',
      input: {
        walletPH: '请选择您要上传的钱包文件',
        walletPassPH: '请输入您上传钱包的密码',
        walletPassLabel: '钱包密码'
      },
      btn: {
        upload: '上传钱包',
        unlock: '解锁'
      },
      err: {
        walletFileNull: '请选择一个钱包！',
        walletFileWrong: '您上传的钱包不是一个NKN钱包！',
        walletFileInvalid: '您输入的钱包密码有误！'
      }
    },
    transferPanel: {
      copyBtn: '复制',
      balance: {
        wallet: {
          title: '钱包余额'
        },
        perpay: {
          title: '预付余额',
          setting: '预付设置'
        }
      },
      input: {
        imagefilePH: '请选择您要传输的文件',
        targetPH: '请输入目标客户端地址',
        targetLabel: '客户端地址',
        filePH: '请选择您要传输的文件'
      },
      btn: {
        transfer: '传输'
      },
      err: {
        query: '查询预付余额失败！请重新上传钱包！',
        sync: '同步钱包数据失败！请检查您的网络！',
        load: '加载钱包文件失败！',
        size: '上传文件的大小不能超过5MB！',
        prepayBalance: '请补足您的预付款余额！',
        address: '请输入NKN客户端地址！',
        emptyFile: '请先选择一个文件！',
        timeout: '文件传输超时！',
        inputInvalid: '您输入的数字有误！'
      }
    },
    received: {
      title: '已接收到的文件',
      empty: '目前没有接收到任何文件。'
    },
    payList: {
      title: 'NKN链上文件传输的最近10次支付记录',
      table: {
        col1: '区块高度',
        col2: '交易哈希',
        col3: '传输地址',
        col4: '目标地址',
        col5: '数量'
      }
    },
    recharge: {
      title: '增加您的预付款',
      body: {
        labelAmount: '数量：',
        labelRates: '费率：'
      },
      footer: {
        btnClose: '关闭',
        btnPay: '支付'
      }
    },
    recharging: {
      title: '补足中',
      body: '等待区块确认 ...',
      footer: {
        btnOK: '知道了'
      }
    },
    over: {
      title: '传输结束',
      body: '文件传输成功！',
      footer: {
        btnOk: '知道了'
      }
    }
  }
})
