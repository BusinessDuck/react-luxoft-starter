import { random, randomPercentage } from './index';

describe('utils/random', function () {
  describe('#random()', function () {
    it('should return a random number', function () {
      this.passing = true;

      for (this.i = 0; this.i < 10000; this.i++) {
        this.n = random(0, 1000);

        if (this.n < 0 || this.n > 1000) {
          this.passing = false;
          break;
        }
      }

      expect(this.passing).toBeTruthy();
    });
  });

  describe('#randomPercentage()', function () {
    it('should return a random percentage', function () {
      this.passing = true;

      for (this.i = 0; this.i < 10000; this.i++) {
        this.n = randomPercentage(100, 0, 100);

        if (this.n < 0 || this.n > 100) {
          this.passing = false;
          break;
        }
      }

      expect(this.passing).toBeTruthy();
    });
  });
});
