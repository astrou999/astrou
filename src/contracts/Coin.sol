
pragma solidity ^0.6.12;
// SPDX-License-Identifier: Unlicensed

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function totalHolders() external view returns (uint256);
    function getHoldersAddressFromIndex(uint256 holdersIndex) external view returns (address);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

contract Ownable is Context {
    address private _owner;
    address private _previousOwner;
    uint256 private _lockTime;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor () internal {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }
    function owner() public view returns (address) {
        return _owner;
    }
    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }

    function getUnlockTime() public view returns (uint256) {
        return _lockTime;
    }

    //Locks the contract for owner for the amount of time provided
    function lock(uint256 time) public virtual onlyOwner {
        _previousOwner = _owner;
        _owner = address(0);
        _lockTime = now + time;
        emit OwnershipTransferred(_owner, address(0));
    }
    
    //Unlocks the contract for owner when _lockTime is exceeds
    function unlock() public virtual {
        require(_previousOwner == msg.sender, "You don't have permission to unlock");
        require(now > _lockTime , "Contract is still locked");
        emit OwnershipTransferred(_owner, _previousOwner);
        _owner = _previousOwner;
    }
}

library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // According to EIP-1052, 0x0 is the value returned for not-yet created accounts
        // and 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470 is returned
        // for accounts without code, i.e. `keccak256('')`
        bytes32 codehash;
        bytes32 accountHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
        // solhint-disable-next-line no-inline-assembly
        assembly { codehash := extcodehash(account) }
        return (codehash != accountHash && codehash != 0x0);
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = recipient.call{ value: amount }("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain`call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
      return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
        return _functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value, string memory errorMessage) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        return _functionCallWithValue(target, data, value, errorMessage);
    }

    function _functionCallWithValue(address target, bytes memory data, uint256 weiValue, string memory errorMessage) private returns (bytes memory) {
        require(isContract(target), "Address: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.call{ value: weiValue }(data);
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}


// pragma solidity >=0.5.0;

interface IUniswapV2Factory {
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);

    function feeTo() external view returns (address);
    function feeToSetter() external view returns (address);

    function getPair(address tokenA, address tokenB) external view returns (address pair);
    function allPairs(uint) external view returns (address pair);
    function allPairsLength() external view returns (uint);

    function createPair(address tokenA, address tokenB) external returns (address pair);

    function setFeeTo(address) external;
    function setFeeToSetter(address) external;
}

// pragma solidity >=0.5.0;

interface IUniswapV2Pair {
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    function name() external pure returns (string memory);
    function symbol() external pure returns (string memory);
    function decimals() external pure returns (uint8);
    function totalSupply() external view returns (uint);
    function balanceOf(address owner) external view returns (uint);
    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint value) external returns (bool);
    function transfer(address to, uint value) external returns (bool);
    function transferFrom(address from, address to, uint value) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);
    function PERMIT_TYPEHASH() external pure returns (bytes32);
    function nonces(address owner) external view returns (uint);

    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external;

    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint);
    function factory() external view returns (address);
    function token0() external view returns (address);
    function token1() external view returns (address);
    function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);
    function price0CumulativeLast() external view returns (uint);
    function price1CumulativeLast() external view returns (uint);
    function kLast() external view returns (uint);

    function mint(address to) external returns (uint liquidity);
    function burn(address to) external returns (uint amount0, uint amount1);
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external;
    function skim(address to) external;
    function sync() external;

    function initialize(address, address) external;
}

// pragma solidity >=0.6.2;

interface IUniswapV2Router01 {
    function factory() external pure returns (address);
    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountETH);
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountToken, uint amountETH);
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);
    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);

    function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
}

// pragma solidity >=0.6.2;

interface IUniswapV2Router02 is IUniswapV2Router01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountETH);
    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;
    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
}

