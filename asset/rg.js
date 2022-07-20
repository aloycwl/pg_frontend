/***
Initialisation
Connect needs try catch in case user no metamask
***/
CHAIN = 4;
CA = '0x08624a492d17C9Cd664D67C25e036E06C976e00E';
CA2 = '0xC476D749C5AC81e94336777a0a1EE55299bf13AB';
USDT = '0x6e6668928fce0aFa11F9fB283d0B0515C2dCe41D';
try {
  window.ethereum.on('accountsChanged', function (accounts) {
    connect();
  });
} catch (e) {}
/***
Adjust amount
***/
function adjust(p) {
  num = Number($('#txtNo').val()) + p;
  $('#txtNo').val(num < 1 || isNaN(num) ? 1 : num);
}
/***
Mint (stake in function)
***/
async function mint() {
  oamt = 1e21 * Number($('#txtNo').val());
  amt = oamt.toLocaleString('fullwide', { useGrouping: false });
  if (oamt > balUSDT) {
    $('#mintBtn').html('Minting Mock USDT...'); /*REMOVE THIS IN DEPLOYMENT*/
    await contract3.methods.MINT(acct).send(FA); /*REMOVE THIS IN DEPLOYMENT*/
    /*$('#mintBtn').html('Insufficient USDT');
    return;*/
  }
  $('#mintBtn').html('Approving...');
  appr = await contract3.methods.allowance(acct, CA).call();
  if (appr < oamt) await contract3.methods.approve(CA, amt).send(FA);
  $('#mintBtn').html('Minting RG...');
  await contract.methods.mint(_R(), $('#txtNo').val()).send(FA);
  $('#mintBtn').html('Minted');
  disUSDT();
}
/***
Drip function
***/
async function drip() {
  $('#claimbtn').html('Claiming...');
  await contract.methods.drip().send(FA);
  disUSDT();
  $('#claimbtn').html('Claimed');
}
/***
Update payment status
***/
async function disUSDT() {
  balUSDT = await contract3.methods.balanceOf(acct).call();
  $('#txtUSDT').html((balUSDT / 1e18).toLocaleString('en-US'));
  $('#txtRG').html(
    ((await contract.methods.getDrip().call(FA)) / 1e18).toLocaleString(
      'en-US'
    ) +
      ' (No. of tokens: ' +
      ((await contract.methods.balanceOf(acct).call()) + ')')
  );
}
/***
Copy function
***/
async function copy() {
  navigator.clipboard.writeText(
    location.href.replace(location.hash, '') + '#' + acct
  );
  $('#txtRef').html('Copied');
}
/***
Base wallet function
With ABI
***/
async function connect() {
  $('#conBtn').hide();
  $('#root').show();
  await load(
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
  await load2();
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
  await disUSDT();
}
