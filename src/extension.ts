import * as vscode from 'vscode';
import * as path from 'path';
import { Client } from 'discord-rpc';

let rpc: Client | null = null;
let startTime: number = Date.now();
let currentActivity: any = null;
let reconnectTimer: NodeJS.Timeout | null = null;
let statusBarItem: vscode.StatusBarItem | null = null;
let promoInterval: NodeJS.Timeout | null = null;
let promoRevertTimeout: NodeJS.Timeout | null = null;
let inPromo: boolean = false;
let lastStableActivity: any = null;
let lastStableUpdateTime: number = Date.now();

const CLIENT_ID = '1447012431267237888';

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('traeDiscordPresence');

    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'traeDiscordPresence.toggle';
    updateStatusBar(!!config.get('enabled'));
    statusBarItem.show();

    const envIdCheck = (process.env.TRAE_DISCORD_CLIENT_ID || '').trim();
    if (envIdCheck && envIdCheck !== CLIENT_ID) {
        updateStatusBar(false);
        vscode.window.showErrorMessage('Discord Client ID mismatch detected. Refusing to start.');
        return;
    }

    const toggleCmd = vscode.commands.registerCommand('traeDiscordPresence.toggle', async () => {
        const cfg = vscode.workspace.getConfiguration('traeDiscordPresence');
        const isEnabled = !!cfg.get('enabled');
        if (isEnabled) {
            try {
                if (rpc) {
                    try { await rpc.clearActivity(); } catch (e) {}
                }
                disconnectRPC();
                await cfg.update('enabled', false, vscode.ConfigurationTarget.Global);
                updateStatusBar(false);
                vscode.window.showInformationMessage('TRAE Discord Rich Presence disabled');
            } catch (err) {
                vscode.window.showErrorMessage('Error disabling Rich Presence: ' + String(err));
            }
        } else {
            const envCheck = (process.env.TRAE_DISCORD_CLIENT_ID || '').trim();
            if (envCheck && envCheck !== CLIENT_ID) {
                updateStatusBar(false);
                vscode.window.showErrorMessage('Discord Client ID mismatch detected. Refusing to start.');
                return;
            }
            await cfg.update('enabled', true, vscode.ConfigurationTarget.Global);
            try {
                await initializeRPC();
                updateStatusBar(true);
                vscode.window.showInformationMessage('TRAE Discord Rich Presence enabled');
            } catch (err) {
                await cfg.update('enabled', false, vscode.ConfigurationTarget.Global);
                updateStatusBar(false);
                vscode.window.showErrorMessage('Error enabling Rich Presence: ' + String(err));
            }
        }
    });

    const disposables = [
        vscode.window.onDidChangeActiveTextEditor(updateActivity),
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('traeDiscordPresence')) {
                const newConfig = vscode.workspace.getConfiguration('traeDiscordPresence');
                updateStatusBar(!!newConfig.get('enabled'));
                if (newConfig.get('enabled')) {
                    initializeRPC();
                } else {
                    disconnectRPC();
                }
            }
        }),
        vscode.workspace.onDidChangeWorkspaceFolders(updateActivity)
    ];

    context.subscriptions.push(toggleCmd, statusBarItem, ...disposables);

    if (config.get('enabled')) {
        initializeRPC();
    }
    updateActivity();
}

async function initializeRPC(): Promise<void> {
    if (rpc) {
        return Promise.resolve();
    }

    rpc = new Client({ transport: 'ipc' });

    return new Promise((resolve, reject) => {
        const client = rpc as Client;
        client.on('ready', () => {
            updateStatusBar(true);
            updateActivity();
            startPromoScheduler();
            resolve();
        });

        client.on('disconnected', () => {
            rpc = null;
            updateStatusBar(false);
            stopPromoScheduler();
            scheduleReconnect();
        });

        client.login({ clientId: CLIENT_ID }).catch((error: any) => {
            rpc = null;
            updateStatusBar(false);
            reject(error);
            scheduleReconnect();
        });
    });
}

function scheduleReconnect() {
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
    }
    
    reconnectTimer = setTimeout(() => {
        const config = vscode.workspace.getConfiguration('traeDiscordPresence');
        if (config.get('enabled')) {
            initializeRPC();
        }
    }, 5000);
}

function disconnectRPC() {
    if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
    }
    
    if (rpc) {
        try { rpc.clearActivity(); } catch (e) {}
        rpc.destroy();
        rpc = null;
    }
    stopPromoScheduler();
}

function updateActivity() {
    if (!rpc) {
        return;
    }

    const activity = buildBaseActivity();

    if (JSON.stringify(activity) !== JSON.stringify(currentActivity)) {
        currentActivity = activity;
        rpc.setActivity(activity).catch((error: any) => {
            console.error('Failed to set Discord activity:', error);
        });
        if (!inPromo) {
            lastStableActivity = activity;
            lastStableUpdateTime = Date.now();
        }
    }
}

