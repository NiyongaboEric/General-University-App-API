import {
  describe, it, before, after, afterEach,
} from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import dotenv from 'dotenv';
import {
  connect,
  clearDatabase,
  closeDatabase,
} from '../../../config/test/db';
import UserController from '../../controllers/UserController';
import {
  FacebookProfile,
  GoogleProfile,
  TwitterProfile,
  GithubProfile,
} from '../../__mocks__/socio-auth/index';

dotenv.config();
chai.use(chaiHttp);
chai.use(sinonChai);
chai.should();

const { expect } = chai;


describe('Social authentication with Facebook', () => {
  afterEach(() => {
    sinon.restore();
  });

  before(async () => connect());
  afterEach(async () => clearDatabase());
  after(async () => closeDatabase());

  it('should return user data when it get the profile from the Facebook social media account', async () => {
    const accessToken = 'zzzz-zzzz-zzzz';
    const refreshToken = 'zzzzzzz';
    const profile = FacebookProfile;
    const done = sinon.spy();
    await UserController.facebookCallback(accessToken, refreshToken, profile, done);
    expect(done.withArgs(null, profile));
  });
  it('should return catch error when there is an error', async () => {
    const accessToken = 'zzzz-zzzz-zzzz';
    const refreshToken = 'zzzzzzz';
    const callBack = sinon.spy();
    const profile = FacebookProfile;
    FacebookProfile._json.email = '';
    await UserController.facebookCallback(accessToken, refreshToken, profile, callBack);
    expect(callBack.withArgs(null, false));
  });
});

describe('Social authentication with Google', () => {
  afterEach(() => {
    sinon.restore();
  });
  before(async () => connect());
  afterEach(async () => clearDatabase());
  after(async () => closeDatabase());
  it('should return user data when it get the profile from the Google social media account', async () => {
    const accessToken = 'zzzz-zzzz-zzzz';
    const refreshToken = 'zzzzzzz';
    const profile = GoogleProfile;
    const done = sinon.spy();
    await UserController.googleCallback(accessToken, refreshToken, profile, done);
    expect(done.withArgs(null, profile));
  });
  it('should return catch error when there is an error', async () => {
    const accessToken = 'zzzz-zzzz-zzzz';
    const refreshToken = 'zzzzzzz';
    const done = sinon.spy();
    const profile = GoogleProfile;
    profile._json.email = '';
    await UserController.googleCallback(accessToken, refreshToken, profile, done);
    expect(done.withArgs(null, false));
  });
});

describe('Social authentication with Twitter', () => {
  afterEach(() => {
    sinon.restore();
  });
  before(async () => connect());
  afterEach(async () => clearDatabase());
  after(async () => closeDatabase());
  it('should return user data when it get the profile from the Twitter social media account', async () => {
    const accessToken = 'zzzz-zzzz-zzzz';
    const refreshToken = 'zzzzzzz';
    const profile = TwitterProfile;
    const done = sinon.spy();
    await UserController.twitterCallback(accessToken, refreshToken, profile, done);
    expect(done.withArgs(null, profile));
  });
  it('should return catch error when there is an error', async () => {
    const accessToken = 'zzzz-zzzz-zzzz';
    const refreshToken = 'zzzzzzz';
    const done = sinon.spy();
    const profile = TwitterProfile;
    profile._json.email = '';
    await UserController.twitterCallback(accessToken, refreshToken, profile, done);
    expect(done.withArgs(null, false));
  });
});
describe('Social authentication with Twitter', () => {
  afterEach(() => {
    sinon.restore();
  });
  before(async () => connect());
  afterEach(async () => clearDatabase());
  after(async () => closeDatabase());
  it('should return user data when it get the profile from the Github social media account', async () => {
    const accessToken = 'zzzz-zzzz-zzzz';
    const refreshToken = 'zzzzzzz';
    const profile = GithubProfile;
    const done = sinon.spy();
    await UserController.githubCallback(accessToken, refreshToken, profile, done);
    expect(done.withArgs(null, profile));
  });
  it('should return catch error when there is an error', async () => {
    const accessToken = 'zzzz-zzzz-zzzz';
    const refreshToken = 'zzzzzzz';
    const done = sinon.spy();
    const profile = GithubProfile;
    const { emails } = profile;
    emails[0].value = '';
    await UserController.githubCallback(accessToken, refreshToken, profile, done);
    expect(done.withArgs(null, false));
  });
});
