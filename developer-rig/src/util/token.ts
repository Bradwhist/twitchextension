import { ViewerTypes } from '../constants/viewer-types';
import { RigRole } from '../constants/rig';
import { sign } from 'jsonwebtoken';

const OneYearMS: number = 365 * 24 * 60 * 60 * 1000;
const idSource: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const idLength: number= 15;

interface PubsubPerms {
  listen?: string[];
  send?: string[];
}

export interface TokenPayload {
  exp: number;
  user_id?: string;
  opaque_user_id: string;
  channel_id: string;
  role: string;
  pubsub_perms: PubsubPerms;
}

export function generateOpaqueID(): string{
  let id = '';
  for (let i = 0; i < idLength; i++) {
    id += idSource.charAt(Math.floor(Math.random() * idSource.length));
  }
  return id;
}

export function createToken(newRole: string, isLinked: boolean, ownerID: string, channelId: string, secret: string, opaqueId: string): string {
  const opaque = opaqueId ? opaqueId : generateOpaqueID();
  switch (newRole) {
    case ViewerTypes.LoggedOut:
      return createSignedToken('viewer', 'ARIG' + opaque, '', channelId, secret)
    case ViewerTypes.LoggedIn:
      if (isLinked) {
        return createSignedToken('viewer', 'URIG' + opaque, 'RIG'+ownerID, channelId, secret)
      } else {
        return createSignedToken('viewer', 'URIG' + opaque, '', channelId, secret)
      }
    case ViewerTypes.Broadcaster:
      return createSignedToken('broadcaster', 'URIG' + opaque, 'RIG' + ownerID, channelId, secret)
    default:
      return createSignedToken(RigRole, 'ARIG' + opaque, '', channelId, secret);
  }
}

export function createSignedToken(role: string, opaqueUserId: string, userId: string, channelId: string, secret: string): string{
  let pubsub_perms: PubsubPerms = {
      listen: ['broadcast', 'global'],
  }
  if (role === 'broadcaster' ) {
    pubsub_perms.send = ['broadcast']
  } else if (role === RigRole) {
    pubsub_perms.send = ['*']
    pubsub_perms.listen = ['*']
  }

  const payload: TokenPayload = {
    exp: Math.floor(((Date.now() + OneYearMS) / 1000)),
    opaque_user_id: opaqueUserId,
    channel_id: channelId,
    role: role,
    pubsub_perms: pubsub_perms,
  };

  if (userId !== '') {
    payload['user_id'] = userId;
  }

  return sign(payload, new Buffer(secret, 'base64'), { algorithm: 'HS256' });
}
