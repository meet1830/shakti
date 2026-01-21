import {ConfigKey} from '@modules/types';
import {getConfig} from '@utils/index';

// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = getConfig(ConfigKey.BASE_URL);
