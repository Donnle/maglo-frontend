import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { User, AuthState as AuthStateModel } from '../interfaces/auth.interface';
import {
  AuthSetUser,
  AuthClearUser,
  AuthSetAuthenticated,
  AuthSetLoading,
  AuthSetTokens,
  AuthClearTokens,
  AuthLoginSuccess,
  AuthLogout,
  AuthClearData,
  AuthRefreshTokenSuccess,
  AuthUpdateUserProfile
} from './auth.actions';

// State
@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    tokenExpiry: null,
    isLoading: false
  }
})
@Injectable()
export class AuthState {
  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static user(state: AuthStateModel): User | null {
    return state.user;
  }

  @Selector()
  static isLoading(state: AuthStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static accessToken(state: AuthStateModel): string | null {
    return state.accessToken;
  }

  @Selector()
  static refreshToken(state: AuthStateModel): string | null {
    return state.refreshToken;
  }

  @Selector()
  static tokenExpiry(state: AuthStateModel): number | null {
    return state.tokenExpiry;
  }

  @Selector()
  static authState(state: AuthStateModel): AuthStateModel {
    return state;
  }

  @Action(AuthSetUser)
  setUser(ctx: StateContext<AuthStateModel>, action: AuthSetUser) {
    ctx.patchState({
      user: action.user
    });
  }

  @Action(AuthClearUser)
  clearUser(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({ user: null });
  }

  @Action(AuthSetAuthenticated)
  setAuthenticated(ctx: StateContext<AuthStateModel>, action: AuthSetAuthenticated) {
    ctx.patchState({ isAuthenticated: action.isAuthenticated });
  }

  @Action(AuthSetLoading)
  setLoading(ctx: StateContext<AuthStateModel>, action: AuthSetLoading) {
    ctx.patchState({ isLoading: action.isLoading });
  }

  @Action(AuthSetTokens)
  setTokens(ctx: StateContext<AuthStateModel>, action: AuthSetTokens) {
    ctx.patchState({
      accessToken: action.accessToken,
      refreshToken: action.refreshToken,
      tokenExpiry: action.tokenExpiry
    });
  }

  @Action(AuthClearTokens)
  clearTokens(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      accessToken: null,
      refreshToken: null,
      tokenExpiry: null
    });
  }

  @Action(AuthLoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: AuthLoginSuccess) {
    const tokenExpiry = Math.floor(Date.now() / 1000) + action.expiresIn;
    
    ctx.patchState({
      isAuthenticated: true,
      user: action.user,
      accessToken: action.accessToken,
      refreshToken: action.refreshToken,
      tokenExpiry: tokenExpiry,
      isLoading: false
    });
  }

  @Action(AuthRefreshTokenSuccess)
  refreshTokenSuccess(ctx: StateContext<AuthStateModel>, action: AuthRefreshTokenSuccess) {
    const tokenExpiry = Math.floor(Date.now() / 1000) + action.expiresIn;
    
    ctx.patchState({
      accessToken: action.accessToken,
      refreshToken: action.refreshToken,
      tokenExpiry: tokenExpiry
    });
  }

  @Action(AuthUpdateUserProfile)
  updateUserProfile(ctx: StateContext<AuthStateModel>, action: AuthUpdateUserProfile) {
    ctx.patchState({
      user: action.user
    });
  }

  @Action(AuthLogout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      tokenExpiry: null,
      isLoading: false
    });
  }

  @Action(AuthClearData)
  clearAuthData(ctx: StateContext<AuthStateModel>) {
    ctx.setState({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      tokenExpiry: null,
      isLoading: false
    });
  }
}
