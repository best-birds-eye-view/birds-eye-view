const { assert } = require('chai');
const { Types } = require('mongoose');
const User = require('../../lib/models/User');
const { getErrors } = require('./helpers');

describe('User model', () => {

    it('good valid model', () => {
        const fullInput = {
            name: 'Tasha Zuniga',
            hash: 'notpassword',
            inventory: [],
            currentTask: Types.ObjectId(),
            options: {
                n: { description: 'this is a description' },
                s: { description: 'this is a description' },
                e: { description: 'this is a description' },
                w: { description: 'this is a description' }
            }
        };
        const user = new User(fullInput);
        fullInput._id = user._id;
        assert.deepEqual(user.toJSON(), fullInput);
        assert.isUndefined(user.validateSync());
    });

    it('has required fields', () => {
        const user = new User({});
        const errors = getErrors(user.validateSync(), 7);
        assert.strictEqual(errors.name.kind, 'required');
        assert.strictEqual(errors.hash.kind, 'required');
        assert.strictEqual(errors.currentTask.kind, 'required');
        assert.strictEqual(errors['options.n.description'].kind, 'required');
        assert.strictEqual(errors['options.s.description'].kind, 'required');
        assert.strictEqual(errors['options.e.description'].kind, 'required');
        assert.strictEqual(errors['options.w.description'].kind, 'required');
    });

    const input = {
        name: 'Journey'
    };

    const password = 'unicornsaregood';

    it('generates hash from password', () => {
        const user = new User(input);
        user.generateHash(password);
        assert.ok(user.hash);
        assert.notEqual(user.hash, user.password);
    });

    it('compares password to hash', () => {
        const user = new User(input);
        user.generateHash(password);
        assert.ok(user.comparePassword(password));
    });

});