function getLanguageName(extension: string): string {
    const languageMap: { [key: string]: string } = {
        '.js': 'JavaScript',
        '.ts': 'TypeScript',
        '.jsx': 'React',
        '.tsx': 'React/TypeScript',
        '.py': 'Python',
        '.java': 'Java',
        '.cpp': 'C++',
        '.c': 'C',
        '.cs': 'C#',
        '.php': 'PHP',
        '.rb': 'Ruby',
        '.go': 'Go',
        '.rs': 'Rust',
        '.swift': 'Swift',
        '.kt': 'Kotlin',
        '.scala': 'Scala',
        '.html': 'HTML',
        '.css': 'CSS',
        '.scss': 'SASS',
        '.sass': 'SASS',
        '.less': 'LESS',
        '.json': 'JSON',
        '.xml': 'XML',
        '.yaml': 'YAML',
        '.yml': 'YAML',
        '.md': 'Markdown',
        '.sql': 'SQL',
        '.sh': 'Shell',
        '.bash': 'Bash',
        '.zsh': 'Zsh',
        '.fish': 'Fish',
        '.ps1': 'PowerShell',
        '.dockerfile': 'Docker',
        '.vue': 'Vue',
        '.svelte': 'Svelte'
    };
    
    return languageMap[extension.toLowerCase()] || '';
}

function getWorkspaceName(): string {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
        return path.basename(workspaceFolders[0].uri.fsPath);
    }
    return '';
}

export function deactivate() {
    disconnectRPC();
}

function updateStatusBar(enabled: boolean) {
    if (!statusBarItem) {
        return;
    }
    if (enabled) {
        statusBarItem.text = '$(plug) TRAE DP: ON';
        statusBarItem.color = '#00c853';
    } else {
        statusBarItem.text = '$(circle-slash) TRAE DP: OFF';
        statusBarItem.color = '#d32f2f';
    }
    statusBarItem.tooltip = enabled ? 'Discord Rich Presence active' : 'Discord Rich Presence inactive';
    statusBarItem.show();
}

function buildBaseActivity(): any {
    const config = vscode.workspace.getConfiguration('traeDiscordPresence');
    const editor = vscode.window.activeTextEditor;
    const mode = (config.get<string>('mode') || 'editing').toLowerCase();
    const activity: any = {
        largeImageKey: 'trae_logo',
        largeImageText: 'TRAE',
        details: 'TRAE',
        instance: false
    };
    activity.buttons = [
        { label: 'I need it', url: 'https://github.com/HighMark-31/TRAE-Discord-Rich-Presence' },
        { label: 'Open TRAE', url: 'https://trae.ai' }
    ];
    if (config.get('showElapsedTime')) {
        activity.startTimestamp = startTime;
    }
    if (mode === 'chatting') {
        const chatText = (config.get<string>('chattingText') || 'Chatting with TRAE...').trim();
        activity.state = chatText || 'Chatting with TRAE...';
        return activity;
    }
    if (mode === 'solo') {
        const soloText = (config.get<string>('soloText') || 'SOLO Mode working...').trim();
        activity.state = soloText || 'SOLO Mode working...';
        return activity;
    }
    if (editor) {
        const fileName = path.basename(editor.document.fileName);
        const fileExtension = path.extname(fileName);
        const language = getLanguageName(fileExtension);
        const workspaceName = getWorkspaceName();
        activity.state = `Editing ${fileName}`;
        if (language) {
            activity.state += ` • Language: ${language}`;
        } else {
            activity.state += ` • Text file`;
        }
        if (config.get('showWorkspaceName') && workspaceName) {
            activity.state += ` • ${workspaceName}`;
        }
        return activity;
    }
    const workspaceName = getWorkspaceName();
    if (workspaceName) {
        activity.state = `Workspace: ${workspaceName}`;
    } else {
        activity.state = 'Idle';
    }
    return activity;
}

function startPromoScheduler() {
    stopPromoScheduler();
    promoInterval = setInterval(async () => {
        if (!rpc) return;
        if (inPromo) return;
        const base = lastStableActivity || buildBaseActivity();
        const promoActivity = { ...base, state: 'TRAE Discord Rich Presence is made free for all by Highmark.it <3' };
        inPromo = true;
        try { await rpc.setActivity(promoActivity); } catch (e) {}
        promoRevertTimeout = setTimeout(async () => {
            inPromo = false;
            if (!rpc) return;
            const revert = lastStableActivity || buildBaseActivity();
            try { await rpc.setActivity(revert); } catch (e) {}
        }, 15 * 1000);
    }, 10 * 60 * 1000);
}

function stopPromoScheduler() {
    if (promoInterval) { clearInterval(promoInterval); promoInterval = null; }
    if (promoRevertTimeout) { clearTimeout(promoRevertTimeout); promoRevertTimeout = null; }
    inPromo = false;
}

