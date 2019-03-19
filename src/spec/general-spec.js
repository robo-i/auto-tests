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
            const commentsResponse = await rest.getCommentWithId(id, 'law');
            const commentsResponseBody = commentsResponse.body;
            const commentsItems = commentsResponse.body.items[0];

            expect(commentsResponse.statusCode).toBe(200);
            expect(commentsResponse.body.items.length).toBeGreaterThan(0);
            expect(commentsItems.owner.reputation).toMatch(numberRegexp);
            expect(commentsItems.owner.user_id).toMatch(numberRegexp);
            expect(commentsItems.owner.user_type).toEqual(jasmine.any(String));
            expect(commentsItems.owner.accept_rate).toMatch(numberRegexp);
            expect(commentsItems.owner.profile_image).toMatch(urlRegexp);
            expect(commentsItems.owner.display_name).toEqual(jasmine.any(String));
            expect(commentsItems.owner.link).toMatch(urlRegexp);
            expect(commentsItems.edited).toEqual(jasmine.any(Boolean));
            expect(commentsItems.score).toMatch(numberRegexp);
            expect(commentsItems.creation_date).toMatch(numberRegexp);
            expect(commentsItems.post_id).toMatch(numberRegexp);
            expect(commentsItems.comment_id).toMatch(numberRegexp);
            expect(commentsResponseBody.has_more).toEqual(jasmine.any(Boolean));
            expect(commentsResponseBody.quota_max).toMatch(numberRegexp);
            expect(commentsResponseBody.quota_remaining).toMatch(numberRegexp);
        }));
    });

    it('get moderators for a non-existing site', async () => {
        const nonExistingSiteName = 'I don\'t exist';
        const moderatorsResponse = await rest.getModerators(nonExistingSiteName);
        const moderatorsResponseBody = moderatorsResponse.body;

        expect(moderatorsResponse.statusCode).toBe(400);
        expect(moderatorsResponseBody.error_id).toBe(400);
        expect(moderatorsResponseBody.error_message).toEqual(`No site found for name \`${nonExistingSiteName}\``);
        expect(moderatorsResponseBody.error_name).toEqual('bad_parameter');
    });
});