contract ASTROUNAUT is Context, IERC20, Ownable {
    using SafeMath for uint256;
    using Address for address;

    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;

    mapping (address => bool) private _isExcludedFromFee;
    address[] private _excluded;

    address [] private _holders;
    mapping(address => bool) private _isHolder;
    mapping(address => uint256) private _holderIndex;
   
    uint256 private _totalSupply = 1 * 10**9 * 10**9;

    string private _name = "ASTROUNAUT";
    string private _symbol = "AST";
    uint8 private _decimals = 9;
    
    uint256 private _treasuryFee = 5;
    uint256 private _previousTreasuryFee = _treasuryFee;
    uint256 private _liquidityFee = 5;
    uint256 private _previousLiquidityFee = _liquidityFee;
    
    address public treasuryAddress;
    
    IUniswapV2Router02 public immutable uniswapV2Router;
    address public immutable uniswapV2Pair;
    
    bool inSwapAndLiquify;
    bool public swapAndLiquifyEnabled = true;
    
    uint256 public minimumHold = 1 * 10**5 * 10**9;
    uint256 private numTokensSellToAddToLiquidity = 5 * 10**7 * 10**9;
    
    event SaveToTreasuryWallet(address indexed from, address indexed to, uint256 value);
    event MinTokensBeforeSwapUpdated(uint256 minTokensBeforeSwap);
    event SwapAndLiquifyEnabledUpdated(bool enabled);
    event SwapAndLiquify(
        uint256 tokensSwapped,
        uint256 ethReceived,
        uint256 tokensIntoLiqudity
    );
    
    modifier lockTheSwap {
        inSwapAndLiquify = true;
        _;
        inSwapAndLiquify = false;
    }
    
    constructor () public {
        _balances[_msgSender()] = _totalSupply;
        
        // IUniswapV2Router02 _uniswapV2Router = IUniswapV2Router02(0x10ED43C718714eb63d5aA57B78B54704E256024E);
        IUniswapV2Router02 _uniswapV2Router = IUniswapV2Router02(0xD99D1c33F9fC3444f8101754aBC46c52416550D1);
        //  Create a uniswap pair for this new token
        uniswapV2Pair = IUniswapV2Factory(_uniswapV2Router.factory())
            .createPair(address(this), _uniswapV2Router.WETH());

        // set the rest of the contract variables
        uniswapV2Router = _uniswapV2Router;
        
        //exclude owner and this contract from fee
        _isExcludedFromFee[owner()] = true;
        _isExcludedFromFee[address(this)] = true;
        
        emit Transfer(address(0), _msgSender(), _totalSupply);
    }
    
    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }

    function treasuryFee() public view returns (uint256) {
        return _treasuryFee;
    }

    function liquidityFee() public view returns (uint256) {
        return _liquidityFee;
    }

    function totalHolders() public view override returns (uint256) {
        return _holders.length;
    }

    function getHoldersAddressFromIndex(uint256 holdersIndex) public view override returns (address) {
        return _holders[holdersIndex];
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        _transfer(sender, recipient, amount);
        _allowances[sender][msg.sender] = _allowances[sender][msg.sender].sub(amount);
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        uint256 newValue = _allowances[msg.sender][spender].add(addedValue);
        _allowances[msg.sender][spender] = newValue;
        emit Approval(msg.sender, spender, newValue);
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {        
        uint256 newValue = _allowances[msg.sender][spender].sub(subtractedValue);
        _allowances[msg.sender][spender] = newValue;
        emit Approval(msg.sender, spender, newValue);
        return true;
    }

    function isHolder(address account) public view returns(bool) {
        return _isHolder[account];
    }

    function excludeFromFee(address account) public onlyOwner {
        _isExcludedFromFee[account] = true;
    }
    
    function includeInFee(address account) public onlyOwner {
        _isExcludedFromFee[account] = false;
    }
    
    function setLiquidityFee(uint256 amount) external onlyOwner() {
        _liquidityFee = amount;
    }
    
    function setTreasuryFee (uint256 percentage) external onlyOwner() {
        _treasuryFee = percentage;
    }
    
    function setMinimumHold (uint256 amount) external onlyOwner() {
        minimumHold = amount;
        for (uint idx = 0; idx < _holders.length; idx++){
            _removeFromHolders(_holders[idx]);
        }
    } 
    
    //remove treasuryAddress and router address from lotteryholder
    function setTreasuryAddress (address treasuryAddr) external onlyOwner() {
        treasuryAddress = treasuryAddr;
        excludeFromFee(treasuryAddress);
    }
    
    function _addToHolders(address addr) private {
        if(!_isHolder[addr] && _balances[addr] >= minimumHold && addr != treasuryAddress && addr != uniswapV2Pair) {
            _holders.push(addr);
            _isHolder[addr] = true;
            _holderIndex[addr] = _holders.length - 1;
        }
    }

    function _removeFromHolders(address addr) private {
        if(_isHolder[addr] && _balances[addr] <= minimumHold) {
            uint256 removeIndex = _holderIndex[addr];
            address lastAddress = _holders[_holders.length -1];
            _holders[removeIndex] = lastAddress;
            _holders.pop();
            _holderIndex[lastAddress] = removeIndex;
            _isHolder[addr] = false;
        }
    }
    
    function _getPercent(uint256 amount, uint256 percent) private pure returns(uint256) {
        return amount.div(100).mul(percent);
    }

    function setSwapAndLiquifyEnabled(bool _enabled) public onlyOwner {
        swapAndLiquifyEnabled = _enabled;
        emit SwapAndLiquifyEnabledUpdated(_enabled);
    }
    
     //to recieve ETH from uniswapV2Router when swaping
    receive() external payable {}

    
    function removeAllFee() private {
        if(_treasuryFee == 0 && _liquidityFee == 0) return;
        
        _previousTreasuryFee = _treasuryFee;
        _previousLiquidityFee = _liquidityFee;
        
        _treasuryFee = 0;
        _liquidityFee = 0;
    }
    
    function restoreAllFee() private {
        _treasuryFee = _previousTreasuryFee;
        _liquidityFee = _previousLiquidityFee;
    }
    
    function isExcludedFromFee(address account) public view returns(bool) {
        return _isExcludedFromFee[account];
    }

    function _approve(address owner, address spender, uint256 amount) private {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
    
    function _transfer(
        address from,
        address to,
        uint256 amount
    ) private {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(amount > 0, "Transfer amount must be greater than zero"); 
        require(treasuryAddress != address(0), "Set Treasury Address First");

        uint256 contractTokenBalance = balanceOf(address(this));
        
        bool overMinTokenBalance = contractTokenBalance >= numTokensSellToAddToLiquidity;
        if (
            overMinTokenBalance &&
            !inSwapAndLiquify &&
            from != uniswapV2Pair &&
            swapAndLiquifyEnabled
        ) {
            contractTokenBalance = numTokensSellToAddToLiquidity;
            //add liquidity
            swapAndLiquify(contractTokenBalance);
        }
        
        //indicates if fee should be deducted from transfer
        bool takeFee = true;
        
        //if any account belongs to _isExcludedFromFee account then remove the fee
        if(_isExcludedFromFee[from] || _isExcludedFromFee[to]){
            takeFee = false;
        }
        
        _tokenTransfer(from,to,amount,takeFee); 
    }
    

    function swapAndLiquify(uint256 contractTokenBalance) private lockTheSwap {
        // split the contract balance into halves
        uint256 half = contractTokenBalance.div(2);
        uint256 otherHalf = contractTokenBalance.sub(half);

        // capture the contract's current ETH balance.
        // this is so that we can capture exactly the amount of ETH that the
        // swap creates, and not make the liquidity event include any ETH that
        // has been manually sent to the contract
        uint256 initialBalance = address(this).balance;

        // swap tokens for ETH
        swapTokensForEth(half); // <- this breaks the ETH -> HATE swap when swap+liquify is triggered

        // how much ETH did we just swap into?
        uint256 newBalance = address(this).balance.sub(initialBalance);

        // add liquidity to uniswap
        addLiquidity(otherHalf, newBalance);
        
        emit SwapAndLiquify(half, newBalance, otherHalf);
    }

    function swapTokensForEth(uint256 tokenAmount) private {
        // generate the uniswap pair path of token -> weth
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = uniswapV2Router.WETH();

        _approve(address(this), address(uniswapV2Router), tokenAmount);

        // make the swap
        uniswapV2Router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenAmount,
            0, // accept any amount of ETH
            path,
            address(this),
            block.timestamp
        );
    }

    function addLiquidity(uint256 tokenAmount, uint256 ethAmount) private {
        // approve token transfer to cover all possible scenarios
        _approve(address(this), address(uniswapV2Router), tokenAmount);

        // add the liquidity
        uniswapV2Router.addLiquidityETH{value: ethAmount}(
            address(this),
            tokenAmount,
            0, // slippage is unavoidable
            0, // slippage is unavoidable
            owner(),
            block.timestamp
        );
    }
    
    //this method is responsible for taking all fee, if takeFee is true
    function _tokenTransfer(address sender, address recipient, uint256 amount,bool takeFee) private {
        if(!takeFee)
            removeAllFee();
        
        uint256 amountToTreasury = _getPercent(amount, _treasuryFee);
        uint256 amountToLiquidity = _getPercent(amount, _liquidityFee);
        uint256 amountToTransfer = amount.sub(amountToTreasury).sub(amountToLiquidity);
        _saveTokensForTreasury(sender, amountToTreasury);
        _balances[address(this)] = _balances[address(this)].add(amountToLiquidity);
        _balances[sender] = _balances[sender].sub(amount);
        _balances[recipient] = _balances[recipient].add(amountToTransfer);

        if(!takeFee)
            restoreAllFee();
        
        _removeFromHolders(sender);
        _addToHolders(recipient);
        emit Transfer(sender, recipient, amountToTransfer);
    }

    function _saveTokensForTreasury(address sender, uint256 amount) private {
        _balances[treasuryAddress] = _balances[treasuryAddress].add(amount);
        emit SaveToTreasuryWallet(sender, treasuryAddress, amount);
    }
    
}

