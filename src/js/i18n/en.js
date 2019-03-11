'use strict'
const merge = require('webpack-merge')
const base = require('./base')

module.exports = merge(base, {
  header: {
    langSel: 'Language',
    title: 'NKN.testnet',
    navHome: 'HOME',
    navBlocks: 'BLOCKS',
    navTransactions: 'TRANSACTIONS',
    navSignchain: 'SIGCHAIN',
    navWallet: 'WALLET',
    searchLabel: 'Block Height / Tx Hash / Address'
  },
  footer: {
    copyright: 'Copyright © 2017-2019 NKN | All rights reserved',
    attention: 'This web app is for NKN testing purposes only.'
  },
  network: {
    title: {
      rank: 'RANK',
      country: 'COUNTRY',
      nodes: 'NODES',
    },
    totalCount: 'Full nodes in NKN: ',
    updatetime: 'Update time: {updatetime}',
  },
  node: {
    title: 'Node {ip} summary: ',
    version: 'Version: <span>{version}</span>',
    syncStatus: 'Status: <span>{status}</span>',
    blockHeight: 'Node block height: <span>{height}</span>',
    relayCount: 'Message relayed by node: <span>{relayCount}</span>',
    error: 'Get state from your node <span>{ip}</span> failed. Maybe your node is not working properly.',

    nodeStatus:{
      syncing: 'syncing',
      persisting: 'persisting',
      mining: 'mining'
    },
  },
  blocks: {
    table: {
      title: 'BLOCKS',
      col1: 'Block Height',
      col2: 'Created',
      col3: 'Transactions',
      col4: 'Miner',
      col5: 'Size'
    }
  },
  transactions: {
    table: {
      title: 'TRANSACTIONS',
      col1: 'Type',
      col2: 'Transaction Hash',
      col3: 'Height',
      col4: 'Created'
    }
  },
  sigChain: {
    panel: {
      title: 'Latest Rewarded Signature Chain',
      table: {
        col1: 'Transaction Hash',
        col2: 'Height',
        col3: 'Created'
      }
    },
    table: {
      title: 'SIGNATURE CHAIN',
      col1: 'Type',
      col2: 'Transaction Hash',
      col3: 'Height',
      col4: 'Created'
    }
  },
  wallet: {
    create: {
      title: 'CREATE A NEW WALLET',
      input:  {
        name: 'WALLET NAME',
        namePH: '8-20 characters, default to MyWallet',
        pass: 'PASSWORD',
        passPH: '8-20 characters',
        passErr: 'Password requires at least 8 characters',
        confirmPass: 'CONFIRM YOUR PASSWORD',
        confirmPassPH: '8-20 characters',
        confirmPassErr: 'The two passwords you entered are not equal'
      },
      btn: {
        create: 'CREATE',
        open: 'Open wallet',
        restore: 'Restore from private key'
      }
    },
    open: {
      title: 'OPEN WALLET',
      input: {
        file: 'Select file',
        filePH: 'Wallet file to open',
        fileErr: 'please select a wallet file',
        pass: 'Wallet password',
        passPH: 'Password of the wallet to open'
      },
      btn: {
        create: 'Create wallet',
        open: 'OPEN',
        restore: 'Restore from private key'
      }
    },
    restore: {
      title: 'RESTORE WALLET',
      input: {
        name: 'WALLET NAME',
        namePH: '8-20 characters, default to MyWallet',
        pkey: 'PRIVATE KEY',
        pkeyPH: 'Your private key',
        pkeyErr: 'invalid private key',
        pass: 'PASSWORD',
        passPH: '8-20 characters',
        passErr: 'The two passwords you entered are not equal',
        confirmPass: 'CONFIRM YOUR PASSWORD',
        confirmPassPH: '8-20 characters',
        cpErr: 'Password requires at least 8 characters'
      },
      btn: {
        create: 'Create wallet',
        open: 'open wallet',
        restore: 'RESTORE'
      }
    },
    show: {
      title: 'Download your wallet file and save the private key.',
      note: 'NOTE: Keep your private key very safely, because anyone with the private key can rebuild this wallet!',
      ypk: 'Your private key',
      yaddress: 'Your address',
      btn: {
        ok: 'OK',
        download: 'Download'
      }
    },
    main: {
      walletBlock: {
        title: 'NKN web wallet',
        address: 'Address:',
        copy: 'copy',
        blance: 'Balance:',
        loading: 'Querying ... ',
        btn: {
          close: 'Close',
          download: 'Download',
          showpk: 'Show private key',
          transfer: 'Transfer'
        }
      },
      recordBlock: {
        title: 'Transfer record',
        refresh: 'refresh',
        loading: 'Loading ... ',
        table: {
          col1: 'Height',
          col2: 'From',
          col3: 'To',
          col4: 'Value',
          col5: 'Time'
        }
      },
      transferDialog: {
        input: {
          to: 'NKN transfer to',
          toPH: 'Transfer to address',
          toErr: 'invalide address',
          amount: 'How much NKN to transfer',
          amountPH: 'NKN amount',
          amountErr: 'invalide address',
          pass: 'Your wallet password',
          passPH: 'Password',
          passErr: 'invalide password'
        },
        btn: {
          cancel: 'CANCEL',
          transfer: 'TRANSFER'
        },
        success: 'Trasfer success! Waiting for block confirm.'
      },
      pkDialog: {
        input: {
          pass: 'Show private key of your wallet',
          passPH: 'Your wallet password',
          ifshow: 'Your private key is'
        },
        btn: {
          cancel: 'CANCEL',
          show: 'SHOW'
        }
      }
    }
  },
  detail: {
    address: {
      header: 'ADDRESS',
      content: {
        header: 'Transfer & mining history:',
        summary: {
          block: 'Block',
          transaction: 'Transaction',
          time: 'Time'
        },
        detail: {
          addrnull: 'Mining reward',
          addrnotnull: 'From',
          to: 'to'
        }
      },
      page: 'Page',
      err: 'Address {i} not found'
    },
    block: {
      header: 'BLOCK DETAIL',
      content: {
        summary1: {
          height: 'Height',
          size: 'Size',
          time: 'time',
          miner: 'Miner'
        },
        summary2: {
          hash: 'Hash:',
          txroot: 'Transaction root:',
        },
        txdetail: {
          header:'transactions in block',
          typeSuffix: 'transaction:',
          miningSuffix: 'NKN reward to',
          transferDesc: 'Transfer {i} NKN From',
          sigChain: {
            sent: 'Client {i} sent data',
            relay: 'Node {i} relay data',
            receive: 'Client {i} received data'
          }
        }
      },
      err: 'not found'
    },
    transactions: {
      header: 'TRANSACTION DETAIL',
      content: {
        typeSuffix: 'transaction:',
        summary: {
          height: 'Height',
          time: 'Time'
        },
        mining: 'reward to',
        transfer: 'Transfer {i} NKN From',
        sigChain: {
          sent: 'Client {i} sent data',
          relay: 'Node {i} relay data',
          receive: 'Client {i} received data'
        }
      },
      notfound: 'Transaction {i} not found'
    }
  },
  txTypeNames: {
    x00: 'Mining reward',
    x01: 'Pay for transfer',
    x10: 'Transfer',
    x11: 'Asset register',
    x12: 'Asset issue',
    x40: 'Prepay',
    x42: 'Signature chain'
  },
  chat: {
    descLine1: 'you can build connections between two interfaces',
    descLine2: 'and review your sent and received messages.',
    dialog: {
      titleConnecting: 'connecting ...',
      to: 'To:',
      from: 'From'
    },
    input: {
      usernamePH: 'New Username',
      connectedPH: 'Write a message ...',
      connectedLabel: 'Write a message ...',
      unConnectedPH: 'Waiting ...',
      unConnectedLabel: 'Waiting ...'
    },
    btn: {
      connect: 'C O N N E C T',
      send: 'S E N D'
    },
    chatText: 'your nkn address is: '
  },
  topology: {
    title: 'Internet Topology'
  },
  index: {
    blockTable: {
      title: 'Blocks',
      view: 'View all',
      th: {
        col1: 'Height',
        col2: 'Created',
        col3: 'Transactions'
      }
    },
    dhtTopology: {
      title: 'DHT Mapping Topology',
      nodeType: {
        offline: 'offline client',
        online: 'online client',
        relay: 'relay node',
        relayp: 'relay process'
      },
    },
    marketPanel: {
      title: 'Market',
      change: '24h Change',
      vol: '24h Volume',
      cap: 'Market Cap',
      lastUpdate: 'Last Updated: {i} ago'
    }
  },
  imageTransfer: {
    unLoadedWallet: {
      title: 'You need load a wallet to pay transfer fee',
      input: {
        walletPH: 'please select a wallet file',
        walletPassPH: 'wallet password',
        walletPassLabel: 'password for wallet'
      },
      btn: {
        upload: 'Select wallet',
        unlock: 'Unlock'
      },
      err: {
        walletFileNull: 'please select a wallet file',
        walletFileWrong: 'not a nkn wallet file',
        walletFileInvalid: 'invalid wallet password'
      }
    },
    transferPanel: {
      copyBtn: 'copy',
      balance: {
        wallet: {
          title: 'wallet balance'
        },
        perpay: {
          title: 'prepay balance',
          setting: 'Prepay settings'
        }
      },
      input: {
        imagefilePH: 'choose the file you want to transfer',
        targetPH: 'target client address',
        targetLabel: 'With textarea',
        filePH: 'choose the file you want to transfer'
      },
      btn: {
        transfer: 'Transfer'
      },
      err: {
        query: 'query pre pay balance failed! please reload the wallet!',
        sync: 'sync wallet data fail! please check network!',
        load: 'load wallet file failed!',
        size: 'file size should not over 5MB',
        prepayBalance: 'please recharge your prepay balance!',
        address: 'please input a NKN client address.',
        emptyFile: 'please choose a file first.',
        timeout: 'file transfer timeout',
        inputInvalid: 'invalid input number!'
      }
    },
    received: {
      title: 'The file you received',
      empty: 'No file received yet.'
    },
    payList: {
      title: 'Last 10 payments for file transfer on NKN chain',
      table: {
        col1: 'Height',
        col2: 'Transaction',
        col3: 'From',
        col4: 'To',
        col5: 'Value'
      }
    },
    recharge: {
      title: 'Increase your prepay',
      body: {
        labelAmount: 'Amount:',
        labelRates: 'Rates:'
      },
      footer: {
        btnClose: 'Close',
        btnPay: 'Pay'
      }
    },
    recharging: {
      title: 'Recharging',
      body: 'Waiting for block confirm ...',
      footer: {
        btnOK: 'ok'
      }
    },
    over: {
      title: 'Transfer over',
      body: 'File transfer success!',
      footer: {
        btnOk: 'Ok'
      }
    }
  }
})
