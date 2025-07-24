import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderWithRouter } from '@/test/utils';
import { RouteComponent as LoginPage } from './login';

vi.mock('@/lib/auth', () => ({
  authClient: { signIn: { email: vi.fn() } },
}));

describe('Login Page', () => {
  it('has email placeholder', async () => {
    renderWithRouter(<LoginPage />, {
      initialLocation: '/login',
    });

    expect(await screen.findByPlaceholderText('Email')).toBeInTheDocument();
  });

  it('has password placeholder', async () => {
    renderWithRouter(<LoginPage />, {
      initialLocation: '/login',
    });

    expect(await screen.findByPlaceholderText('Password')).toBeInTheDocument();
  });
});
