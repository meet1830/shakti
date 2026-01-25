import {ConfigKey} from '@modules/types';
import {Platform} from 'react-native';
import {getConfig} from '.';
import {name} from '../../app.json';

type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

interface LogPayload {
  timestamp: number;
  message: string;
  logtype: LogLevel;
  service: string;
  os: string;
  attributes?: Record<string, any>;
}

/**
 * Internal function to send the payload to New Relic
 */
const sendLog = async (
  level: LogLevel,
  message: string,
  attributes?: Record<string, any>,
) => {
  if (__DEV__) {
    console.log(`[NR-${level}]`, message, attributes || '');
    return;
  }

  const payload: LogPayload = {
    timestamp: Date.now(),
    message: message,
    logtype: level,
    service: name,
    attributes: attributes,
    os: Platform.OS,
  };

  try {
    await fetch('https://log-api.newrelic.com/log/v1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-License-Key': getConfig(ConfigKey.NEW_RELIC_LICENSE_KEY) || '',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    if (__DEV__) {
      console.error('Failed to send log to New Relic:', error);
    }
  }
};

export const Logger = {
  info: (message: string, attributes?: Record<string, any>) =>
    sendLog('INFO', message, attributes),

  warn: (message: string, attributes?: Record<string, any>) =>
    sendLog('WARN', message, attributes),

  error: (message: string, attributes?: Record<string, any>) =>
    sendLog('ERROR', message, attributes),

  debug: (message: string, attributes?: Record<string, any>) =>
    sendLog('DEBUG', message, attributes),
};
