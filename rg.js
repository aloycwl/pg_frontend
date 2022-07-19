/***
Initialisation
Connect needs try catch in case user no metamask
***/
CHAIN = 4;
CA = '0x0ea74153A472472EC5C8F9a66bC205Fa5ECdDa43';
CA2 = '0xC476D749C5AC81e94336777a0a1EE55299bf13AB';
USDT = '0x6e6668928fce0aFa11F9fB283d0B0515C2dCe41D';
try {
  window.ethereum.on('accountsChanged', function (accounts) {
    connect();
  });
} catch (e) {}
/***
Mint (stake in function)
***/
async function mint() {
  oamt = 1e21;
  amt = oamt.toLocaleString('fullwide', { useGrouping: false });
  if (oamt > balUSDT) {
    $('#status').html('Minting Mock USDT'); /*REMOVE THIS IN DEPLOYMENT*/
    await contract3.methods.MINT(acct).send(FA); /*REMOVE THIS IN DEPLOYMENT*/
    /*$('#status').html('Insufficient USDT');
    return;*/
  }
  $('#status').html('Approving...');
  appr = await contract3.methods.allowance(acct, CA).call();
  if (appr < oamt) await contract3.methods.approve(CA, amt).send(FA);
  $('#status').html('Minting RG...');
  await contract.methods.mint(_R()).send(FA);
  $('#status').html('Minted');
  disUSDT();
}
/***
Drip function
***/
async function drip() {}
/***
Update payment status
***/
async function disUSDT() {
  balUSDT = await contract3.methods.balanceOf(acct).call();
  $('#txtUSDT').html((balUSDT / 1e18).toLocaleString('en-US'));
  $('#txtRG').html(
    (await LB()).toLocaleString('en-US') +
      ' (No. of tokens: ' +
      ((await contract.methods.balanceOf(acct)) + ')')
  );
}
/***
Base wallet function
With ABI
***/
async function connect() {
  await load(
    [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'a',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'b',
            type: 'uint256',
          },
        ],
        name: 'ACCESS',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'string',
            name: 'name_',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'sym_',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'a',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'b',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'approved',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'bool',
            name: 'approved',
            type: 'bool',
          },
        ],
        name: 'ApprovalForAll',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'a',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'b',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'a',
            type: 'uint256',
          },
        ],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'drip',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'a',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'b',
            type: 'uint256',
          },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'a',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'b',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'c',
            type: 'uint256',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'a',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'b',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'c',
            type: 'uint256',
          },
          {
            internalType: 'bytes',
            name: '',
            type: 'bytes',
          },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'a',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'b',
            type: 'bool',
          },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'toggleRelease',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'a',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'b',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'c',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        name: '_access',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: '_count',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: '_release',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'a',
            type: 'address',
          },
        ],
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
  $('#txtRB').html(_R());
  $('#txtRef').val(acct);
  $('#root').show();
  $('#connect').hide();
}
