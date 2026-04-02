import { colors } from '../../src/theme/colors';

describe('Colors Theme', () => {
  it('should have primary colors defined', () => {
    expect(colors.primary).toBe('#4A90E2');
    expect(colors.primaryDark).toBe('#357ABD');
    expect(colors.primaryLight).toBe('#E8F4FD');
  });

  it('should have status colors defined', () => {
    expect(colors.success).toBe('#52C41A');
    expect(colors.warning).toBe('#FAAD14');
    expect(colors.error).toBe('#FF4D4F');
    expect(colors.info).toBe('#1890FF');
  });

  it('should have neutral colors defined', () => {
    expect(colors.background).toBe('#F5F5F5');
    expect(colors.surface).toBe('#FFFFFF');
    expect(colors.textPrimary).toBe('#333333');
    expect(colors.textSecondary).toBe('#666666');
    expect(colors.textTertiary).toBe('#999999');
    expect(colors.border).toBe('#E5E5E5');
  });

  it('should have special colors defined', () => {
    expect(colors.white).toBe('#FFFFFF');
    expect(colors.black).toBe('#000000');
    expect(colors.transparent).toBe('transparent');
  });
});
