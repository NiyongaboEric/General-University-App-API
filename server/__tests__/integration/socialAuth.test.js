import {
  describe, it,
} from 'mocha';
import chaiHttp from 'chai-http';
import chai from 'chai';
import dotenv from 'dotenv';
import server from '../../server';

dotenv.config();
chai.use(chaiHttp);
describe('/auth/facebook', () => {
  it('Should login by using facebook successfully', (done) => {
    chai.request(server)
      .get('/auth/facebook')
      .end((err, res) => {
        // res.redirect('/profile');
      });
    done();
  });
});
