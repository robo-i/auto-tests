const unirest = require('unirest');

module.exports = {
    getUrl(path) {
        return 'https://api.stackexchange.com/2.2' + path;
    },

    getQuestions(site) {
        return unirest.get(this.getUrl('/questions'))
            .query(`site=${site}`);
    },

    getModerators(site) {
        return unirest.get(this.getUrl('/users/moderators'))
            .query(`site=${site}`);
    },

    getCommentWithId(id, site) {
        return unirest.get(this.getUrl(`/comments/${id}`))
            .query(`site=${site}`);
    }
};
