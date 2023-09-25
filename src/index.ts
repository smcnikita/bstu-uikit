import * as components from './lib';
import type { App } from 'vue';

const strComponents: { [key: string]: any } = components;

export default {
  install: (instance: App) => {
    for (const componentKey in strComponents) {
      instance.use(strComponents[componentKey]);
    }
  },
};

// подключение css
import './style.scss';

export * from './lib';
export * from './types';
