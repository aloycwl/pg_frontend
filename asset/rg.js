const CHAIN = 4,
  CA = '0x1747015b28295132d131A524B300b37d9EF2300c',
  CA2 = '0x204DA0e98EAf4c20db8df4aa67F54e0F31888c7B',
  USDT = '0x263b0355B80d384C55dec84DD13DFa10D2141442',
  u0 = '[]',
  ua = 'uint256',
  u1 = { internalType: ua, name: '', type: ua },
  u2 = { internalType: ua + u0, name: '', type: ua + u0 },
  ub = 'address',
  u3 = { internalType: ub, name: '', type: ub },
  u4 = { internalType: ub + u0, name: '', type: ub + u0 },
  uc = 'string',
  u5 = { internalType: uc, name: '', type: uc },
  u6 = { internalType: uc + u0, name: '', type: uc + u0 };
try {
  window.ethereum.on('accountsChanged', function (accounts) {
    connect();
  });
} catch (e) {}
function adjust(p) {
  num = Number($('#txtNo').val()) + p;
  $('#txtNo').val(num < 1 || isNaN(num) ? 1 : num);
}
async function mint() {
  oamt = 1e21 * Number($('#txtNo').val());
  amt = oamt.toLocaleString('fullwide', { useGrouping: false });
  balUSDT = await contract3.methods.balanceOf(acct).call();
  $('#txtUSDT').html((balUSDT / 1e18).toLocaleString('en-US'));
  if (oamt > balUSDT) {
    $('#mintBtn').html('Minting Mock USDT...'); /*REMOVE THIS IN DEPLOYMENT*/
    await contract3.methods
      .MINT(acct)
      .send({ from: acct }); /*REMOVE THIS IN DEPLOYMENT*/
    /*$('#mintBtn').html('Insufficient USDT');
    return;*/
  }
  $('#mintBtn').html('Approving...');
  appr = await contract3.methods.allowance(acct, CA).call();
  if (appr < oamt)
    await contract3.methods.approve(CA, amt).send({ from: acct });
  $('#mintBtn').html('Minting RG...');
  var _s = location.hash.substring(1).toLowerCase();
  await contract.methods
    .mint(
      _s.length > 1 && _s != acct.toLowerCase()
        ? _s
        : '0x0000000000000000000000000000000000000000',
      $('#txtNo').val()
    )
    .send({ from: acct });
  $('#mintBtn').html('Minted');
  disUSDT();
}
async function drip() {
  $('#claimbtn').html('Claiming...');
  await contract.methods.drip().send({ from: acct });
  disUSDT();
  $('#claimbtn').html('Claimed');
}
async function disUSDT() {
  $('#txtRG').html(
    (
      (await contract.methods.getDrip().call({ from: acct })) / 1e18
    ).toLocaleString('en-US') +
      ' (No. of tokens: ' +
      ((await contract.methods.balanceOf(acct).call()) + ')')
  );
}
async function copy() {
  navigator.clipboard.writeText(
    location.href.replace(location.hash, '') + '?#' + acct
  );
  $('#txtRef').html('Copied');
}
async function connect() {
  $('#conBtn').hide();
  if (typeof CS != 'undefined')
    $('head').append(
      $(
        '<meta name="viewport"content="width=device-width,initial-scale=1.0"><link rel="stylesheet">'
      ).attr('href', CS)
    );
  if (typeof ethereum != 'undefined') {
    web3 = new Web3(ethereum);
    acct = await ethereum.request({ method: 'eth_requestAccounts' });
    acct = acct[0];
    if ((await web3.eth.net.getId()) != CHAIN) {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + CHAIN }],
      });
    }
    contract = new web3.eth.Contract(
      [
        {
          inputs: [],
          name: 'drip',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [u3, u1],
          name: 'mint',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [u3],
          name: 'balanceOf',
          outputs: [u1],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [u3],
          name: 'downlineCounts',
          outputs: [u1],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getDrip',
          outputs: [u1],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      CA
    );
  }
  contract3 = new web3.eth.Contract(
    [
      {
        inputs: [u3],
        name: 'balanceOf',
        outputs: [u1],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [u3, u1],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [u3],
        name: 'MINT',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [u3, u3],
        name: 'allowance',
        outputs: [u1],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    USDT
  );
  $('#root').show();
  await disUSDT();
}
