import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultPage from './result-page';

describe('App', () => {
  it('should render the app', () => {
    render(<ResultPage result={{ correct: 0, total: 0, time: 0 }} onNavigateToIntro={() => {}} />);
    expect(screen.getByText('결과')).toBeInTheDocument();
  });

  it('should increase the count when the button is clicked', () => {
    render(<ResultPage result={{ correct: 0, total: 0, time: 0 }} onNavigateToIntro={() => {}} />);
    const button = screen.getByRole('button', { name: '다시 시작' });
    expect(button).toBeInTheDocument();
  });
});
