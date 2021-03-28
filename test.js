


function thing() {
    return new Promise((resolve, reject) => {
            reject("Bc y not")
    })
}

async function e() {
await thing().catch(() => {return})
console.log("asdf")
}