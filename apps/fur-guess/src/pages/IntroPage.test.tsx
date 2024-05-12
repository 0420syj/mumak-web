import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import IntroPage from './IntroPage';

describe('App', () => {
  it('should render the app', () => {
    render(<IntroPage onNavigate={() => {}} />);
    expect(screen.getByText('FurGuess')).toBeInTheDocument();
    expect(screen.getByText('퍼슈터의 이름을 맞춰보세요')).toBeInTheDocument();
  });

  it('should increase the count when the button is clicked', () => {
    render(<IntroPage onNavigate={() => {}} />);
    const button = screen.getByRole('button', { name: '시작!' });
    expect(button).toBeInTheDocument();
  });
});