pragma experimental ABIEncoderV2;

contract Treasury is Context, Ownable {
    using SafeMath for uint256;
    
    address private contractAddress;

    uint256 private _savingWinnerBalance = 0;
    uint256 private _totalPrizeClaimed = 0;
    uint256 private _totalPrizeBurned = 0;

    uint256 private _winningPercentage = 50;
    uint256 private _minimumDraw = 5 * 10**6 * 10**9;
    uint256 private _minimumHolders = 10;
    uint256 private _timeRange = 1 hours;

    uint256 [] private _drawIdList;
    uint256 [] private _drawIdClaimed;
    uint256 [] private _drawIdBurned;

    uint256 private _lastWinnerId;
    address private _lastWinner;
    uint256 private _lastWinningAmount;

    struct WinnerDetail {
        address winnerAddress;
        bool isClaimed;
        uint256 winningAmount;
    }

    mapping(uint256 => WinnerDetail) private winnerList;

    constructor(address _contractAddress) public {
        contractAddress = _contractAddress;
    }

    event DrawWinner();
    event ClaimPrize();

    modifier onlyWinner() {
        require(msg.sender == _lastWinner, "You're not winner");
        _;
    }

    function getBalance() public view returns (uint256){
        return IERC20(contractAddress).balanceOf(address(this)) - _savingWinnerBalance;
    }

    function getListIdClaimed() public view returns (uint256 [] memory){
        return _drawIdClaimed;
    }

    function getWinnerDetail(uint256 drawId) public view returns (WinnerDetail memory){
        return winnerList[drawId];
    }

    function lastWinnerAddress() public view returns (address) {
        return _lastWinner;
    }

    function lastPrizeClaimed() public view returns (uint256) {
        return _lastWinningAmount;
    }

    function totalPrizeBurned() public view returns (uint256) {
        return _totalPrizeBurned;
    }

    function totalPrizeClaimed() public view returns (uint256) {
        return _totalPrizeClaimed;
    }

    function lastWinnerId() public view returns (uint256) {
        return _lastWinnerId;
    }

    function minimumBalanceToDraw() public view returns (uint256) {
        return _minimumDraw;
    }

    function minimumHolders() public view returns (uint256) {
        return _minimumHolders;
    }

    function getRangeTime() public view returns (uint256) {
        return _timeRange;
    }

    function setMinimumBalanceToDraw(uint256 amount) external onlyOwner {
        _minimumDraw = amount;
    }

    function setMinimumTotalHolders(uint256 amount) external onlyOwner {
        _minimumHolders = amount;
    }

    function setWinningPercentage(uint256 percent) external onlyOwner {
        _winningPercentage = percent;
    }

    function setTimeRange(uint256 hour) external onlyOwner {
        _timeRange = hour;
    }

    function _getRandom(uint256 max) private view returns(uint256) {
        return uint(keccak256(abi.encodePacked(now, msg.sender, block.difficulty))) % (max + 1);
    }

    function _getWinningAmount() private view returns (uint256) {
        uint256 balanceThisAddress = IERC20(contractAddress).balanceOf(address(this));
        return _winningPercentage.mul(balanceThisAddress - _savingWinnerBalance).div(100);
    }

    function drawWinner() public returns (bool){
        if (_lastWinnerId != 0){
            require(block.timestamp > _lastWinnerId + _timeRange, "Wait minimum one hour");
        }
        require(IERC20(contractAddress).balanceOf(address(this)) >= _minimumDraw, "Balance not reach minimum draw");
        
        uint256 totalHolders = IERC20(contractAddress).totalHolders();
        require(totalHolders >= _minimumHolders, "Total Holders minimum not reach");

        uint256 indexWinner = _getRandom(totalHolders);
        address winner = IERC20(contractAddress).getHoldersAddressFromIndex(indexWinner);
        uint256 winningAmount = _getWinningAmount();

        checkLastDrawStatus();
        
        _lastWinnerId = block.timestamp;

        _lastWinner = winner;
        _drawIdList.push(_lastWinnerId);
        winnerList[_lastWinnerId].winnerAddress = winner;
        winnerList[_lastWinnerId].isClaimed = false;
        winnerList[_lastWinnerId].winningAmount = winningAmount;

        _savingWinnerBalance += winningAmount;

        emit DrawWinner();
        return true;
    }

    function checkLastDrawStatus() private {
        if (_lastWinnerId != 0 && !winnerList[_lastWinnerId].isClaimed){
            IERC20(contractAddress).transfer(address(0), winnerList[_lastWinnerId].winningAmount);
            _drawIdBurned.push(_lastWinnerId);
            _savingWinnerBalance = 0;
            _totalPrizeBurned += winnerList[_lastWinnerId].winningAmount;
        }
    }

    function claimContractBalance() external onlyOwner {
        IERC20(contractAddress).transfer(msg.sender, IERC20(contractAddress).balanceOf(address(this)));
    }


    //create claimable reward
    function claimPrize() external onlyWinner {
        require(!winnerList[_lastWinnerId].isClaimed, "The prize has been claimed");

        uint256 winningPrize = winnerList[_lastWinnerId].winningAmount;

        IERC20(contractAddress).transfer(_lastWinner, winningPrize);
        _savingWinnerBalance -= winningPrize;
        winnerList[_lastWinnerId].isClaimed = true;
        _drawIdClaimed.push(_lastWinnerId);
        _totalPrizeClaimed += winningPrize;
        _lastWinningAmount = winningPrize;

        emit ClaimPrize();
    }
  
}
