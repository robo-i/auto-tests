const sites = require('../test-data/sites.json').sites;
const commentsIds = require('../test-data/comments-ids.json').ids;
const rest = require('../utils/rest-utils');

describe('stackexchange API check for question/moderators/comments endpoints: ', () => {
    const urlRegexp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    const numberRegexp = /\d{1,}/;

    it('get questions for a {site}', async () => {
        await Promise.all(sites.map(async (site) => {
            const questionsResponse = await rest.getQuestions(site);
            const questionToCheck = questionsResponse.body.items[0];
            console.log('!!!', questionsResponse.body);

            expect(questionsResponse.statusCode).toBe(200);
            expect(questionsResponse.body.items.length).toBeGreaterThan(0);
            expect(questionToCheck.tags).toContain(jasmine.any(String));
            expect(questionToCheck.owner.reputation).toMatch(numberRegexp);
            expect(questionToCheck.owner.user_id).toMatch(numberRegexp);
            expect(questionToCheck.owner.user_type).toEqual(jasmine.any(String));
            expect(questionToCheck.owner.profile_image).toEqual(jasmine.any(String));
            expect(questionToCheck.owner.display_name).toEqual(jasmine.any(String));
            expect(questionToCheck.owner.link).toMatch(urlRegexp);
            expect(questionToCheck.is_answered).toEqual(jasmine.any(Boolean));
            expect(questionToCheck.view_count).toMatch(numberRegexp);
            expect(questionToCheck.answer_count).toMatch(numberRegexp);
            expect(questionToCheck.score).toMatch(numberRegexp);
            expect(questionToCheck.last_activity_date).toMatch(numberRegexp);
            expect(questionToCheck.creation_date).toMatch(numberRegexp);
            expect(questionToCheck.question_id).toMatch(numberRegexp);
            expect(questionToCheck.link).toMatch(urlRegexp);
            expect(questionToCheck.title).toEqual(jasmine.any(String));
        }));
    });

    it('get comments with {ids}', async () => {
        await Promise.all(commentsIds.map(async (id) => {
            const questionsResponse = await rest.getCommentWithId(id, 'law');
            const responseBody = questionsResponse.body;
            const responseBodyItems = questionsResponse.body.items[0];

            expect(questionsResponse.statusCode).toBe(200);
            expect(questionsResponse.body.items.length).toBeGreaterThan(0);
            expect(responseBodyItems.owner.reputation).toMatch(numberRegexp);
            expect(responseBodyItems.owner.user_id).toMatch(numberRegexp);
            expect(responseBodyItems.owner.user_type).toEqual(jasmine.any(String));
            expect(responseBodyItems.owner.accept_rate).toMatch(numberRegexp);
            expect(responseBodyItems.owner.profile_image).toMatch(urlRegexp);
            expect(responseBodyItems.owner.display_name).toEqual(jasmine.any(String));
            expect(responseBodyItems.owner.link).toMatch(urlRegexp);
            expect(responseBodyItems.edited).toEqual(jasmine.any(Boolean));
            expect(responseBodyItems.score).toMatch(numberRegexp);
            expect(responseBodyItems.creation_date).toMatch(numberRegexp);
            expect(responseBodyItems.post_id).toMatch(numberRegexp);
            expect(responseBodyItems.comment_id).toMatch(numberRegexp);
            expect(responseBody.has_more).toEqual(jasmine.any(Boolean));
            expect(responseBody.quota_max).toMatch(numberRegexp);
            expect(responseBody.quota_remaining).toMatch(numberRegexp);
        }));
    });

    it('get moderators for a non-existing site', async () => {
        const nonExistingSiteName = 'I don\'t exist';
        const questionsResponse = await rest.getModerators('I don\'t exist');
        const responseToCheck = questionsResponse.body;

        expect(questionsResponse.statusCode).toBe(400);
        expect(responseToCheck.error_id).toBe(400);
        expect(responseToCheck.error_message).toEqual(`No site found for name \`${nonExistingSiteName}\``);
        expect(responseToCheck.error_name).toEqual('bad_parameter');
    });
});
