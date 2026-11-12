'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('petAPI', {
  isElectron: true,
  envLanguage: process.env.VERTIN_LANG || '',
  beginDrag: () => ipcRenderer.send('drag-start'),
  endDrag: () => ipcRenderer.send('drag-end'),
  setIgnoreMouse: (ignore) => ipcRenderer.send('set-ignore-mouse', Boolean(ignore)),
  setHitRegions: (payload) => ipcRenderer.send('set-hit-regions', payload),
  setLanguage: (lang) => ipcRenderer.send('set-language', lang),
  llmGetConfig: () => ipcRenderer.invoke('llm-get-config'),
  llmSaveConfig: (payload) => ipcRenderer.invoke('llm-save-config', payload),
  llmTest: () => ipcRenderer.invoke('llm-test'),
  llmChat: (payload) => ipcRenderer.invoke('llm-chat', payload),
  hide: () => ipcRenderer.invoke('hide-pet'),
  quit: () => ipcRenderer.invoke('quit-app'),
  resetPosition: () => ipcRenderer.invoke('reset-position'),
  setAlwaysOnTop: (value) => ipcRenderer.invoke('set-always-on-top', Boolean(value)),
  setAutoStart: (value) => ipcRenderer.invoke('set-auto-start', Boolean(value)),
  setCompact: (value) => ipcRenderer.invoke('set-compact', Boolean(value)),
  setFocusTray: (payload) => ipcRenderer.send('set-focus-tray', payload),
  ensureVisible: () => ipcRenderer.invoke('ensure-visible'),
  getRuntimeInfo: () => ipcRenderer.invoke('get-runtime-info'),
  notify: (payload) => ipcRenderer.invoke('notify', payload),
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  onCommand: (callback) => {
    const handler = (_event, command) => callback(command);
    ipcRenderer.on('pet-command', handler);
    return () => ipcRenderer.removeListener('pet-command', handler);
  },
});
