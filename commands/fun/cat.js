module.exports = {
    name: 'cat',
    description: 'uses the cat api to give you a random cat pic!',
    cooldown: 3,
    async execute(message, args, d) {
        let catapi = "https://api.thecatapi.com"
        let key = process.env.CATAPI;
        let params = {
         'mime_types':'jpg,png', 
         'size':'small',   
         'limit' : 1   
        }
        let urlQuery = d.querystring.stringify(params);
        let submitURL = catapi + `/v1/images/search?${urlQuery}`;
        let pic = await d.r2.get(submitURL , {key} ).json;
        message.channel.send({files : [ pic[0].url ]}); 
    }
};
