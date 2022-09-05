const coins = [
    { name: 'ONE HUNDRED', val: 100 },
    { name: 'TWENTY', val: 20 },
    { name: 'TEN', val: 10 },
    { name: 'FIVE', val: 5 },
    { name: 'ONE', val: 1 },
    { name: 'QUARTER', val: 0.25 },
    { name: 'DIME', val: 0.1 },
    { name: 'NICKEL', val: 0.05 },
    { name: 'PENNY', val: 0.01 }
];

function checkCashRegister(price, cash, cid) {
    let msg = { status: null, change: [] };
    let change = cash - price;
    let available = cid.reduce(function (obj, currentCoin) {
        obj.total += currentCoin[1];
        obj[currentCoin[0]] = currentCoin[1];
        return obj;
    }, { total: 0 });
    if (available.total === change) {
        msg.status = 'CLOSED';
        msg.change = cid;
        return msg;
    } else if (available.total < change) {
        msg.status = 'INSUFFICIENT_FUNDS';
        return msg;
    }
    
    let changeCoins = coins.reduce(function (obj, currentCoin) {
        let val = 0;

        while (available[currentCoin.name] > 0 && change >= currentCoin.val) {
            change -= currentCoin.val;
            available[currentCoin.name] -= currentCoin.val;
            val += currentCoin.val;
            change = Math.round(change * 100) / 100;
        }

        if (val > 0) {
            obj.push([currentCoin.name, val]);
        }

        return obj;
    }, []);

    if (changeCoins.length < 1 || change > 0) {
        msg.status = 'INSUFFICIENT_FUNDS';
        
        return msg;
    }

    msg.status = 'OPEN';
    msg.change = changeCoins;

    return msg;
}

console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90], ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]]));