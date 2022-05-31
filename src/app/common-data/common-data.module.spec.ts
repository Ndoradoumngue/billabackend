import { CommonDataModule } from './common-data.module';

describe('CommonDataModule', () => {
  let commonDataModule: CommonDataModule;

  beforeEach(() => {
    commonDataModule = new CommonDataModule();
  });

  it('should create an instance', () => {
    expect(commonDataModule).toBeTruthy();
  });
});
