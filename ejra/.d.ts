type Call = {
    from?:string
    to:string
    gas?:bigint
    gasPrice?:bigint
    value?:bigint
    input?:string
    data?:string
}

type Filter = {
    fromBlock?:Tag
    toBlock?:Tag
    address?:string
    topics?:(string|string[])[]
    blockHash?:string
}

type Log = {
    removed:boolean
    logIndex:bigint|null
    transactionIndex:bigint|null
    transactionHash:string|null
    blockHash:string|null
    blockNumber:bigint|null
    address:string
    data:string
    topics:string[]
}

type Tag = 'latest'|'earliest'|'pending'|bigint