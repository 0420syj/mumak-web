import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import GamePage from './game-page';

describe('game page', () => {
  it('should render application title', () => {
    render(<GamePage onNavigateToIntro={() => {}} onGameEnd={() => {}} />);
    expect(screen.getByText('FurGuess')).toBeInTheDocument();
  });

  it('should render the description', () => {
    render(<GamePage onNavigateToIntro={() => {}} onGameEnd={() => {}} />);
    expect(screen.getByText('1번째 퍼슈트의 이름을 맞춰보세요.')).toBeInTheDocument();
    expect(screen.getByText('공백을 제외한 이름을 입력하세요.')).toBeInTheDocument();
  });

  it('should render the progress bar', () => {
    render(<GamePage onNavigateToIntro={() => {}} onGameEnd={() => {}} />);
    const progress = screen.getByRole('progressbar');
    expect(progress).toBeInTheDocument();
  });

  it('should render the image', () => {
    render(<GamePage onNavigateToIntro={() => {}} onGameEnd={() => {}} />);
    const image = screen.getByAltText('Fur Suiter');
    expect(image).toBeInTheDocument();
  });

  it('should render the input field', () => {
    render(<GamePage onNavigateToIntro={() => {}} onGameEnd={() => {}} />);
    const input = screen.getByPlaceholderText('입력');
    expect(input).toBeInTheDocument();
  });

  it('should render the submit button', () => {
    render(<GamePage onNavigateToIntro={() => {}} onGameEnd={() => {}} />);
    const button = screen.getByRole('button', { name: '제출' });
    expect(button).toBeInTheDocument();
  });
});
