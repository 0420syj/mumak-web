import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import GamePage from './GamePage';

describe('App', () => {
  it('should render the app', () => {
    render(<GamePage />);
    expect(screen.getByText('FurGuess')).toBeInTheDocument();
  });

  it('should increase the count when the button is clicked', () => {
    render(<GamePage />);
    const button = screen.getByRole('button', { name: '제출' });
    expect(button).toBeInTheDocument();
  });
});
