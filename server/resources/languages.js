module.exports = (entity) => {
    const languages = entity.table;

    return {
        index: async function(ctx, next) {
            await next;
            let result = await languages.getAll();
            ctx.body = result;
        },
        show: async function(ctx, next){
            await next;
            let result = await languages.get(ctx.params.languages);

            if (!result) {
                ctx.status = 404;
                ctx.body = 'Not Found';
            } else {
                ctx.body = result;
            }
        },
        create: async function(ctx, next) {
            await next;
            if (!ctx.request.body || !ctx.request.body.language) ctx.throw(400, '.name required');
            let language = (({language, count}) => ({language, count}))(ctx.request.body);
            await languages.create(language);
            ctx.status = 201;
            ctx.body = 'added!';
        },

        destroy:async function(ctx, next) {
            if (!ctx.params.language) {
                ctx.throw(400, "must supply a language");
            }
            await languages.delete(ctx.params.language);
        },

        update:async function(ctx, next) {
            //implement me!
            await next;
            console.log(ctx.request.body.language, ctx.request.body.count);
            if (!ctx.request.body ||
                !ctx.request.body.language||
                ctx.request.body.count < 0 ||
                ctx.request.body.count == undefined) {
                    console.log("name");
                    ctx.throw(400, ".name and .count required");
            }
            let language = (({ language, count }) => ({ language, count }))(ctx.request.body);
            await languages.update(language, ctx.params.language);
            ctx.status = 200;
            ctx.body = "updated!";          
        }
   }
};

module.exports.permissions = {
    default: [] //open permissions
};
