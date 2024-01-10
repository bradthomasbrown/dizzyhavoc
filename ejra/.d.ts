type Call = {
    from?:string
    to:string
    gas?:bigint
    gasPrice?:bigint
    value?:bigint
    input?:string
}

type Tag = 'latest'|'earliest'|'pending'|bigint