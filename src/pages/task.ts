// insurers => pay for claims (money)
// claim = n;
// return each claim which insurer should pay
// in case > claim => multiple insurers to pay
/* [{
        claim: Claim.name,
        insurers: [Insurer.id]
}]

 */

interface Claim {
    name: string,
    amount: number
}

interface Insurer {
    id: string,
    balance: number
}

interface PaidClaim {
    claim: string,
    insurers: number[]
}

function payClaims(claims: Claim[], insurers: Insurer[]) {
    const insurersAvailable = insurers.slice();
    // let claimsToBePaid = [];
    let totalAmount = 0;

    for (let claim of claims) {
        let insurers = [];
        for (let insurer of insurersAvailable) {
            if (insurer.balance < 0) {
                insurersAvailable.indexOf(insurer);
            } else if (hasEnoughBalance(claim, insurer)) {
                // claimsToBePaid.push(new PaidClaim(claim.name, insurer.id));
                insurer.balance -= claim.amount;
                break;
            } else {
                totalAmount += insurer.balance;
                insurers.push(insurer);
                insurer.balance -= claim.amount;
                if (claim.amount < totalAmount) {
                    // claimsToBePaid.push(new PaidClaim(claim.name), insurers);
                    break;
                }
            }
          }
        }

    // return claimsToBePaid;
}

function hasEnoughBalance(claim: Claim, insurer: Insurer) {
    return claim.amount < insurer.balance;
}
